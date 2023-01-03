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
          name="resourceCode"
          label={t('dataSyncManagement.objectCode')}
          placeholder={t('dataSyncManagement.objectCode')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="signalCode"
          label={t('dataSyncManagement.signalCode')}
          placeholder={t('dataSyncManagement.signalCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
