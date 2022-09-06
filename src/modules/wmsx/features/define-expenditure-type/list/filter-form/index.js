import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchExpenditureOrgApi } from '~/modules/wmsx/redux/sagas/define-expenditure-org/search-expenditure-org'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineExpenditureType.code')}
          placeholder={t('defineExpenditureType.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineExpenditureType.name')}
          placeholder={t('defineExpenditureType.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="organizationPayment"
          label={t('defineExpenditureType.organizationPayment')}
          placeholder={t('defineExpenditureType.organizationPayment')}
          asyncRequest={(s) =>
            searchExpenditureOrgApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="description"
          label={t('defineExpenditureType.description')}
          placeholder={t('defineExpenditureType.description')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
