import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  WAREHOUSE_NATURE_OPTIONS,
  WAREHOUSE_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchWarehouseGroupApi } from '~/modules/wmsx/redux/sagas/define-warehouse-group/search-warehouse-group'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineWarehouse.code')}
          placeholder={t('defineWarehouse.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineWarehouse.name')}
          placeholder={t('defineWarehouse.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseTypeSettingId"
          label={t('defineWarehouse.group')}
          placeholder={t('defineWarehouse.group')}
          asyncRequest={(s) =>
            searchWarehouseGroupApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseCategory"
          label={t('defineWarehouse.type')}
          placeholder={t('defineWarehouse.type')}
          options={WAREHOUSE_TYPE_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseCharacteristic"
          label={t('defineWarehouse.nature')}
          placeholder={t('defineWarehouse.nature')}
          options={WAREHOUSE_NATURE_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineWarehouse.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
