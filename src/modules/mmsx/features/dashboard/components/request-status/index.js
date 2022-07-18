import React, { useEffect, useMemo, useState } from 'react'

import { Column } from '@ant-design/plots'
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

import DateSelection from '~/components/DateSelection'
import { REQUEST_STATUS_DASHBOARD } from '~/modules/mmsx/constants'
import { useDashboardRequestStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

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

const RequestStatus = () => {
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()

  const { data, actions } = useDashboardRequestStatus()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = () => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getRequestStt(payload)
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

  const config = {
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
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.requestStatus')}
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
        <Column {...config} />
      </Box>
      <DateSelection reportType={groupBy} handleChange={handleChangeDate} />
    </Card>
  )
}

export default RequestStatus
