import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Form, Formik } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  QUALITY_ALERT_STATUS,
  STAGE_OPTION,
  STAGES_OUTPUT,
  TYPE_QC_VALUE_TO_API,
} from '~/modules/qmsx/constants'
import useDefineQualityAlert from '~/modules/qmsx/redux/hooks/useDefineQualityAlert'
import { ROUTE } from '~/modules/qmsx/routes/config'

import { defineQualityAlertOutputSchema } from './schema'

const ENDPOINT_PATCH_GET_ORDER_BY_STAGE_OUTPUT = 'env-output-order'

const ENDPOINT_PATCH_GET_PRODUCT_BY_ORDER_ID = {
  SO: 'env-item-by-so',
  PRO: 'env-item-by-pro',
}

const ENDPOINT_PATCH_GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID = {
  SO: 'env-warehouse-by-so-and-item',
  PRO: 'env-warehouse-by-pro-and-item',
}

function DefineQualityAlertOutputForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { qualityAlertDetail, isLoading },
    actions,
  } = useDefineQualityAlert()

  const [orderList, setOrderList] = useState([])
  const [itemList, setItemList] = useState([])
  const [warehouseList, setWarehouseList] = useState([])
  const [errorReportList, setErrorReportList] = useState([])
  const [relatedUserList, setRelatedUserList] = useState([])

  const MODE_MAP = {
    [ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const [
    poField,
    itemField,
    warehouseField,
    errorReportField,
    relatedUserField,
    vendorField,
  ] = [
    'purchasedOrderId',
    'itemId',
    'warehouseId',
    'errorReportId',
    'alertRelatedUsers',
    'vendorName',
  ]

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'qualityControl',
      },
      {
        route: ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH,
        title: ROUTE.DEFINE_QUALITY_ALERT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.PATH,
          title: ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.PATH,
          title: ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    actions.getMo()
    if (mode === MODAL_MODE.UPDATE) {
      const params = {
        id: id,
        type: TYPE_QC_VALUE_TO_API.OUTPUT,
      }
      actions.getQualityAlertDetailById(params, (data) => {
        const { stage, purchasedOrder, item, warehouse } = data
        getOrder(stage)
        getProduct(stage, purchasedOrder?.id)
        getWarehouse(stage, purchasedOrder?.id, item?.id)
        getErrorReportAndRelatedUser(
          stage,
          purchasedOrder?.id,
          item?.id,
          warehouse?.id,
        )
      })
    }
    return () => {
      if (isUpdate) actions.resetQualityAlertDetailState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const transform = {
      ...values,
      type: TYPE_QC_VALUE_TO_API.OUTPUT,
      alertRelatedUsers: values?.alertRelatedUsers.map((x) => ({ userId: x })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createQualityAlert(transform, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...transform,
        id: +id,
      }
      actions.updateQualityAlert(paramUpdate, backToList)
    }
  }

  const initialValues = {
    code: qualityAlertDetail?.code || '',
    name: qualityAlertDetail?.name || '',
    stage: !isNil(qualityAlertDetail?.stage) ? qualityAlertDetail?.stage : null,
    alertRelatedUsers:
      qualityAlertDetail?.alertRelatedUsers?.map((x) => x?.id) || [],
    purchasedOrderId: qualityAlertDetail?.purchasedOrder?.id || null,
    itemId: qualityAlertDetail?.item?.id || null,
    warehouseId: qualityAlertDetail?.warehouse?.id || null,
    errorReportId: qualityAlertDetail?.errorReport?.id || null,
    description: qualityAlertDetail?.description || '',
  }

  const resetState = (field, setFieldValue, setListState) => {
    setFieldValue(field, null)
    setListState([])
  }

  const onChangeStageQc = (stageQcValue, setFieldValue) => {
    resetState(poField, setFieldValue, setOrderList)
    resetState(itemField, setFieldValue, setItemList)
    resetState(warehouseField, setFieldValue, setWarehouseList)
    resetState(errorReportField, setFieldValue, setErrorReportList)
    resetState(relatedUserField, setFieldValue, setRelatedUserList)
    resetState(vendorField, setFieldValue, setOrderList)

    if (!isNil(stageQcValue)) getOrder(stageQcValue)
  }

  const onChangeOrder = (stageQcValue, orderId, setFieldValue) => {
    if (!isNil(orderId)) {
      const valueObject = orderList.find((e) => e.id === orderId)
      setFieldValue('vendorName', valueObject?.vendor)
      getProduct(stageQcValue, orderId)
    } else {
      resetState(itemField, setFieldValue, setItemList)
      resetState(warehouseField, setFieldValue, setWarehouseList)
      resetState(errorReportField, setFieldValue, setErrorReportList)
      resetState(relatedUserField, setFieldValue, setRelatedUserList)
      setFieldValue('vendorName', null)
    }
  }

  const onChangeProduct = (stageQcValue, orderId, productId, setFieldValue) => {
    if (!isNil(productId)) {
      getWarehouse(stageQcValue, orderId, productId)
    } else {
      resetState(warehouseField, setFieldValue, setWarehouseList)
      resetState(errorReportField, setFieldValue, setErrorReportList)
      resetState(relatedUserField, setFieldValue, setRelatedUserList)
      setFieldValue('vendorName', null)
    }
  }

  const onChangeWarehouse = (
    stageQcValue,
    orderId,
    productId,
    warehouseId,
    setFieldValue,
  ) => {
    if (!isNil(warehouseId)) {
      getErrorReportAndRelatedUser(
        stageQcValue,
        orderId,
        productId,
        warehouseId,
      )
    } else {
      resetState(errorReportField, setFieldValue, setErrorReportList)
      resetState(relatedUserField, setFieldValue, setRelatedUserList)
      setFieldValue('vendorName', null)
    }
  }

  const getOrder = (stageQcValue) => {
    const params = {
      id: stageQcValue,
      endpointPatch: ENDPOINT_PATCH_GET_ORDER_BY_STAGE_OUTPUT,
    }

    actions.getOrderByStageQcValue(params, (data) => setOrderList(data))
  }

  const getProduct = (stageQcValue, orderId) => {
    const params = {
      endpointPatch:
        stageQcValue === STAGE_OPTION.PO_IMPORT
          ? ENDPOINT_PATCH_GET_PRODUCT_BY_ORDER_ID.PO
          : ENDPOINT_PATCH_GET_PRODUCT_BY_ORDER_ID.PRO,
      id: orderId,
    }

    actions.getProductByOrderId(params, (data) => setItemList(data))
  }

  const getWarehouse = (stageQcValue, orderId, productId) => {
    const params = {
      endpointPatch:
        stageQcValue === STAGE_OPTION.PO_IMPORT
          ? ENDPOINT_PATCH_GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID.PO
          : ENDPOINT_PATCH_GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID.PRO,
      orderId,
      productId,
    }

    actions.getWarehouseByOrderIdAndProductId(params, (data) =>
      setWarehouseList(data),
    )
  }

  const getErrorReportAndRelatedUser = (
    stageQcValue,
    orderId,
    productId,
    warehouseId,
  ) => {
    const params = {
      stageQcValue,
      orderId,
      productId,
      warehouseId,
    }

    actions.getErrorReportByStageQcValueOrderIdProductIdWarehouseId(
      params,
      (data) => setErrorReportList(data),
    )
    actions.getRelatedUserByWarehouseId(warehouseId, (data) =>
      setRelatedUserList(data),
    )
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
            validationSchema={defineQualityAlertOutputSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
            onChange
          >
            {/* @TODO-not-exist-in-touched-object: Khi submit ô select mà đã clear data sẽ bị mất khỏi touched */}
            {({ handleReset, setFieldValue, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {!isNil(qualityAlertDetail?.status) && (
                    <Grid item xs={12}>
                      <LV
                        label={t('defineQualityAlert.status')}
                        value={
                          <Status
                            options={QUALITY_ALERT_STATUS}
                            value={qualityAlertDetail?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineQualityAlert.code')}
                      placeholder={t('defineQualityAlert.code')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineQualityAlert.name')}
                      placeholder={t('defineQualityAlert.name')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stage"
                      label={t('defineQualityAlert.stageQc')}
                      placeholder={t('defineQualityAlert.stageQc')}
                      required
                      options={STAGES_OUTPUT}
                      getOptionValue={(opt) => opt?.value}
                      getOptionLabel={(opt) => t(opt?.text) || ''}
                      onChange={(value) =>
                        onChangeStageQc(value, setFieldValue)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="purchasedOrderId"
                      label={t('defineQualityAlert.orderCode')}
                      placeholder={t('defineQualityAlert.orderCode')}
                      required
                      options={orderList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      getOptionSubLabel={(opt) => opt?.code || ''}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.name}|${opt?.code}`,
                      })}
                      onChange={(orderId) =>
                        onChangeOrder(values?.stage, orderId, setFieldValue)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="itemId"
                      label={t('defineQualityAlert.productCode')}
                      placeholder={t('defineQualityAlert.productCode')}
                      required
                      options={itemList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      getOptionSubLabel={(opt) => opt?.code || ''}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.name}|${opt?.code}`,
                      })}
                      onChange={(itemId) => {
                        const { stage, purchasedOrderId } = { ...values }

                        return onChangeProduct(
                          stage,
                          purchasedOrderId,
                          itemId,
                          setFieldValue,
                        )
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseId"
                      label={t('defineQualityAlert.warehouseName')}
                      placeholder={t('defineQualityAlert.warehouseName')}
                      required
                      options={warehouseList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      onChange={(warehouseId) => {
                        const { stage, purchasedOrderId, itemId } = {
                          ...values,
                        }

                        return onChangeWarehouse(
                          stage,
                          purchasedOrderId,
                          itemId,
                          warehouseId,
                          setFieldValue,
                        )
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="alertRelatedUsers"
                      label={t('defineQualityAlert.alertRelatedUsers')}
                      placeholder={t('defineQualityAlert.alertRelatedUsers')}
                      required
                      multiple
                      options={relatedUserList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.username || ''}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="errorReportId"
                      label={t('defineQualityAlert.errorReportName')}
                      placeholder={t('defineQualityAlert.errorReportName')}
                      required
                      options={errorReportList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineQualityAlert.alertContent')}
                      placeholder={t('defineQualityAlert.alertContent')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <ActionBar
                  onBack={backToList}
                  onCancel={handleReset}
                  mode={mode}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineQualityAlertOutputForm
