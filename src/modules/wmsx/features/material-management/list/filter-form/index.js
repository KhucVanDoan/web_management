import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchObjectCategoryApi } from '~/modules/wmsx/redux/sagas/define-object-category/search-object-category'
import { searchProducingCountryApi } from '~/modules/wmsx/redux/sagas/define-producing-country/search-producing-country'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('materialManagement.code')}
          placeholder={t('materialManagement.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('materialManagement.name')}
          placeholder={t('materialManagement.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="country"
          label={t('materialManagement.country')}
          placeholder={t('materialManagement.country')}
          asyncRequest={(s) =>
            searchProducingCountryApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="objectCategory"
          label={t('materialManagement.objectCategory')}
          placeholder={t('materialManagement.objectCategory')}
          asyncRequest={(s) =>
            searchObjectCategoryApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('materialManagement.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
