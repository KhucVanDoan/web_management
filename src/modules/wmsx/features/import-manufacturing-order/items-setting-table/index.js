import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { TRANSACTION_TYPE_ENUM } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useImportManufacturingOrder from '~/modules/wmsx/redux/hooks/useImportManufacturingOrder'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'
import { convertUtcDateToLocalTz, scrollToBottom } from '~/utils'

const ItemSettingTable = ({
  items,
  mode,
  arrayHelpers,
  initialLotNumber,
  itemsFilter,
  type,
  setFieldValue,
}) => {
  const {
    data: { itemList, warehouseList },
    actions,
  } = useCommonManagement()

  const {
    data: { warehouseType },
    actions: inventoryActions,
  } = useInventory()

  const {
    data: { lotNumberList },
  } = useImportManufacturingOrder()

  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  useEffect(() => {
    actions.getItems({})
    actions.getWarehouses({})
    inventoryActions.getWarehouseType()
  }, [])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const getWarehouseObject = (id) => {
    return warehouseList?.find((item) => item?.id === id)
  }

  const getWarehouseTypeNames = (warehouseId) => {
    const warehouse = warehouseList?.find((item) => item?.id === warehouseId)

    return warehouse?.warehouseTypes?.length > 0
      ? warehouse?.warehouseTypes
          ?.map(
            (warehouse) =>
              warehouseType?.find((item) => item?.id === warehouse?.id)?.name,
          )
          ?.join(', ')
      : ''
  }

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('importManufacturingOrder.item.orderNumber'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemName',
        headerName: t('importManufacturingOrder.item.name'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          const itemListFilter =
            itemsFilter?.length > 0
              ? itemList.filter((item) =>
                  itemsFilter.find(
                    (itemFilter) => itemFilter.code === item.code,
                  ),
                )
              : itemList
          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(itemId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={itemListFilter}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name || ''}
              getOptionValue={(opt) => opt?.id}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id)
              }
            />
          )
        },
      },
      {
        field: 'code',
        headerName: t('importManufacturingOrder.item.code'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].code`}
              value={getItemObject(itemId)?.code || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'itemType',
        headerName: t('importManufacturingOrder.item.type'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.itemType?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemType`}
              value={getItemObject(itemId)?.itemType?.name || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'warehouseName',
        headerName: t('importManufacturingOrder.item.warehouseName'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId, warehouseId, lotNumber } = params.row
          return isView ? (
            <>{getWarehouseObject(warehouseId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseId`}
              options={warehouseList}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name || ''}
              getOptionValue={(opt) => opt?.id}
              getOptionDisabled={(opt) =>
                items.find(
                  (item) =>
                    item.itemId === itemId &&
                    item.lotNumber === lotNumber &&
                    item.warehouseId === opt?.id,
                )
              }
            />
          )
        },
      },
      {
        field: 'warehouseType',
        headerName: t('importManufacturingOrder.item.warehouseType'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const warehouseId = params.row?.warehouseId
          return isView ? (
            <>{getWarehouseTypeNames(warehouseId) || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].warehouseType`}
              value={getWarehouseTypeNames(warehouseId) || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('importManufacturingOrder.item.lotNumber'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { lotNumber, itemId } = params.row
          return isView ? (
            <>{lotNumber}</>
          ) : type === 0 ? (
            <Field.TextField
              name={`items[${index}].lotNumber`}
              value={initialLotNumber || ''}
            />
          ) : type === TRANSACTION_TYPE_ENUM.EXPORT ? (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={
                lotNumberList.find((item) => item.itemId === itemId)
                  ?.lotNumbers || []
              }
              disabled={isView}
              getOptionLabel={(opt) => opt?.lotNumber || ''}
              getOptionValue={(opt) => opt?.lotNumber}
              onChange={(val) => {
                let mfgValue = ''
                if (
                  lotNumberList.find((item) => item.itemId === itemId) ||
                  items.find(
                    (item) => item.itemId === itemId && item.lotNumber === val,
                  )
                ) {
                  mfgValue =
                    lotNumberList
                      .find((item) => item.itemId === itemId)
                      ?.lotNumbers.find((lot) => lot.lotNumber === val)?.mfg ||
                    items.find(
                      (item) =>
                        item.itemId === itemId && item.lotNumber === val,
                    )?.mfg
                }
                setFieldValue(`items[${index}].lotNumber`, mfgValue)
                setFieldValue(`items[${index}].mfg`, mfgValue)
              }}
            />
          ) : (
            ''
          )
        },
      },
      {
        field: 'mfg',
        headerName: t('importManufacturingOrder.item.mfg'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { lotNumber, itemId, mfg } = params.row
          const isFilled =
            (lotNumberList
              ?.find((item) => item.itemId === itemId)
              ?.lotNumbers?.find((lot) => lot.lotNumber === lotNumber)?.mfg ===
              mfg ||
              items?.filter(
                (item) =>
                  item.itemId === itemId && item.lotNumber === lotNumber,
              ).length > 1) &&
            mfg
          return isView || isFilled ? (
            <>{convertUtcDateToLocalTz(mfg)}</>
          ) : type === 0 ? (
            <Field.DatePicker
              name={`items[${index}].mfg`}
              placeholder={t('importManufacturingOrder.item.mfg')}
            />
          ) : (
            <>{convertUtcDateToLocalTz(mfg)}</>
          )
        },
      },
      {
        field: 'packageId',
        headerName: t('importManufacturingOrder.item.packageCode'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId } = params.row
          return isView ? (
            <>
              {getItemObject(itemId)?.packages?.find((pk) => pk.id === params)
                ?.code || ''}
            </>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].packageId`}
              options={getItemObject(itemId)?.packages || []}
              disabled={isView}
              getOptionLabel={(opt) => opt?.code || ''}
              getOptionValue={(opt) => opt?.id}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('importManufacturingOrder.item.quantity'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { quantity } = params.row
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              disabled={isView}
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />
          )
        },
      },
      // {
      //   field: 'remainQuantity',
      //   headerName: t('importManufacturingOrder.item.remainQuantity'),
      //   width: 200,
      //   align: 'center',
      //   renderCell: (params) => {
      //     const { quantity, actualQuantity } = params?.row
      //     let remainQuantity = null
      //     if (+quantity - actualQuantity)
      //       remainQuantity = +quantity - actualQuantity
      //     return +remainQuantity
      //   },
      // },
      // {
      //   field: 'actualQuantity',
      //   headerName: t('importManufacturingOrder.item.actualQuantity'),
      //   width: 200,
      //   align: 'center',
      //   renderCell: (params) => {
      //     const { actualQuantity } = params?.row
      //     return +actualQuantity
      //   },
      // },
      {
        field: 'unitType',
        headerName: t('importManufacturingOrder.item.unitType'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.itemUnit?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].unitType`}
              value={getItemObject(itemId)?.itemUnit?.name || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'qcCheck',
        headerName: t('soExport.item.qcCheck'),
        width: 200,
        align: 'center',
        // renderCell: (params, index) => {
        //   const itemId = params.row?.itemId
        //   return <Field.Checkbox name={`items[${index}].qcCheck`} />
        // },
      },
      {
        field: 'qcCriteriaId',
        headerName: t('soExport.item.qcCriteria'),
        width: 200,
        align: 'center',
        renderCell: (params) => {
          const { qcCheck, itemId } = params?.row
          const item = items.find((e) => e.itemId === itemId)
          return qcCheck && item !== undefined ? item?.qcCriteria : ''
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: isView,
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              type="button"
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [itemList, items],
  )

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
        <Typography variant="h4" component="span">
          {t('importManufacturingOrder.itemsDetails')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: null,
                warehouseId: null,
                lotNumber: initialLotNumber,
                quantity: 1,
                packageId: null,
                qcCheck: false,
                qcCriteriaId: null,
                mfg: null,
              })
              scrollToBottom()
            }}
          >
            {t('importManufacturingOrder.item.addItem')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
  initialLotNumber: '',
  itemsFilter: [],
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
  initialLotNumber: PropTypes.string,
  itemsFilter: PropTypes.array,
  type: PropTypes.number,
  setFieldValue: PropTypes.func,
}

export default ItemSettingTable
