import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { ACTIVE_STATUS, INVENTORY_ADJUST_TYPE } from '~/modules/wmsx/constants'
import { searchLocationsApi } from '~/modules/wmsx/redux/sagas/location-management/search-locations'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'
import { getListItemWarehouseStockApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-list-item'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = ({
  items,
  mode,
  arrayHelpers,
  values,
  setFieldValue,
  debitAccount,
}) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const handleChangeItem = async (val, index) => {
    setFieldValue(`items[${index}].locator`, '')
    setFieldValue(`items[${index}].lotNumber`, '')
    setFieldValue(`items[${index}].quantity`, '')
    setFieldValue(`items[${index}].amount`, '')
    if (values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT) {
      setFieldValue(
        `items[${index}].debitAccount`,
        val?.itemWarehouseSources?.find(
          (item) => item?.warehouseId === values?.warehouse?.id,
        )?.accounting,
      )
    }
    if (values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT) {
      setFieldValue(
        `items[${index}].creditAccount`,
        val?.itemWarehouseSources?.find(
          (item) => item?.warehouseId === values?.warehouse?.id,
        )?.accounting,
      )
      if (!isEmpty(val)) {
        const params = {
          items: [
            {
              itemId: val?.itemId || val?.id,
              warehouseId: values?.warehouse?.id,
              lotNumber: null,
              locatorId: null,
            },
          ],
        }
        const res = await getItemWarehouseStockAvailableApi(params)
        const planExportedQuantity = res?.data?.find(
          (item) => item?.itemId === val?.itemId || val?.id,
        )
        setFieldValue(
          `items[${index}].quantityExported`,
          planExportedQuantity?.quantity,
        )
      }
    }
  }
  const handleChangeLotNumber = async (val, index, payload) => {
    if (val) {
      const params = {
        items: [
          {
            itemId:
              payload?.row?.itemCode?.itemId || payload?.row?.itemCode?.id,
            warehouseId: values?.warehouse?.id,
            lotNumber: val?.lotNumber,
            locatorId: payload?.row?.lotNumber || null,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data?.find(
        (item) =>
          item?.itemId === payload?.row?.itemCode?.itemId ||
          payload?.row?.itemCode?.id,
      )
      setFieldValue(
        `items[${index}].quantityExported`,
        planExportedQuantity?.quantity,
      )
    }
  }
  const handleChangeLocator = async (val, index, payload) => {
    if (val) {
      const params = {
        items: [
          {
            itemId:
              payload?.row?.itemCode?.itemId || payload?.row?.itemCode?.id,
            warehouseId: values?.warehouse?.id,
            lotNumber: payload?.row?.lotNumber || null,
            locatorId: val,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data?.find(
        (item) =>
          item?.itemId === payload?.row?.itemCode?.itemId ||
          payload?.row?.itemCode?.id,
      )
      setFieldValue(
        `items[${index}].quantityExported`,
        planExportedQuantity?.quantity,
      )
    }
  }
  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('inventoryAdjust.items.itemCode'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode?.code
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('inventoryAdjust.items.itemCode')}
              asyncRequest={(s) =>
                searchMaterialsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: ACTIVE_STATUS.ACTIVE,
                  }),
                })
              }
              onChange={(val) => handleChangeItem(val, index)}
              hide={!values?.type}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              disabled={!values?.warehouse}
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('inventoryAdjust.items.itemCode')}
              hide={!values?.type}
              asyncRequest={(s) =>
                getListItemWarehouseStockApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: values?.warehouse?.id,
                  }),
                })
              }
              onChange={(val) => handleChangeItem(val, index)}
              asyncRequestDeps={values?.warehouse}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              disabled={!values?.warehouse}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryAdjust.items.itemName'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemName
          ) : (
            <Field.TextField name={`items[${index}].itemCode.name`} disabled />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('inventoryAdjust.unit'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemUnit
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.itemUnit.name`}
              required
              disabled
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('inventoryAdjust.items.lotNumber'),
        width: 200,
        renderCell: (params, index) => {
          const lotNumberList = flatMap(
            params?.row?.itemCode?.locations,
            'lots',
          )?.map((item) => ({
            ...item,
            quantityExported: item?.quantity,
          }))
          return isView ? (
            params?.row?.lotNumber
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT ? (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumberList}
              disabled={!values?.warehouse?.manageByLot}
              getOptionLabel={(opt) => opt.lotNumber}
              isOptionEqualToValue={(opt, val) =>
                opt?.lotNumber === val?.lotNumber
              }
              onChange={(val) => handleChangeLotNumber(val, index, params)}
              validate={(val) => {
                if (values?.warehouse?.manageByLot) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
            />
          ) : (
            <Field.TextField
              name={`items[${index}].lotNumber`}
              placeholder={t('inventoryAdjust.items.lotNumber')}
              disabled={!values?.warehouse?.manageByLot}
              isOptionEqualToValue={(opt, val) =>
                opt?.lotNumber === val?.lotNumber
              }
              validate={(val) => {
                if (values?.warehouse?.manageByLot) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('inventoryAdjust.items.locator'),
        width: 200,
        renderCell: (params, index) => {
          const locationList = params?.row?.itemCode?.locations?.map((item) => {
            if (isEmpty(item?.locator)) return []
            return {
              code: item?.locator?.code || item?.code,
              name: item?.locator?.name || item?.name,
              quantityExported: item?.planQuantity,
              locatorId: item?.locator?.locatorId || item?.locatorId,
            }
          })
          return isView ? (
            params?.row?.locator?.code
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ? (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              placeholder={t('inventoryAdjust.items.locator')}
              asyncRequest={(s) =>
                searchLocationsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: ACTIVE_STATUS.ACTIVE,
                    warehouseId: values?.warehouse?.id,
                  }),
                })
              }
              asyncRequestDeps={values?.warehouse}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) =>
                opt?.locatorId === val?.locatorId
              }
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={locationList}
              isOptionEqualToValue={(opt, val) =>
                opt?.locatorId === val?.locatorId
              }
              onChange={(val) => handleChangeLocator(val, index, params)}
              getOptionLabel={(opt) => opt.code}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('inventoryAdjust.items.quantity'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText
              value={params?.row?.quantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              formatter="quantity"
              validate={(val) => {
                if (!val && val !== 0) {
                  return t('general:form.required')
                } else if (
                  values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT
                ) {
                  if (
                    +val >
                    (+params?.row?.lotNumber?.quantityExported ||
                      +params?.row?.locator?.quantityExported)
                  ) {
                    return t('general:form.maxQuantityStock', {
                      max:
                        params?.row?.lotNumber?.quantityExported ||
                        params?.row?.locator?.quantityExported,
                    })
                  }
                } else if (val === 0) {
                  return t('general:form.moreThanNumber', {
                    min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                  })
                }
              }}
              required
            />
          )
        },
      },
      {
        field: 'quantityExported',
        headerName: t('inventoryAdjust.items.quantityExported'),
        width: 150,
        hide: values?.type !== INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText
              value={params?.row?.quantityExported}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].quantityExported`}
              placeholder={t('inventoryAdjust.items.quantityExported')}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'amount',
        headerName: t('inventoryAdjust.items.totalMoney'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText value={params?.row?.amount} formatter="price" />
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ? (
            <Field.TextField
              name={`items[${index}].amount`}
              formatter="price"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].amount`}
              formatter="price"
              disabled
              required
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('inventoryAdjust.items.price'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText value={params?.row?.price} formatter="price" />
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ? (
            <Field.TextField
              name={`items[${index}].price`}
              formatter="price"
              value={params?.row?.amount / params?.row?.quantity}
              disabled
              required
            />
          ) : (
            <Field.TextField
              name={`items[${index}].price`}
              formatter="price"
              disabled
              required
            />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('inventoryAdjust.items.debitAccount'),
        width: 150,
        hide: values?.type !== INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.debitAccount
          ) : (
            <Field.TextField
              name={`items[${index}].debitAccount`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('inventoryAdjust.items.debitAccount'),
        width: 150,
        hide: values?.type !== INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.debitAccount
          ) : (
            <Field.TextField
              name={`items[${index}].debitAccount`}
              disabled
              value={debitAccount}
              required
            />
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('inventoryAdjust.items.creditAccount'),
        width: 250,
        hide: values?.type !== INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.creditAccount
          ) : (
            <Field.TextField
              name={`items[${index}].creditAccount`}
              disabled
              value={debitAccount}
              required
            />
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('inventoryAdjust.items.creditAccount'),
        width: 150,
        hide: values?.type !== INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.creditAccount
          ) : (
            <Field.TextField
              name={`items[${index}].creditAccount`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params, idx) => {
          return (
            <IconButton
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
    [items, values?.warehouse, debitAccount],
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
          {t('inventoryAdjust.items.itemList')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemCode: null,
                itemName: '',
                unit: '',
                lotNumber: '',
                quantity: '',
                price: '',
                totalMoney: '',
                debitAccount: '',
                creditAccount: '',
              })
            }}
            disabled={items?.length === 10}
          >
            {t('inventoryAdjust.items.addButton')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={items?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
