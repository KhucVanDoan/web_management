import React, { useEffect } from 'react'

import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { ORDER_STATUS } from '~/modules/wmsx/constants'
import { convertUtcDateToLocalTz } from '~/utils'

function ItemSettingTableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, status } = props
  const {
    data: { itemList, warehouseList },
    actions,
  } = useCommonManagement()
  const isDisplay =
    status === ORDER_STATUS.PENDING ||
    status === ORDER_STATUS.CONFIRMED ||
    status === ORDER_STATUS.REJECTED
  useEffect(() => {
    actions.getItems({ isGetAll: 1 })
    actions.getWarehouses({ isGetAll: 1 })
  }, [])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const getWarehouseTypeNames = (warehouseId) => {
    const warehouse = warehouseList?.find((item) => item?.id === warehouseId)
    return warehouse?.warehouseTypes?.length > 0
      ? warehouse?.warehouseTypes
          ?.map((warehouseType) => warehouseType?.name)
          ?.join(', ')
      : ''
  }
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,

      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'itemName',
      headerName: t('productionOrder.item.name'),
      width: 250,
      renderCell: (params) => {
        const { itemId } = params.row
        return <>{getItemObject(itemId)?.name || ''}</>
      },
    },
    {
      field: 'code',
      headerName: t('productionOrder.item.code'),
      width: 180,
      renderCell: (params) => {
        const itemId = params.row?.itemId
        return <>{getItemObject(itemId)?.code || ''}</>
      },
    },
    {
      field: 'itemType',
      headerName: t('productionOrder.item.type'),
      width: 180,

      renderCell: (params) => {
        const { itemId } = params.row
        return <>{getItemObject(itemId)?.itemType?.name || ''}</>
      },
    },
    {
      field: 'warehouseName',
      headerName: t('productionOrder.item.warehouseName'),
      width: 180,

      renderCell: (params) => {
        const { warehouseName } = params?.row
        const warehouse = warehouseList?.find(
          (warehouse) => warehouse?.id === warehouseName,
        )
        return warehouse?.name
      },
    },
    {
      field: 'warehouseType',
      headerName: t('productionOrder.item.warehouseType'),
      width: 180,
      renderCell: (params) => {
        const { warehouseName } = params.row

        return <>{getWarehouseTypeNames(warehouseName) || ''}</>
      },
    },
    {
      field: 'lotNumber',
      headerName: t('productionOrder.item.lotNumber'),
      width: 180,
      renderCell: (params) => {
        return <>{params?.row?.lotNumber}</>
      },
    },
    {
      field: 'mfg',
      headerName: t('productionOrder.item.mfg'),
      width: 180,
      renderCell: (params) => {
        return <>{convertUtcDateToLocalTz(params?.row?.mfg)}</>
      },
    },
    {
      field: 'packageId',
      headerName: t('productionOrder.item.packageCode'),
      width: 180,
      renderCell: (params) => {
        return <>{params?.row?.packageId}</>
      },
    },
    {
      field: 'quantity',
      headerName: t('productionOrder.item.quantity'),
      width: 180,
      renderCell: (params) => {
        const { quantity } = params.row
        return <>{+quantity}</>
      },
    },
    !isDisplay && {
      field: 'actualQuantity',
      headerName: t('productionOrder.item.actualQuantity'),
      width: 180,
      renderCell: (params) => {
        const { actualQuantity } = params.row
        return <>{+actualQuantity}</>
      },
    },
    {
      field: 'unitType',
      headerName: t('productionOrder.item.unitType'),
      width: 180,

      renderCell: (params) => {
        const { itemId } = params.row
        return <>{getItemObject(itemId)?.itemUnit?.name || ''}</>
      },
    },
    {
      field: 'qcCheck',
      headerName: t('productionOrder.item.qcCheck'),
      width: 180,
      renderCell: (params) => {
        const { qcCheck } = params.row
        return <Checkbox checked={Boolean(qcCheck)} />
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('productionOrder.item.qcCriteria'),
      width: 180,
      renderCell: (params) => {
        const { qcCriteria } = params.row
        return qcCriteria
      },
    },
  ]
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">
          {t('productionOrder.itemsDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTableDetail
