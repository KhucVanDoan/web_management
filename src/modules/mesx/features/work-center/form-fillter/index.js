import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { appStore } = useAppStore()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('workCenter.code')}
          placeholder={t('workCenter.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('workCenter.name')}
          placeholder={t('workCenter.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          label={t('workCenter.factoryName')}
          placeholder={t('workCenter.factoryName')}
          name="factory"
          options={appStore?.factories}
          getOptionLabel={(option) => t(option?.name)}
          getOptionValue={(option) => (option?.id || '').toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
