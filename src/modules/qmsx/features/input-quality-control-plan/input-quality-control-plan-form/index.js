import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { isNil, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  STAGES_INPUT,
  STAGE_OPTION,
  INPUT_QC_PLAN_STATUS,
  INPUT_QC_PLAN_STATUS_OPTIONS,
} from '~/modules/qmsx/constants'
import useInputQualityControlPlan from '~/modules/qmsx/redux/hooks/useInputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'

import PlanDetailTable from './plan-detail-table'
import { InputQualityControlPlanSchema } from './schema'

const ENDPOINT_PATCH_GET_INPUT_PLAN_BY_ORDER_ID = {
  PO: 'detail-po',
  PRO: 'detail-pro',
}

export const DEFAULT_ROW_TABLE = {
  id: undefined,
  userQc1st: [],
  userQc2nd: [],
  qcPlanDate: null,
  planErrorRate: null,
  qcPlanQuantity: null,
}

function InputQualityControlPlanForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { inputQcPlanDetail, isLoading },
    actions,
  } = useInputQualityControlPlan()
  const [inputOrderList, setInputOrderList] = useState([])

  const MODE_MAP = {
    [ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const canUpdateQuantity =
    mode === MODAL_MODE.UPDATE &&
    (inputQcPlanDetail?.status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
      inputQcPlanDetail?.status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS)

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
  const [formValue, setForm] = useState([])

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
        title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.PATH,
          title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.PATH,
          title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getInputQcPlanDetailById(params, (data) => {
        getInputOrder(data?.qcStageId)
        getFormData(data?.qualityPlanIOqcs)
      })
    }
    return () => {
      if (isUpdate) actions.resetInputQcPlanDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  const onSubmit = (values) => {
    const transformData = {
      code: values?.code,
      name: values?.name,
      description: values?.description,
      qcStageId: values?.stageQc,
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
      actions.createInputQcPlan(transformData, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...transformData,
        id,
      }
      actions.updateInputQcPlan(paramUpdate, backToList)
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
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
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
                getInputOrder(saveInitialValuesDetailForm?.stageQc)
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
    setForm(result)
  }

  useEffect(() => {
    if (!isEmpty(inputQcPlanDetail)) {
      const initDetail = {
        status: inputQcPlanDetail?.status,
        code: inputQcPlanDetail?.code,
        name: inputQcPlanDetail?.name,
        stageQc: inputQcPlanDetail?.qcStageId,
        order: inputQcPlanDetail?.order?.id,
        description: inputQcPlanDetail?.description,
        qualityPlanIOqcs: formValue,
      }
      setInitialValuesForm(initDetail)
      setSaveInitialValuesDetailForm(initDetail)
    }
  }, [inputQcPlanDetail, formValue])

  //Handle onChange Autocomplete
  const onChangeStageQc = (stageQcValue, setFieldValue) => {
    if (!isNil(stageQcValue)) {
      getInputOrder(stageQcValue)
    } else {
      setFieldValue('order', null)
      setFieldValue('qualityPlanIOqcs', [])
      setInputOrderList([])
    }
  }

  const onChangeOrder = (stageQcValue, inputOrderId, setFieldValue, values) => {
    if (!isNil(inputOrderId) && !isNil(stageQcValue)) {
      getInputPlan(stageQcValue, inputOrderId, values)
    } else {
      setFieldValue('qualityPlanIOqcs', [])
    }
  }

  //Get data
  const getInputOrder = (stageQcValue) => {
    const params = {
      stageQcValue,
    }
    actions.getInputOrderByStageQc(params, (data) => {
      setInputOrderList(data)
    })
  }

  const getInputPlan = (stageQcValue, inputOrderId, values) => {
    const params = {
      endpointPatch:
        +stageQcValue === STAGE_OPTION.PO_IMPORT
          ? ENDPOINT_PATCH_GET_INPUT_PLAN_BY_ORDER_ID.PO
          : ENDPOINT_PATCH_GET_INPUT_PLAN_BY_ORDER_ID.PRO,
      id: inputOrderId,
    }
    actions.getInputPlanByOrderId(params, (data) => {
      setInitialValuesForm({
        ...values,
        order: inputOrderId,
        qualityPlanIOqcs: data?.qualityPlanIOqcs.map((x) => ({
          ...x,
          planErrorRate: !isEmpty(x?.qualityPlanIOqcDetails)
            ? x?.qualityPlanIOqcDetails[0]?.planErrorRate
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
        })),
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
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValuesForm}
            validationSchema={InputQualityControlPlanSchema(
              t,
              mode,
              inputQcPlanDetail?.status,
            )}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                  sx={{ my: 2 }}
                >
                  {!isNil(values?.status) && (
                    <Grid item xs={12}>
                      <LV
                        label={t('defineQualityAlert.status')}
                        value={
                          <Status
                            options={INPUT_QC_PLAN_STATUS}
                            value={values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('inputQualityControlPlan.code')}
                      placeholder={t('inputQualityControlPlan.code')}
                      disabled={isUpdate || canUpdateQuantity}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('inputQualityControlPlan.name')}
                      placeholder={t('inputQualityControlPlan.name')}
                      disabled={canUpdateQuantity}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stageQc"
                      label={t('inputQualityControlPlan.stageQc')}
                      placeholder={t('inputQualityControlPlan.stageQc')}
                      required
                      disabled={canUpdateQuantity}
                      options={STAGES_INPUT}
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
                      label={t('inputQualityControlPlan.orderName')}
                      placeholder={t('inputQualityControlPlan.orderName')}
                      required
                      disabled={canUpdateQuantity}
                      options={inputOrderList}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      onChange={(value) =>
                        onChangeOrder(
                          values?.stageQc,
                          value,
                          setFieldValue,
                          values,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('inputQualityControlPlan.description')}
                      placeholder={t('inputQualityControlPlan.description')}
                      disabled={canUpdateQuantity}
                      multiline
                      rows={3}
                    />
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
        </Grid>
      </Grid>
    </Page>
  )
}

export default InputQualityControlPlanForm
