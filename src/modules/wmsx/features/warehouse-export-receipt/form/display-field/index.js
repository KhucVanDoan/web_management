import React from 'react'

import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  ACTIVE_STATUS,
  DATA_TYPE,
  ORDER_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
} from '~/modules/wmsx/constants'
import { searchConstructionItemsApi } from '~/modules/wmsx/redux/sagas/construction-items-management/search-construction-items'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { searchExpenditureOrgApi } from '~/modules/wmsx/redux/sagas/define-expenditure-org/search-expenditure-org'
import { searchExpenditureTypeApi } from '~/modules/wmsx/redux/sagas/define-expenditure-type/search-expenditure-type'
import { searchVendorsApi } from '~/modules/wmsx/redux/sagas/define-vendor/search-vendors'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { searchReceiptApi } from '~/modules/wmsx/redux/sagas/receipt-management/search-receipt'
import { getWarehouseExportProposalDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { searchWarehouseExportProposalApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/search'
import { searchWarehouseExportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/search'
import { getWarehouseImportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { searchWarehouseImportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/search'
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
  setItemWarehouseExport,
  setFieldValue,
  setWarehouseList,
  setItemWarehouseExportProposal,
) => {
  const constructions = type?.find(
    (item) => item?.tableName === 'constructions',
  )?.id
  const categoryConstructions = type?.find(
    (item) => item?.tableName === 'category_constructions',
  )?.id
  const handleChangeProposals = async (val) => {
    setItemWarehouseExportProposal([])
    if (isEmpty(val)) {
      setItemWarehouseExportProposal([])
      setFieldValue('items', DEFAULT_ITEMS)
    }
    setFieldValue('warehouseId', '')
    if (!isEmpty(val)) {
      const warehouseList = []

      const warehouseExportProposalDetail =
        await getWarehouseExportProposalDetailsApi(val?.id)
      warehouseExportProposalDetail?.data?.items?.forEach((item) => {
        item?.childrens?.forEach((children) => {
          const findWarehouse = warehouseList?.find(
            (w) => w?.id === children?.warehouseExport?.id,
          )
          if (isEmpty(findWarehouse)) {
            warehouseList.push({
              ...children?.warehouseExport,
            })
          }
        })
      })
      setWarehouseList(warehouseList)
      const items = []
      warehouseExportProposalDetail?.data?.items?.forEach((item) => {
        item?.childrens?.forEach((chil) => {
          const findItem = items?.find(
            (w) =>
              w?.itemId === chil?.itemId &&
              w?.warehouseExport?.id === chil?.warehouseExport?.id,
          )
          if (isEmpty(findItem)) {
            items.push({
              item: {
                itemId: chil?.itemId,
                code: chil?.itemResponse?.code || chil?.itemCode,
                name: chil?.itemResponse?.name || chil?.itemName,
                itemUnit: chil?.itemResponse?.itemUnit?.name,
                exportedQuantity: chil?.exportedQuantity,
                requestedQuantity: chil?.exportedQuantity,
              },
              itemUnit: chil?.itemResponse?.itemUnit,
              itemId: chil?.itemId,
              code: chil?.itemResponse?.code || chil?.itemCode,
              name: chil?.itemResponse?.name || chil?.itemName,
              warehouseExport: chil?.warehouseExport,
              requestedQuantity: chil?.exportedQuantity,
              lotNumber: chil?.lotNumber,
            })
          }
        })
      })
      setItemWarehouseExportProposal(items)
      // if (!isEmpty(values?.warehouseId)) {
      //   setFieldValue('items', DEFAULT_ITEMS)
      //   const params = {
      //     id: val?.id,
      //     warehouseId: values?.warehouseId?.id,
      //   }
      //   const res = await getWarehouseExportProposalItems(params)
      //   setItemWarehouseExport(res?.data)
      // }
    }
  }
  const handleChangeWarehouseImportReciept = async (val) => {
    setFieldValue('items', DEFAULT_ITEMS)
    if (val) {
      const res = await getWarehouseImportReceiptDetailsApi(val?.id)
      setItemWarehouseExport(res?.data?.purchasedOrderImportDetails)
      setFieldValue('warehouseId', res?.data?.warehouse)
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
                  if (!val) return t('general:form.required')
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
                  if (!val) return t('general:form.required')
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
                  if (!val) return t('general:form.required')
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
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  onChange={() => setFieldValue(`${categoryConstructions}`, '')}
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
                        status: ACTIVE_STATUS.ACTIVE,
                        constructionId: values[constructions]?.id,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values[constructions]}
                  disabled={!values[constructions]}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  required={Boolean(item?.required)}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.departmentSetting?.name}
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
                        status: ACTIVE_STATUS.ACTIVE,
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
                        status: ACTIVE_STATUS.ACTIVE,
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
                        status: ACTIVE_STATUS.ACTIVE,
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
                        status: ACTIVE_STATUS.ACTIVE,
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
                        status: ACTIVE_STATUS.ACTIVE,
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
          case 'purchased_order_imports':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={item.id}
                  label={t(`warehouseExportReceipt.warehouseImportReceipt`)}
                  asyncRequest={(s) => {
                    return searchWarehouseImportReceiptApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: [
                          ORDER_STATUS.COMPLETED,
                          ORDER_STATUS.RECEIVED,
                          ORDER_STATUS.IN_PROGRESS,
                        ],
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
                  onChange={(val) => handleChangeWarehouseImportReciept(val)}
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
