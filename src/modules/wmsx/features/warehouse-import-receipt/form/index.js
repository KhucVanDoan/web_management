import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'
import {
  ROLE,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function WarehouseImportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { warehouseImportReceiptDetails, isLoading },
    actions,
  } = useWarehouseImportReceipt()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const initialValues = useMemo(
    () => ({
      receiptDate: warehouseImportReceiptDetails?.date || '',
      vehicleNumber: warehouseImportReceiptDetails?.vehicleNumber || '',
      vehicleType: warehouseImportReceiptDetails?.vehicleType || '',
      km: warehouseImportReceiptDetails?.km || '',
      money: warehouseImportReceiptDetails?.money || '',
      otherRoute: warehouseImportReceiptDetails?.otherRoute || '',
      employeeId: warehouseImportReceiptDetails?.employee || null,
    }),
    [warehouseImportReceiptDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
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
      actions.getWarehouseImportReceiptDetailsById(id)
    }
  }, [id])
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
      case MODAL_MODE.UPDATE_HEADER:
        return ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const params = {
      date: values?.receiptDate || null,
      vehicleNumber: values?.vehicleNumber || null,
      vehicleType: values?.vehicleType || null,
      km: +values?.km || null,
      money: +values?.money || null,
      otherRoute: values?.otherRoute || null,
      employeeId: +values?.employeeId?.id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseImportReceipt(params, backToList)
    } else {
      actions.updateWarehouseImportReceipt({ ...params, id: id }, backToList)
    }
  }
  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
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

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={getTitle()}
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
            {({ handleReset }) => {
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
                        label="Ngày tháng"
                        placeholder="Ngày tháng"
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="vehicleNumber"
                        label="Số xe"
                        placeholder="Số xe"
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="vehicleType"
                        label="Loại xe"
                        placeholder="Loại xe"
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="km"
                        label="Số km"
                        placeholder="Số km"
                        formatter="quantity"
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="money"
                        label="Số tiền"
                        placeholder="Số tiền"
                        formatter="price"
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="otherRoute"
                        label="Tuyến đường khác"
                        placeholder="Tuyến đường khác"
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="employeeId"
                        label="Lái xe"
                        placeholder="Lái xe"
                        asyncRequest={(s) =>
                          searchUsersApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            role: ROLE.DRIVER,
                            isActive: 1,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.username}
                        getOptionSubLabel={(opt) => opt?.fullName}
                        isOptionEqualToValue={(opt, val) =>
                          opt?.id === val?.employeeId
                        }
                        required
                      />
                    </Grid>
                  </Grid>

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
