import React, { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
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
  const [itemId, setItemId] = useState('')
  const [warehouseId, setWarehouseId] = useState('')

  const { data: itemGroupStockSummary, actions } =
    useDashboardItemGroupStockSummary()

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value?.id)
  }

  const handleChangeItem = (value) => {
    setItemId(value?.id)
  }

  useEffect(() => {
    actions.getItemGroupStockSummary({
      itemId: itemId,
      warehouseId: warehouseId,
    })
  }, [itemId, warehouseId])

  const data = [
    {
      type: 'Giá trị VT bị giữ (VNĐ)',
      data: 1,
      value: Number(itemGroupStockSummary?.totalItemPlanningAmount),
    },
    {
      type: 'Giá trị VT có thể xuất (VNĐ) ',
      data: 2,
      value: Number(itemGroupStockSummary?.totalItemStockAmount),
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
        return convertNumberWithThousandSeparator(datum.value, 0)
      },
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.type?.slice(8, datum?.type?.length),
          value:
            datum.type === data[0]?.type
              ? `${convertNumberWithThousandSeparator(
                  datum.value,
                  0,
                )} VNĐ | ${Number(itemGroupStockSummary?.totalItemPlanning)
                  .toFixed(2)
                  .toString()
                  .replace(/\d(?=(\d{3})+(?!\d))/g, '$& ')
                  .replace('.', ',')}
                `
              : `${convertNumberWithThousandSeparator(
                  datum.value,
                  0,
                )} VNĐ | ${Number(itemGroupStockSummary?.totalItemStockAvaiable)
                  .toFixed(2)
                  .toString()
                  .replace(/\d(?=(\d{3})+(?!\d))/g, '$& ')
                  .replace('.', ',')}
                `,
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
            return acc + (cur?.value || 0)
          }, 0)
          return convertNumberWithThousandSeparator(total, 0)
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
