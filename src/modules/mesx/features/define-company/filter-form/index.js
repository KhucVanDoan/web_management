import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const { appStore } = useAppStore()
  // @TODO: <yen.nguyenhai> re-check how to get the options for the select box

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineCompany.code')}
          placeholder={t('defineCompany.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineCompany.name')}
          placeholder={t('defineCompany.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="taxNo"
          label={t('defineCompany.tax')}
          placeholder={t('defineCompany.tax')}
          options={appStore?.companies}
          getOptionValue={(opt) => opt?.taxNo}
          getOptionLabel={(opt) => opt?.taxNo}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineCompany.createTime')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
