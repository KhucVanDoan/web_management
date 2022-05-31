import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { ORDER_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('purchasedOrderImport.codeImp')}
          placeholder={t('purchasedOrderImport.codeImp')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('purchasedOrderImport.nameImp')}
          placeholder={t('purchasedOrderImport.nameImp')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('purchasedOrderImport.status')}
          placeholder={t('purchasedOrderImport.status')}
          options={ORDER_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('purchasedOrderImport.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="deadline"
          label={t('purchasedOrderImport.deadline')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
