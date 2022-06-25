import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DeviceError from './components/device-error'
import DeviceStatus from './components/device-status'
import DeviceUsingStatus from './components/device-using-status'
import ItemSummary from './components/item-summary'
import MaintainanceProgress from './components/maintainance-progress'
import MttStatus from './components/mtt-status'
import RequestStatus from './components/request-status'
const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]

function Dashboard() {
  const { t } = useTranslation(['mmsx'])

  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemSummary />
        </Grid>
        <Grid item xs={12}>
          <DeviceUsingStatus />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <MaintainanceProgress />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <RequestStatus />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <DeviceError />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <DeviceStatus />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <MttStatus />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
