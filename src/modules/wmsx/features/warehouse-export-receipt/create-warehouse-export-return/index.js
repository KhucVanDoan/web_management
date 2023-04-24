import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import {
  ACTIVE_STATUS,
  CODE_BUSSINESS_TYPE,
  CODE_DEFAULT_REASON,
  PARENT_BUSINESS_TYPE,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useBussinessTypeManagement from '~/modules/wmsx/redux/hooks/useBusinessTypeManagement'
import useReasonManagement from '~/modules/wmsx/redux/hooks/useReasonManagement'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

function WarehouseExportReturn() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
    },
  ]
  const {
    data: { warehouseImportReceiptDetails, isLoading },
    actions,
  } = useWarehouseImportReceipt()
  const {
    data: { reasonManagementList },
    actions: getListReasonAction,
  } = useReasonManagement()
  const {
    data: { businessTypeList },
    actions: getListBussinessTypeAction,
  } = useBussinessTypeManagement()
  const { actions: warehouseExportReceiptAction } = useWarehouseExportReceipt()
  useEffect(() => {
    actions.getWarehouseImportReceiptDetailsById(id)
    getListReasonAction.searchReasonManagement({
      filter: convertFilterParams({
        code: CODE_DEFAULT_REASON,
      }),
    })
    getListBussinessTypeAction.searchBusinessTypes({
      filter: convertFilterParams({
        code: CODE_BUSSINESS_TYPE.SOINORMAL,
      }),
    })
    return () => {
      actions.resetWarehouseImportReceiptState()
      getListReasonAction.resetReasonManagementState()
      getListBussinessTypeAction.resetBusinessTypeDetailsState()
    }
  }, [id])

  const backToDetail = () => {
    history.push(
      ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH.replace(
        ':id',
        `${warehouseImportReceiptDetails?.id}`,
      ),
    )
  }
  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToDetail}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }
  const onSubmit = (values) => {
    const params = {
      purchasedOrderImportId: id,
      receiver: values?.deliver,
      receiptDate: values?.receiptDate,
      departmentReceiptId: values?.departmentReceipt?.id,
      warehouseId: values?.warehouse?.id,
      reasonId: values?.reason?.id,
      explanation: values?.explanation,
      items: values?.items?.map((item) => ({
        itemId: +item?.itemCode?.itemId || +item?.itemCode?.id,
        lotNumber: item?.lotNumber || null,
        quantity: +item?.returnQuantity,
        price: item?.price,
        debitAccount: item?.debitAccount || null,
        creditAccount: item?.creditAccount,
        warehouseId: values?.warehouse?.id,
      })),
    }
    warehouseExportReceiptAction.createWarehouseExportReceiptReturn(
      params,
      backToDetail(),
    )
  }

  const initialValues = useMemo(
    () => ({
      code: warehouseImportReceiptDetails?.code,
      deliver: '',
      receiptDate: new Date(),
      departmentReceipt: warehouseImportReceiptDetails?.departmentReceipt,
      warehouse: warehouseImportReceiptDetails?.warehouse,
      source: warehouseImportReceiptDetails?.source,
      businessType: businessTypeList?.find(
        (item) => item?.code === CODE_BUSSINESS_TYPE.SOINORMAL,
      ),
      reason: reasonManagementList?.find(
        (item) => item?.code === CODE_DEFAULT_REASON,
      ),
      items:
        warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.map(
          (item, index) => ({
            id: `${item?.itemId}-${index}`,
            itemCode:
              {
                itemId: item?.itemId,
                id: item?.itemId,
                quantity: item?.quantity,
                ...item?.item,
              } || null,
            itemName: item?.item?.name,
            unit: item?.item?.itemUnit,
            importQuantity: item?.quantity,
            receivedQuantity: item?.quantity,
            planExportedQuantity:
              warehouseImportReceiptDetails?.status ===
              WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED
                ? item?.exportableQuantity + item?.quantity
                : item?.exportableQuantity,
            returnExportedQuantity: item?.remainReturnQuantity,
            returnQuantity: item?.remainReturnQuantity,
            debitAccount: item?.debitAccount,
            creditAccount: item?.creditAccount,
            lotNumber: item?.lotNumber,
          }),
        ),
    }),
    [warehouseImportReceiptDetails],
  )
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportReceiptCreateReturn')}
      onBack={backToDetail}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    {/* <Grid item xs={12}>
                      <LV
                        label={t('warehouseImportReceipt.status')}
                        value={
                          <Status
                            options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
                            value={warehouseImportReceiptDetails?.status}
                          />
                        }
                      />
                    </Grid> */}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="code"
                        label={t('warehouseImportReceipt.id')}
                        placeholder={t('warehouseImportReceipt.id')}
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="deliver"
                        label={t('warehouseExportReceipt.nameOfReceiver')}
                        placeholder={t('warehouseExportReceipt.nameOfReceiver')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="receiptDate"
                        label={t('warehouseExportReceipt.receiptDate')}
                        placeholder={t('warehouseExportReceipt.receiptDate')}
                        maxDate={new Date()}
                        minDate={new Date()}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouse"
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
                        disabled
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentReceipt"
                        label={t('warehouseExportReceipt.departmentReception')}
                        placeholder={t(
                          'warehouseExportReceipt.departmentReception',
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
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="source"
                        label={t('warehouseExportReceipt.suorceAccountant')}
                        placeholder={t(
                          'warehouseExportReceipt.suorceAccountant',
                        )}
                        asyncRequest={(s) =>
                          searchSourceManagementApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              warehouseId: values?.warehouseId?.id,
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        asyncRequestDeps={values?.warehouseId}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        getOptionSubLabel={(opt) => opt?.accountIdentifier}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reason"
                        label={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        placeholder={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            // limit: ASYNC_SEARCH_LIMIT,
                            isGetAll: ACTIVE_STATUS.ACTIVE,
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
                        name="businessType"
                        label={t('warehouseExportReceipt.typeBusiness')}
                        placeholder={t('warehouseExportReceipt.typeBusiness')}
                        asyncRequest={(s) =>
                          searchBusinessTypesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              parentBusiness: PARENT_BUSINESS_TYPE.EXPORT,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                        disabled
                      />
                    </Grid>
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
                        <ItemsSettingTable
                          items={values?.items}
                          setFieldValue={setFieldValue}
                          arrayHelpers={arrayHelpers}
                          values={values}
                          warehouse={warehouseImportReceiptDetails?.warehouse}
                        />
                      )}
                    />
                  </Box>
                  {renderActionBar()}
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseExportReturn
