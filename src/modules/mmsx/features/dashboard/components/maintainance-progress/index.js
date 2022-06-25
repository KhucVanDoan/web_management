import React, { useEffect, useMemo, useState } from 'react'

import { DualAxes } from '@ant-design/plots'
import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { format } from 'date-fns'
import { isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MAINTAINANCE_STATUS_DASHBOARD } from '~/modules/mmsx/constants'
import { useDashboardMaintainanceJobStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

import DateSelection from '../date-selection'

const groupOptions = [
  {
    name: 'week',
    value: 0,
  },
  {
    name: 'month',
    value: 1,
  },
  {
    name: 'quarter',
    value: 2,
  },
]

const MaintainanceProgress = () => {
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()

  const { data, actions } = useDashboardMaintainanceJobStatus()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = () => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getMaintainanceJob(payload)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [groupBy, startDate, endDate])

  const handleChangeGroupBy = (_, id) => {
    if (!isNull(id)) {
      setGroupBy(id)
    }
  }

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
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

  const config = {
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
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.maintainanceProgress')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={groupBy}
          exclusive
          onChange={handleChangeGroupBy}
        >
          {groupOptions.map((group) => (
            <ToggleButton
              key={group.value}
              value={group.value}
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.text.main,
                width: 55,
                '&.Mui-selected': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              {t(`common.${group.name}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
      <DateSelection reportType={groupBy} handleChange={handleChangeDate} />
    </Card>
  )
}

export default MaintainanceProgress
