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
          name="code"
          label={t('defineUom.code')}
          placeholder={t('defineUom.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineUom.name')}
          placeholder={t('defineUom.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineUom.createdAt')}
          placeholder={t('defineUom.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
