import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FormFilter = () => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineWarehousePallet.code')}
          placeholder={t('defineWarehousePallet.code')}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineWarehousePallet.name')}
          placeholder={t('defineWarehousePallet.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
    </Grid>
  )
}

export default FormFilter