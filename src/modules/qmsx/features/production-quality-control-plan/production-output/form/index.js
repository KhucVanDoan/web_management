import React, { useEffect, useState } from 'react'

import { Grid, Hidden } from '@mui/material'
import { Formik, Form } from 'formik'
import { isNil, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  NOTIFICATION_TYPE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  PRODUCTION_QC_PLAN_STATUS_OPTIONS,
  STAGE_OPTION,
  PRODUCTION_QC_PLAN_STATUS,
  STAGES,
} from '~/modules/qmsx/constants'
import useProductionQualityControlPlan from '~/modules/qmsx/redux/hooks/useProductionQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils/date-time'
import addNotification from '~/utils/toast'

import PlanDetailTable from '../plan-detail-table'
import { productionOutputQualityControlPlanSchema } from './schema'

const ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_OUTPUT = 'production-step-output'
const ENDPOINT_PATCH_GET_DETAIL_MO_PLAN_OUTPUT = 'mo-plan-output'

function ProductionOutputQualityControlPlanForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { productionQcPlanDetail, isLoading, outputMoList },
    actions,
  } = useProductionQualityControlPlan()

  const [productionPlanList, setProductionPlanList] = useState([])
  const [formInitDetail, setForm] = useState({})

  const MODE_MAP = {
    [ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT.PATH]:
      MODAL_MODE.CREATE,
    [ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT.PATH]:
      MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    status: null,
    code: '',
    name: '',
    stageQc: STAGE_OPTION.PRODUCTION_OUTPUT,
    mo: null,
    productionPlan: null,
    description: '',
    items: [],
    form: {},
  }
  const [initialValuesForm, setInitialValuesForm] = useState(initialValues)
  const [saveInitLoadDetail, setSaveInitLoadDetail] = useState({})

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
        title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT.PATH,
          title:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT
              .TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT.PATH,
          title:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    actions.getOutputMo()
    if (mode === MODAL_MODE.UPDATE) {
      const paramsGetdetail = {
        id: params?.id,
        endpointPatch: ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_OUTPUT,
      }
      actions.getProductionQcPlanDetailById(
        paramsGetdetail,
        (data) => {
          if (+data.status !== PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING)
            return backToList()
          getProductionPlan(data?.mo?.id)
          getFormData(data?.planBomOutputs)
        },
        backToList,
      )
    }
    return () => {
      if (isUpdate) actions.resetProductionQcPlanDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT
          .TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT
          .TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  const onSubmit = (values) => {
    let moPlanBomsTransform = []
    Object.values(values?.form).forEach((v) => {
      moPlanBomsTransform.push({
        id: v?.id || undefined,
        //bonus data for BE
        type: v?.type,
        bomId: v?.bomId,
        routingId: v?.routingId,
        producingStepId: v?.producingStepId,
        itemId: v?.itemId,
        workOrderId: v?.workOrderId,
        qualityPointId: v?.qualityPointId,
        keyBomTree: v?.keyBomTree,
        planningQuantity: v?.planningQuantity,
        actualQuantityBom: v?.actualQuantityBom,
        actualQuantityProducingStep: v?.actualQuantityProducingStep,
        //field was edited on table data
        planErrorRate: +v?.planErrorRate,
        planQcQuantity: +v?.planQcQuantity,
        qualityPlanBomQualityPointUser1s: v?.userQc1st?.map((x) => ({
          userId: x,
        })),
        qualityPlanBomQualityPointUser2s: v?.userQc2nd?.map((x) => ({
          userId: x,
        })),
        planFrom: v?.productionQcPlanDate
          ? v?.productionQcPlanDate[0]
          : undefined,
        planTo: v?.productionQcPlanDate
          ? v?.productionQcPlanDate[1]
          : undefined,
      })
    })
    //Form data submit for BE
    const transformData = {
      code: values?.code,
      name: values?.name,
      description: values?.description,
      qcStageId: values?.stageQc,
      moId: values?.mo,
      moPlanId: values?.productionPlan,
      moPlanBoms: moPlanBomsTransform,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createProductionQcPlan(transformData, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...transformData,
        id,
      }
      actions.updateProductionQcPlan(paramUpdate, backToList)
    }
  }

  const renderActionButtons = ({ handleReset, validateForm }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={() => {
                setInitialValuesForm(initialValues)
                handleReset()
              }}
              variant="outlined"
              color="subText"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button
              type="submit"
              icon="save"
              onClick={() => {
                validateForm().then((res) => {
                  if (!isEmpty(res?.form)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tableDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  }
                })
              }}
            >
              {t('general:actionBar.create')}
            </Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button
              onClick={() => {
                setInitialValuesForm(saveInitLoadDetail)
                handleReset()
              }}
              variant="outlined"
              color="subText"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button
              type="submit"
              icon="save"
              onClick={() => {
                validateForm().then((res) => {
                  if (!isEmpty(res?.form)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tableDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  }
                })
              }}
            >
              {t('general:actionBar.save')}
            </Button>
          </>
        )
      default:
        break
    }
  }

  const getFormData = (data) => {
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          setForm((prevState) => ({
            ...prevState,
            [`${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`]:
              {
                id:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.id ||
                  undefined,
                type: rowProducingStep?.type,
                bomId: rowProducingStep?.bomId,
                routingId: rowProducingStep?.routingId,
                producingStepId: rowProducingStep?.producingStep?.id,
                itemId: rowProducingStep?.itemId,
                workOrderId: !isEmpty(rowProducingStep?.workOrders)
                  ? rowProducingStep?.workOrders[0]?.id
                  : null,
                qualityPointId:
                  rowProducingStep?.producingStep?.qualityPoint?.id,
                keyBomTree: rowProducingStep?.keyBomTree,
                planningQuantity: rowProducingStep?.planningQuantity,
                actualQuantityBom: rowProducingStep?.actualQuantityBom,
                actualQuantityProducingStep:
                  rowProducingStep?.actualQuantityProducingStep,
                numberOfTime:
                  rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
                formalityRate:
                  rowProducingStep?.producingStep?.qualityPoint?.formalityRate,
                //form-edit
                planErrorRate:
                  +rowProducingStep?.producingStep?.qualityPlanBom[0]
                    ?.planErrorRate,
                planQcQuantity:
                  +rowProducingStep?.producingStep?.qualityPlanBom[0]
                    ?.planQcQuantity,
                userQc1st:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                    (x) => x?.userId,
                  ),
                userQc2nd:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                    (x) => x?.userId,
                  ),
                productionQcPlanDate: [
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.planFrom,
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.planTo,
                ],
              },
          }))
        }
      })
      if (rowItem?.subBom.length > 0) {
        getFormData(rowItem?.subBom)
      }
    })
  }

  const convertInitFormData = (data) => {
    let result = {}
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          result[
            `${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`
          ] = {
            id:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.id ||
              undefined,
            type: rowProducingStep?.type,
            bomId: rowProducingStep?.bomId,
            routingId: rowProducingStep?.routingId,
            producingStepId: rowProducingStep?.producingStep?.id,
            itemId: rowProducingStep?.itemId,
            workOrderId: !isEmpty(rowProducingStep?.workOrders)
              ? rowProducingStep?.workOrders[0]?.id
              : null,
            qualityPointId: rowProducingStep?.producingStep?.qualityPoint?.id,
            numberOfTime:
              rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
            formalityRate:
              rowProducingStep?.producingStep?.qualityPoint?.formalityRate,
            keyBomTree: rowProducingStep?.keyBomTree,
            planningQuantity: rowProducingStep?.planningQuantity,
            actualQuantityBom: rowProducingStep?.actualQuantityBom,
            actualQuantityProducingStep:
              rowProducingStep?.actualQuantityProducingStep,
            //form-edit
            planErrorRate:
              +rowProducingStep?.producingStep?.qualityPlanBom[0]
                ?.planErrorRate || null,
            planQcQuantity:
              +rowProducingStep?.producingStep?.qualityPlanBom[0]
                ?.planQcQuantity || null,
            userQc1st:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                (x) => x?.userId,
              ) || [],
            userQc2nd:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                (x) => x?.userId,
              ) || [],
            productionQcPlanDate: [
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.planFrom ||
                null,
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.planTo ||
                null,
            ],
          }
        }
      })
      if (rowItem?.subBom.length > 0) {
        result = {
          ...result,
          ...convertInitFormData(rowItem?.subBom),
        }
      }
    })
    return result
  }

  useEffect(() => {
    if (!isEmpty(productionQcPlanDetail)) {
      const initDetail = {
        status: productionQcPlanDetail?.status,
        code: productionQcPlanDetail?.code,
        name: productionQcPlanDetail?.name,
        stageQc: productionQcPlanDetail?.qcStageId,
        mo: productionQcPlanDetail?.mo?.id,
        moName: productionQcPlanDetail?.mo?.name,
        moPlanDate: !isEmpty(productionQcPlanDetail?.mo)
          ? `${convertUtcDateToLocalTz(
              productionQcPlanDetail?.mo?.planFrom,
            )} - ${convertUtcDateToLocalTz(
              productionQcPlanDetail?.mo?.planTo,
            )} `
          : null,
        productionPlan: productionQcPlanDetail?.moPlan?.id,
        description: productionQcPlanDetail?.description,
        items: productionQcPlanDetail?.planBomOutputs,
        form: formInitDetail,
      }
      setSaveInitLoadDetail(initDetail)
      setInitialValuesForm(initDetail)
    }
  }, [productionQcPlanDetail, formInitDetail])

  //Handle onChange Autocomplete
  const onChangeMo = (moId, setFieldValue) => {
    if (!isNil(moId)) {
      const recordMo = outputMoList.find((x) => x.id === moId)
      setFieldValue('moName', recordMo?.name)
      setFieldValue(
        'moPlanDate',
        `${convertUtcDateToLocalTz(
          recordMo?.planFrom,
        )} - ${convertUtcDateToLocalTz(recordMo?.planTo)} `,
      )
      getProductionPlan(moId, setFieldValue)
    } else {
      // setProductionPlanList([])
      setFieldValue('moName', null)
      setFieldValue('moPlanDate', null)
      setFieldValue('productionPlan', null)
    }
    setFieldValue('items', [])
    setFieldValue('form', {})
  }

  const onChangeProductionPlan = (productionPlanId, setFieldValue, values) => {
    if (!isNil(productionPlanId)) {
      getProductionPlanDetail(productionPlanId, values)
    }
    setFieldValue('items', [])
    setFieldValue('form', {})
  }

  //Get data when on Change "Lệnh sản xuất (Mo)"
  const getProductionPlan = (moId) => {
    const params = {
      moId,
    }
    actions.getProductionPlanByMoId(params, (data) => {
      setProductionPlanList(data)
    })
  }

  //Get data when on Change "Kế hoạch sản xuất"
  const getProductionPlanDetail = (productionPlanId, values) => {
    const params = {
      id: productionPlanId,
      endpointPatch: ENDPOINT_PATCH_GET_DETAIL_MO_PLAN_OUTPUT,
    }
    actions.getProductionPlanDetail(params, (data) => {
      setInitialValuesForm({
        ...values,
        productionPlan: productionPlanId,
        items: data?.planBomOutputs,
        form: convertInitFormData(data?.planBomOutputs),
      })
    })
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValuesForm}
        validationSchema={productionOutputQualityControlPlanSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values, validateForm }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {!isNil(values?.status) && (
                    <Grid item xs={12}>
                      <LV
                        label={t('productionQualityControlPlan.status')}
                        value={
                          <Status
                            options={PRODUCTION_QC_PLAN_STATUS}
                            value={values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('productionQualityControlPlan.code')}
                      placeholder={t('productionQualityControlPlan.code')}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('productionQualityControlPlan.name')}
                      placeholder={t('productionQualityControlPlan.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stageQc"
                      label={t('productionQualityControlPlan.stageQc')}
                      disabled
                      required
                      options={STAGES || []}
                      getOptionValue={(option) => option?.value}
                      getOptionLabel={(option) => t(option?.text)}
                    />
                  </Grid>
                  <Hidden lgDown>
                    <Grid item lg={6} xs={12}></Grid>
                  </Hidden>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="mo"
                      label={t('productionQualityControlPlan.moCode')}
                      placeholder={t('productionQualityControlPlan.moCode')}
                      required
                      options={outputMoList || []}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.code}
                      onChange={(value) => onChangeMo(value, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="moName"
                      label={t('productionQualityControlPlan.moName')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="moPlanDate"
                      label={t('productionQualityControlPlan.moPlanDate')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="productionPlan"
                      label={t(
                        'productionQualityControlPlan.productionPlanCode',
                      )}
                      placeholder={t(
                        'productionQualityControlPlan.productionPlanCode',
                      )}
                      required
                      options={productionPlanList || []}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.code}
                      onChange={(value) =>
                        onChangeProductionPlan(value, setFieldValue, values)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('productionQualityControlPlan.description')}
                      placeholder={t(
                        'productionQualityControlPlan.description',
                      )}
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
            <Grid
              container
              rowSpacing={4 / 3}
              columnSpacing={{ xl: 8, xs: 4 }}
              sx={{ my: 2 }}
            >
              {/* Plan detail table */}
              <Grid item lg={12} xs={12}>
                <PlanDetailTable
                  items={values?.items}
                  mode={mode}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Grid>
            </Grid>
            <ActionBar
              onBack={backToList}
              elAfter={renderActionButtons({ handleReset, validateForm })}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ProductionOutputQualityControlPlanForm
