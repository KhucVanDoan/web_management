import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'

import ItemSummary from './components/item-summary'
import MaterialUsedReport from './components/materials-used'
import StockItemBySCLReport from './components/stock-item-scl'

const breadcrumbs = [
  {
    route: '/wms/dashboard',
    title: 'dashboard',
  },
]
function SubDashboard() {
  const { t } = useTranslation(['wmsx'])

  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemSummary />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <MaterialUsedReport />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <StockItemBySCLReport />
        </Grid>
      </Grid>
    </Page>
  )
}

export default SubDashboard
