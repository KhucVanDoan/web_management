import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { ROUTING_STATUS_OPTIONS } from '~/modules/mesx/constants'

const FilterForm = () => {
  const { t } = useTranslation('mesx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('routing.code')}
          placeholder={t('routing.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('routing.name')}
          placeholder={t('routing.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('routing.status')}
          placeholder={t('routing.status')}
          options={ROUTING_STATUS_OPTIONS}
          getOptionLabel={(option) => (option?.text ? t(option?.text) : '')}
          getOptionValue={(option) => option?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineFactory.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
