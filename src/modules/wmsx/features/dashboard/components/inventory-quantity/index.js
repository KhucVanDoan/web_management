import React, { useEffect, useState } from 'react'

import { DualAxes } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'
import { useDashboardItemStockHistory } from '~/modules/wmsx/redux/hooks/useDashboard'
import {
  getDashboardItems,
  getDashboardWarehouses,
} from '~/modules/wmsx/redux/sagas/dashboard'
import { convertNumberWithThousandSeparator } from '~/utils'

const InventoryQuantity = ({ fromDate, toDate }) => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseCode, setWarehouseCode] = useState('')
  const [groupBy, setGroupBy] = useState(0)

  const [itemCode, setItemCode] = useState('')

  const { data: itemStockHistories, actions } = useDashboardItemStockHistory()

  useEffect(() => {
    actions.getItemStockHistories({
      reportType: groupBy,
      from: fromDate?.toISOString()?.substring(0, 10),
      to: toDate?.toISOString()?.substring(0, 10),
      itemCode: itemCode?.code,
      warehouseCode: warehouseCode?.code,
    })
  }, [itemCode, warehouseCode, fromDate, toDate, groupBy])

  const handleChangeWarehouse = (value) => {
    setWarehouseCode(value)
  }

  const handleChangeItem = (value) => {
    setItemCode(value)
  }

  const convertAmount = (amount) => {
    const unit = 1000000;
    if (!amount || +amount == 0) {
      return 0;
    }
    try {
      return  (amount / unit).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    } catch {
      return (amount / unit).toFixed(2);
    }
  }

  const data = itemStockHistories?.map((item) => ({
    time: item?.rangeDate,
    quantity: item?.quantity,
    amount: convertAmount(item?.amount),
    type: t('dashboard.inventoryQuantity.quantity'),
    name: t('dashboard.inventoryQuantity.value'),
  }))

  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['quantity', 'amount'],
    xAxis: {
      title: {
        text: t('general:currencyUnit.vnd'),
        offset: 14,
        position: 'end',
      },
    },
    yAxis: {
      value: {
        grid: {
          line: {
            style: {
              lineWidth: 2,
              stroke: '#EDF0F4',
              lineDash: [2, 2],
            },
          },
        },
      },
    },
    // slider: {
    //   height: 30,
    //   handlerStyle: {
    //     stroke: '#8884d8',
    //     width: 4,
    //     fill: '#8884d8',
    //     highLightFill: '#8884d8',
    //   },
    //   trendCfg: {
    //     data: [],
    //   },
    // },
    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'type',
        isGroup: true,
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
    tooltip: {
      formatter: (datum) => {
        if (datum.type === t('dashboard.inventoryQuantity.quantity'))
          return {
            ...datum,
            name: datum.type,
            value: convertNumberWithThousandSeparator(datum.quantity),
          }

        return {
          ...datum,
          value: convertNumberWithThousandSeparator(datum.amount),
        }
      },
    },
  }

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
            getDashboardWarehouses({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          value={warehouseCode}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          onChange={(val) => handleChangeWarehouse(val)}
        />
        <Autocomplete
          sx={{ width: '45%' }}
          name="itemId"
          placeholder={t('movements.importExport.itemCode')}
          asyncRequest={(s) =>
            getDashboardItems({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          value={itemCode}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          onChange={(val) => handleChangeItem(val)}
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default InventoryQuantity
