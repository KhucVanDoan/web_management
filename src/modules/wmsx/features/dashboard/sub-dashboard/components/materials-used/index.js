import React from 'react'

import { Bar } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'

const MaterialUsedReport = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    { name: 'Dầu diesel', quantity: 3 },
    { name: 'Than cám', quantity: 6 },
    { name: 'Đá vôi', quantity: 10 },
    { name: 'Than cám 5b', quantity: 26 },
    { name: 'Mặt nạ bảo vệ', quantity: 14 },
  ]

  const sortedData = data?.sort(function (a, b) {
    return b.quantity - a.quantity
  })

  const config = {
    data: sortedData,
    xField: 'quantity',
    yField: 'name',
    barWidthRatio: 0.2,
    seriesField: 'name',
    legend: {
      position: 'right',
    },
    yAxis: {
      tickLine: false,
      label: null,
    },
  }

  return (
    <Card sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.materialUsed.title')}
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
        <Bar {...config} />
      </Box>
    </Card>
  )
}

export default MaterialUsedReport
