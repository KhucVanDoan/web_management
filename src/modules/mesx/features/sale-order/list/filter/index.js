import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ORDER_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('saleOrder.code')}
          placeholder={t('saleOrder.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('saleOrder.name')}
          placeholder={t('saleOrder.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('saleOrder.status')}
          placeholder={t('saleOrder.status')}
          options={ORDER_STATUS_OPTIONS.map((item) => ({
            value: item.id.toString(),
            label: t(item.text),
          }))}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('saleOrder.createdAt')}
          placeholder={t('saleOrder.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
