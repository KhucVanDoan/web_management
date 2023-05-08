import React, { useState } from 'react'

import { Grid, Box } from '@mui/material'
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { addHours } from '~/utils'

// import ExportProposal from './components/export-proposal'
import ExportReceipt from './components/import-export-receipt/export-receipt'
import ImportReceipt from './components/import-export-receipt/import-receipt'
// import InventoryQuantity from './components/inventory-quantity'
import InventoryQuantity from './components/inventory-quantity'
import ItemSummary from './components/item-summary'
// import MaterialUsedReport from './components/materials-used'
// import MovementQuantityReport from './components/movement-quantity-report'
import MovementQuantityReport from './components/movement-quantity-report'
import MovementReport from './components/movement-report'
import StockItemReport from './components/stock-item-report'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]
function Dashboard() {
  const { t } = useTranslation(['wmsx'])

  const initialDate = [
    addHours(7, startOfWeek(new Date())),
    endOfWeek(new Date()),
  ]

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const handleChangeSelect = (value) => {
    setSelectedDate(value)
  }

  const fromDate = addHours(7, startOfDay(new Date(selectedDate[0])))
  const toDate = endOfDay(new Date(selectedDate[1]))

  return (
    <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={{ createdAt: initialDate }}
            onSubmit={() => {}}
            enableReinitialize
          >
            {() => (
              <Form>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                  sx={{ justifyContent: 'flex-end' }}
                >
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
          <ItemSummary fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <Box>
            <ImportReceipt fromDate={fromDate} toDate={toDate} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <ExportReceipt fromDate={fromDate} toDate={toDate} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <StockItemReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        {/* <Grid item xs={12} lg={6} md={12}>
          <ExportProposal fromDate={fromDate} toDate={toDate} />
        </Grid> */}
        <Grid item xs={12} lg={6} md={12}>
          <InventoryQuantity fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={6} md={12}>
          <MovementReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          <MovementQuantityReport fromDate={fromDate} toDate={toDate} />
        </Grid>
        {/* <Grid item xs={12} lg={6} md={12}>
          <MaterialUsedReport fromDate={fromDate} toDate={toDate} />
        </Grid>*/}
        {/* <Grid item xs={12} lg={6} md={12}>
          <StockItemBySCLReport fromDate={fromDate} toDate={toDate} />
        </Grid> */}
      </Grid>
    </Page>
  )
}

export default Dashboard
