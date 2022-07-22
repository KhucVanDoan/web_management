import React, { useEffect } from 'react'

import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTION_MAP,
  CREATE_PLAN_STATUS_OPTIONS,
  WORK_TYPE,
} from '~/modules/mmsx/constants'
import TableCollsape from '~/modules/mmsx/features/device-assign/table-maintenance'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.CREATE_PLAN.LIST.PATH,
    title: ROUTE.CREATE_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.CREATE_PLAN.DETAIL.PATH,
    title: ROUTE.CREATE_PLAN.DETAIL.TITLE,
  },
]

const CreatePlanDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { detailPlan, isLoading },
    actions,
  } = useCreatePlan()

  const {
    data: { responsibleSubject },
    actions: commonAction,
  } = useCommonInfo()
  useEffect(() => {
    actions.getDetailPlan(id)
    return () => {
      actions.resetStateCreatePlan()
    }
  }, [id])
  useEffect(() => {
    commonAction.getResponsibleSubject()
  }, [])
  const backToList = () => {
    history.push(ROUTE.CREATE_PLAN.LIST.PATH)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)}
          >
            {t('supplies.button.device')}
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.JOB.LIST.PATH)}
          >
            {t('createPlanList.jobBtn')}
          </Button>
        </Box>
      </>
    )
  }

  const columnJobReal = [
    {
      field: 'jobName',
      headerName: t('createPlanList.form.table.jobName'),
      width: 100,
    },
    {
      field: 'jobType',
      headerName: t('createPlanList.form.table.jobType'),
      width: 100,
    },
    {
      field: 'serial',
      headerName: t('createPlanList.form.table.serial'),
      width: 150,
    },
    {
      field: 'deviceName',
      headerName: t('createPlanList.form.table.deviceName'),
      width: 150,
    },
    {
      field: 'description',
      headerName: t('createPlanList.form.table.description'),
      width: 150,
    },
    {
      field: 'expectedDate',
      headerName: t('createPlanList.form.table.expectedDate'),
      width: 150,
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
    },
  ]

  const columnsJobPlan = [
    {
      field: 'index',

      width: 50,
    },
    {
      field: 'type',
      headerName: t('createPlanList.form.table.jobType'),
      width: 200,
    },
    {
      field: 'number',
      headerName: t('createPlanList.form.table.planQuantity'),
      width: 50,
    },
  ]
  const subColumns = [
    {
      field: 'index',
      headerName: '#',
    },
    {
      field: 'deviceName',
      headerName: t('createPlanList.form.subTable.deviceName'),
    },
    {
      field: 'serial',
      headerName: t('createPlanList.form.subTable.serial'),
    },
    {
      field: 'assignUser',
      headerName: t('createPlanList.form.subTable.assignUser'),
    },
    {
      field: 'datePlan',
      headerName: t('createPlanList.form.subTable.datePlan'),
    },
    {
      field: 'dateReal',
      headerName: t('createPlanList.form.subTable.dateReal'),
    },
    {
      field: 'action',
      headerName: t('createPlanList.form.subTable.action'),
      renderCell: (params) => {
        const { id } = params?.row
        return (
          id && (
            <IconButton onClick={() => history.push()}>
              <Icon name="show" />
            </IconButton>
          )
        )
      },
    },
  ]
  const getRow = () => {
    const listPeriodCheck = detailPlan?.jobDrafts?.filter(
      (item) => item?.type === WORK_TYPE?.PERIOD_CHECK,
    )

    const listMaintain = detailPlan?.jobDrafts?.filter(
      (item) => item?.type === WORK_TYPE.SCHEDULE_MAINTAIN,
    )

    const rows = [
      {
        type: t('createPlanList.jobType.maintainPeriod'),
        number: detailPlan?.jobTypeTotal?.checklistTemplateTotal,
        details: listPeriodCheck?.length
          ? listPeriodCheck?.map((item) => ({
              id: item?.id,
              deviceName: item?.deviceName,
              serial: item?.serial,
              assignUser: null,
              datePlan:
                item?.planFrom && item?.planTo
                  ? `${convertUtcDateToLocalTz(
                      item?.planFrom,
                    )} - ${convertUtcDateToLocalTz(item?.planTo)}`
                  : null,
              dateReal: null,
            }))
          : [{}],
      },
      {
        type: t('createPlanList.jobType.maintain'),
        number: detailPlan?.jobTypeTotal?.maintainPeriodWarningTotal,
        details: listMaintain?.length
          ? listMaintain?.map((item) => ({
              id: item?.id,
              deviceName: item?.deviceName,
              serial: item?.serial,
              assignUser: null,
              datePlan:
                item?.planFrom && item?.planTo
                  ? `${convertUtcDateToLocalTz(
                      item?.planFrom,
                    )} - ${convertUtcDateToLocalTz(item?.planTo)}`
                  : null,
              dateReal: null,
            }))
          : [{}],
      },
      {
        type: t('createPlanList.jobType.warning'),
        number: detailPlan?.jobTypeTotal?.warningTotal,
      },
      {
        type: t('createPlanList.jobType.request'),
        number: detailPlan?.jobTypeTotal?.maintainRequestTotal,
      },
      {
        type: t('createPlanList.jobType.install'),
        number: detailPlan?.jobTypeTotal?.installingTotal,
      },
    ]
    return rows
  }
  const histories = detailPlan?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: responsibleSubject?.responsibleUsers?.find(
      (e) => e?.id === item?.userId,
    )?.username,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceCategoryDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('deviceCategory.form.status')}
                  value={
                    <Status
                      options={CREATE_PLAN_STATUS_OPTIONS}
                      value={detailPlan?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('createPlanList.form.planCode')}
                  value={detailPlan?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('createPlanList.form.planName')}
                  value={detailPlan?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.name')}
                  value={detailPlan?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('createPlanList.form.time')}
                  value={`${convertUtcDateToLocalTz(
                    detailPlan?.planFrom,
                  )} - ${convertUtcDateToLocalTz(detailPlan?.planTo)}`}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('createPlanList.form.totalPlanQuantity')}
                  value={''}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('createPlanList.form.table.jobPlan')}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('general.placeholder.factoryName')}
                  value={detailPlan?.factoryName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('general.placeholder.workshopName')}
                  value={detailPlan?.workCenterName}
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <TableCollsape
                  columns={columnsJobPlan}
                  subColumns={subColumns}
                  rows={getRow()}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Typography variant="h4" component="span">
                  {t('createPlanList.form.table.jobActual')}
                </Typography>
              </Grid>

              <Grid item xs={12} mt={3}>
                <DataTable
                  columns={columnJobReal}
                  rows={detailPlan?.jobs || []}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              </Grid>
            </Grid>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default CreatePlanDetail
