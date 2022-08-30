import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import { MAINTAINANCE_STATUS_DASHBOARD } from '~/modules/mmsx/constants'
import { useDashboardMaintainanceJobStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

const MaintainanceProgress = () => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions } = useDashboardMaintainanceJobStatus()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = useCallback(() => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getMaintainanceJob(payload)
  }, [groupBy, startDate, endDate])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChangeDate = (_, { start, end }) => {
    setStartDate(`${format(start, 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(end, 'yyyy-MM-dd')}T23:59:59.999Z`)
  }

  const convertData = useMemo(() => {
    let line = []
    let col = []
    data?.forEach((item) => {
      item?.countReport?.forEach((data, i) => {
        if (i < 2) {
          col.push({
            time: item?.rangeDate,
            value: data?.count,
            type: t(
              `dashboard.maintainanceProgress.${
                MAINTAINANCE_STATUS_DASHBOARD[data?.status]
              }`,
            ),
          })
        } else {
          line.push({
            time: item?.rangeDate,
            count: data?.count,
            name: t(
              `dashboard.maintainanceProgress.${
                MAINTAINANCE_STATUS_DASHBOARD[data?.status]
              }`,
            ),
          })
        }
      })
    })
    return [col, line]
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      xField: 'time',
      yField: ['value', 'count'],
      height: 255,
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          columnWidthRatio: 0.4,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          lineStyle: ({ name }) => {
            if (name === 'c') {
              return {
                lineDash: [1, 4],
                opacity: 1,
              }
            }

            return {
              opacity: 0.5,
            }
          },
        },
      ],
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
          {t('dashboard.chart.maintainanceProgress')}
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
        <DualAxes {...config} />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
    </Card>
  )
}

export default MaintainanceProgress
