import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import { useDashboard } from '~/modules/mesx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/mesx/routes/config'

import FinishedProductProgress from './components/finished-product-progress'
import ItemSummary from './components/item-summary'
import MoStatusReport from './components/mo-status'
import ProducingStepProgress from './components/producing-step-progress'
import QcProducingStepProgress from './components/qc-producing-step-progress'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]
function Dashboard() {
  const { t } = useTranslation(['mesx'])
  const {
    actions,
    data: { inProgressMos, finishedItemProgress },
  } = useDashboard()

  useEffect(() => {
    if (isEmpty(inProgressMos)) {
      actions.getDashboardInProgressMos()
    }
  }, [inProgressMos])

  useEffect(() => {
    if (isEmpty(finishedItemProgress)) {
      actions.getDashboardFinishedItemProgress()
    }
  }, [finishedItemProgress])

  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemSummary />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <MoStatusReport />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <FinishedProductProgress />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <ProducingStepProgress />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <QcProducingStepProgress />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
