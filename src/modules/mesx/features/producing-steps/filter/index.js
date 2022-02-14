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
          options={PRODUCING_STEP_OPTIONS.map((item) => ({
            value: item.id.toString(),
            label: t(item.text),
          }))}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
