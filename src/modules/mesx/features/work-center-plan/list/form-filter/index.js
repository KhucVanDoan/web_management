import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
const FilterForm = () => {
  const { t } = useTranslation(['mesx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="mpCode"
          label={t('workCenterPlan.planCode')}
          placeholder={t('workCenterPlan.planCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          label={t('workCenterPlan.moCode')}
          placeholder={t('workCenterPlan.moCode')}
          name="moCode"
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="woCode"
          label={t('workCenterPlan.woCode')}
          placeholder={t('workCenterPlan.woCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('workCenterPlan.itemName')}
          placeholder={t('workCenterPlan.itemName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="producingStepName"
          label={t('workCenterPlan.producingStepName')}
          placeholder={t('workCenterPlan.producingStepName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="wcName"
          label={t('workCenterPlan.name')}
          placeholder={t('workCenterPlan.name')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
