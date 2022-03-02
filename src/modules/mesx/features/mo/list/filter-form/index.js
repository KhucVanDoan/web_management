import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { PLAN_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('Mo.moCode')}
          placeholder={t('Mo.moCode')}
          options={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('Mo.moName')}
          placeholder={t('Mo.moName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="planName"
          label={t('Mo.planName')}
          placeholder={t('Mo.planName')}
          options={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="factoryName"
          label={t('Mo.moFactory')}
          placeholder={t('Mo.moFactory')}
          options={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderName"
          label={t('Mo.soName')}
          placeholder={t('Mo.soName')}
          options={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('Mo.moPlan')}
          placeholder={t('Mo.moPlan')}
          type="date"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('Mo.status')}
          placeholder={t('Mo.status')}
          options={PLAN_STATUS_OPTIONS.map((status) => ({
            value: status.id.toString(),
            label: t(status.text),
          }))}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('Mo.createdAt')}
          placeholder={t('Mo.createdAt')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
