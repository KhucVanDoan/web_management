import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { WORK_CENTER_PLAN_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useWorkCenterPlan from '~/modules/mesx/redux/hooks/useWorkCenterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const DetailWorkCenterPlan = () => {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])

  const {
    data: { wcpStructure, isLoading },
    actions,
  } = useWorkCenterPlan()
  const location = useLocation()
  useEffect(() => {
    actions.generateWorkCenterPlan({
      id: location.state.id,
      workCenterId: location.state.workCenterId,
    })
  }, [location.state.id, location.state.workCenterId])
  const breadcrumbs = [
    {
      title: 'database',
    },
    {
      route: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
      title: ROUTE.WORK_CENTER_PLAN.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(ROUTE.WORK_CENTER_PLAN.LIST.PATH)
  }

  const getColumnManufacturing = () => {
    const columns = [
      {
        field: 'title',
        headerName: '',
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterPlan.plan'),
        width: 150,
      },
    ]
    if (wcpStructure) {
      wcpStructure?.workCenterScheduleDetails?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          align: 'center',
        })
      })
    }
    columns.push({
      field: 'total',
      headerName: t(`workCenterPlan.sum`),
    })

    return columns
  }
  const getRowManufacturing = () => {
    let shift = []
    let title = []
    let maxLength = 0
    let totalDelayAmount = 0
    let matrix = []
    let rowGrayMatrix = []
    wcpStructure?.workCenterScheduleDetails?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    wcpStructure?.workCenterScheduleDetails?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.name)
    })
    shift = []
    for (let i = 0; i < maxLength; i++) {
      const planingAmount = {}
      const planModeration = {}
      const productAmount = {}
      let totalPlaningAmount = 0
      let totalPlanModeration = 0
      let totalProductAmount = 0
      planingAmount['plan'] = t(`workCenterPlan.planingAmount`)
      planModeration['plan'] = t(`workCenterPlan.planModeration`)
      productAmount['plan'] = t(`workCenterPlan.productAmount`)
      planingAmount['title'] = title[i]
      if (i === maxLength - 1) {
        matrix.push([4, 1], [-1, 1], [-1, 1], [-1, 1])
      } else {
        matrix.push([3, 1], [-1, 1], [-1, 1])
      }
      wcpStructure?.workCenterScheduleDetails?.forEach((e) => {
        for (let j = 0; j < e.scheduleShiftDetails.length; j++) {
          planingAmount[e.executionDay] = e?.scheduleShiftDetails[i]?.quantity
          totalPlaningAmount += e?.scheduleShiftDetails[i]?.quantity
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

      shift.push(...[planingAmount, planModeration, productAmount])
    }
    const delayAmount = {
      plan: t(`workCenterPlan.delayAmount`),
    }

    wcpStructure?.workCenterScheduleDetails?.forEach((i) => {
      const quantity =
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.quantity
        }, 0) -
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.actualQuantity
        }, 0)
      delayAmount[i.executionDay] = quantity
      totalDelayAmount += quantity
    })
    delayAmount['total'] = totalDelayAmount

    const rowDelayAmount = delayAmount
    if (shift?.length > 0) {
      shift.push(rowDelayAmount)
    } else {
      shift = []
    }
    return { shifts: shift, matrix, rowGrayMatrix }
  }

  const getColumnQC = () => {
    const columns = [
      {
        field: 'title',
        headerName: '',
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterPlan.plan'),
        width: 130,
      },
    ]
    if (wcpStructure) {
      wcpStructure?.defaultScheduleQcDetails?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          align: 'center',
        })
      })
    }
    columns.push({
      field: 'total',
      headerName: t(`workCenterPlan.sum`),
    })

    return columns
  }
  const getRowQC = () => {
    let shift = []
    let title = []
    let maxLength = 0
    let totalDelayAmount = 0
    let matrix = []
    let rowGrayMatrix = []
    wcpStructure?.defaultScheduleQcDetails?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    wcpStructure?.defaultScheduleQcDetails?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.name)
    })
    for (let i = 0; i < maxLength; i++) {
      const planingAmount = {}
      const planModeration = {}
      const productAmount = {}
      let totalPlaningAmount = 0
      let totalPlanModeration = 0
      let totalProductAmount = 0
      matrix = []
      rowGrayMatrix = []
      planingAmount['plan'] = t(`workCenterPlan.planingAmount`)
      planModeration['plan'] = t(`workCenterPlan.planModeration`)
      productAmount['plan'] = t(`workCenterPlan.productAmount`)
      planingAmount['title'] = title[i]

      if (i === maxLength - 1) {
        matrix.push([4, 1], [-1, 1], [-1, 1], [-1, 1])
      } else {
        matrix.push([3, 1], [-1, 1], [-1, 1])
      }

      wcpStructure?.defaultScheduleQcDetails?.forEach((e) => {
        for (let j = 0; j < e.scheduleShiftDetails.length; j++) {
          planingAmount[e.executionDay] = e?.scheduleShiftDetails[i]?.quantity
          totalPlaningAmount += e?.scheduleShiftDetails[i]?.quantity
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

      shift.push(...[planingAmount, planModeration, productAmount])
    }
    const delayAmount = {
      plan: t(`workCenterPlan.delayAmount`),
    }

    wcpStructure?.defaultScheduleQcDetails?.forEach((i) => {
      const quantity =
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.quantity
        }, 0) -
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.actualQuantity
        }, 0)
      delayAmount[i.executionDay] = quantity
      totalDelayAmount += quantity
    })
    delayAmount['total'] = totalDelayAmount

    const rowDelayAmount = delayAmount
    if (shift?.length > 0) {
      shift.push(rowDelayAmount)
    } else {
      shift = []
    }
    return { shifts: shift, matrix, rowGrayMatrix }
  }

  const getColumnFix = () => {
    const columns = [
      {
        field: 'title',
        headerName: '',
        width: 50,
      },
      {
        field: 'plan',
        headerName: t('workCenterPlan.plan'),
        width: 130,
      },
    ]
    if (wcpStructure) {
      wcpStructure?.workCenterRepairScheduleDetails?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          align: 'center',
        })
      })
    }
    columns.push({
      field: 'total',
      headerName: t(`workCenterPlan.sum`),
    })

    return columns
  }
  const getRowFix = () => {
    let shift = []
    let title = []
    let maxLength = 0
    let totalDelayAmount = 0
    let matrix = []
    let rowGrayMatrix = []
    wcpStructure?.workCenterRepairScheduleDetails?.forEach((e) => {
      if (maxLength < e.scheduleShiftDetails.length)
        maxLength = e.scheduleShiftDetails.length
    })
    wcpStructure?.workCenterRepairScheduleDetails?.forEach((e) => {
      if (maxLength === e.scheduleShiftDetails.length)
        title = e.scheduleShiftDetails.map((v) => v.name)
    })

    for (let i = 0; i < maxLength; i++) {
      const planingAmount = {}
      const planModeration = {}
      const productAmount = {}
      let totalPlaningAmount = 0
      let totalPlanModeration = 0
      let totalProductAmount = 0
      matrix = []
      rowGrayMatrix = []
      planingAmount['plan'] = t(`workCenterPlan.planingAmount`)
      planModeration['plan'] = t(`workCenterPlan.planModeration`)
      productAmount['plan'] = t(`workCenterPlan.productAmount`)
      planingAmount['title'] = title[i]
      if (i === maxLength - 1) {
        matrix.push([4, 1], [-1, 1], [-1, 1], [-1, 1])
      } else {
        matrix.push([3, 1], [-1, 1], [-1, 1])
      }
      wcpStructure?.workCenterRepairScheduleDetails?.forEach((e) => {
        for (let j = 0; j < e.scheduleShiftDetails.length; j++) {
          planingAmount[e.executionDay] = e?.scheduleShiftDetails[i]?.quantity
          totalPlaningAmount += e?.scheduleShiftDetails[i]?.quantity
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

      shift.push(...[planingAmount, planModeration, productAmount])
    }
    const delayAmount = {
      plan: t(`workCenterPlan.delayAmount`),
    }

    wcpStructure?.workCenterRepairScheduleDetails?.forEach((i) => {
      const quantity =
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.quantity
        }, 0) -
        i.scheduleShiftDetails.reduce((a, b) => {
          return a + b.actualQuantity
        }, 0)
      delayAmount[i.executionDay] = quantity
      totalDelayAmount += quantity
    })
    delayAmount['total'] = totalDelayAmount

    const rowDelayAmount = delayAmount
    if (shift?.length > 0) {
      shift.push(rowDelayAmount)
    } else {
      shift = []
    }
    return { shifts: shift, matrix, rowGrayMatrix }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.detailWorkCenterPlan')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(wcpStructure?.workOrderScheduleDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('workCenterPlan.status')}
                  value={
                    <Status
                      options={WORK_CENTER_PLAN_STATUS_OPTIONS}
                      value={wcpStructure?.workOrderScheduleDetail?.status}
                    />
                  }
                />
              </Grid>
            )}

            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.name')}
                value={wcpStructure?.workCenter?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.leader')}
                value={wcpStructure?.workCenter?.leader?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.member')}
                value={wcpStructure?.workCenter?.members
                  ?.map((e) => e.fullName)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenterPlan.performance')}
                value={wcpStructure?.workOrderScheduleDetail?.quantity}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="span">
          {t('workCenterPlan.workCenterScheduleDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowManufacturing().shifts}
        columns={getColumnManufacturing()}
        rowSpanMatrix={getRowManufacturing().matrix}
        rowGrayMatrix={getRowManufacturing().rowGrayMatrix}
        striped={false}
        hideSetting
        hideFooter
      ></DataTable>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="span">
          {t('workCenterPlan.defaultScheduleQcDetails')}
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
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="span">
          {t('workCenterPlan.workCenterRepairScheduleDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowFix().shifts}
        columns={getColumnFix()}
        rowSpanMatrix={getRowFix().matrix}
        rowGrayMatrix={getRowFix().rowGrayMatrix}
        striped={false}
        hideSetting
        hideFooter
      ></DataTable>
      <ActionBar onBack={backToList} />
    </Page>
  )
}
export default DetailWorkCenterPlan
