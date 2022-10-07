import React, { useState } from 'react'

import { DualAxes } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'

const MovementReport = () => {
  const { t } = useTranslation(['wmsx'])

  const columnData = [
    {
      time: '2019-03',
      value: 350,
      type: t('dashboard.movementReport.exportQuantity'),
    },
    {
      time: '2019-04',
      value: 900,
      type: t('dashboard.movementReport.exportQuantity'),
    },
    {
      time: '2019-05',
      value: 300,
      type: t('dashboard.movementReport.exportQuantity'),
    },
    {
      time: '2019-06',
      value: 450,
      type: t('dashboard.movementReport.exportQuantity'),
    },
    {
      time: '2019-03',
      value: 220,
      type: t('dashboard.movementReport.importQuantity'),
    },
    {
      time: '2019-04',
      value: 300,
      type: t('dashboard.movementReport.importQuantity'),
    },
    {
      time: '2019-05',
      value: 250,
      type: t('dashboard.movementReport.importQuantity'),
    },
    {
      time: '2019-06',
      value: 220,
      type: t('dashboard.movementReport.importQuantity'),
    },
  ]

  const lineData = [
    {
      time: '2019-03',
      count: 800,
      name: t('dashboard.movementReport.exportValue'),
    },
    {
      time: '2019-04',
      count: 600,
      name: t('dashboard.movementReport.exportValue'),
    },
    {
      time: '2019-05',
      count: 400,
      name: t('dashboard.movementReport.exportValue'),
    },
    {
      time: '2019-06',
      count: 380,
      name: t('dashboard.movementReport.exportValue'),
    },
    {
      time: '2019-03',
      count: 750,
      name: t('dashboard.movementReport.importValue'),
    },
    {
      time: '2019-04',
      count: 650,
      name: t('dashboard.movementReport.importValue'),
    },
    {
      time: '2019-05',
      count: 450,
      name: t('dashboard.movementReport.importValue'),
    },
    {
      time: '2019-06',
      count: 400,
      name: t('dashboard.movementReport.importValue'),
    },
  ]

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['value', 'count'],
    slider: {
      height: 30,
      handlerStyle: {
        stroke: '#8884d8',
        width: 4,
        fill: '#8884d8',
        highLightFill: '#8884d8',
      },
      trendCfg: {
        data: [],
      },
    },
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
        lineStyle: () => {
          return {
            opacity: 0.5,
          }
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
  }

  const [groupBy, setGroupBy] = useState(0)
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.movementReport.movementQuantity')}
        </Typography>
        <Box>
          <DateGroupToggle groupBy={groupBy} setGroupBy={setGroupBy} />
        </Box>
      </Box>
      <Box
        sx={{
          mb: 2,
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Autocomplete sx={{ width: '45%' }} />
        <Autocomplete sx={{ width: '45%' }} />
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default MovementReport
