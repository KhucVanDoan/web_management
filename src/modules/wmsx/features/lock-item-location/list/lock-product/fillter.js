import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { BLOCK_ITEM_LOCATION_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="itemCode"
          label={t('blockItemLocation.itemCode')}
          placeholder={t('blockItemLocation.itemCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('blockItemLocation.itemName')}
          placeholder={t('blockItemLocation.itemName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseName"
          label={t('blockItemLocation.warehouseName')}
          placeholder={t('blockItemLocation.warehouseName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="lotNumber"
          label={t('blockItemLocation.lotNumber')}
          placeholder={t('blockItemLocation.lotNumber')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="packageCode"
          label={t('blockItemLocation.packageCode')}
          placeholder={t('blockItemLocation.packageCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('blockItemLocation.status')}
          placeholder={t('blockItemLocation.status')}
          options={BLOCK_ITEM_LOCATION_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
