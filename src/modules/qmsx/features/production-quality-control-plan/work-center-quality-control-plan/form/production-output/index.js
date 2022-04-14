import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isBefore } from 'date-fns'
import { Formik, Form } from 'formik'
import { isNil } from 'lodash'
import qs from 'query-string'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'

import { DATE_FORMAT, MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WORK_CENTER_PLAN_STATUS,
  TYPE_WC_QC_PLAN,
  ENDPOINT_PATCH_UPDATE_WORK_CENTER_QC_PLAN,
} from '~/modules/qmsx/constants'
import useWorkCenterQualityControlPlan from '~/modules/qmsx/redux/hooks/useWorkCenterQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const KEY_ROW_TABLE = {
  PLAN_QUANTITY: 1, //Số lượng kế hoạch
  MODERATION_QUANTITY: 2, //Điều độ kế hoạch
  ACTUAL_QUANTITY: 3, //Số lượng QC hoặc Số lượng sản xuất
  DELAY_QUANTITY: 4, //Số lượng trễ
}

const WorkCenterQualityControlPlanProductionOuputForm = () => {
  const history = useHistory()
  const { t } = useTranslation(['qmsx'])
  const routeMatch = useRouteMatch()
  const par = useParams()
  const location = useLocation()
  const urlSearchParams = qs.parse(location.search)
  const dateTimeNow = new Date().toDateString()

  const {
    data: { wcQcPlanDetail, isLoading },
    actions,
  } = useWorkCenterQualityControlPlan()

  const MODE_MAP = {
    [ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_OUTPUT.PATH]:
      MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const params = {
        productionQcPlanId: urlSearchParams.productionQcPlanId,
        workCenterId: urlSearchParams.workCenterId,
        workOrderId: urlSearchParams.workOrderId,
        workOrderScheduleId: par?.id,
        endpointPatch:
          ENDPOINT_PATCH_UPDATE_WORK_CENTER_QC_PLAN.OUTPUT_SCHEDULES,
      }
      actions.getWorkCenterQualityControlPlanDetail(params, _, backToList)
    }
    return () => {
      if (isUpdate) actions.resetWorkCenterQualityControlPlanDetailState()
    }
  }, [
    urlSearchParams.productionQcPlanId,
    urlSearchParams.workCenterId,
    urlSearchParams.workOrderId,
    par?.id,
  ])

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
      title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
    },
    {
      route: `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH}?productionQcPlanId=${urlSearchParams.productionQcPlanId}&moPlanId=${urlSearchParams.moPlanId}&qcStageId=${urlSearchParams.qcStageId}`,
      title: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.TITLE,
    },
    {
      route: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_OUTPUT.PATH,
      title: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT_OUTPUT.TITLE,
    },
  ]

  const backToList = () => {
    history.push(
      `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH}?productionQcPlanId=${urlSearchParams.productionQcPlanId}&moPlanId=${urlSearchParams.moPlanId}&qcStageId=${urlSearchParams.qcStageId}`,
    )
  }

  // Kế hoạch sản xuất
  const getColumnManufacturing = () => {
    const columns = [
      {
        field: 'title',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.shift'),
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.plan'),
        width: 150,
      },
    ]
    if (wcQcPlanDetail) {
      wcQcPlanDetail?.workInShiftWc?.dayInShift?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          align: 'center',
        })
      })
    }
    columns.push({
      field: 'total',
      headerName: t(`workCenterQualityControlPlan.headerTableDetail.sum`),
    })
    return columns
  }

  const getRowManufacturing = () => {
    let shift = []
    let title = []
    let maxLength = 0
    let totalDelayAmount = 0
    let matrix = [
      [3, 1, 1],
      [-1, 1, 1],
      [-1, 1, 1],
    ]
    let rowGrayMatrix = []
    wcQcPlanDetail?.workInShiftWc?.dayInShift?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    wcQcPlanDetail?.workInShiftWc?.dayInShift?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.numberOfShift)
    })
    for (let i = 0; i < maxLength; i++) {
      let shiftTemp = [
        {
          plan: t(
            `workCenterQualityControlPlan.headerTableDetail.planingAmount`,
          ),
          total: 0,
        },
        {
          plan: t(
            `workCenterQualityControlPlan.headerTableDetail.planModeration`,
          ),
          total: 0,
        },
        {
          plan: t(
            `workCenterQualityControlPlan.headerTableDetail.productAmount`,
          ),
          total: 0,
        },
      ]
      const planingAmount = {}
      const planModeration = {}
      const productAmount = {}
      let totalPlaningAmount = 0
      let totalPlanModeration = 0
      let totalProductAmount = 0

      planingAmount['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.planingAmount`,
      )
      planModeration['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.planModeration`,
      )
      productAmount['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.productAmount`,
      )
      planingAmount['title'] = title[i]

      matrix = matrix.concat([
        [3, 1, 1],
        [-1, 1, 1],
        [-1, 1, 1],
      ])
      if (i % 2 !== 0) {
        rowGrayMatrix = rowGrayMatrix.concat([true, true, true])
      } else {
        rowGrayMatrix = rowGrayMatrix.concat([false, false, false])
      }

      wcQcPlanDetail?.workInShiftWc?.dayInShift?.forEach((e) => {
        for (let j = 0; j < e.scheduleShiftDetails.length; j++) {
          planingAmount[e.executionDay] =
            e?.scheduleShiftDetails[i]?.planQuantity
          totalPlaningAmount += e?.scheduleShiftDetails[i]?.planQuantity
          planModeration[e.executionDay] =
            e?.scheduleShiftDetails[i]?.moderationQuantity
          totalPlanModeration += e?.scheduleShiftDetails[i]?.moderationQuantity
          productAmount[e.executionDay] =
            e?.scheduleShiftDetails[i]?.actualQuantity
          totalProductAmount = e?.scheduleShiftDetails[i]?.actualQuantity
        }
      })
      planingAmount['total'] = totalPlaningAmount / maxLength
      planModeration['total'] = totalPlanModeration / maxLength
      productAmount['total'] = totalProductAmount / maxLength

      shiftTemp = [planingAmount, planModeration, productAmount]
      shift.push(shiftTemp)
    }
    shift = shift.flat()

    const delayAmount = {
      plan: t(`workCenterQualityControlPlan.headerTableDetail.delayAmount`),
    }

    wcQcPlanDetail?.workInShiftWc?.dayInShift?.forEach((i) => {
      const quantity =
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.planQuantity
        }, 0) -
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.actualQuantity
        }, 0)
      delayAmount[i.executionDay] = quantity
      totalDelayAmount += quantity
    })
    delayAmount['total'] = totalDelayAmount

    const rowDelayAmount = [delayAmount]
    return { shifts: shift.concat(rowDelayAmount), matrix, rowGrayMatrix }
  }

  // Kế hoạch QC
  const getColumnQC = (values) => {
    const columns = [
      {
        field: 'title',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.shift'),
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.plan'),
        width: 130,
      },
    ]
    if (values) {
      values?.workInShiftQcPlan?.dayInShift?.forEach((e, idx) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          align: 'center',
          width: 130,
          renderCell: (params) => {
            const { keyRow, title } = params?.row
            //title là số ca trong ngày
            if (keyRow === KEY_ROW_TABLE.PLAN_QUANTITY) {
              return (
                <Field.TextField
                  name={`workInShiftQcPlan.dayInShift[${idx}].scheduleShiftDetails[${
                    +title - 1
                  }].planQuantity`}
                  type="number"
                  allow={new RegExp()} //@TODO: Xóa khi common textfield được sửa lại 08/04/2022
                  validate={(val) => {
                    if (typeof val === 'string' && val === '')
                      return t('general:form.required')
                    if (typeof val === 'number' && isNil(val))
                      return t('general:form.required')
                    if (typeof val === 'number' && !isNil(val) && +val < 0)
                      return t('general:form.minNumber', { min: 0 })
                  }}
                  disabled={isBefore(
                    new Date(e?.executionDay),
                    new Date(dateTimeNow),
                  )}
                />
              )
            } else return params?.row[e.executionDay]
          },
        })
      })
    }
    columns.push({
      field: 'total',
      headerName: t(`workCenterQualityControlPlan.headerTableDetail.sum`),
    })
    return columns
  }

  const getRowQC = (values) => {
    let shift = []
    let title = []
    let maxLength = 0
    let totalDelayAmount = 0
    let matrix = [
      [3, 1, 1],
      [-1, 1, 1],
      [-1, 1, 1],
    ]
    let rowGrayMatrix = []
    values?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    values?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.numberOfShift)
    })
    for (let i = 0; i < maxLength; i++) {
      let shiftTemp = [
        {
          plan: t(
            `workCenterQualityControlPlan.headerTableDetail.planingAmountDefault`,
          ),
          total: 0,
        },
        {
          plan: t(
            `workCenterQualityControlPlan.headerTableDetail.planModeration`,
          ),
          total: 0,
        },
        {
          plan: t(`workCenterQualityControlPlan.headerTableDetail.qcAmount`),
          total: 0,
        },
      ]
      const planingAmount = {}
      const planModeration = {}
      const productAmount = {}
      let totalPlaningAmount = 0
      let totalPlanModeration = 0
      let totalProductAmount = 0
      if (values?.workInShiftQcPlan?.isDefault) {
        planingAmount['plan'] = t(
          `workCenterQualityControlPlan.headerTableDetail.planingAmountDefault`,
        )
      } else {
        planingAmount['plan'] = t(
          `workCenterQualityControlPlan.headerTableDetail.planingAmount`,
        )
      }
      planingAmount['keyRow'] = KEY_ROW_TABLE.PLAN_QUANTITY

      planModeration['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.planModeration`,
      )
      planModeration['keyRow'] = KEY_ROW_TABLE.MODERATION_QUANTITY

      productAmount['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.qcAmount`,
      )
      productAmount['keyRow'] = KEY_ROW_TABLE.ACTUAL_QUANTITY
      planingAmount['title'] = title[i]
      matrix = matrix.concat([
        [3, 1, 1],
        [-1, 1, 1],
        [-1, 1, 1],
      ])
      if (i % 2 !== 0) {
        rowGrayMatrix = rowGrayMatrix.concat([true, true, true])
      } else {
        rowGrayMatrix = rowGrayMatrix.concat([false, false, false])
      }

      values?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
        for (let j = 0; j < e.scheduleShiftDetails.length; j++) {
          planingAmount[e.executionDay] =
            e?.scheduleShiftDetails[i]?.planQuantity
          totalPlaningAmount += +e?.scheduleShiftDetails[i]?.planQuantity
          planModeration[e.executionDay] =
            e?.scheduleShiftDetails[i]?.moderationQuantity
          totalPlanModeration += e?.scheduleShiftDetails[i]?.moderationQuantity
          productAmount[e.executionDay] =
            e?.scheduleShiftDetails[i]?.actualQuantity
          totalProductAmount = e?.scheduleShiftDetails[i]?.actualQuantity
        }
      })
      planingAmount['total'] = totalPlaningAmount / maxLength
      planModeration['total'] = totalPlanModeration / maxLength
      productAmount['total'] = totalProductAmount / maxLength

      shiftTemp = [planingAmount, planModeration, productAmount]
      shift.push(shiftTemp)
    }
    shift = shift.flat()

    const delayAmount = {
      plan: t(`workCenterQualityControlPlan.headerTableDetail.delayAmount`),
    }

    values?.workInShiftQcPlan?.dayInShift?.forEach((i) => {
      const quantity =
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.planQuantity
        }, 0) -
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.actualQuantity
        }, 0)
      delayAmount[i.executionDay] = quantity
      totalDelayAmount += quantity
    })
    delayAmount['total'] = totalDelayAmount

    const rowDelayAmount = [delayAmount]
    return { shifts: shift.concat(rowDelayAmount), matrix, rowGrayMatrix }
  }

  const onSubmit = (values) => {
    const paramsUpdate = {
      type: TYPE_WC_QC_PLAN.OUTPUT,
      workCenterId: wcQcPlanDetail.workCenterId,
      workOrderId: wcQcPlanDetail.workOrderId,
      workInShiftQcPlan: values.workInShiftQcPlan,
    }
    if (mode === MODAL_MODE.UPDATE) {
      actions.updateWorkCenterQualityControlPlan(paramsUpdate, backToList)
    }
  }

  const initialValues = {
    workInShiftQcPlan: wcQcPlanDetail?.workInShiftQcPlan,
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.workCenterQualityControlPlanEdit')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {!isNil(wcQcPlanDetail?.workCenterDetail?.status) && (
                    <Grid item xs={12}>
                      <LV
                        label={t('workCenterQualityControlPlan.status')}
                        value={
                          <Status
                            options={WORK_CENTER_PLAN_STATUS}
                            value={wcQcPlanDetail?.workCenterDetail?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('workCenterQualityControlPlan.name')}
                      value={wcQcPlanDetail?.workCenterDetail?.wcName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('workCenterQualityControlPlan.leader')}
                      value={wcQcPlanDetail?.workCenterDetail?.leaderName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('workCenterQualityControlPlan.member')}
                      value={wcQcPlanDetail?.workCenterDetail?.members
                        ?.map((e) => e.username)
                        ?.join(', ')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('workCenterQualityControlPlan.performance')}
                      value={wcQcPlanDetail?.workCenterDetail?.planQuantity}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Typography variant="h4" component="span">
                    {t(
                      'workCenterQualityControlPlan.productionScheduleDetails',
                    )}
                  </Typography>
                </Box>
                <DataTable
                  rows={getRowManufacturing()?.shifts}
                  columns={getColumnManufacturing()}
                  rowSpanMatrix={getRowManufacturing().matrix}
                  rowGrayMatrix={getRowManufacturing().rowGrayMatrix}
                  striped={false}
                  hideSetting
                  hideFooter
                ></DataTable>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Typography variant="h4" component="span">
                    {t(
                      'workCenterQualityControlPlan.qualityControlScheduleDetails',
                    )}
                  </Typography>
                </Box>
                <DataTable
                  rows={getRowQC(values).shifts}
                  columns={getColumnQC(values)}
                  rowSpanMatrix={getRowQC(values).matrix}
                  rowGrayMatrix={getRowQC(values).rowGrayMatrix}
                  striped={false}
                  hideSetting
                  hideFooter
                ></DataTable>
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
export default WorkCenterQualityControlPlanProductionOuputForm
