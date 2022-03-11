import React, { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DateRangePicker from '~/components/DateRangePicker'
import { useDashboardMoStatus } from '~/modules/mesx/redux/hooks/useDashboard'

function MoStatusReport() {
  const { t } = useTranslation(['mesx'])
  const { data: moStatus, actions } = useDashboardMoStatus()
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const [dateRangeValue, setDateRangeValue] = useState([firstDay, lastDay])

  useEffect(() => {
    actions.getDashboardMoStatus({
      createdFrom: dateRangeValue[0] || date,
      createdTo: dateRangeValue[1] || date,
    })
  }, [dateRangeValue])

  const data = [
    {
      type: t('dashboard.toDoMo'),
      value: moStatus?.totalToDoMo,
    },
    {
      type: t('dashboard.inTimeMo'),
      value: moStatus?.totalCompletedMo,
    },
    {
      type: t('dashboard.lateMo'),
      value: moStatus?.totalLateMo,
    },
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.7,
    label: {
      type: 'outer',
      offset: '50%',
      content: '{percentage}',
    },
    legend: {
      layout: 'vertical',
      position: 'bottom',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  }

  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.MoStatus')}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <DateRangePicker
          label={t('dashboard.MoCreatedAt')}
          placeholder={t('dashboard.MoCreatedAt')}
          value={dateRangeValue}
          onChange={(value) => setDateRangeValue(value)}
          labelWidth="30%"
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <Pie {...config} />
      </Box>
    </Card>
  )
}

export default MoStatusReport
