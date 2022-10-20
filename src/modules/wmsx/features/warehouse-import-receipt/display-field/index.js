import React from 'react'

import { Grid } from '@mui/material'
import { isEmpty, isNil } from 'lodash'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  DATA_TYPE,
  ORDER_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
} from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { searchConstructionItemsApi } from '~/modules/wmsx/redux/sagas/construction-items-management/search-construction-items'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { searchExpenditureOrgApi } from '~/modules/wmsx/redux/sagas/define-expenditure-org/search-expenditure-org'
import { searchExpenditureTypeApi } from '~/modules/wmsx/redux/sagas/define-expenditure-type/search-expenditure-type'
import { searchVendorsApi } from '~/modules/wmsx/redux/sagas/define-vendor/search-vendors'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { searchReceiptApi } from '~/modules/wmsx/redux/sagas/receipt-management/search-receipt'
import { searchWarehouseExportProposalApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/search'
import { getWarehouseExportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/get-details'
import { searchWarehouseExportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/search'
import { getWarehouseExportProposalItems } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { convertFilterParams } from '~/utils'

const DEFAULT_ITEMS = [
  {
    id: 1,
    itemCode: '',
    itemName: '',
    unit: '',
    lotNumber: '',
    money: '',
    importQuantity: '',
    price: '',
    debitAcc: '',
    creditAcc: '',
  },
]
const displayFollowBusinessTypeManagement = (
  type,
  t,
  values,
  setItemWarehouseExportReceipt,
  setItemWarehouseExportProposal,
  setItemReceipt,
  setFieldValue,
) => {
  const { actions } = useReceiptManagement()
  const constructions = type?.find(
    (item) => item?.tableName === 'constructions',
  )?.id
  const handleChangeReceipt = (val) => {
    setItemReceipt([])
    setFieldValue('items', DEFAULT_ITEMS)
    if (val) {
      actions.getReceiptDetailsById(val?.id, (data) => {
        setFieldValue('warehouse', data?.warehouse)
        setItemReceipt(data?.items)
      })
    }
  }

  const handleChangeProposals = async (val) => {
    setItemWarehouseExportProposal([])
    if (val) {
      if (!isEmpty(values?.warehouse)) {
        setFieldValue('items', DEFAULT_ITEMS)
        const params = {
          id: val?.id,
          warehouseId: values?.warehouse?.id,
        }
        const res = await getWarehouseExportProposalItems(params)
        setItemWarehouseExportProposal(res?.data)
      }
    }
  }
  const handleChangeWarehouseExportReceipt = async (val) => {
    setItemWarehouseExportReceipt([])
    if (val) {
      const res = await getWarehouseExportReceiptDetailsApi(val?.id)
      setItemWarehouseExportReceipt(res?.data?.saleOrderExportDetails)
    }
  }
  const display = []
  type?.forEach((item) => {
    switch (item?.type) {
      case DATA_TYPE.TEXT:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name={item.id}
              label={item?.fieldName}
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (typeof val === 'string' && val === '')
                    return t('general:form.required')
                  if (typeof val === 'number' && isNil(val))
                    return t('general:form.required')
                  if (typeof val === 'number' && !isNil(val) && +val < 0)
                    return t('general:form.minNumber', { min: 0 })
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.NUMBER:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name={item.id}
              label={item?.fieldName}
              type="number"
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (typeof val === 'string' && val === '')
                    return t('general:form.required')
                  if (typeof val === 'number' && isNil(val))
                    return t('general:form.required')
                  if (typeof val === 'number' && !isNil(val) && +val < 0)
                    return t('general:form.minNumber', { min: 0 })
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.DATE:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.DatePicker
              name={item.id}
              label={item?.fieldName}
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (typeof val === 'string' && val === '')
                    return t('general:form.required')
                  if (typeof val === 'number' && isNil(val))
                    return t('general:form.required')
                  if (typeof val === 'number' && !isNil(val) && +val < 0)
                    return t('general:form.minNumber', { min: 0 })
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.LIST:
        switch (item?.tableName) {
          case 'constructions':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t('warehouseImportReceipt.project')}
                  placeholder={t('warehouseImportReceipt.project')}
                  asyncRequest={(s) =>
                    searchConstructionsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'category_constructions':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t('warehouseImportReceipt.task')}
                  placeholder={t('warehouseImportReceipt.task')}
                  asyncRequest={(s) =>
                    searchConstructionItemsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                        constructionId: values[constructions]?.id,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={[
                    values?.businessTypeId,
                    values[constructions],
                  ]}
                  disabled={!values[constructions]}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                />
              </Grid>,
            )
          case 'warehouse_export_proposals':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t('warehouseImportReceipt.suggestExport')}
                  placeholder={t('warehouseImportReceipt.suggestExport')}
                  asyncRequest={(s) =>
                    searchWarehouseExportProposalApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  getOptionLabel={(opt) => opt?.greetingTitle}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionSubLabel={(opt) => opt?.receiptNumber}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  onChange={(val) => handleChangeProposals(val)}
                />
              </Grid>,
            )
          case 'receipts':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t('warehouseImportReceipt.receiptNo')}
                  placeholder={t('warehouseImportReceipt.receiptNo')}
                  asyncRequest={(s) => {
                    return searchReceiptApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  onChange={(val) => handleChangeReceipt(val)}
                />
              </Grid>,
            )
          case 'sale_order_exports':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t('warehouseImportReceipt.warehouseExportReceipt')}
                  placeholder={t(
                    'warehouseImportReceipt.warehouseExportReceipt',
                  )}
                  asyncRequest={(s) => {
                    return searchWarehouseExportReceiptApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: ORDER_STATUS.CONFIRMED,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  onChange={(val) => handleChangeWarehouseExportReceipt(val)}
                />
              </Grid>,
            )
          case 'department_receipts':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchReceiptDepartmentApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'vendors':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchVendorsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'cost_types':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchExpenditureTypeApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                />
              </Grid>,
            )
          case 'organization_payments':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchExpenditureOrgApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                />
              </Grid>,
            )
          default:
            break
        }
        break
      default:
        break
    }
  })

  return display
}
export default displayFollowBusinessTypeManagement
