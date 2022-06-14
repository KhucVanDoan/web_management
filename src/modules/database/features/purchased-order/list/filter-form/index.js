import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { PURCHASED_ORDER_STATUS_OPTIONS } from '~/modules/database/constants'
import { getVendorsApi } from '~/modules/mesx/redux/sagas/common/get-vendors'

const FilterForm = () => {
  const { t } = useTranslation('mesx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('purchasedOrder.code')}
          placeholder={t('purchasedOrder.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('purchasedOrder.name')}
          placeholder={t('purchasedOrder.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="vendorName"
          label={t('purchasedOrder.vendor.name')}
          placeholder={t('purchasedOrder.vendor.name')}
          asyncRequest={(s) =>
            getVendorsApi({
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
          name="status"
          label={t('purchasedOrder.status')}
          placeholder={t('purchasedOrder.status')}
          options={PURCHASED_ORDER_STATUS_OPTIONS}
          getOptionLabel={(option) => (option?.text ? t(option?.text) : '')}
          getOptionValue={(option) => option?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('purchasedOrder.createTime')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="deadline"
          label={t('purchasedOrder.deadline')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm