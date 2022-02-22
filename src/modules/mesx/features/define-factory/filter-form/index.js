import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const { appStore } = useAppStore()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineFactory.code')}
          placeholder={t('defineFactory.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineFactory.name')}
          placeholder={t('defineFactory.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="companyName"
          label={t('defineFactory.companyName')}
          placeholder={t('defineFactory.companyName')}
          options={appStore?.companies}
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.name}
          // @TODO: <yen.nguyenhai> re-check how to get the options for the select box
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineFactory.createTime')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm