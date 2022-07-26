import React from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { MO_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { planList },
  } = useDefinePlan()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('Mo.moCode')}
          placeholder={t('Mo.moCode')}
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(option) => option.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('Mo.moName')}
          placeholder={t('Mo.moName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="planName"
          label={t('Mo.planName')}
          placeholder={t('Mo.planName')}
          options={planList}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          getOptionValue={(option) => option?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="factoryId"
          label={t('Mo.moFactory')}
          placeholder={t('Mo.moFactory')}
          asyncRequest={(s) =>
            searchFactoriesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderId"
          label={t('Mo.soName')}
          placeholder={t('Mo.soName')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('Mo.moPlan')}
          placeholder={t('Mo.moPlan')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('Mo.status')}
          placeholder={t('Mo.status')}
          options={MO_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('Mo.createDate')}
          placeholder={t('Mo.createDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
