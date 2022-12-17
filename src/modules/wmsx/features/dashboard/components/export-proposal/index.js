import React from 'react'

import { Pie } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ExportProposal = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    { type: 'SL giấy chưa xuất', value: 400 },
    { type: 'SL giấy chưa xuất xong chờ mua bổ sung', value: 300 },
    { type: 'SL giấy đã xuất xong', value: 300 },
    { type: 'SL giấy chờ phê duyệt', value: 200 },
    { type: 'SL giấy cần mua', value: 200 },
  ]

  const colors = ['#0761AD', '#7F9EF4', '#FF9054', '#B2DF8A', '#FF0909']

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.6,
    label: {
      type: 'outer',
      style: { fontSize: 12, textOverflow: 'unset' },
    },
    legend: {
      position: 'bottom',
      layout: 'vertical',
      flipPage: false,
      // offsetX: 10,
      // marker: {
      //   symbol: 'square',
      // },
      // itemName: {
      //   style: {
      //     fontSize: 12,
      //     width: 90,
      //   },
      // },
      // itemHeight: 18,
      // itemStyle: {
      //   width: 90,
      // },
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    color: colors,
  }

  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
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
          {/* <Autocomplete
            name="warehouseId"
            placeholder={t('dashboard.allDepartment')}
            asyncRequest={(s) =>
              searchManagamentUnitApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
          /> */}
        </Box>
      </Box>
      <Box
        sx={
          {
            // height: 320,
          }
        }
      >
        <Pie {...config} />
      </Box>
    </Card>
  )
}

export default ExportProposal
