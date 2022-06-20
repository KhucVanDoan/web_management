import { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useParams, useHistory } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Status from '~/components/Status'
import {
  ORDER_TYPE_OPTIONS,
  ORDER_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
import { QC_CHECK, TRANSACTION_TYPE_ENUM } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useProductionOrder from '~/modules/wmsx/redux/hooks/useProductionOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateShema } from './schema'

const { default: Page } = require('~/components/Page')

function ProductionOrderForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const MODE_MAP = {
    [ROUTE.PRODUCTION_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.PRODUCTION_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, productionOrderDetails },
    actions,
  } = useProductionOrder()

  const { actions: moActions } = useMo()

  const {
    data: { itemQualityPoint, materialPlanDetail },
    actions: commomnManagementActions,
  } = useCommonManagement()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    warehouseId: null,
    quantity: 1,
    qcCheck: false,
    warehouseName: '',
    lotNumber: '',
  }

  const productionOrderWarehouseLotsCopy = isEmpty(
    productionOrderDetails?.productionOrderWarehouseLots,
  )
    ? productionOrderDetails?.productionOrderWarehouseDetails
    : productionOrderDetails?.productionOrderWarehouseLots
  const items = productionOrderWarehouseLotsCopy?.map((detailLot, index) => ({
    id: index,
    itemId: detailLot?.itemId || '',
    warehouseName: detailLot?.warehouseId || '',
    qcCheck:
      productionOrderDetails?.productionOrderWarehouseDetails.find(
        (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
      )?.qcCheck === QC_CHECK.TRUE || detailLot?.qcCheck === QC_CHECK.TRUE,
    qcCriteriaId:
      productionOrderDetails?.productionOrderWarehouseDetails.find(
        (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
      )?.qcCriteriaId || detailLot?.qcCriteriaId,
    qcCriteria: itemQualityPoint.find(
      (quality) =>
        quality?.id ===
        productionOrderDetails?.productionOrderWarehouseDetails.find(
          (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
        )?.qcCriteriaId,
    )?.code,
    actualQuantity: detailLot.actualQuantity || '',
    quantity: +detailLot?.quantity,
    lotNumber: detailLot?.lotNumber || '',
    mfg: detailLot?.mfg || '',
    packageId: detailLot?.packageId || '',
  }))
  const initialValues = useMemo(
    () => ({
      code: productionOrderDetails?.code || '',
      name: productionOrderDetails?.name || '',
      moCode: productionOrderDetails?.manufacturingOrder || null,
      moName: productionOrderDetails?.manufacturingOrder?.name || '',
      type: productionOrderDetails?.type || 0,
      planDate: !isEmpty(productionOrderDetails)
        ? [
            productionOrderDetails?.manufacturingOrder?.planFrom,
            productionOrderDetails?.manufacturingOrder?.planTo,
          ]
        : null,
      description: productionOrderDetails?.description || '',
      items: items || [{ ...DEFAULT_ITEM }],
    }),
    [productionOrderDetails],
  )

  useEffect(() => {
    actions.getProductionOrderDetailsById(id, (data) => {
      moActions.getMODetailsById(data?.manufacturingOrder?.id, (data) => {
        commomnManagementActions.getMoMaterialPlanDetail(data?.materialPlan?.id)
      })
      if (data?.type === TRANSACTION_TYPE_ENUM.IMPORT) {
        actions.getImportLotNumber(data?.manufacturingOrder?.id)
      } else {
        actions.getExportLotNumber(data?.manufacturingOrder?.id)
      }
    })
    commomnManagementActions.getItemQualityPoint()
    moActions.searchMO({ isGetAll: 1 })
    return () => actions.resetProductionOrderDetail()
  }, [mode])

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_ORDER.LIST.PATH)
  }

  const handleSubmit = (val) => {
    const params = {
      code: val?.code,
      name: val?.name,
      manufacturingOrderId: val?.moCode?.id,
      description: val?.description,
      type: val?.type,
      deadline: val?.planDate[1],
      items: val?.items?.map((item) => ({
        id: Number(item?.itemId),
        quantity: item?.quantity,
        qcCheck: +item.qcCheck ? true : false,
        warehouseId: item?.warehouseName,
        lotNumber: item?.lotNumber,
        mfg: item?.mfg,
        qcCriteriaId: item?.qcCriteriaId ?? null,
        packageId: item.packageId || null,
      })),
    }
    if (isUpdate) {
      params.id = +id
      actions.updateProductionOrder(params, backToList)
    } else {
      actions.createProductionOrder(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.PRODUCTION_ORDER.LIST.PATH,
        title: ROUTE.PRODUCTION_ORDER.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.PRODUCTION_ORDER.CREATE.PATH,
          title: ROUTE.PRODUCTION_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.PRODUCTION_ORDER.EDIT.PATH,
          title: ROUTE.PRODUCTION_ORDER.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PRODUCTION_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PRODUCTION_ORDER.EDIT.TITLE
      default:
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
  const handleChange = (val, values, setFieldValue) => {
    if (val) {
      moActions.getMODetailsById(val?.id, (data) => {
        commomnManagementActions.getMoMaterialPlanDetail(data?.materialPlan?.id)
      })
      if (values?.type === TRANSACTION_TYPE_ENUM.IMPORT) {
        actions.getImportLotNumber(val?.id)
      } else {
        actions.getExportLotNumber(val?.id)
      }
      setFieldValue('items', [{ ...DEFAULT_ITEM }])
      setFieldValue('moName', val?.name)
      setFieldValue('planDate', [val?.planFrom, val?.planTo])
    } else {
      setFieldValue('moName', '')
      setFieldValue('planDate', '')
    }
  }
  const handlechangeType = (val, values, setFieldValue) => {
    setFieldValue('items', [{ ...DEFAULT_ITEM }])
    moActions.getMODetailsById(values?.moCode?.id, (data) => {
      commomnManagementActions.getMoMaterialPlanDetail(data?.materialPlan?.id)
    })
    if (!isEmpty(values?.moCode) && val === TRANSACTION_TYPE_ENUM.IMPORT) {
      actions.getImportLotNumber(values?.moCode?.id)
    } else {
      actions.getExportLotNumber(values?.moCode?.id || 1)
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateShema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, handleReset }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>{t('productionOrder.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ORDER_STATUS_OPTIONS}
                            value={productionOrderDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('productionOrder.codeList')}
                      name="code"
                      placeholder={t('productionOrder.codeList')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('productionOrder.nameList')}
                      name="name"
                      placeholder={t('productionOrder.nameList')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="moCode"
                      label={t('productionOrder.moCode')}
                      placeholder={t('productionOrder.moCode')}
                      asyncRequest={(s) =>
                        searchMOApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      onChange={(val) =>
                        handleChange(val, values, setFieldValue)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('productionOrder.moName')}
                      name="moName"
                      placeholder={t('productionOrder.moName')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      options={ORDER_TYPE_OPTIONS}
                      label={t('productionOrder.type')}
                      name="type"
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.name)}
                      onChange={(val) =>
                        handlechangeType(val, values, setFieldValue)
                      }
                      disableClearable
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('productionOrder.planDate')}
                      placeholder={t('productionOrder.planDate')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('productionOrder.description')}
                      placeholder={t('productionOrder.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemSettingTable
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                    values={values}
                    materialPlanDetail={materialPlanDetail}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ProductionOrderForm
