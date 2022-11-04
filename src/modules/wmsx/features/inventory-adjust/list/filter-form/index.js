import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  INVENTORY_ADJUST_STATUS_OPTIONS,
  INVENTORY_ADJUST_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('inventoryAdjust.code')}
          placeholder={t('inventoryAdjust.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('inventoryAdjust.name')}
          placeholder={t('inventoryAdjust.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('inventoryAdjust.type')}
          placeholder={t('inventoryAdjust.type')}
          options={INVENTORY_ADJUST_TYPE_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('inventoryAdjust.createdAt')}
          placeholder={t('inventoryAdjust.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('inventoryAdjust.status')}
          placeholder={t('inventoryAdjust.status')}
          options={INVENTORY_ADJUST_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
