import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import {
  getFinishedItemProgressApi,
  getInProgressMosApi,
} from '~/modules/mesx/redux/sagas/dashboard'
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
  const [finishedItemProgress, setFinishedItemProgress] = useState([])
  const [inProgressMos, setInProgressMos] = useState([])

  useEffect(() => {
    getInProgressMos()
    getFinishedItemProgress()
  }, [])

  const getInProgressMos = async () => {
    const res = await getInProgressMosApi()
    if (res?.statusCode === 200) {
      setInProgressMos(res?.data)
    }
  }

  const getFinishedItemProgress = async () => {
    const res = await getFinishedItemProgressApi()
    if (res?.statusCode === 200) {
      setFinishedItemProgress(res?.data)
    }
  }

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
          <FinishedProductProgress
            finishedItemProgress={finishedItemProgress}
            inProgressMos={inProgressMos}
          />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <ProducingStepProgress inProgressMos={inProgressMos} />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <QcProducingStepProgress inProgressMos={inProgressMos} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
