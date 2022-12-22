import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
const MovementsFilter = ({
  setQuickFilters,
  defaultFilter,
  movementTypeOpts,
  warehouse,
}) => {
  const { t } = useTranslation(['wmsx'])
  const onSubmit = async (values) => {
    setQuickFilters(values)
  }

  return (
    <Formik
      initialValues={defaultFilter}
      onSubmit={onSubmit}
      enableReinitialize
    >
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
                    <Field.DateRangePicker
                      name="createdAt"
                      label={t('movements.importExport.executeDate')}
                      placeholder={t('movements.importExport.executeDate')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouseId"
                      label={t('movements.importExport.warehouseName')}
                      value={warehouse?.name}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="movementType"
                      label={t('movements.importExport.movementType')}
                      placeholder={t('movements.importExport.movementType')}
                      options={movementTypeOpts}
                      getOptionValue={(opt) => opt?.type || opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                      clearIcon={false}
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

export default MovementsFilter
