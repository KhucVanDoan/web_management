import React, { useEffect } from 'react'

import { Grid, Hidden, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CREATE_PLAN_STATUS,
  JOB_STATUS_LIST,
  PRIORITY_LEVEL_MAP,
  WORK_TYPE,
  WORK_TYPE_MAP,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { getPlanListApi } from '~/modules/mmsx/redux/sagas/plan-list/get-plan-list'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import { validateShema } from './schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.JOB.LIST.PATH,
    title: ROUTE.JOB.LIST.TITLE,
  },
  {
    route: ROUTE.JOB.ASSIGN.PATH,
    title: ROUTE.JOB.ASSIGN.TITLE,
  },
]

const JobAssign = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { responsibleSubject },
    actions: commonAction,
  } = useCommonInfo()

  useEffect(() => {
    commonAction.getResponsibleSubject()
  }, [])

  const {
    data: { jobDetail, isLoading },
    actions,
  } = useJob()

  useEffect(() => {
    actions.getJobDetail({ id }, null, () =>
      actions.getJobDetail({ id, isDraft: 1 }),
    )
    return () => {
      actions.resetJob()
    }
  }, [actions, id])

  const initialValues = {
    planDay: null,
    plan: null,
    responsibleUser: '',
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      id,
      assignUser: values?.responsibleUser?.id.toString(),
      planId: values?.plan?._id,
      planFrom: values?.planDay[0],
      planTo: values?.planDay[1],
    }
    actions.updatePlan(convertValues, backToList)
  }

  const backToList = () => {
    history.push(ROUTE.JOB.LIST.PATH)
  }

  const getJobData = (job) => {
    switch (job?.type) {
      case WORK_TYPE.WARNING:
        return job.warning
      case WORK_TYPE.SCHEDULE_MAINTAIN:
        return job.maintenancePeriodWarning
      case WORK_TYPE.REQUEST:
        return job.maintainRequest
      case WORK_TYPE.PERIOD_CHECK:
        return job.checklistTemplate
      case WORK_TYPE.INSTALL:
        return job.installationTemplate
      default:
        return null
    }
  }

  const job = getJobData(jobDetail)

  const histories = jobDetail?.histories?.map((item) => ({
    content: item?.content,
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.userName,
  }))

  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('job.button.deviceButton')}
  //         </Button>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('job.button.createPlan')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.jobAssign')}
      onBack={backToList}
      // renderHeaderRight={renderHeaderRight}
      loading={isLoading}
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
              {({ handleReset, values }) => {
                return (
                  <Form>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item xs={12}>
                        <LV
                          label={t('job.status')}
                          value={
                            <Status
                              options={JOB_STATUS_LIST}
                              value={jobDetail?.status}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.workCode')}
                          value={jobDetail?.code}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.priority')}
                          value={t(PRIORITY_LEVEL_MAP[job?.priority])}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.requestCode')}
                          value={jobDetail?.deviceAssignment?.serial}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.serial')}
                          value={jobDetail?.deviceAssignment?.serial}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.description')}
                          value={jobDetail?.description}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.deviceName')}
                          value={job?.deviceAssignment?.device?.name}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.requestName')}
                          value={job?.name}
                        />
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.expectDay')}
                          value={convertUtcDateToLocalTz(
                            job?.completeExpectedDate,
                          )}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.workType')}
                          value={t(WORK_TYPE_MAP[jobDetail?.type])}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.maintainTime')}
                          value={`${jobDetail?.estMaintenance} ${t(
                            'job.detail.minute',
                          )}`}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.DateRangePicker
                          name="planDay"
                          label={t('job.planDay')}
                          placeholder={t('job.planDay')}
                          vertical
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="plan"
                          label={t('job.assign.plan')}
                          placeholder={t('job.assign.plan')}
                          asyncRequest={(s) =>
                            getPlanListApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams(
                                {
                                  time: values?.planDay,
                                  status: CREATE_PLAN_STATUS.CONFIRMED,
                                },
                                [
                                  { field: 'time', filterFormat: 'date' },
                                  { field: 'status' },
                                ],
                              ),
                            })
                          }
                          asyncRequestDeps={values?.planDay}
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.name}
                          disabled={!values?.planDay}
                          vertical
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4" component="span">
                          {t('job.assign.smallTitle')}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.assign.factory')}
                          value={job?.deviceAssignment?.user?.factories?.map(
                            (fac) => fac?.name,
                          )}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.assign.workCenter')}
                          value={job?.deviceAssignment?.workCenter?.name}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.assign.usageUser')}
                          value={job?.deviceAssignment?.user?.fullName}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.assign.location')}
                          value={job?.deviceAssignment?.user?.location}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.assign.phone')}
                          value={job?.deviceAssignment?.user?.phone}
                        />
                      </Grid>
                      <Hidden lgDown>
                        <Grid item lg={6} xs={12}></Grid>
                      </Hidden>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="responsibleUser"
                          label={t('suppliesCategory.responsibleUser')}
                          placeholder={t('suppliesCategory.responsibleUser')}
                          options={responsibleSubject?.responsibleUsers}
                          getOptionLabel={(opt) => opt?.username}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          required
                        />
                      </Grid>
                    </Grid>
                    <ActionBar
                      onBack={backToList}
                      onCancel={handleReset}
                      mode={MODAL_MODE.UPDATE}
                    />
                  </Form>
                )
              }}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default JobAssign
