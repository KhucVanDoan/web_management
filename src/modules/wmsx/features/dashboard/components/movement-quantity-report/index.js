import React, { useState } from 'react'

import { Line } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DatePicker from '~/components/DatePicker'

const MovementQuantityReport = () => {
  const { t } = useTranslation(['wmsx'])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChangeSelect = (value) => {
    setSelectedDate(value)
  }

  const data = [
    {
      time: '01',
      count: 10,
      name: t('dashboard.movementReport.export'),
    },
    {
      time: '02',
      count: 30,
      name: t('dashboard.movementReport.export'),
    },
    {
      time: '03',
      count: 90,
      name: t('dashboard.movementReport.export'),
    },
    {
      time: '04',
      count: 78,
      name: t('dashboard.movementReport.export'),
    },
    {
      time: '01',
      count: 123,
      name: t('dashboard.movementReport.import'),
    },
    {
      time: '02',
      count: 109,
      name: t('dashboard.movementReport.import'),
    },
    {
      time: '03',
      count: 10,
      name: t('dashboard.movementReport.import'),
    },
    {
      time: '04',
      count: 23,
      name: t('dashboard.movementReport.import'),
    },
    {
      time: '01',
      count: 89,
      name: t('dashboard.movementReport.transfer'),
    },
    {
      time: '02',
      count: 123,
      name: t('dashboard.movementReport.transfer'),
    },
    {
      time: '03',
      count: 698,
      name: t('dashboard.movementReport.transfer'),
    },
    {
      time: '04',
      count: 312,
      name: t('dashboard.movementReport.transfer'),
    },
  ]

  const COLOR_PLATE_10 = [
    '#1F78B4',
    '#B2DF8A',
    '#FF0909',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ]

  const config = {
    data,
    xField: 'time',
    yField: 'count',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    lineStyle: () => {
      return {
        lineDash: [3, 3],
        opacity: 0.6,
      }
    },
    point: {
      size: 6,
      shape: 'circle',
    },
    legend: {
      position: 'bottom',
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.movementReport.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mb: 2,
            width: '20%',
            flexDirection: 'column',
          }}
        >
          <DatePicker
            views={['year', 'month']}
            value={selectedDate}
            onChange={handleChangeSelect}
          />
        </Box>
      </Box>
      <Box sx={{ height: 360 }}>
        <Line {...config} />
      </Box>
    </Card>
  )
}

export default MovementQuantityReport
