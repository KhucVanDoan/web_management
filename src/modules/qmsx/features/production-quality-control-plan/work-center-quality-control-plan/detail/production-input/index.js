import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WORK_CENTER_PLAN_STATUS,
  ENDPOINT_PATCH_UPDATE_WORK_CENTER_QC_PLAN,
} from '~/modules/qmsx/constants'
import useWorkCenterQualityControlPlan from '~/modules/qmsx/redux/hooks/useWorkCenterQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'
import qs from '~/utils/qs'

const WorkCenterQualityControlPlanProductionInputDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['qmsx'])
  const location = useLocation()
  const par = useParams()
  const urlSearchParams = qs.parse(location.search)

  const {
    data: { wcQcPlanDetail, isLoading },
    actions,
  } = useWorkCenterQualityControlPlan()

  useEffect(() => {
    const params = {
      productionQcPlanId: urlSearchParams.productionQcPlanId,
      workCenterId: urlSearchParams.workCenterId,
      workOrderId: urlSearchParams.workOrderId,
      workOrderScheduleId: par?.id,
      endpointPatch: ENDPOINT_PATCH_UPDATE_WORK_CENTER_QC_PLAN.INPUT_SCHEDULES,
    }
    actions.getWorkCenterQualityControlPlanDetail(params, _, backToList)
    return () => {
      actions.resetWorkCenterQualityControlPlanDetailState()
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
      route: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_INPUT.PATH,
      title: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL_INPUT.TITLE,
    },
  ]

  const backToList = () => {
    history.push(
      `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH}?productionQcPlanId=${urlSearchParams.productionQcPlanId}&moPlanId=${urlSearchParams.moPlanId}&qcStageId=${urlSearchParams.qcStageId}`,
    )
  }

  const getColumnManufacturing = () => {
    const columns = [
      {
        field: 'title',
        headerName: t(
          'workCenterQualityControlPlan.headerTableDetail.material',
        ),
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.plan'),
        width: 150,
      },
    ]
    if (wcQcPlanDetail) {
      wcQcPlanDetail?.workInDayWc?.dayInShift?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: convertUtcDateToLocalTz(e?.executionDay),
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
    wcQcPlanDetail?.workInDayWc?.dayInShift?.forEach((e) => {
      if (maxLength < e?.scheduleShiftDetails?.length)
        maxLength = e?.scheduleShiftDetails?.length
    })
    wcQcPlanDetail?.workInDayWc?.dayInShift?.forEach((e) => {
      if (maxLength === e?.scheduleShiftDetails.length)
        title = e?.scheduleShiftDetails.map((v) => v?.itemMaterialName)
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

      wcQcPlanDetail?.workInDayWc?.dayInShift?.forEach((e) => {
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

    wcQcPlanDetail?.workInDayWc?.dayInShift?.forEach((i) => {
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

  const getColumnQC = () => {
    const columns = [
      {
        field: 'title',
        headerName: t(
          'workCenterQualityControlPlan.headerTableDetail.material',
        ),
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterQualityControlPlan.headerTableDetail.plan'),
        width: 130,
      },
    ]
    if (wcQcPlanDetail) {
      wcQcPlanDetail?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: convertUtcDateToLocalTz(e?.executionDay),
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

  const getRowQC = () => {
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
    wcQcPlanDetail?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    wcQcPlanDetail?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.itemMaterialName)
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
      if (wcQcPlanDetail?.workInShiftQcPlan?.isDefault) {
        planingAmount['plan'] = t(
          `workCenterQualityControlPlan.headerTableDetail.planingAmountDefault`,
        )
      } else {
        planingAmount['plan'] = t(
          `workCenterQualityControlPlan.headerTableDetail.planingAmount`,
        )
      }
      planModeration['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.planModeration`,
      )
      productAmount['plan'] = t(
        `workCenterQualityControlPlan.headerTableDetail.qcAmount`,
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

      wcQcPlanDetail?.workInShiftQcPlan?.dayInShift?.forEach((e) => {
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

    wcQcPlanDetail?.workInShiftQcPlan?.dayInShift?.forEach((i) => {
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.workCenterQualityControlPlanDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
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
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="span">
          {t('workCenterQualityControlPlan.productionScheduleDetails')}
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
          {t('workCenterQualityControlPlan.qualityControlScheduleDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowQC().shifts}
        columns={getColumnQC()}
        rowSpanMatrix={getRowQC().matrix}
        rowGrayMatrix={getRowQC().rowGrayMatrix}
        striped={false}
        hideSetting
        hideFooter
      ></DataTable>
      <ActionBar onBack={backToList} />
    </Page>
  )
}
export default WorkCenterQualityControlPlanProductionInputDetail
