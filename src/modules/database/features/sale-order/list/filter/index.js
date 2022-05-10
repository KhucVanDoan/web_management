import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS_OPTIONS } from '~/modules/database/constants'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'

function FilterForm() {
  const { t } = useTranslation(['database'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('saleOrder.code')}
          placeholder={t('saleOrder.code')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
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
          name="name"
          label={t('saleOrder.name')}
          placeholder={t('saleOrder.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('saleOrder.status')}
          placeholder={t('saleOrder.status')}
          options={SALE_ORDER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('saleOrder.createDate')}
          placeholder={t('saleOrder.createDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
