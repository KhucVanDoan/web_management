import React from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { searchCompaniesApi } from '../../redux/sagas/company-management/search-companies'
import ExportProposal from './components/export-proposal'
import ExportReceipt from './components/import-export-receipt/export-receipt'
import ImportReceipt from './components/import-export-receipt/import-receipt'
import InventoryQuantity from './components/inventory-quantity'
import ItemSummary from './components/item-summary'
import MaterialUsedReport from './components/materials-used'
import MovementQuantityReport from './components/movement-quantity-report'
import MovementReport from './components/movement-report'
import StockItemReport from './components/stock-item-report'
import StockItemBySCLReport from './components/stock-item-scl'

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
          <Formik initialValues={{}} onSubmit={() => {}} enableReinitialize>
            {() => (
              <Form>
                <Grid container rowSpacing={1} columnSpacing={2}>
                  <Grid item xs={12} lg={6} />
                  <Grid item xs={12} lg={3} md={6}>
                    <Field.Autocomplete
                      name="companyId"
                      placeholder={t('dashboard.companyPlaceholder')}
                      asyncRequest={(s) =>
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} md={6}>
                    <Field.DateRangePicker name="createdAt" />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12}>
          <ItemSummary />
        </Grid>
        <Grid item xs={12} lg={5} md={12} container rowSpacing={2}>
          <Grid item xs={12}>
            <ImportReceipt />
          </Grid>
          <Grid item xs={12}>
            <ExportReceipt />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.5} md={12}>
          <StockItemReport />
        </Grid>
        <Grid item xs={12} lg={3.5} md={12}>
          <ExportProposal />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <InventoryQuantity />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <MovementReport />
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          <MovementQuantityReport />
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

export default Dashboard
