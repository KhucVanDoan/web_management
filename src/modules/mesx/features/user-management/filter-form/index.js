import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const { appStore } = useAppStore()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="username"
          label={t('userManagement.username')}
          placeholder={t('userManagement.username')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="fullName"
          label={t('userManagement.fullName')}
          placeholder={t('userManagement.fullName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="department"
          label={t('userManagement.department')}
          placeholder={t('userManagement.department')}
          options={appStore?.deparments} //TODO: fix department
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('userManagement.status')}
          placeholder={t('userManagement.status')}
          options={USER_MANAGEMENT_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('userManagement.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm