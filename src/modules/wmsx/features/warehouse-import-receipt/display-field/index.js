import React from 'react'

import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  ACTIVE_STATUS,
  DATA_TYPE,
  ORDER_STATUS,
  TABLE_NAME_ENUM,
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
import { getWarehouseExportProposalDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { searchWarehouseExportProposalApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/search'
import { getWarehouseExportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/get-details'
import { searchWarehouseExportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/search'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

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
  const categoryConstructions = type?.find(
    (item) => item?.tableName === 'category_constructions',
  )?.id
  const handleChangeReceipt = (val) => {
    setItemReceipt([])
    setFieldValue('receiptDate', '')
    if (isEmpty(val)) {
      setItemReceipt([])
      setFieldValue('contractNumber', '')
    }
    setFieldValue('items', DEFAULT_ITEMS)
    if (!isEmpty(val)) {
      actions.getReceiptDetailsById(val?.id, (data) => {
        setItemReceipt(data?.items)
        setFieldValue('warehouse', data?.warehouse)

        setFieldValue('contractNumber', val?.contractNumber)
      })
    }
  }
  const handleChangeProposals = async (val) => {
    setItemWarehouseExportProposal([])
    if (isEmpty(val)) {
      setItemWarehouseExportProposal([])
      const warehouseExportProposal = val?.code
      const warehouseExportReceipt =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) => item?.tableName === TABLE_NAME_ENUM.SALE_ORDER_EXPORT,
          )?.id
        ]?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseImputDate')} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? `  ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explaination', explaination)
    }
    if (val) {
      const res = await getWarehouseExportProposalDetailsApi(val?.id)
      const items = []
      res?.data?.items?.forEach((item) => {
        item?.childrens?.forEach((chil) => {
          items.push({
            itemCode: {
              itemId: chil?.itemId,
              code: chil?.itemCode || chil?.itemResponse?.code,
              name: chil?.itemName || chil?.itemResponse?.name,
              itemUnit: chil?.itemResponse?.itemUnit,
              exportedQuantity: chil?.exportedQuantity,
              requestedQuantity: chil?.exportedQuantity,
            },
            requestedQuantity: chil?.exportedQuantity,
            lotNumber: chil?.lotNumber,
          })
        })
      })
      setItemWarehouseExportProposal(items)
      const warehouseExportProposal = val?.code
      const warehouseExportReceipt =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) => item?.tableName === TABLE_NAME_ENUM.SALE_ORDER_EXPORT,
          )?.id
        ]?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseImputDate')} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? `  ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explaination', explaination)
    }
  }
  const handleChangeWarehouseExportReceipt = async (val) => {
    const warehouseExportProposal =
      values[
        values?.businessTypeId?.bussinessTypeAttributes?.find(
          (item) =>
            item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
        )?.id
      ]?.code
    const warehouseExportReceipt = val?.code
    const receiptDate = convertUtcDateToLocalTz(
      values?.receiptDate.toISOString(),
    )
    const explaination = `${
      receiptDate
        ? `${t('warehouseImportReceipt.warehouseImputDate')} [${receiptDate}]`
        : ''
    }${
      warehouseExportProposal
        ? ` ${t(
            'warehouseImportReceipt.receiptBy',
          )} [${warehouseExportProposal}]`
        : ''
    }${
      warehouseExportReceipt
        ? ` ${t(
            'warehouseImportReceipt.receiptBy',
          )} [${warehouseExportReceipt}]`
        : ''
    }`
    setFieldValue('explaination', explaination)
    setItemWarehouseExportReceipt([])
    if (isEmpty(val)) {
      const warehouseExportProposal =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) =>
              item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
          )?.id
        ]?.code
      const warehouseExportReceipt = val?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseImputDate')} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? ` ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? ` ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explaination', explaination)
      setItemWarehouseExportReceipt([])
    }
    if (!isEmpty(val)) {
      const res = await getWarehouseExportReceiptDetailsApi(val?.id)
      setItemWarehouseExportReceipt(res?.data?.saleOrderExportDetails)
      const warehouseExportProposal =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) =>
              item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
          )?.id
        ]?.code
      const warehouseExportReceipt = val?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseImputDate')} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? ` ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? ` ${t(
              'warehouseImportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explaination', explaination)
    }
  }
  const validate = (val, item) => {
    if (item?.required) {
      if (isEmpty(val)) return t('general:form.required')
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
              validate={(val) => validate(val, item)}
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
              validate={(val) => validate(val, item)}
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
              validate={(val) => validate(val, item)}
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
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  onChange={() => setFieldValue(`${categoryConstructions}`, '')}
                  validate={(val) => validate(val, item)}
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
                  validate={(val) => validate(val, item)}
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
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.departmentSetting?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => validate(val, item)}
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
                        status: ACTIVE_STATUS.INACTIVE,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.receiptNumber}
                  getOptionSubLabel={(opt) =>
                    `${opt?.receiptNumber} - ${opt?.contractNumber} - ${opt?.code}`
                  }
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => validate(val, item)}
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
                        status: ORDER_STATUS.COMPLETED,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => validate(val, item)}
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
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => validate(val, item)}
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
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => validate(val, item)}
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
                  validate={(val) => validate(val, item)}
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
                  validate={(val) => validate(val, item)}
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
