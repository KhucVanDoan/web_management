import React, { useEffect } from 'react'

import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import { startOfToday } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { searchWorkCenterApi } from '~/modules/mesx/redux/sagas/work-center/search-work-center'
import {
  ACTION_MAP,
  CREATE_PLAN_STATUS_OPTIONS,
  WORK_TYPE,
} from '~/modules/mmsx/constants'
import TableCollsape from '~/modules/mmsx/features/device-assign/table-maintenance'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import useJobDraft from '~/modules/mmsx/redux/hooks/useJobDraft'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import { validateShema } from './schema'
const CreatePlanForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const {
    data: { detailPlan, isLoading },
    actions,
  } = useCreatePlan()
  const {
    data: { jobDraftLists },
    actions: jobDraftAction,
  } = useJobDraft()

  const {
    data: { responsibleSubject },
    actions: commonAction,
  } = useCommonInfo()
  const MODE_MAP = {
    [ROUTE.CREATE_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.CREATE_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.CREATE_PLAN.LIST.PATH)
  }

  const initialValues = {
    code: detailPlan?.code || '',
    planName: detailPlan?.name || '',
    factoryId: detailPlan?.factoryId
      ? { id: detailPlan?.factoryId, name: detailPlan?.factoryName }
      : null,
    workCenterId: detailPlan?.workCenterId
      ? { id: detailPlan?.workCenterId, name: detailPlan?.workCenterName }
      : null,
    periodCheck: detailPlan?.jobTypeTotal?.checklistTemplateTotal || 0, //kiểm tra định kỳ
    maintain: detailPlan?.jobTypeTotal?.maintainPeriodWarningTotal || 0, //bảo dưỡng
    warning: detailPlan?.jobTypeTotal?.warningTotal || 0, //cảnh báo
    request: detailPlan?.jobTypeTotal?.maintainRequestTotal || 0, //yêu cầu
    install: detailPlan?.jobTypeTotal?.installingTotal || 0, //lắp đặt
    time: isUpdate ? [detailPlan?.planFrom, detailPlan?.planTo] : '',
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getDetailPlan(id, (data) => {
        const params = {
          factoryId: data?.result?.factoryId,
          workCenterId: data?.result?.workCenterId || null,
          planFrom: data?.result?.planFrom,
          planTo: data?.result?.planTo,
        }
        jobDraftAction.generateJobForPlan(params)
      })
      commonAction.getResponsibleSubject()
    }
    return () => {
      actions.resetStateCreatePlan()
      jobDraftAction.resetGenerateJobForPlan()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.planName,
      planFrom: values?.time[0],
      planTo: values?.time[1],
      factoryId: values?.factoryId?.id || null,
      workCenterId: values?.workCenterId?.id || null,
      jobTypeTotal: {
        warningTotal: values?.warning,
        maintainRequestTotal: values?.request,
        maintainPeriodWarningTotal: values?.periodCheck,
        checklistTemplateTotal: values?.maintain,
        installingTotal: values?.install,
      },
      jobs: [],
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createPlan(params, () => backToList())
    } else {
      const params = {
        id: id,
        code: values?.code,
        name: values?.planName,
        planFrom: values?.time[0],
        planTo: values?.time[1],
        factoryId: values?.factoryId?.id || null,
        workCenterId: values?.workCenterId?.id || null,
        jobTypeTotal: {
          warningTotal: values?.warning,
          maintainRequestTotal: values?.request,
          maintainPeriodWarningTotal: values?.periodCheck,
          checklistTemplateTotal: values?.maintain,
          installingTotal: values?.install,
        },
        jobsCreate: [],
        jobsDelete: [],
        jobsUpdate: [],
      }
      actions.updateMakePlan(params, () => backToList())
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.CREATE_PLAN.LIST.PATH,
        title: ROUTE.CREATE_PLAN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.CREATE_PLAN.CREATE.PATH,
          title: ROUTE.CREATE_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.CREATE_PLAN.EDIT.PATH,
          title: ROUTE.CREATE_PLAN.EDIT.TITLE,
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
        return ROUTE.CREATE_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.CREATE_PLAN.EDIT.TITLE
      default:
    }
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
    const listPeriodCheck = jobDraftLists?.filter(
      (item) => item?.type === WORK_TYPE?.PERIOD_CHECK,
    )

    const listMaintain = jobDraftLists?.filter(
      (item) => item?.type === WORK_TYPE.SCHEDULE_MAINTAIN,
    )

    const rows = [
      {
        type: t('createPlanList.jobType.maintainPeriod'),
        number: <Field.TextField name="periodCheck" disabled={true} />,
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
        number: <Field.TextField name="maintain" disabled={true} />,
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
        number: <Field.TextField name="warning" />,
      },
      {
        type: t('createPlanList.jobType.request'),
        number: <Field.TextField name="request" />,
      },
      {
        type: t('createPlanList.jobType.install'),
        number: <Field.TextField name="install" />,
      },
    ]
    return rows
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
  const handleRefreshData = (val, setFieldValue) => {
    if (val) {
      const params = {
        factoryId: val?.factoryId?.id || null,
        workCenterId: val?.workCenterId?.id || null,
        planFrom: val?.time[0],
        planTo: val?.time[1],
      }
      const listPeriodCheck = jobDraftLists?.filter(
        (item) => item?.type === WORK_TYPE?.PERIOD_CHECK,
      )
      const listMaintain = jobDraftLists?.filter(
        (item) => item?.type === WORK_TYPE.SCHEDULE_MAINTAIN,
      )
      jobDraftAction.generateJobForPlan(params)
      setFieldValue('periodCheck', listPeriodCheck?.length || 0)
      setFieldValue('maintain', listMaintain?.length || 0)
    }
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
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateShema(t)}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleReset, values, setFieldValue }) => {
                return (
                  <Form>
                    <Grid
                      container
                      columnSpacing={{ xl: 8, xs: 4 }}
                      rowSpacing={4 / 3}
                    >
                      {isUpdate && (
                        <Grid item xs={12}>
                          <LabelValue
                            label={
                              <Typography>
                                {t('createPlanList.table.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={CREATE_PLAN_STATUS_OPTIONS}
                                value={detailPlan?.status}
                              />
                            }
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('createPlanList.table.code')}
                          name="code"
                          placeholder={t('createPlanList.table.code')}
                          disabled={mode === MODAL_MODE.UPDATE}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('createPlanList.table.name')}
                          name="planName"
                          placeholder={t('createPlanList.table.name')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Field.DateRangePicker
                          name="time"
                          label={t('createPlanList.form.time')}
                          placeholder={t('createPlanList.form.time')}
                          minDate={startOfToday()}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <LabelValue
                          label={t('createPlanList.form.totalPlanQuantity')}
                          value={
                            Number(values?.periodCheck) +
                              Number(values?.maintain) +
                              Number(values?.warning) +
                              Number(values?.request) +
                              Number(values?.install) || 0
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4" component="span">
                          {t('createPlanList.form.table.jobPlan')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="factoryId"
                          label={t('general.placeholder.factoryName')}
                          placeholder={t('general.placeholder.factoryName')}
                          asyncRequest={(s) =>
                            searchFactoriesApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="workCenterId"
                          label={t('general.placeholder.workshopName')}
                          placeholder={t('general.placeholder.workshopName')}
                          asyncRequest={(s) =>
                            searchWorkCenterApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                factoryId: values?.factoryId?.id,
                              }),
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          asyncRequestDeps={values?.factoryId}
                          getOptionLabel={(opt) => opt?.name}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          disabled={!values.factoryId}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Button
                          onClick={() =>
                            handleRefreshData(values, setFieldValue)
                          }
                          sx={{ ml: 4 / 3 }}
                        >
                          {t('createPlanList.form.refreshData')}
                        </Button>
                      </Grid>
                    </Grid>
                    <Box mt={3}>
                      <TableCollsape
                        columns={columnsJobPlan}
                        subColumns={subColumns}
                        rows={getRow()}
                        striped={false}
                        hideSetting
                        hideFooter
                      />
                    </Box>
                    <Grid item xs={12} mt={3}>
                      <Typography variant="h4" component="span">
                        {t('createPlanList.form.table.jobActual')}
                      </Typography>
                    </Grid>

                    <Box mt={3}>
                      <DataTable
                        columns={columnJobReal}
                        rows={[]}
                        striped={false}
                        hideSetting
                        hideFooter
                      />
                    </Box>
                    {renderActionBar(handleReset)}
                  </Form>
                )
              }}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default CreatePlanForm
