import React, { useState } from 'react'

import { DualAxes } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'

const InventoryQuantity = () => {
  const { t } = useTranslation(['wmsx'])

  const data = [
    {
      time: '2019-03',
      value: 350,
      quantity: 800,
      type: t('dashboard.inventoryQuantity.quantity'),
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-04',
      value: 900,
      quantity: 600,
      type: t('dashboard.inventoryQuantity.quantity'),
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-05',
      value: 300,
      quantity: 400,
      type: t('dashboard.inventoryQuantity.quantity'),
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-06',
      value: 450,
      quantity: 380,
      type: t('dashboard.inventoryQuantity.quantity'),
      name: t('dashboard.inventoryQuantity.value'),
    },
    {
      time: '2019-07',
      value: 470,
      quantity: 220,
      type: t('dashboard.inventoryQuantity.quantity'),
      name: t('dashboard.inventoryQuantity.value'),
    },
  ]

  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['value', 'quantity'],
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
        seriesField: 'type',
        color: '#ff9054',
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: {
          lineWidth: 2,
        },
        color: '#0761AD',
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
          {t('dashboard.inventoryQuantity.title')}
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
        <Autocomplete
          sx={{ width: '45%' }}
          name="warehouseId"
          placeholder={t('dashboard.allWarehouse')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
        <Autocomplete
          sx={{ width: '45%' }}
          name="itemId"
          placeholder={t('movements.importExport.itemCode')}
          asyncRequest={(s) =>
            searchMaterialsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default InventoryQuantity
