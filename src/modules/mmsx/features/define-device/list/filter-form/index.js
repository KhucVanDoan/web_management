import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { DEVICE_STATUS_OPTION } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('mmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('deviceList.device.code')}
          placeholder={t('deviceList.device.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('deviceList.device.name')}
          placeholder={t('deviceList.device.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.TextField
          name="deviceGroup"
          label={t('deviceList.device.deviceCategory')}
          placeholder={t('deviceList.device.deviceCategory')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceList.device.status')}
          placeholder={t('deviceList.device.status')}
          options={DEVICE_STATUS_OPTION}
          getOptionLabel={(option) => (option?.text ? t(option?.text) : '')}
          getOptionValue={(option) => option?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker name="createdAt" label={t('common.createdAt')} />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker name="updatedAt" label={t('common.updatedAt')} />
      </Grid>
    </Grid>
  )
}

export default FilterForm
