import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'

const QuickFilter = ({ setQuickFilters, quickFilters, defaultFilter }) => {
  const { t } = useTranslation(['wmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }

  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
        return (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="time"
                      label={t('warehouseExportProposal.time')}
                      placeholder={t('warehouseExportProposal.time')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="statusWarehouseExport"
                      label={t('warehouseExportProposal.statusWarehouseExport')}
                      placeholder={t(
                        'warehouseExportProposal.statusWarehouseExport',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          resetForm()
                          setQuickFilters(defaultFilter)
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button type="submit">
                        {t('general:common.search')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default QuickFilter