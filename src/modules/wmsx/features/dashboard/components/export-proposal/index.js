import React from 'react'

import { Pie } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'

const ExportProposal = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    { type: 'SL giấy chưa xuất', value: 400 },
    { type: 'SL giấy chưa xuất xong chờ mua bổ sung', value: 300 },
    { type: 'SL giấy đã xuất xong', value: 300 },
    { type: 'SL giấy chờ phê duyệt', value: 200 },
    { type: 'SL giấy cần mua', value: 200 },
  ]

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  }

  return (
    <Card sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.exportProposal.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mb: 2,
            width: '40%',
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
        <Pie {...config} />
      </Box>
    </Card>
  )
}

export default ExportProposal
