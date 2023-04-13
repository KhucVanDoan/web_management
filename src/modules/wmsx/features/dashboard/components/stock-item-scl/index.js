import React, { useEffect } from 'react'

import { Column } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { useDashboardItemStockConstructionScl } from '~/modules/wmsx/redux/hooks/useDashboard'
import { getDashboardItemStockInformation } from '~/modules/wmsx/redux/sagas/dashboard'
import { convertNumberWithThousandSeparator } from '~/utils'

const StockItemBySCLReport = () => {
  const { t } = useTranslation(['wmsx'])

  const { data: itemStockConstructionScl, actions } =
    useDashboardItemStockConstructionScl()

  useEffect(() => {
    actions.getItemStockConstructionScl()
  }, [])
  const data = itemStockConstructionScl.map((item, index) => ({
    index: index,
    type: item?.type,
    totalItemStockAmount:
      item.totalItemStockAmount < 0
        ? 0
        : convertNumberWithThousandSeparator(item.totalItemStockAmount),
    name: t('dashboard.inventoryQuantity.value'),
  }))

  const handleChange = (val) => {
    actions.getItemStockConstructionScl({ type: val?.type })
  }
  const config = {
    data,
    xField: 'type',
    yField: 'totalItemStockAmount',
    seriesField: 'name',
    slider: {
      height: 30,
      handlerStyle: {
        stroke: '#8884d8',
        width: 4,
        fill: '#8884d8',
        highLightFill: '#8884d8',
        maginTop: '40px',
      },
      formatter: (_, value) => {
        return value?.index
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
          <Autocomplete
            name="type"
            asyncRequest={(s) =>
              getDashboardItemStockInformation({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data}
            getOptionLabel={(opt) => opt?.type}
            onChange={(val) => handleChange(val)}
          />
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
