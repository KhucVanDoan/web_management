import React from 'react'

import { Grid, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import {
  DATA_SYNC_STATUS_OPTIONS,
  TYPE_TRANSACTION_DATA_SYNC_OPTION,
} from '~/modules/wmsx/constants'

import { validateSchema } from './schema'

const QuickFilter = ({ setQuickFilters, quickFilters, defaultFilter }) => {
  const { t } = useTranslation(['wmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }

  return (
    <Formik
      initialValues={quickFilters}
      onSubmit={onSubmit}
      validationSchema={validateSchema(t)}
      enableReinitialize
    >
      {({ resetForm }) => {
        return (
          <Form>
            <Typography sx={{ mb: 0.5 }}>
              {t('dataSyncManagement.search')}
            </Typography>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="typeTransaction"
                      label={t('dataSyncManagement.type')}
                      placeholder={t('dataSyncManagement.placeholder.type')}
                      options={TYPE_TRANSACTION_DATA_SYNC_OPTION}
                      getOptionValue={(opt) => opt?.value || ''}
                      getOptionLabel={(opt) => t(`${opt?.text}`)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="dateFrom"
                      label={t('dataSyncManagement.date')}
                      placeholder={t('dataSyncManagement.placeholder.date')}
                      maxDate={new Date()}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="resourceCode"
                      label={t('dataSyncManagement.objectCode')}
                      placeholder={t(
                        'dataSyncManagement.placeholder.objectCode',
                      )}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('dataSyncManagement.status')}
                      placeholder={t('dataSyncManagement.placeholder.status')}
                      options={DATA_SYNC_STATUS_OPTIONS}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(`${opt?.text}`)}
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
