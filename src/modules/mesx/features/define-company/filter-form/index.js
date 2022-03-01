import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
// import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'

const FilterForm = () => {
  const { t } = useTranslation('mesx')

  const {
    data: { companyList },
  } = useDefineCompany()
  const taxOptions = companyList.filter((item) => !!item.taxNo)
  // const { appStore } = useAppStore()

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
          options={taxOptions}
          // options={appStore?.companies}
          getOptionValue={(opt) => opt?.taxNo}
          getOptionLabel={(opt) => opt?.taxNo}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineCompany.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
