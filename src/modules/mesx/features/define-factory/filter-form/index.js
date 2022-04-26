import React from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const {
    data: { companyList },
  } = useDefineCompany()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineFactory.code')}
          placeholder={t('defineFactory.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineFactory.name')}
          placeholder={t('defineFactory.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="companyName"
          label={t('defineFactory.companyName')}
          placeholder={t('defineFactory.companyName')}
          options={companyList}
          getOptionLabel={(opt) => opt?.name}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          getOptionValue={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineFactory.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
