import React, { useEffect } from 'react'

import { Button, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useDefineItem from '~/modules/database/redux/hooks/useDefineItem'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { convertUtcDateToLocalTz } from '~/utils'
const LockItemTable = (props) => {
  const { mode, arrayHelpers, lockItems, values, setFieldValue } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemList },
    actions: defineItemActions,
  } = useDefineItem()
  const {
    data: { itemWarehouseStockList, lotNumberList },
    actions: warehouseTransferAction,
  } = useWarehouseTransfer()
  const {
    data: { packageList },
    actions: DefinePackageAction,
  } = useDefinePackage()
  const {
    data: { warehouseList },
    actions: defineWarehouseAction,
  } = useDefineWarehouse()
  useEffect(() => {
    warehouseTransferAction.getListItemWarehouseStock({ isGetAll: 1 })
    defineItemActions.searchItems({ isGetAll: 1 })
    DefinePackageAction.searchPackages({ isGetAll: 1, withItem: 1 })
    defineWarehouseAction.searchWarehouses({ isGetAll: 1 })
  }, [])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }
  const getWarehouseObject = (id) => {
    return warehouseList?.find((item) => item?.id === id)
  }
  const getPackageObject = (id) => {
    return packageList?.find((pk) => pk?.id === id)
  }
  const handleChangeItem = (val, values, index) => {
    setFieldValue(`lockItems[${index}].warehouseId`, '')
    setFieldValue(`lockItems[${index}].lotNumber`, '')
    let itemIds = lockItems.map((item) => item.itemId).join(',')
    let lastCharItem = itemIds.slice(-1)
    if (lastCharItem === ',') {
      itemIds = itemIds.slice(0, -1)
    }
    let warehouseIds = lockItems.map((item) => item.warehouseId).join(',')
    let lastCharWarehouse = warehouseIds.slice(-1)
    if (lastCharWarehouse === ',') {
      warehouseIds = warehouseIds.slice(0, -1)
    }
    warehouseTransferAction.getLotNumberListWarehouseTransfer({
      itemIds: itemIds,
      warehouseIds: warehouseIds || null,
    })
  }
  const handleChangeWarehouse = (val, values, index) => {
    setFieldValue(`lockItems[${index}].lotNumber`, '')
    let itemIds = lockItems.map((item) => item.itemId).join(',')
    let lastCharItem = itemIds.slice(-1)
    if (lastCharItem === ',') {
      itemIds = itemIds.slice(0, -1)
    }
    let warehouseIds = lockItems.map((item) => item.warehouseId).join(',')
    let lastCharWarehouse = warehouseIds.slice(-1)
    if (lastCharWarehouse === ',') {
      warehouseIds = warehouseIds.slice(0, -1)
    }
    warehouseTransferAction.getLotNumberListWarehouseTransfer({
      itemIds: itemIds,
      warehouseIds: warehouseIds || null,
    })
  }
  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemId',
        headerName: t('blockItemLocation.itemName'),
        width: 150,
        renderCell: (params, index) => {
          const { itemId, warehouseId } = params?.row
          const itemStockIds = itemWarehouseStockList?.map((is) => is.id)
          const itemListFilter = itemList?.filter((item) =>
            itemStockIds?.includes(item?.id),
          )
          return isView ? (
            <>{getItemObject(itemId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`lockItems[${index}].itemId`}
              options={itemListFilter}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
              onChange={(val) =>
                handleChangeItem(val, values, index, warehouseId)
              }
            />
          )
        },
      },
      {
        field: 'itemCode',
        headerName: t('blockItemLocation.itemCode'),
        width: 200,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.TextField
              name={`lockItems[${index}].itemCode`}
              value={getItemObject(itemId)?.code || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'warehouseId',
        headerName: t('blockItemLocation.warehouseName'),
        width: 200,
        renderCell: (params, index) => {
          const { warehouseId, itemId } = params?.row
          const itemIds = lockItems?.map((item) => item?.itemId)
          const warehouseListId = itemWarehouseStockList
            ?.filter((itemWarehouseStock) =>
              itemIds?.includes(itemWarehouseStock?.id),
            )
            ?.map((iw) => iw?.warehouse?.id)
          return isView ? (
            <>{getWarehouseObject(warehouseId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`lockItems[${index}].warehouseId`}
              options={warehouseList?.filter((warehouse) =>
                warehouseListId?.includes(warehouse?.id),
              )}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
              onChange={(val) =>
                handleChangeWarehouse(val, values, index, itemId)
              }
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('blockItemLocation.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const { lotNumber, itemId } = params?.row
          const lotNumberOption = lotNumberList?.find(
            (item) => item.itemId === itemId,
          )?.lotNumbers
          return isView ? (
            <>{lotNumber}</>
          ) : (
            <Field.Autocomplete
              name={`lockItems[${index}].lotNumber`}
              options={lotNumberOption}
              disabled={isView}
              getOptionLabel={(opt) => opt?.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              onChange={(val) => {
                const data = lotNumberList
                  .find((i) => i.itemId === itemId)
                  ?.lotNumbers?.find((j) => j.lotNumber === val)?.mfg

                setFieldValue(`lockItems[${index}].mfg`, data)
              }}
            />
          )
        },
      },
      {
        field: 'mfg',
        headerName: t('blockItemLocation.item.mfg'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{convertUtcDateToLocalTz(params?.row?.mfg)}</>
          ) : (
            <Field.TextField name={`lockItems[${index}].mfg`} disabled={true} />
          )
        },
      },
      {
        field: 'packageId',
        headerName: t('blockItemLocation.packageCode'),
        width: 180,
        renderCell: (params, index) => {
          const { packageId, itemId } = params?.row
          return isView ? (
            <>{getPackageObject(packageId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`lockItems[${index}].packageId`}
              options={getItemObject(itemId)?.packages}
              getOptionLabel={(opt) => opt?.code}
              getOptionValue={(option) => option?.code || null}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('blockItemLocation.item.quantity'),
        width: 100,
        renderCell: (params, index) => {
          const { quantity } = params?.row
          return isView ? (
            <>{quantity}</>
          ) : (
            <Field.TextField
              name={`lockItems[${index}].quantity`}
              type="number"
              disabled={isView}
              numberProps={{
                decimalScale: 3,
              }}
            />
          )
        },
      },
      {
        field: 'unitType',
        headerName: t('blockItemLocation.item.unitType'),
        width: 100,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{getItemObject(itemId)?.itemUnit?.name || ''}</>
          ) : (
            <Field.TextField
              name={`lockItems[${index}].unitType`}
              value={getItemObject(itemId)?.itemUnit?.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        hide: isView,
        renderCell: (params, idx) => {
          return isView ? null : (
            <IconButton
              onClick={() => arrayHelpers.remove(idx)}
              disabled={lockItems?.length === 1}
              size="large"
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
  }
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
          {t('blockItemLocation.itemsDetails')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: null,
                  warehouseId: null,
                  quantity: 1,
                  lotNumber: '',
                  packageId: null,
                  mfg: '',
                })
              }}
            >
              {t('warehouseTransfer.item.addItem')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        rows={lockItems}
        columns={getColumns()}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default LockItemTable
