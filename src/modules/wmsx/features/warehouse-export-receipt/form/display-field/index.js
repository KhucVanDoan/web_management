import React from 'react'

import { Grid, Typography } from '@mui/material'
import { isEmpty } from 'lodash'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import {
  ACTIVE_STATUS,
  CODE_BUSSINESS_TYPE,
  DATA_TYPE,
  ORDER_STATUS,
  TABLE_NAME_ENUM,
  WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
  WAREHOUSE_EXPORT_RECEIPT_STATUS,
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
  setItemWarehouseExport,
  setFieldValue,
  setWarehouseList,
  setItemWarehouseExportProposal,
  setWarehouseExportProposalId,
  warehouseExportReceiptDetails,
  attributesBusinessTypeDetails,
  isEdit,
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
      setWarehouseExportProposalId('')
      const warehouseExportProposal = val?.code
      const warehouseExportReceipt =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) => item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
          )?.id
        ]?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t(
              'warehouseExportReceipt.warehouseExportDate',
            )} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explanation', explaination)
    }
    setFieldValue('warehouseId', null)
    if (!isEmpty(val)) {
      setWarehouseExportProposalId(val?.id)
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
                requestedQuantity: chil?.requestedQuantity,
              },
              itemUnit: chil?.itemResponse?.itemUnit,
              itemId: chil?.itemId,
              code: chil?.itemResponse?.code || chil?.itemCode,
              name: chil?.itemResponse?.name || chil?.itemName,
              warehouseExport: chil?.warehouseExport,
              requestedQuantity: chil?.requestedQuantity,
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
      const warehouseExportProposal = val?.code
      const warehouseExportReceipt =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) => item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
          )?.id
        ]?.code
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t(
              'warehouseExportReceipt.warehouseExportDate',
            )} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        warehouseExportReceipt
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportReceipt}]`
          : ''
      }`
      setFieldValue('explanation', explaination)
    }
  }
  const handleChangeWarehouseImportReciept = async (val) => {
    setFieldValue('items', DEFAULT_ITEMS)
    if (isEmpty(val)) {
      const warehouseExportProposal =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) =>
              item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
          )?.id
        ]?.code

      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t(
              'warehouseExportReceipt.warehouseExportDate',
            )} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        val?.code
          ? `  ${t('warehouseExportReceipt.receiptBy')} [${val?.code}]`
          : ''
      }`
      setFieldValue('explanation', explaination)
    }
    if (val) {
      const res = await getWarehouseImportReceiptDetailsApi(val?.id)
      setItemWarehouseExport(res?.data?.purchasedOrderImportDetails)
      setFieldValue('warehouseId', res?.data?.warehouse)
      const warehouseExportProposal =
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) =>
              item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
          )?.id
        ]?.code

      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t(
              'warehouseExportReceipt.warehouseExportDate',
            )} [${receiptDate}]`
          : ''
      }${
        warehouseExportProposal
          ? `  ${t(
              'warehouseExportReceipt.receiptBy',
            )} [${warehouseExportProposal}]`
          : ''
      }${
        val?.code
          ? `  ${t('warehouseExportReceipt.receiptBy')} [${val?.code}]`
          : ''
      }`
      setFieldValue('explanation', explaination)
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
              isEdit &&
                warehouseExportReceiptDetails?.businessType?.code !==
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={
                      <Typography>
                        {t('warehouseImportReceipt.project')}
                      </Typography>
                    }
                    value={`${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.CONSTRUCTION,
                          )?.value,
                      )?.code
                    } - ${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.CONSTRUCTION,
                          )?.value,
                      )?.name
                    }`}
                  />
                </Grid>
              ) : isEdit &&
                warehouseExportReceiptDetails?.businessType?.code ===
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
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
                    onChange={() =>
                      setFieldValue(`${categoryConstructions}`, null)
                    }
                    asyncRequestDeps={values?.businessTypeId}
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    required={Boolean(item?.required)}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ) : (
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
                    onChange={() =>
                      setFieldValue(`${categoryConstructions}`, null)
                    }
                    asyncRequestDeps={values?.businessTypeId}
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    required={Boolean(item?.required)}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ),
            )
          case 'category_constructions':
            return display.push(
              isEdit &&
                warehouseExportReceiptDetails?.businessType?.code !==
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={
                      <Typography>
                        {t('warehouseImportReceipt.task')}
                      </Typography>
                    }
                    value={`${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName ===
                              TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
                          )?.value,
                      )?.code
                    } - ${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName ===
                              TABLE_NAME_ENUM.CATEGORY_CONSTRUCTION,
                          )?.value,
                      )?.name
                    }`}
                  />
                </Grid>
              ) : isEdit &&
                warehouseExportReceiptDetails?.businessType?.code ===
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
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
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    required={Boolean(item?.required)}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ) : (
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
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    required={Boolean(item?.required)}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ),
            )
          case 'warehouse_export_proposals':
            return display.push(
              isEdit ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={
                      <Typography>
                        {t('warehouseImportReceipt.suggestExport')}
                      </Typography>
                    }
                    value={
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName ===
                              TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
                          )?.value,
                      )?.code
                    }
                  />
                </Grid>
              ) : (
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
                          exportStatus: [
                            WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS.UN_EXPORTED,
                            WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS.IN_PROGRESS,
                          ],
                        }),
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    asyncRequestDeps={values?.businessTypeId}
                    getOptionLabel={(opt) => opt?.code}
                    getOptionSubLabel={(opt) => opt?.departmentSetting?.name}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    disabled={
                      warehouseExportReceiptDetails?.status ===
                      WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
                    }
                    required={Boolean(item?.required)}
                    validate={(val) => validate(val, item)}
                    onChange={(val) => handleChangeProposals(val)}
                  />
                </Grid>
              ),
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
                  disabled={
                    warehouseExportReceiptDetails?.status ===
                    WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
                  }
                  required={Boolean(item?.required)}
                  validate={(val) => validate(val, item)}
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
                  validate={(val) => validate(val, item)}
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
                  validate={(val) => validate(val, item)}
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
                  getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => validate(val, item)}
                />
              </Grid>,
            )
          case 'cost_types':
            return display.push(
              isEdit &&
                warehouseExportReceiptDetails?.businessType?.code !==
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={<Typography>{item?.fieldName}</Typography>}
                    value={`${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.COST_TYPE,
                          )?.value,
                      )?.code
                    } - ${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.COST_TYPE,
                          )?.value,
                      )?.name
                    }`}
                  />
                </Grid>
              ) : isEdit &&
                warehouseExportReceiptDetails?.businessType?.code ===
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
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
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    required={Boolean(item?.required)}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ) : (
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
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    required={Boolean(item?.required)}
                    validate={(val) => validate(val, item)}
                  />
                </Grid>
              ),
            )
          case 'organization_payments':
            return display.push(
              isEdit &&
                warehouseExportReceiptDetails?.businessType?.code !==
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={<Typography>{item?.fieldName}</Typography>}
                    value={`${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.COST_TYPE,
                          )?.value,
                      )?.code
                    } - ${
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName === TABLE_NAME_ENUM.COST_TYPE,
                          )?.value,
                      )?.name
                    }`}
                  />
                </Grid>
              ) : isEdit &&
                warehouseExportReceiptDetails?.businessType?.code ===
                  CODE_BUSSINESS_TYPE.SOEBYCONTRUCTION ? (
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
                </Grid>
              ) : (
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
                </Grid>
              ),
            )
          case 'purchased_order_imports':
            return display.push(
              isEdit ? (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={
                      <Typography>
                        {t('warehouseImportReceipt.warehouseImportReceipt')}
                      </Typography>
                    }
                    value={
                      attributesBusinessTypeDetails[item.tableName]?.find(
                        (itemDetail) =>
                          `${itemDetail.id}` ===
                          warehouseExportReceiptDetails?.attributes?.find(
                            (item) =>
                              item?.tableName ===
                              TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
                          )?.value,
                      )?.code
                    }
                  />
                </Grid>
              ) : (
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
                            // ORDER_STATUS.RECEIVED,
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
                    disabled={
                      warehouseExportReceiptDetails?.status ===
                      WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
                    }
                    validate={(val) => validate(val, item)}
                    onChange={(val) => handleChangeWarehouseImportReciept(val)}
                  />
                </Grid>
              ),
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
