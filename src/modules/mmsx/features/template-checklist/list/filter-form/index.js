import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('templateChecklist.code')}
          placeholder={t('templateChecklist.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('templateChecklist.name')}
          placeholder={t('templateChecklist.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceCode"
          label={t('templateChecklist.deviceCode')}
          placeholder={t('templateChecklist.deviceCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('templateChecklist.deviceName')}
          placeholder={t('templateChecklist.deviceName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('templateChecklist.createdAt')}
          placeholder={t('templateChecklist.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('templateChecklist.updatedAt')}
          placeholder={t('templateChecklist.updatedAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
