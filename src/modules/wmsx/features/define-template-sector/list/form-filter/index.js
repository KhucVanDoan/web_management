import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('templateSector.name')}
          placeholder={t('templateSector.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('templateSector.createdAt')}
          placeholder={t('templateSector.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
