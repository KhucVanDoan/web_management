import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation('mesx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('itemTypeSetting.code')}
          placeholder={t('itemTypeSetting.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('itemTypeSetting.name')}
          placeholder={t('itemTypeSetting.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('itemTypeSetting.createTime')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
