import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { MAINTAIN_STATUS_OPTIONS } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('maintainRequest.code')}
          placeholder={t('maintainRequest.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('maintainRequest.name')}
          placeholder={t('maintainRequest.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="user"
          label={t('maintainRequest.user')}
          placeholder={t('maintainRequest.user')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('maintainRequest.serial')}
          placeholder={t('maintainRequest.serial')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('maintainRequest.deviceName')}
          placeholder={t('maintainRequest.deviceName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="priority"
          label={t('maintainRequest.priority')}
          placeholder={t('maintainRequest.priority')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('maintainRequest.status')}
          placeholder={t('maintainRequest.status')}
          options={MAINTAIN_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('maintainRequest.createdAt')}
          placeholder={t('maintainRequest.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('maintainRequest.updatedAt')}
          placeholder={t('maintainRequest.updatedAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
