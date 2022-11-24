import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'

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

  const startOfWeek = moment().startOf('week').toDate()
  const endOfWeek = moment().endOf('week').toDate()
  const [fromDate, setfromDate] = useState(startOfWeek)
  const [toDate, settoDate] = useState(endOfWeek)
  const [selectedDate, setSelectedDate] = useState([startOfWeek, endOfWeek])
  const handleChangeSelect = (value) => {
    setSelectedDate(value)
    setfromDate(value[0])
    settoDate(value[1])
  }
  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={{ createdAt: [startOfWeek, endOfWeek] }}
            onSubmit={() => {}}
            enableReinitialize
          >
            {() => (
              <Form>
                <Grid container rowSpacing={1} columnSpacing={2}>
                  <Grid item xs={12} lg={9} />
                  <Grid item xs={12} lg={3} md={6}>
                    <Field.DateRangePicker
                      name="createdAt"
                      value={selectedDate}
                      onChange={handleChangeSelect}
                    />
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
            <ImportReceipt fromDate={fromDate} toDate={toDate} />
          </Grid>
          <Grid item xs={12}>
            <ExportReceipt fromDate={fromDate} toDate={toDate} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3.5} md={12}>
          <StockItemReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={3.5} md={12}>
          <ExportProposal fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <InventoryQuantity fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <MovementReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          <MovementQuantityReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <MaterialUsedReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <StockItemBySCLReport fromDate={fromDate} toDate={toDate} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
