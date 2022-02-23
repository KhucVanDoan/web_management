import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { PRODUCING_STEP_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('producingStep.code')}
          placeholder={t('producingStep.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('producingStep.name')}
          placeholder={t('producingStep.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('producingStep.status')}
          placeholder={t('producingStep.status')}
          options={PRODUCING_STEP_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('producingStep.createdAt')}
          placeholder={t('producingStep.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
