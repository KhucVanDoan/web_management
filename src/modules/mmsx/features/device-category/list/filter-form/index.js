import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { DEVICE_CATEGORY_STATUS_OPTION } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('deviceCategory.category.code')}
          placeholder={t('deviceCategory.category.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('deviceCategory.category.name')}
          placeholder={t('deviceCategory.category.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('deviceCategory.createAt')}
          placeholder={t('deviceCategory.createAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('deviceCategory.updateAt')}
          placeholder={t('deviceCategory.updateAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceCategory.form.status')}
          placeholder={t('deviceCategory.form.status')}
          options={DEVICE_CATEGORY_STATUS_OPTION}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
