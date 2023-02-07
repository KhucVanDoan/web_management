import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseId"
          label={t('setStoragePeriod.warehouseCode')}
          placeholder={t('setStoragePeriod.warehouseCode')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemCode"
          label={t('setStoragePeriod.itemCode')}
          placeholder={t('setStoragePeriod.itemCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('setStoragePeriod.itemName')}
          placeholder={t('setStoragePeriod.itemName')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
