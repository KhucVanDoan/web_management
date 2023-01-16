import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseId"
          label={t('inventorySetting.warehouseCode')}
          placeholder={t('inventorySetting.warehouseCode')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: ACTIVE_STATUS.ACTIVE,
                userWarehouse: ACTIVE_STATUS.ACTIVE,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemCode"
          label={t('inventorySetting.itemCode')}
          placeholder={t('inventorySetting.itemCode')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('inventorySetting.itemName')}
          placeholder={t('inventorySetting.itemName')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
