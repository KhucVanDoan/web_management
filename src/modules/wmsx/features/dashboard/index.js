import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'

import InventorySpace from './components/inventory-space'
import ItemGroupStockReport from './components/item-group-stock-report'
import ItemReport from './components/item-report'
import ItemSummary from './components/item-summary'
import MovementReport from './components/movement-report'
import SaleOrderReport from './components/sale-order-report'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]
function Dashboard() {
  const { t } = useTranslation(['wmsx'])

  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemSummary />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <SaleOrderReport />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <ItemReport />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <ItemGroupStockReport />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <InventorySpace />
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          <MovementReport />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
