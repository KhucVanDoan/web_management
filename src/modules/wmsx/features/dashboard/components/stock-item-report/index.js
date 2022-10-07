import React from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'

const StockItemReport = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    { type: 'SL có thể xuất ', value: 400 },
    { type: 'SL Giữ', value: 300 },
  ]

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    innerRadius: 0.7,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
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
    <Card sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.stockItemReport.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mb: 2,
            width: '40%',
            flexDirection: 'column',
          }}
        >
          <Autocomplete
            disableClearable
            sx={{
              mb: 1,
            }}
          />
          <Autocomplete disableClearable sx={{}} />
        </Box>
      </Box>
      <Box
        sx={{
          height: 250,
        }}
      >
        <Pie {...config} />
      </Box>
    </Card>
  )
}

export default StockItemReport
