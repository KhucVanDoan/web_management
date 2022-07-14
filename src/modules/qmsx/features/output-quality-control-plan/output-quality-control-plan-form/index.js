import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { isNil, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
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
  STAGES_OUTPUT,
  STAGE_OPTION,
  OUTPUT_QC_PLAN_STATUS,
  OUTPUT_QC_PLAN_STATUS_OPTIONS,
} from '~/modules/qmsx/constants'
import useOutputQualityControlPlan from '~/modules/qmsx/redux/hooks/useOutputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'

import PlanDetailTable from './plan-detail-table'
import { OutputQualityControlPlanSchema } from './schema'

const ENDPOINT_PATCH_GET_OUTPUT_PLAN_BY_ORDER_ID = {
  SO: 'detail-so',
  PRO: 'detail-pro',
  EXO: 'detail-exo',
}

export const DEFAULT_ROW_TABLE = {
  id: undefined,
  userQc1st: [],
  userQc2nd: [],
  qcPlanDate: null,
  planErrorRate: null,
  qcPlanQuantity: null,
}

function OutputQualityControlPlanForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { outputQcPlanDetail, isLoading },
    actions,
  } = useOutputQualityControlPlan()
  const [outputOrderList, setOutputOrderList] = useState([])

  const MODE_MAP = {
    [ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    status: null,
    code: '',
    name: '',
    stageQc: null,
    order: null,
    description: '',
    qualityPlanIOqcs: [],
  }
  const [initialValuesForm, setInitialValuesForm] = useState(initialValues)
  const [saveInitialValuesDetailForm, setSaveInitialValuesDetailForm] =
    useState({})

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
        title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.PATH,
          title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.PATH,
          title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getOutputQcPlanDetailById(
        params,
        (data) => {
          if (+data.status !== OUTPUT_QC_PLAN_STATUS_OPTIONS.PENDING)
            return backToList()
          getOutputOrder(data?.qcStageId)
        },
        backToList,
      )
    }
    return () => {
      if (isUpdate) actions.resetOutputQcPlanDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  const onSubmit = (values) => {
    const transformData = {
      code: values?.code,
      name: values?.name,
      description: values?.description,
      qcStageId: +values?.stageQc,
      qualityPlanIOqcs: values?.qualityPlanIOqcs?.map((x) => ({
        actualQuantity: x?.actualQuantity,
        itemId: x?.itemId,
        orderId: values?.order,
        qcCheck: x?.qcCheck,
        qualityPointId: x?.qualityPoint?.id,
        quantity: x?.planQuantity,
        warehouseId: x?.warehouse?.id,
        id: x?.id,
        qualityPlanIOqcDetails: [
          {
            ordinalNumber: 1,
            id: x?.qualityPlanIOqcDetails
              ? x?.qualityPlanIOqcDetails[0]?.id
              : undefined,
            planErrorRate: +x?.planErrorRate,
            planQcQuantity: x?.qcPlanQuantity,
            qcDoneQuantity: x?.qcDoneQuantity ? x?.qcDoneQuantity : undefined,
            qcPassQuantity: x?.qcPassQuantity ? x?.qcPassQuantity : undefined,
            qualityPlanIOqcQualityPointUser1s: x?.userQc1st?.map((i) => ({
              userId: i,
            })),
            qualityPlanIOqcQualityPointUser2s: x?.userQc2nd?.map((i) => ({
              userId: i,
            })),
            planFrom: x?.qcPlanDate ? x?.qcPlanDate[0] : undefined,
            planTo: x?.qcPlanDate ? x?.qcPlanDate[1] : undefined,
          },
        ],
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createOutputQcPlan(transformData, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...transformData,
        id,
      }
      actions.updateOutputQcPlan(paramUpdate, backToList)
    }
  }

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button
              onClick={() => {
                setInitialValuesForm(initialValues)
                handleReset()
              }}
              variant="outlined"
              color="subText"
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit" icon="save">
              {t('general:actionBar.create')}
            </Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button
              onClick={() => {
                setInitialValuesForm(saveInitialValuesDetailForm)
                getOutputOrder(saveInitialValuesDetailForm?.stageQc)
                handleReset()
              }}
              variant="outlined"
              color="subText"
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit" icon="save">
              {t('general:actionBar.save')}
            </Button>
          </>
        )
      default:
        break
    }
  }

  const getFormData = (data) => {
    const result = data.map((x) => ({
      ...x,
      planErrorRate: !isEmpty(x?.qualityPlanIOqcDetails)
        ? +x?.qualityPlanIOqcDetails[0]?.planErrorRate
        : null,
      qcPlanQuantity: !isEmpty(x?.qualityPlanIOqcDetails)
        ? +x?.qualityPlanIOqcDetails[0]?.planQcQuantity
        : null,
      qcDoneQuantity: !isEmpty(x?.qualityPlanIOqcDetails)
        ? +x?.qualityPlanIOqcDetails[0]?.qcDoneQuantity
        : null,
      qcPassQuantity: !isEmpty(x?.qualityPlanIOqcDetails)
        ? +x?.qualityPlanIOqcDetails[0]?.qcPassQuantity
        : null,
      userQc1st: !isEmpty(x?.qualityPlanIOqcDetails)
        ? x?.qualityPlanIOqcDetails[0]?.qualityPlanIOqcQualityPointUser1s.map(
            (i) => i?.userId,
          )
        : [],
      userQc2nd: !isEmpty(x?.qualityPlanIOqcDetails)
        ? x?.qualityPlanIOqcDetails[0]?.qualityPlanIOqcQualityPointUser2s.map(
            (i) => i?.userId,
          )
        : [],
      qcPlanDate: [
        !isEmpty(x?.qualityPlanIOqcDetails)
          ? x?.qualityPlanIOqcDetails[0]?.planFrom
          : null,
        !isEmpty(x?.qualityPlanIOqcDetails)
          ? x?.qualityPlanIOqcDetails[0]?.planTo
          : null,
      ],
    }))
    return result
  }

  useEffect(() => {
    if (!isEmpty(outputQcPlanDetail)) {
      const initDetail = {
        status: outputQcPlanDetail?.status,
        code: outputQcPlanDetail?.code,
        name: outputQcPlanDetail?.name,
        stageQc: outputQcPlanDetail?.qcStageId,
        order: outputQcPlanDetail?.order?.id,
        description: outputQcPlanDetail?.description,
        qualityPlanIOqcs: getFormData(outputQcPlanDetail?.qualityPlanIOqcs),
      }
      setInitialValuesForm(initDetail)
      setSaveInitialValuesDetailForm(initDetail)
    }
  }, [outputQcPlanDetail])

  //Handle onChange Autocomplete
  const onChangeStageQc = (stageQcValue, setFieldValue) => {
    if (!isNil(stageQcValue)) {
      getOutputOrder(stageQcValue)
    } else {
      setFieldValue('order', null)
      setOutputOrderList([])
      setInitialValuesForm((prev) => ({
        ...prev,
        stageQc: null,
        order: null,
        qualityPlanIOqcs: [],
      }))
    }
  }

  const onChangeOrder = (stageQcValue, outputOrderId, values) => {
    if (!isNil(outputOrderId) && !isNil(stageQcValue)) {
      getOutputPlan(stageQcValue, outputOrderId, values)
    } else {
      setInitialValuesForm((prev) => ({
        ...prev,
        order: null,
        qualityPlanIOqcs: [],
      }))
    }
  }

  //Get data
  const getOutputOrder = (stageQcValue) => {
    const params = {
      stageQcValue,
    }
    actions.getOutputOrderByStageQc(params, (data) => {
      setOutputOrderList(data)
    })
  }

  const getOutputPlan = (stageQcValue, outputOrderId, values) => {
    let endpointPatch = null
    switch (+stageQcValue) {
      case STAGE_OPTION.SO_EXPORT:
        endpointPatch = ENDPOINT_PATCH_GET_OUTPUT_PLAN_BY_ORDER_ID.SO
        break
      case STAGE_OPTION.PRO_EXPORT:
        endpointPatch = ENDPOINT_PATCH_GET_OUTPUT_PLAN_BY_ORDER_ID.PRO
        break
      case STAGE_OPTION.EXO_EXPORT:
        endpointPatch = ENDPOINT_PATCH_GET_OUTPUT_PLAN_BY_ORDER_ID.EXO
        break
      default:
        break
    }
    const params = {
      endpointPatch: endpointPatch,
      id: outputOrderId,
    }
    actions.getOutputPlanByOrderId(params, (data) => {
      setInitialValuesForm({
        ...values,
        order: outputOrderId,
        qualityPlanIOqcs: getFormData(data?.qualityPlanIOqcs),
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
        validationSchema={OutputQualityControlPlanSchema(
          t,
          mode,
          outputQcPlanDetail?.status,
        )}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
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
                            {t('defineQualityAlert.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={OUTPUT_QC_PLAN_STATUS}
                            value={values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('outputQualityControlPlan.code')}
                      placeholder={t('outputQualityControlPlan.code')}
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
                      label={t('outputQualityControlPlan.name')}
                      placeholder={t('outputQualityControlPlan.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stageQc"
                      label={t('outputQualityControlPlan.stageQc')}
                      placeholder={t('outputQualityControlPlan.stageQc')}
                      required
                      options={STAGES_OUTPUT}
                      getOptionValue={(option) => option?.value}
                      getOptionLabel={(option) => t(option?.text)}
                      onChange={(value) =>
                        onChangeStageQc(value, setFieldValue)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="order"
                      label={t('outputQualityControlPlan.orderName')}
                      placeholder={t('outputQualityControlPlan.orderName')}
                      required
                      options={outputOrderList}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      onChange={(value) =>
                        onChangeOrder(values?.stageQc, value, values)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('outputQualityControlPlan.description')}
                      placeholder={t('outputQualityControlPlan.description')}
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
                  qualityPlanIOqcs={values?.qualityPlanIOqcs}
                  mode={mode}
                  setFieldValue={setFieldValue}
                />
              </Grid>
            </Grid>
            <ActionBar
              onBack={backToList}
              elAfter={renderActionButtons({ handleReset })}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default OutputQualityControlPlanForm
