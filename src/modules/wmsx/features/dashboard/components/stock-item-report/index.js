import React, { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { useDashboardItemGroupStockSummary } from '~/modules/wmsx/redux/hooks/useDashboard'
import {
  getDashboardItems,
  getDashboardWarehouses,
} from '~/modules/wmsx/redux/sagas/dashboard'
import { convertNumberWithThousandSeparator } from '~/utils'

const StockItemReport = () => {
  const { t } = useTranslation(['wmsx'])
  const [itemId, setItemId] = useState(null)
  const [warehouseId, setWarehouseId] = useState(null)

  const { data: itemGroupStockSummary, actions } =
    useDashboardItemGroupStockSummary()

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value)
  }

  const handleChangeItem = (value) => {
    setItemId(value)
  }

  useEffect(() => {
    actions.getItemGroupStockSummary({
      itemId: itemId?.id,
      warehouseId: warehouseId?.id,
    })
  }, [itemId, warehouseId])

  const maxProportion = 100_000_000
  const rawPlanningAmount = itemGroupStockSummary?.totalItemPlanningAmount || 0
  const rawStockAmount = itemGroupStockSummary?.totalItemStockAmount || 0

  let piePlanningAmount = BigNumber(rawPlanningAmount)
  let pieStockAmount = BigNumber(rawStockAmount)
  if (piePlanningAmount.gt(pieStockAmount)) {
    const actualProportion = piePlanningAmount.div(pieStockAmount)
    if (actualProportion.gt(maxProportion)) {
      piePlanningAmount = BigNumber(maxProportion)
      pieStockAmount = BigNumber(1)
    }
  } else {
    const actualProportion = pieStockAmount.div(piePlanningAmount)
    if (actualProportion.gt(maxProportion)) {
      piePlanningAmount = BigNumber(1)
      pieStockAmount = BigNumber(maxProportion)
    }
  }
  const data = [
    {
      type: 'Giá trị VT bị giữ (VNĐ)',
      value: piePlanningAmount.toNumber(),
      formattedValue: convertNumberWithThousandSeparator(rawPlanningAmount),
      rawValue: rawPlanningAmount,
      available: convertNumberWithThousandSeparator(
        itemGroupStockSummary.totalItemPlanning || 0,
        2,
      ),
    },
    {
      type: 'Giá trị VT có thể xuất (VNĐ) ',
      value: pieStockAmount.toNumber(),
      formattedValue: convertNumberWithThousandSeparator(rawStockAmount),
      rawValue: rawStockAmount,
      available: convertNumberWithThousandSeparator(
        itemGroupStockSummary.totalItemStockAvaiable || 0,
        2,
      ),
    },
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    innerRadius: 0.7,
    // label: {
    //   type: 'inner',
    //   offset: '-50%',
    //   content: '{value}',
    //   style: {
    //     textAlign: 'center',
    //     fontSize: 14,
    //   },
    // },
    label: {
      type: 'outer',
      style: { fontSize: 14, textOverflow: 'unset' },
      formatter: (datum) => {
        return datum.formattedValue
      },
    },
    tooltip: {
      fields: ['formattedValue', 'available', 'type'],
      formatter: (datum) => {
        return {
          name: datum.type?.slice(8, datum?.type?.length),
          value: `${datum.formattedValue} VNĐ | ${datum.available}`,
        }
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
          fontSize: '16px',
        },
        formatter: (_, items = []) => {
          const total = items.reduce((acc, cur) => {
            return BigNumber(acc).plus(BigNumber(cur?.rawValue || 0))
          }, 0)
          return convertNumberWithThousandSeparator(total.toString())
        },
      },
    },
    color: ['#0761AD', '#FF9054'],
    legend: {
      marker: {
        symbol: 'square',
      },
    },
  }

  return (
    <Card sx={{ p: 2, height: 412 }}>
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
            sx={{
              mb: 1,
            }}
            name="warehouseId"
            placeholder={t('dashboard.allWarehouse')}
            asyncRequest={(s) =>
              getDashboardWarehouses({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            value={warehouseId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            onChange={handleChangeWarehouse}
          />
          <Autocomplete
            sx={{}}
            name="itemId"
            placeholder={t('dashboard.itemName')}
            asyncRequest={(s) =>
              getDashboardItems({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            value={itemId}
            asyncRequestDeps={warehouseId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            onChange={handleChangeItem}
          />
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
