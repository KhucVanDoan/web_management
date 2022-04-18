import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { BOM_PRODUCING_STEP_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { searchRoutingsApi } from '~/modules/mesx/redux/sagas/routing/search-routings'
const FilterForm = () => {
  const { t } = useTranslation('mesx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="bomCode"
          label={t('bomProducingStep.code')}
          placeholder={t('bomProducingStep.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomName"
          label={t('bomProducingStep.name')}
          placeholder={t('bomProducingStep.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="routingName"
          label={t('bomProducingStep.routingName')}
          placeholder={t('bomProducingStep.routingName')}
          asyncRequest={(s) =>
            searchRoutingsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('bomProducingStep.status')}
          placeholder={t('bomProducingStep.status')}
          options={BOM_PRODUCING_STEP_STATUS_OPTIONS}
          getOptionLabel={(option) => t(option.text)}
          getOptionValue={(option) => option?.id.toString()}
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
