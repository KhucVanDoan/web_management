import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  WAREHOUSE_NATURE_OPTIONS,
  WAREHOUSE_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchCompaniesApi } from '~/modules/wmsx/redux/sagas/company-management/search-companies'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineWarehouse.code')}
          placeholder={t('defineWarehouse.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineWarehouse.name')}
          placeholder={t('defineWarehouse.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="companyCode"
          label={t('defineWarehouse.companyCode')}
          placeholder={t('defineWarehouse.companyCode')}
          asyncRequest={(s) =>
            searchCompaniesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('defineWarehouse.type')}
          placeholder={t('defineWarehouse.type')}
          options={WAREHOUSE_TYPE_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="nature"
          label={t('defineWarehouse.nature')}
          placeholder={t('defineWarehouse.nature')}
          options={WAREHOUSE_NATURE_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineWarehouse.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
