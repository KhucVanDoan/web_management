import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { SUPPLY_REQUEST_STATUS } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('suppliesRequest.table.code')}
          placeholder={t('suppliesRequest.table.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('suppliesRequest.table.name')}
          placeholder={t('suppliesRequest.table.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('suppliesRequest.table.deviceName')}
          placeholder={t('suppliesRequest.table.deviceName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="teamName"
          label={t('suppliesRequest.table.teamName')}
          placeholder={t('suppliesRequest.table.teamName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>{' '}
      <Grid item xs={12}>
        <Field.TextField
          name="fullName"
          label={t('suppliesRequest.table.fullName')}
          placeholder={t('suppliesRequest.table.fullName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="supplyName"
          label={t('suppliesRequest.table.supplyName')}
          placeholder={t('suppliesRequest.table.supplyName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('suppliesCategory.form.status')}
          placeholder={t('suppliesCategory.form.status')}
          options={SUPPLY_REQUEST_STATUS}
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
    </Grid>
  )
}

export default FilterForm
