import React, { useEffect } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  JOB_STATUS_LIST,
  PRIORITY_LEVEL_MAP,
  WORK_TYPE,
  WORK_TYPE_MAP,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.JOB.LIST.PATH,
    title: ROUTE.JOB.LIST.TITLE,
  },
  {
    route: ROUTE.JOB.DETAIL.PATH,
    title: ROUTE.JOB.DETAIL.TITLE,
  },
]

const JobDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

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

  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('job.button.deviceButton')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('job.button.jobs')}
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.jobDetail')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
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
                <LV label={t('job.detail.workCode')} value={jobDetail?.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('job.detail.priority')}
                  value={t(PRIORITY_LEVEL_MAP[job?.priority])}
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
                <LV label={t('job.detail.requestName')} value={job?.name} />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('job.detail.expectDay')}
                  value={convertUtcDateToLocalTz(job?.completeExpectedDate)}
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
                <LV
                  label={t('job.detail.responsibleUser')}
                  value={jobDetail?.assignUsers?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('job.detail.plan')}
                  value={jobDetail?.plan?.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h4" mt={1}>
                  {t('job.detail.planDay')}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h4" mt={1}>
                  {t('job.detail.actualDay')}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('job.detail.fromDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.planFrom)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('job.detail.fromDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.executionDateFrom)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('job.detail.toDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.planTo)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('job.detail.toDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.executionDateTo)}
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

export default JobDetail
