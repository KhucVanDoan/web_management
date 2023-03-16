import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { sub } from 'date-fns'
import { Formik, Form, FieldArray } from 'formik'
import { uniq, map, isEmpty, isNil, keyBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import FileUploadButton from '~/components/FileUploadButton'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  CODE_TYPE_DATA_FATHER_JOB,
  PARENT_BUSINESS_TYPE,
  TABLE_NAME_ENUM,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
} from '~/modules/wmsx/constants'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { getReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/receipt-management/get-receipt-details'
import { getSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/get-detail'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { getWarehouseExportProposalDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { getWarehouseExportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/get-details'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'
import addNotification from '~/utils/toast'

import displayFollowBusinessTypeManagement from '../display-field'
import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const DEFAULT_ITEMS = {
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
}
function WarehouseImportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const [itemReceipt, setItemReceipt] = useState([])
  const [itemWarehouseExportProposal, setItemWarehouseExportProposal] =
    useState([])
  const [creditAccount, setCreditAccount] = useState('')
  const [itemWarehouseExportReceipt, setItemWarehouseExportReceipt] = useState(
    [],
  )
  const [loadingReceipt, setLoadingReceipt] = useState(false)
  const [valueReceipt, setValueReceipt] = useState({})
  const {
    data: {
      warehouseImportReceiptDetails,
      isLoading,
      attributesBusinessTypeDetails,
    },
    actions,
  } = useWarehouseImportReceipt()

  const { actions: sourceAction } = useSourceManagement()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      receiptDate: !isEmpty(warehouseImportReceiptDetails)
        ? new Date(warehouseImportReceiptDetails?.receiptDate)
        : new Date(),
      deliver: warehouseImportReceiptDetails?.deliver || '',
      businessTypeId: warehouseImportReceiptDetails?.businessType
        ? {
            ...warehouseImportReceiptDetails?.businessType,
            bussinessTypeAttributes: warehouseImportReceiptDetails?.attributes,
          }
        : null,
      contractNumber: warehouseImportReceiptDetails?.contractNumber || '',
      attachment: !isEmpty(warehouseImportReceiptDetails?.attachment)
        ? [
            {
              id: warehouseImportReceiptDetails?.attachment?.id,
              name: warehouseImportReceiptDetails?.attachment?.fileName,
            },
          ]
        : [],
      departmentReceiptId:
        warehouseImportReceiptDetails?.departmentReceipt || null,
      warehouse: warehouseImportReceiptDetails?.warehouse || null,
      reasonId: warehouseImportReceiptDetails?.reason || null,
      sourceId: warehouseImportReceiptDetails?.source || null,
      explaination:
        warehouseImportReceiptDetails?.explanation ||
        `${t(
          `warehouseImportReceipt.warehouseInputDate`,
        )} [${convertUtcDateToLocalTz(new Date().toISOString())}]`,
      items: warehouseImportReceiptDetails?.purchasedOrderImportDetails?.map(
        (item) => ({
          itemId: item?.itemId,
          itemName: item?.item?.name,
          unit: item?.item?.itemUnit,
          lotNumber: item?.lotNumber,
          money: item?.amount,
          price: item?.price,
          debitAcc: item?.debitAccount,
          creditAcc: item?.creditAccount.replace(/^(\d*?[1-9])0+$/, '$1'),
          importQuantity: item?.quantity,
          quantity: item?.quantity,
          itemCode: {
            itemId: item?.itemId,
            id: item?.itemId,
            code: item?.item?.code,
            name: item?.item?.name,
            requestedQuantity: item?.requestedQuantityWarehouseExportProposal,
            quantity: item?.quantity,
            item: { ...item?.item },
          },
        }),
      ) || [{ ...DEFAULT_ITEMS }],
    }),
    [warehouseImportReceiptDetails, attributesBusinessTypeDetails],
  )

  warehouseImportReceiptDetails?.attributes?.forEach((item) => {
    if (
      item.tableName &&
      attributesBusinessTypeDetails[item.tableName] &&
      attributesBusinessTypeDetails[item.tableName] instanceof Array
    ) {
      initialValues[`${item?.id}`] = attributesBusinessTypeDetails[
        item.tableName
      ]?.find((itemDetail) => `${itemDetail.id}` === item.value)
        ? attributesBusinessTypeDetails[item.tableName]?.find(
            (itemDetail) => `${itemDetail.id}` === item.value,
          )
        : null
    } else {
      initialValues[`${item?.id}`] = item.value ? item.value : null
    }
  })
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
      },
      {
        route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
        title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(async () => {
    if (isUpdate) {
      actions.getWarehouseImportReceiptDetailsById(id, async (data) => {
        const res = await getSourceManagementApi(data?.source?.id)

        setCreditAccount(res?.data?.accountant.replace(/^(\d*?[1-9])0+$/, '$1'))
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
        actions.getAttribuiteBusinessTypeDetailsById(params)
      })
    }
  }, [id])
  useEffect(async () => {
    if (!isEmpty(warehouseImportReceiptDetails)) {
      if (
        !isEmpty(
          warehouseImportReceiptDetails?.attributes?.find(
            (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.RECEIPT_ID,
          ),
        )
      ) {
        const res = await getReceiptDetailsApi(
          Number(
            warehouseImportReceiptDetails?.attributes?.find(
              (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.RECEIPT_ID,
            )?.value,
          ),
        )
        setValueReceipt(res?.data)
        setItemReceipt(res?.data?.items)
      }
      if (
        !isEmpty(
          warehouseImportReceiptDetails?.attributes?.find(
            (item) =>
              item?.code ===
              CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
          ),
        )
      ) {
        const res = await getWarehouseExportProposalDetailsApi(
          Number(
            warehouseImportReceiptDetails?.attributes?.find(
              (item) =>
                item?.code ===
                CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
            )?.value,
          ),
        )
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
      }
      if (
        !isEmpty(
          warehouseImportReceiptDetails?.attributes?.find(
            (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.SO_EXPORT_ID,
          ),
        )
      ) {
        const res = await getWarehouseExportReceiptDetailsApi(
          Number(
            warehouseImportReceiptDetails?.attributes?.find(
              (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.SO_EXPORT_ID,
            )?.value,
          ),
        )
        setItemWarehouseExportReceipt(res?.data?.items)
      }
    }
  }, [warehouseImportReceiptDetails])

  useEffect(() => {
    return () => {
      actions.resetWarehouseImportReceiptState()
    }
  }, [])
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (itemReceipt?.length) {
      const itemById = keyBy(
        values?.items?.map((item) => ({
          ...item,
          itemId: item?.itemCode?.itemId,
        })),
        'itemId',
      )
      const isMissingItem = itemReceipt.some((item) => !itemById[item.itemId])
      if (isMissingItem) {
        addNotification(
          t('warehouseImportReceipt.missedItemBasedOnReceipt'),
          NOTIFICATION_TYPE.ERROR,
        )
        return
      }
    }
    const params = {
      deliver: values?.deliver,
      businessTypeId: values?.businessTypeId?.id,
      reasonId: values?.reasonId?.id,
      explanation: values?.explaination,
      receiptDate: values?.receiptDate?.toISOString(),
      departmentReceiptId: values?.departmentReceiptId?.id,
      sourceId: values?.sourceId?.id,
      warehouseId: values?.warehouse?.id,
      contractNumber: values?.contractNumber,
      attachment: values?.attachment[0]?.id ? null : values?.attachment,
      files: values?.attachment[0]?.id
        ? JSON.stringify([{ id: values?.attachment[0]?.id }])
        : [],
      items: JSON.stringify(
        values?.items?.map((item) => ({
          id:
            +item?.itemCode?.itemId ||
            +item?.itemCode?.id ||
            +item?.itemCode?.itemCode?.itemId,
          requestedItemIdImportActual: item?.itemCode?.item?.code,
          lotNumber: '',
          quantity: +item?.importQuantity || item?.quantity,
          price: item?.price || (item?.money / item?.quantity).toFixed(2),
          amount: item?.money,
          debitAccount:
            item?.debitAcc?.replace(/^(\d*?[1-9])0+$/, '$1') || null,
          creditAccount:
            item?.creditAcc || creditAccount?.replace(/^(\d*?[1-9])0+$/, '$1'),
          warehouseId: values?.warehouse?.id,
        })),
      ),
    }

    values?.businessTypeId?.bussinessTypeAttributes?.forEach((att, index) => {
      // if (values[att.tableName]) {
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
      actions.createWarehouseImportReceipt(params, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...params,
        code: warehouseImportReceiptDetails?.code,
        id: id,
      }
      actions.updateWarehouseImportReceipt(paramUpdate, backToList)
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
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  const handleChangeSource = (val, values, setFieldValue) => {
    if (val) {
      sourceAction.getDetailSourceManagementById(val?.id, (data) => {
        setCreditAccount(data?.accountant.replace(/^(\d*?[1-9])0+$/, '$1'))
        const receipt =
          values[
            values?.businessTypeId?.bussinessTypeAttributes?.find(
              (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
            )?.id
          ]?.receiptNumber
        if (!isEmpty(receipt)) {
          const itemReceiptList = values?.items?.map((item) => ({
            ...item,
            creditAcc: data?.accountant.replace(/^(\d*?[1-9])0+$/, '$1'),
          }))
          setFieldValue('items', itemReceiptList)
        }
      })
    }
  }
  const handleChangeBusinessType = (val, setFieldValue, values) => {
    setFieldValue('items', [{ ...DEFAULT_ITEMS }])
    setFieldValue('contractNumber', '')
    // setFieldValue('warehouse', null)
    setItemReceipt([])
    setValueReceipt({})
    setItemWarehouseExportProposal([])
    setItemWarehouseExportReceipt([])
    if (values?.receiptDate) {
      const receiptDate = convertUtcDateToLocalTz(
        values?.receiptDate?.toISOString(),
      )
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseInputDate')} [${receiptDate}]`
          : ''
      }`
      setFieldValue('explaination', explaination)
    }
    if (!isEmpty(val)) {
      val?.bussinessTypeAttributes?.forEach((item) => {
        if (!isNil(item?.id)) {
          setFieldValue(item?.id, null)
        }
      })
    }
  }
  const handleChangeReceiptDate = (val, values, setFieldValue) => {
    if (
      isEmpty(
        values[
          values?.businessTypeId?.bussinessTypeAttributes?.find(
            (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
          )?.id
        ],
      )
    ) {
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
            (item) => item?.tableName === TABLE_NAME_ENUM.SALE_ORDER_EXPORT,
          )?.id
        ]?.code
      const receiptDate = convertUtcDateToLocalTz(val?.toISOString())
      const explaination = `${
        receiptDate
          ? `${t('warehouseImportReceipt.warehouseInputDate')} [${receiptDate}]`
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
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading || loadingReceipt}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t, valueReceipt)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => {
              const receiptRequired =
                values?.businessTypeId?.bussinessTypeAttributes?.find(
                  (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
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
                              {t('constructionManagement.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
                              value={warehouseImportReceiptDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="receiptDate"
                        label={t('warehouseImportReceipt.receiptDate')}
                        placeholder={t('warehouseImportReceipt.receiptDate')}
                        maxDate={new Date()}
                        minDate={
                          !isEmpty(values[receiptRequired])
                            ? new Date(values[receiptRequired]?.receiptDate)
                            : new Date(
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
                      <LV
                        label={
                          <Typography mt={1}>
                            {t('warehouseImportReceipt.Attachments')}
                          </Typography>
                        }
                        value={
                          <FileUploadButton
                            maxNumberOfFiles={1}
                            onChange={(val) => setFieldValue('attachment', val)}
                            value={values.attachment}
                          />
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="deliver"
                        label={t('warehouseImportReceipt.deliver')}
                        placeholder={t('warehouseImportReceipt.deliver')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentReceiptId"
                        label={t('warehouseImportReceipt.departmentReceipt')}
                        placeholder={t(
                          'warehouseImportReceipt.departmentReceipt',
                        )}
                        asyncRequest={(s) =>
                          searchReceiptDepartmentApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
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
                      <Field.Autocomplete
                        name="businessTypeId"
                        label={t('warehouseImportReceipt.businessType')}
                        placeholder={t('warehouseImportReceipt.businessType')}
                        asyncRequest={(s) =>
                          searchBusinessTypesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              parentBusiness: PARENT_BUSINESS_TYPE.IMPORT,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        onChange={(val) =>
                          handleChangeBusinessType(val, setFieldValue, values)
                        }
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouse"
                        label={t('warehouseImportReceipt.warehouse')}
                        placeholder={t('warehouseImportReceipt.warehouse')}
                        asyncRequest={(s) =>
                          searchWarehouseApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              userWarehouse: ACTIVE_STATUS.ACTIVE,
                            }),
                            sort: convertSortParams({
                              order: 'asc',
                              orderBy: 'code',
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        disabled={values[receiptRequired]}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={() => {
                          setFieldValue('items', [{ ...DEFAULT_ITEMS }])
                          setFieldValue('sourceId', null)
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reasonId"
                        label={t('warehouseImportReceipt.reason')}
                        placeholder={t('warehouseImportReceipt.reason')}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                            sort: convertSortParams({
                              order: 'asc',
                              orderBy: 'code',
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
                      <Field.Autocomplete
                        name="sourceId"
                        label={t('warehouseImportReceipt.source')}
                        placeholder={t('warehouseImportReceipt.source')}
                        asyncRequest={(s) =>
                          searchSourceManagementApi({
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
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        getOptionSubLabel={(opt) => opt?.accountIdentifier}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={(val) =>
                          handleChangeSource(val, values, setFieldValue)
                        }
                        disabled={isEmpty(values?.warehouse)}
                        required
                      />
                    </Grid>
                    {displayFollowBusinessTypeManagement(
                      values?.businessTypeId?.bussinessTypeAttributes,
                      t,
                      values,
                      setItemWarehouseExportReceipt,
                      setItemWarehouseExportProposal,
                      setItemReceipt,
                      setFieldValue,
                      setLoadingReceipt,
                      creditAccount,
                      setValueReceipt,
                    )}
                    {receiptRequired && (
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="contractNumber"
                          label={t('warehouseImportReceipt.contractNumber')}
                          placeholder={t(
                            'warehouseImportReceipt.contractNumber',
                          )}
                          disabled={!isEmpty(values[receiptRequired])}
                          validate={(val) => {
                            if (!val) {
                              return t('general:form.required')
                            }
                          }}
                          required
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Field.TextField
                        name="explaination"
                        label={t('warehouseImportReceipt.explaination')}
                        placeholder={t('warehouseImportReceipt.explaination')}
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
                        <ItemsSettingTable
                          items={values?.items || []}
                          mode={mode}
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                          creditAccount={creditAccount}
                          itemList={
                            itemWarehouseExportReceipt?.length > 0
                              ? itemWarehouseExportReceipt
                              : itemWarehouseExportProposal
                          }
                          values={values}
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

export default WarehouseImportReceiptForm
