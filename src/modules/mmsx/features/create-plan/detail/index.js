import React, { useEffect } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import { CREATE_PLAN_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import Install from '../form/install'
import Maintenance from '../form/maintenance'
import PeriodCheck from '../form/period-check'
import Request from '../form/request'
import Warning from '../form/warning'
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

  const mode = MODAL_MODE.DETAIL
  const {
    data: { detailPlan, isLoading },
    actions,
  } = useCreatePlan()

  // const {
  //   data: { responsibleSubject },
  //   actions: commonAction,
  // } = useCommonInfo()
  useEffect(() => {
    actions.getDetailPlan(id)
    return () => {
      actions.resetStateCreatePlan()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.CREATE_PLAN.LIST.PATH)
  }
  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button
  //           variant="outlined"
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)}
  //         >
  //           {t('supplies.button.device')}
  //         </Button>
  //         <Button
  //           variant="outlined"
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(`${ROUTE.JOB.LIST.PATH}?plan=${id}`)}
  //         >
  //           {t('createPlanList.jobBtn')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }

  // const histories = detailPlan?.histories?.map((item) => ({
  //   content: ACTION_MAP[item?.action]
  //     ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
  //     : '',
  //   createdAt: item?.createdAt,
  //   username: responsibleSubject?.responsibleUsers?.find(
  //     (e) => e?.id === item?.userId,
  //   )?.username,
  // }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.createPlanDetail')}
      onBack={backToList}
      loading={isLoading}
      // renderHeaderRight={renderHeaderRight}
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
            </Grid>
            <Tabs
              list={[
                t('createPlanList.jobType.maintainPeriod'),
                t('createPlanList.jobType.maintain'),
                t('createPlanList.jobType.warning'),
                t('createPlanList.jobType.install'),
                t('createPlanList.jobType.request'),
              ]}
              sx={{ mt: 3 }}
            >
              {!isEmpty(detailPlan) ? (
                <PeriodCheck id={id} mode={mode} status={detailPlan?.status} />
              ) : (
                <div />
              )}
              {!isEmpty(detailPlan) ? (
                <Maintenance id={id} mode={mode} status={detailPlan?.status} />
              ) : (
                <div />
              )}
              {!isEmpty(detailPlan) ? (
                <Warning id={id} mode={mode} status={detailPlan?.status} />
              ) : (
                <div />
              )}
              {!isEmpty(detailPlan) ? (
                <Install id={id} mode={mode} status={detailPlan?.status} />
              ) : (
                <div />
              )}
              {!isEmpty(detailPlan) ? (
                <Request id={id} mode={mode} status={detailPlan?.status} />
              ) : (
                <div />
              )}
            </Tabs>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      {/* <Activities data={histories} /> */}
    </Page>
  )
}

export default CreatePlanDetail
