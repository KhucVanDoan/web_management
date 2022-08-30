import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Line } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import { PRIORITY_DASHBOARD } from '~/modules/mmsx/constants'
import { useDashboardDeviceError } from '~/modules/mmsx/redux/hooks/useDashboard'

const DeviceError = () => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions } = useDashboardDeviceError()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = useCallback(() => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getDeviceError(payload)
  }, [groupBy, startDate, endDate])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
    setStartDate(`${format(start, 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(end, 'yyyy-MM-dd')}T23:59:59.999Z`)
  }

  const convertData = useMemo(() => {
    let col = []
    data?.forEach((item) => {
      item?.countReport?.forEach((data) => {
        col.push({
          time: item?.rangeDate,
          value: data?.count,
          category: t(PRIORITY_DASHBOARD[data?.priority]),
        })
      })
    })
    return col
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      height: 255,
      xField: 'time',
      yField: 'value',
      seriesField: 'category',
      lineStyle: { lineDash: [6 - 1] },
      color: [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3',
      ],
      legend: {
        position: 'bottom',
        style: {
          ShapeAttrs: 'square',
        },
        itemSpacing: 1,
        itemName: {
          style: { fill: '#000' },
          formatter: function formatter(name) {
            return name
          },
        },
      },
      yAxis: {
        label: {
          formatter: (v) =>
            `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
    }),
    [convertData],
  )

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.chart.deviceError')}</Typography>
        <Box>
          <DateGroupToggle
            groupBy={groupBy}
            setGroupBy={(val) => {
              setGroupBy(val)
              setStartDate(null)
              setEndDate(null)
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: 230 }}>
        <Line {...config} />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
    </Card>
  )
}

export default DeviceError
