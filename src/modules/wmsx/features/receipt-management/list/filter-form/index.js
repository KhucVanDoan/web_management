import React from 'react'

import { Grid } from '@mui/material'
import { sub } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="receiptNumber"
          label={t('receiptManagement.receiptNo')}
          placeholder={t('receiptManagement.receiptNo')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('receiptManagement.receiptCode')}
          placeholder={t('receiptManagement.receiptCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="contractNumber"
          label={t('receiptManagement.contractNo')}
          placeholder={t('receiptManagement.contractNo')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="receiptDate"
          label={t('receiptManagement.createdAt')}
          placeholder={t('receiptManagement.createdAt')}
          maxDate={new Date()}
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
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
