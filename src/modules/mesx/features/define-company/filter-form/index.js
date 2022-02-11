import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const {
    data: { companyList },
  } = useDefineCompany()
  //@TODO: <anh.nguyenthihai> selectbox in filters
  const taxList = []
  // eslint-disable-next-line array-callback-return
  companyList.map((item) => {
    if (!!item['taxNo']) {
      return taxList.push(item['taxNo'])
    }
  })

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
          options={taxList.map((item) => ({
            value: item,
            label: item,
          }))}
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
