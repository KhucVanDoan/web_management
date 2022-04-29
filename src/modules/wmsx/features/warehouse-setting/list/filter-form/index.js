import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseSetting.code')}
          placeholder={t('warehouseSetting.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warehouseSetting.name')}
          placeholder={t('warehouseSetting.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('warehouseSetting.createdAt')}
          placeholder={t('warehouseSetting.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
