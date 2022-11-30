import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS, INVENTORY_ADJUST_TYPE } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { searchLocationsApi } from '~/modules/wmsx/redux/sagas/location-management/search-locations'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { getListItemWarehouseStockApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-list-item'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers, values, type }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemWarehouseStockList },
  } = useWarehouseTransfer()
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
              hide={!values?.type}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
              asyncRequestDeps={values?.warehouse}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
          const locationList = params?.row?.itemCode?.locations?.map(
            (item) => ({
              code: item?.locator?.code || item?.code,
              name: item?.locator?.name || item?.name,
              quantityExported: item?.quantity,
              locatorId: item?.locator?.locatorId || item?.locatorId,
            }),
          )
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
              getOptionLabel={(opt) => opt.code}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('inventoryAdjust.items.quantity'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantity
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              type="number"
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
        hide:
          type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ||
          values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantityExported
          ) : (
            <Field.TextField
              name={
                !isEmpty(params?.row?.lotNumber)
                  ? `items[${index}].lotNumber.quantityExported`
                  : `items[${index}].locator.quantityExported`
              }
              placeholder={t('inventoryAdjust.items.quantityExported')}
              disabled
            />
          )
        },
      },
      {
        field: 'amount',
        headerName: t('inventoryAdjust.items.totalMoney'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.totalMoney
          ) : values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT ? (
            <Field.TextField
              name={`items[${index}].amount`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
            />
          ) : (
            <Field.TextField
              name={`items[${index}].amount`}
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
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.price
          ) : (
            <Field.TextField name={`items[${index}].price`} disabled required />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('inventoryAdjust.items.debitAccount'),
        width: 150,
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
        field: 'creditAccount',
        headerName: t('inventoryAdjust.items.creditAccount'),
        width: 150,
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
    [items, values?.warehouse, itemWarehouseStockList, values?.type],
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
                itemCode: '',
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
