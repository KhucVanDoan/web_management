import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { ORDER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  const {
    data: { saleOrderListAll },
  } = useSaleOrder()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('saleOrder.code')}
          placeholder={t('saleOrder.code')}
          options={saleOrderListAll}
          getOptionValue={(opt) => opt?.code}
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
          options={ORDER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('saleOrder.createdAt')}
          placeholder={t('saleOrder.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
