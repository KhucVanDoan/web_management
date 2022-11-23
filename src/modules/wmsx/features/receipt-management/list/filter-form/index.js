import React from 'react'

import { Grid } from '@mui/material'
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
          name="createdAt"
          label={t('receiptManagement.createdAt')}
          placeholder={t('receiptManagement.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
