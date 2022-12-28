import React from 'react'

import { Grid, Box } from '@mui/material'
import { sub } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'

const ReceiptManagementFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
}) => {
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
                    <Field.TextField
                      name="code"
                      label={t('receiptManagement.receiptCode')}
                      placeholder={t('receiptManagement.receiptCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="receiptNumber"
                      label={t('receiptManagement.receiptNo')}
                      placeholder={t('receiptManagement.receiptNo')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="contractNumber"
                      label={t('receiptManagement.contractNo')}
                      placeholder={t('receiptManagement.contractNo')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="createdAt"
                      label={t('receiptManagement.createdAt')}
                      placeholder={t('receiptManagement.createdAt')}
                      minDate={
                        new Date(
                          sub(new Date(), {
                            years: 1,
                            months: 0,
                            weeks: 0,
                            days: 0,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                          }),
                        )
                      }
                      maxDate={new Date()}
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

export default ReceiptManagementFilter
