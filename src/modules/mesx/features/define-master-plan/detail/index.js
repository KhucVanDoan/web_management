import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { MASTER_PLAN_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import DetailTab from '../form/detail-tab'

function MasterPlanDetail() {
  const breadcrumb = [
    {
      title: 'plan',
    },
    {
      route: ROUTE.MASTER_PLAN.LIST.PATH,
      title: ROUTE.MASTER_PLAN.LIST.TITLE,
    },
    {
      title: ROUTE.MASTER_PLAN.DETAIL.TITLE,
    },
  ]
  const history = useHistory()
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()

  const {
    data: { masterPlanDetails },
    actions,
  } = useDefineMasterPlan()

  useEffect(() => {
    actions.getMasterPlanDetailsById(id)
  }, [id])

  const backToList = () => {
    history.push(ROUTE.MASTER_PLAN.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.masterPlanDetail')}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            {!isNil(masterPlanDetails?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('defineMasterPlan.status')}
                  value={
                    <Status
                      options={MASTER_PLAN_STATUS_OPTIONS}
                      value={masterPlanDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.code')}
                value={masterPlanDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.saleOrderName')}
                value={masterPlanDetails.saleOrderSchedules
                  ?.map((saleOrderSchedule) => saleOrderSchedule.saleOrderName)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.planName')}
                value={masterPlanDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.moFactory')}
                value={masterPlanDetails?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('defineMasterPlan.planDate')}>
                {formatDateTimeUtc(masterPlanDetails?.dateFrom, DATE_FORMAT)} -{' '}
                {formatDateTimeUtc(masterPlanDetails?.dateTo, DATE_FORMAT)}
              </LabelValue>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.createdBy')}
                value={masterPlanDetails?.createdBy?.fullname}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineMasterPlan.createdAt')}
                value={formatDateTimeUtc(masterPlanDetails?.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineMasterPlan.descriptionInput')}
                multiline
                value={masterPlanDetails?.description}
                rows={3}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DetailTab
        soId={masterPlanDetails?.saleOrderSchedules?.map((i) => i?.id)}
        isDetail={true}
        isView={true}
      />
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default MasterPlanDetail
