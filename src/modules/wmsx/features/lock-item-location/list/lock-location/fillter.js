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
          name="factoryName"
          label={t('blockItemLocation.factoryName')}
          placeholder={t('blockItemLocation.factoryName')}
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
          name="warehouseSectorName"
          label={t('blockItemLocation.sectorName')}
          placeholder={t('blockItemLocation.sectorName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseShelfName"
          label={t('blockItemLocation.shelfName')}
          placeholder={t('blockItemLocation.shelfName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseFloorName"
          label={t('blockItemLocation.floorName')}
          placeholder={t('blockItemLocation.floorName')}
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
