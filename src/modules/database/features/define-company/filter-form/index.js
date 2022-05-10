import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'

const FilterForm = () => {
  const { t } = useTranslation('database')

  const {
    data: { companyList },
  } = useDefineCompany()

  const taxOptions = companyList.filter((item) => !!item.taxNo)

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineCompany.code')}
          placeholder={t('defineCompany.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineCompany.name')}
          placeholder={t('defineCompany.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="taxNo"
          label={t('defineCompany.tax')}
          placeholder={t('defineCompany.tax')}
          options={taxOptions}
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
