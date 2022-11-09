import React, { useEffect, useState } from 'react'

import { DualAxes } from '@ant-design/plots/es'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'
import { useDashboardTransferReport } from '~/modules/wmsx/redux/hooks/useDashboard'
import {
  getDashboardItems,
  getDashboardWarehouses,
} from '~/modules/wmsx/redux/sagas/dashboard'

const MovementReport = () => {
  const { t } = useTranslation(['wmsx'])

  const { data: transferReport, actions } = useDashboardTransferReport()

  const [groupBy, setGroupBy] = useState(0)
  const [warehouseId, setWarehouseId] = useState('')
  const [itemId, setItemId] = useState('')

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value?.id)
  }

  const handleChangeItem = (value) => {
    setItemId(value?.id)
  }

  useEffect(() => {
    const payload = {
      reportType: groupBy,
      itemId: itemId,
      warehouseId: warehouseId,
    }
    actions.getTransferReport(payload)
  }, [groupBy, itemId, warehouseId])

  const formatDataStock = (dataList) => {
    const newData = []
    dataList.forEach((data) => {
      newData.push({
        time: data?.rangeDate,
        type: t('dashboard.movementReport.importQuantity'),
        value: data.importStock,
      })
      newData.push({
        time: data?.rangeDate,
        type: t('dashboard.movementReport.exportQuantity'),
        value: data.exportStock,
      })
    })
    return newData
  }

  const formatDataAmount = (dataList) => {
    const newData = []
    dataList.forEach((data) => {
      newData.push({
        time: data?.rangeDate,
        name: t('dashboard.movementReport.importValue'),
        count: data.importAmount,
      })
      newData.push({
        time: data?.rangeDate,
        name: t('dashboard.movementReport.exportValue'),
        count: data.exportAmount,
      })
    })
    return newData
  }

  const dataStockConvert = formatDataStock(transferReport)
  const dataAmountConvert = formatDataAmount(transferReport)

  const config = {
    data: [dataStockConvert, dataAmountConvert],
    xField: 'time',
    yField: ['value', 'count'],
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
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: () => {
          return {
            opacity: 0.5,
          }
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.movementReport.movementQuantity')}
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
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={handleChangeWarehouse}
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
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={handleChangeItem}
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default MovementReport
