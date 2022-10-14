import React from 'react'

import { Column } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'

const StockItemBySCLReport = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    {
      time: '2019-03',
      value: 350,
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-04',
      value: 900,
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-05',
      value: 300,
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-06',
      value: 450,
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-07',
      value: 470,
      name: t('dashboard.inventoryQuantity.value'),
    },
  ]

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'name',
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
    legend: {
      position: 'bottom',
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    color: '#ff9054',
  }

  return (
    <Card sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.stockItemSCL.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mb: 2,
            width: '25%',
            flexDirection: 'column',
          }}
        >
          <Autocomplete disableClearable />
        </Box>
      </Box>
      <Box
        sx={{
          height: 320,
        }}
      >
        <Column {...config} />
      </Box>
    </Card>
  )
}

export default StockItemBySCLReport
