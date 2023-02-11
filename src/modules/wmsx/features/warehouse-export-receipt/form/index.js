import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { sub } from 'date-fns'
import { Formik, Form, FieldArray } from 'formik'
import { uniq, map, isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
// import Button from '~/components/Button'
import { Field } from '~/components/Formik'
// import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  CODE_TYPE_DATA_FATHER_JOB,
  ORDER_STATUS_OPTIONS,
  PARENT_BUSINESS_TYPE,
  TABLE_NAME_ENUM,
} from '~/modules/wmsx/constants'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { getSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/get-detail'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { getWarehouseExportProposalDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { getWarehouseImportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import displayFollowBusinessTypeManagement from './display-field'
import ItemSettingTable from './item-setting-table'
import { formSchema } from './schema'
const DEFAULT_ITEMS = [
  {
    id: '',
    itemCode: '',
    itemName: '',
    unit: '',
    lotNumber: '',
    quantityRequest: '',
    quantityExport: '',
    planExportedQuantity: '',
    unitPriceRefer: '',
    totalMoney: '',
    debitAccount: '',
    creditAccount: '',
  },
]
function WarehouseExportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const [debitAccount, setDebitAccount] = useState('')
  const [warehouseExportProposalId, setWarehouseExportProposalId] = useState()
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()
  const { actions: warehouseTransferAction } = useWarehouseTransfer()

  const {
    data: { attributesBusinessTypeDetails },
    actions: warehouseImportRecipt,
  } = useWarehouseImportReceipt()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const [itemWarehouseExport, setItemWarehouseExport] = useState([])
  const [itemWarehouseExportProposal, setItemWarehouseExportProposal] =
    useState([])
  const [warehouseList, setWarehouseList] = useState([])
  const { actions: sourceAction } = useSourceManagement()
  const initialValues = useMemo(
    () => ({
      code: warehouseExportReceiptDetails?.code,
      receiptDate: warehouseExportReceiptDetails?.receiptDate
        ? new Date(warehouseExportReceiptDetails?.receiptDate)
        : new Date(),
      deliver: warehouseExportReceiptDetails?.receiver || '',
      businessTypeId: warehouseExportReceiptDetails?.businessType
        ? {
            ...warehouseExportReceiptDetails?.businessType,
            bussinessTypeAttributes: warehouseExportReceiptDetails?.attributes,
          }
        : null,
      departmentReceiptId:
        warehouseExportReceiptDetails?.departmentReceipt || null,
      warehouseId: warehouseExportReceiptDetails?.warehouse || null,
      reasonId: warehouseExportReceiptDetails?.reason || null,
      sourceId: warehouseExportReceiptDetails?.source || null,
      explanation:
        warehouseExportReceiptDetails?.explaination ||
        `${t(
          `warehouseExportReceipt.warehouseExportDate`,
        )} [${convertUtcDateToLocalTz(new Date().toISOString())}]`,
      project: warehouseExportReceiptDetails?.project || '',
      task: warehouseExportReceiptDetails?.task || '',
      suggestExport: warehouseExportReceiptDetails?.suggestExport || '',
      receiptNo: warehouseExportReceiptDetails?.receiptNo || '',
      warehouseExportReceipt:
        warehouseExportReceiptDetails?.warehouseExportReceipt || '',
      items:
        warehouseExportReceiptDetails?.itemsSync?.map((item) => ({
          itemId: item?.itemId || item?.id,
          itemName: item?.name || item?.item?.name,
          unit: item?.item?.itemUnit,
          price: item?.price,
          money: item?.amount,
          lotNumber: item?.lots[0]?.lotNumber,
          quantityExport: item?.quantity,
          quantityRequest: warehouseExportReceiptDetails?.attributes?.find(
            (item) =>
              item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
              item?.value,
          )
            ? Math.round(item?.requestedQuantityWarehouseExportProposal * 100) /
              100
            : '',
          planExportedQuantity: item?.exportableQuantity,
          debitAccount: item?.debitAccount,
          creditAccount: item?.creditAccount,
          itemCode: {
            ...item?.item,
            itemId: item?.itemId || item?.id,
            id: item?.itemId || item?.id,
            item: { ...item?.item },
            requestedQuantity: warehouseExportReceiptDetails?.attributes?.find(
              (item) =>
                item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
                item?.value,
            )
              ? Math.round(
                  item?.requestedQuantityWarehouseExportProposal * 100,
                ) / 100
              : '',
          },
        })) || DEFAULT_ITEMS,
    }),
    [warehouseExportReceiptDetails, attributesBusinessTypeDetails],
  )
  warehouseExportReceiptDetails?.attributes?.forEach((item) => {
    if (
      item.tableName &&
      attributesBusinessTypeDetails[item.tableName] &&
      attributesBusinessTypeDetails[item.tableName] instanceof Array
    ) {
      initialValues[`${item.id}`] = attributesBusinessTypeDetails[
        item.tableName
      ]?.find((itemDetail) => itemDetail.id + '' === item.value)
    } else {
      initialValues[`${item.id}`] = item.value || null
    }
  })

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
      },
      {
        route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
        title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseExportReceiptDetailsById(id, async (data) => {
        const res = await getSourceManagementApi(data?.source?.id)
        setDebitAccount(
          [
            res?.data?.accountant,
            res?.data?.produceTypeCode,
            res?.data?.productCode,
            res?.data?.factorialCode,
          ].join('.'),
        )
        if (
          isEmpty(
            data?.attributes?.find(
              (att) =>
                att?.code ===
                  (CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID ||
                    att?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID) &&
                att?.value,
            ),
          )
        ) {
          warehouseTransferAction.getListItemWarehouseStock({
            warehouseId: data?.warehouse?.id || data?.warehouseId,
            isGetAll: 1,
            filter: convertFilterParams({
              status: ACTIVE_STATUS.ACTIVE,
            }),
          })
        }
        const attributes = data?.attributes?.filter(
          (e) => e?.tableName && e?.value,
        )
        const params = {
          filter: JSON.stringify(
            uniq(map(attributes, 'tableName'))?.map((item) => ({
              tableName: item,
              id: attributes
                ?.filter((e) => e?.tableName === item)
                ?.map((d) => d?.value)
                .toString(),
            })),
          ),
        }
        warehouseImportRecipt.getAttribuiteBusinessTypeDetailsById(params)
      })
    }
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])
  useEffect(async () => {
    if (!isEmpty(warehouseExportReceiptDetails)) {
      if (
        !isEmpty(
          warehouseExportReceiptDetails?.attributes?.find(
            (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
          ),
        )
      ) {
        const res = await getWarehouseImportReceiptDetailsApi(
          Number(
            warehouseExportReceiptDetails?.attributes?.find(
              (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
            )?.value,
          ),
        )
        setItemWarehouseExport(res?.data?.purchasedOrderImportDetails)
      }
      if (
        warehouseExportReceiptDetails?.attributes?.find(
          (item) =>
            item?.code ===
              CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID &&
            item?.value,
        )
      ) {
        const res = await getWarehouseExportProposalDetailsApi(
          warehouseExportReceiptDetails?.attributes?.find(
            (item) =>
              item?.code ===
                CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID &&
              item?.value,
          )?.value,
        )
        const warehouseList = []
        res?.data?.items?.forEach((item) => {
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
        const itemWarehouseExportProposal = []
        res?.data?.items?.forEach((item) => {
          item?.childrens?.forEach((chil) => {
            const findItem = itemWarehouseExportProposal?.find(
              (w) =>
                w?.itemId === chil?.itemId &&
                w?.warehouseExport?.id === chil?.warehouseExport?.id,
            )
            if (isEmpty(findItem)) {
              itemWarehouseExportProposal.push({
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
        setItemWarehouseExportProposal(itemWarehouseExportProposal)
      }
    }
  }, [warehouseExportReceiptDetails, id])
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const params = {
      receiver: values?.deliver,
      businessTypeId: values?.businessTypeId?.id,
      reasonId: values?.reasonId?.id,
      explaination: values?.explanation || '',
      receiptDate: values?.receiptDate.toISOString(),
      departmentReceiptId: values?.departmentReceiptId?.id,
      sourceId: values?.sourceId?.id,
      warehouseId: values?.warehouseId?.id,
      items: JSON.stringify(
        values?.items?.map((item) => ({
          id: +item?.itemCode?.itemId || +item?.itemCode?.id,
          itemCode: item?.itemCode?.item?.code || item?.itemCode?.code,
          lotNumber: item?.lotNumber || null,
          quantity: +item?.quantityExport,
          price: item?.price,
          debitAccount: debitAccount.replace(/^(\d*?[1-9])0+$/, '$1') || null,
          creditAccount: item?.creditAccount,
          warehouseId: values?.warehouseId?.id,
        })),
      ),
    }
    values?.businessTypeId?.bussinessTypeAttributes?.forEach((att, index) => {
      // if (values[att.tableName]?.id) {
      //   params[`attributes[${index}].id`] = att.id
      //   params[`attributes[${index}].value`] = values[att.tableName]?.id
      // }
      if (values[att.id]) {
        params[`attributes[${index}].id`] = att.id
        params[`attributes[${index}].value`] =
          values[att.id]?.id || values[att.id]
      }
    })
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseExportReceipt(params, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...params,
        code: warehouseExportReceiptDetails?.code,
        id: +id,
      }

      actions.updateWarehouseExportReceipt(paramUpdate, backToList)
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      default:
        break
    }
  }
  const handleChangeSource = (val) => {
    if (val) {
      sourceAction.getDetailSourceManagementById(val?.id, (data) => {
        setDebitAccount(
          [
            data?.accountant,
            data?.produceTypeCode,
            data?.productCode,
            data?.factorialCode,
          ].join('.'),
        )
      })
    }
  }
  const handleChangeWarehouse = async (val, setFieldValue) => {
    setFieldValue('items', DEFAULT_ITEMS)
    if (val) {
      warehouseTransferAction.getListItemWarehouseStock({
        warehouseId: val?.id,
        isGetAll: 1,
        filter: convertFilterParams({
          status: ACTIVE_STATUS.ACTIVE,
        }),
      })
    }
  }
  const handleChangeBusinessType = (val, setFieldValue, values) => {
    setFieldValue('items', DEFAULT_ITEMS)
    setItemWarehouseExport([])
    setWarehouseList([])

    const receiptDate = convertUtcDateToLocalTz(
      values?.receiptDate.toISOString(),
    )
    const explaination = `${
      receiptDate
        ? `${t('warehouseExportReceipt.warehouseExportDate')} [${receiptDate}]`
        : ''
    }`
    setFieldValue('explanation', explaination)
    if (!isEmpty(val)) {
      val?.bussinessTypeAttributes?.forEach((item) => {
        if (!isNil(item?.id)) {
          setFieldValue(item?.id, null)
        }
      })
    }
  }
  const handleChangeReceiptDate = (val, values, setFieldValue) => {
    const warehouseExportProposal =
      values[
        values?.businessTypeId?.bussinessTypeAttributes?.find(
          (item) =>
            item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
        )?.id
      ]?.code
    const warehouseExportReceipt =
      values[
        values?.businessTypeId?.bussinessTypeAttributes?.find(
          (item) => item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
        )?.id
      ]?.code
    const receiptDate = convertUtcDateToLocalTz(val.toISOString())
    const explaination = `${
      receiptDate
        ? `${t('warehouseExportReceipt.warehouseExportDate')} [${receiptDate}]`
        : ''
    }${
      warehouseExportProposal
        ? ` ${t(
            'warehouseExportReceipt.receiptBy',
          )} [${warehouseExportProposal}]`
        : ''
    }${
      warehouseExportReceipt
        ? ` ${t(
            'warehouseExportReceipt.receiptBy',
          )} [${warehouseExportReceipt}]`
        : ''
    }`
    setFieldValue('explanation', explaination)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => {
              const warehouseImportReceipt =
                values?.businessTypeId?.bussinessTypeAttributes?.find(
                  (item) =>
                    item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
                )?.id
              const warehouseExprotProposal =
                values?.businessTypeId?.bussinessTypeAttributes?.find(
                  (item) =>
                    item?.tableName ===
                    TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
                )?.id
              return (
                <Form>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={ORDER_STATUS_OPTIONS}
                              value={warehouseExportReceiptDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    {isUpdate && (
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('warehouseExportReceipt.receiptId')}
                          name="code"
                          placeholder={t('warehouseExportReceipt.receiptId')}
                          disabled
                          required
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="receiptDate"
                        label={t('warehouseExportReceipt.createdAt')}
                        placeholder={t('warehouseExportReceipt.createdAt')}
                        maxDate={new Date()}
                        minDate={
                          new Date(
                            sub(new Date(), {
                              years: 0,
                              months: 3,
                              weeks: 0,
                              days: 0,
                              hours: 0,
                              minutes: 0,
                              seconds: 0,
                            }),
                          )
                        }
                        onChange={(val) =>
                          handleChangeReceiptDate(val, values, setFieldValue)
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="deliver"
                        label={t('warehouseExportReceipt.nameOfReceiver')}
                        placeholder={t('warehouseExportReceipt.nameOfReceiver')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentReceiptId"
                        label={t('warehouseExportReceipt.departmentReception')}
                        placeholder={t(
                          'warehouseExportReceipt.departmentReception',
                        )}
                        asyncRequest={(s) =>
                          searchReceiptDepartmentApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: 1,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="businessTypeId"
                        label={t('warehouseExportReceipt.typeBusiness')}
                        placeholder={t('warehouseExportReceipt.typeBusiness')}
                        asyncRequest={(s) =>
                          searchBusinessTypesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: 1,
                              parentBusiness: PARENT_BUSINESS_TYPE.EXPORT,
                            }),
                          })
                        }
                        onChange={(val) =>
                          handleChangeBusinessType(val, setFieldValue, values)
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="sourceId"
                        label={t('warehouseExportReceipt.suorceAccountant')}
                        placeholder={t(
                          'warehouseExportReceipt.suorceAccountant',
                        )}
                        asyncRequest={(s) =>
                          searchSourceManagementApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: 1,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        getOptionSubLabel={(opt) => opt?.accountIdentifier}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={(val) => handleChangeSource(val)}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      {!isEmpty(values[warehouseExprotProposal]) ? (
                        <Field.Autocomplete
                          name="warehouseId"
                          label={t('warehouseExportReceipt.warehouseExport')}
                          placeholder={t(
                            'warehouseExportReceipt.warehouseExport',
                          )}
                          options={warehouseList}
                          g
                          getOptionLabel={(opt) =>
                            `${opt?.code} - ${opt?.name}`
                          }
                          onChange={(val) =>
                            handleChangeWarehouse(val, setFieldValue, values)
                          }
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          required
                        />
                      ) : (
                        <Field.Autocomplete
                          name="warehouseId"
                          label={t('warehouseExportReceipt.warehouseExport')}
                          placeholder={t(
                            'warehouseExportReceipt.warehouseExport',
                          )}
                          asyncRequest={(s) =>
                            searchWarehouseApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                status: ACTIVE_STATUS.ACTIVE,
                                userWarehouse: ACTIVE_STATUS.ACTIVE,
                              }),
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          disabled={values[warehouseImportReceipt]}
                          getOptionLabel={(opt) =>
                            `${opt?.code} - ${opt?.name}`
                          }
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          onChange={(val) =>
                            handleChangeWarehouse(val, setFieldValue, values)
                          }
                          required
                        />
                      )}
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reasonId"
                        label={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        placeholder={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: 1,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="warehouseExportReceipt"
                        label={t(
                          'warehouseExportReceipt.warehouseExportReceipt',
                        )}
                        value={`02${
                          values?.warehouseId?.code
                            ? `.${values?.warehouseId?.code}`
                            : ''
                        }${
                          values?.reasonId?.code
                            ? `.${values?.reasonId?.code}`
                            : ''
                        }`}
                        disabled
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="number"
                        label={t('warehouseExportReceipt.number')}
                        value={`03${
                          values?.warehouseId?.code
                            ? `.${values?.warehouseId?.code}`
                            : ''
                        }${
                          values?.reasonId?.code
                            ? `.${values?.reasonId?.code}`
                            : ''
                        }`}
                        disabled
                      />
                    </Grid>
                    {displayFollowBusinessTypeManagement(
                      values?.businessTypeId?.bussinessTypeAttributes,
                      t,
                      values,
                      setItemWarehouseExport,
                      setFieldValue,
                      setWarehouseList,
                      setItemWarehouseExportProposal,
                      setWarehouseExportProposalId,
                    )}
                    <Grid item xs={12}>
                      <Field.TextField
                        name="explanation"
                        label={t('warehouseExportReceipt.explain')}
                        placeholder={t(
                          'warehouseExportReceipt.placeholderExplain',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemSettingTable
                          items={values?.items || []}
                          arrayHelpers={arrayHelpers}
                          itemList={itemWarehouseExport}
                          itemWarehouseExportProposal={
                            itemWarehouseExportProposal
                          }
                          setFieldValue={setFieldValue}
                          debitAccount={debitAccount}
                          values={values}
                          mode={mode}
                          warehouseExportProposalId={warehouseExportProposalId}
                        />
                      )}
                    />
                  </Box>
                  {renderActionBar(handleReset)}
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptForm
