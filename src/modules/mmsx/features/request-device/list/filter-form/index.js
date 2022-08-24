import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  DEVICE_REQUEST_STATUS_OPTION,
  TYPE_REQUEST_OPTION,
} from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('requestDevice.category.requestCode')}
          placeholder={t('requestDevice.category.requestCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('requestDevice.category.requestName')}
          placeholder={t('requestDevice.category.requestName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('requestDevice.category.requestType')}
          placeholder={t('requestDevice.category.requestType')}
          options={TYPE_REQUEST_OPTION}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceCode"
          label={t('requestDevice.category.deviceCode')}
          placeholder={t('requestDevice.category.deviceCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('requestDevice.category.deviceName')}
          placeholder={t('requestDevice.category.deviceName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="user"
          label={t('requestDevice.category.user')}
          placeholder={t('requestDevice.category.user')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('requestDevice.category.numberSerial')}
          placeholder={t('requestDevice.category.numberSerial')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('requestDevice.form.status')}
          placeholder={t('requestDevice.form.status')}
          options={DEVICE_REQUEST_STATUS_OPTION}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('common.createdAt')}
          placeholder={t('common.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('common.updatedAt')}
          placeholder={t('common.updatedAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
