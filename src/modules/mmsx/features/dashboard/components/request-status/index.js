import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Column } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import { REQUEST_STATUS_DASHBOARD } from '~/modules/mmsx/constants'
import { useDashboardRequestStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

const RequestStatus = () => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions } = useDashboardRequestStatus()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = useCallback(() => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getRequestStt(payload)
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
          type: t(
            `dashboard.maintainanceProgress.${
              REQUEST_STATUS_DASHBOARD[data?.status]
            }`,
          ),
        })
      })
    })
    return col
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      isStack: true,
      height: 255,
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      label: {
        position: 'middle',
        layout: [
          {
            type: 'adjust-color',
          },
          {
            type: 'interval-hide-overlap',
          },
          {
            type: 'interval-adjust-position',
          },
        ],
      },
      legend: {
        layout: 'horizontal',
        position: 'bottom',
      },
    }),
    [convertData],
  )

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.requestStatus')}
        </Typography>
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
      <Box sx={{ height: 360 }}>
        <Column {...config} />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
    </Card>
  )
}

export default RequestStatus
