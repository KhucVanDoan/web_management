import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('inventoryCalendar.code')}
          placeholder={t('inventoryCalendar.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('inventoryCalendar.name')}
          placeholder={t('inventoryCalendar.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseId"
          label={t('inventoryCalendar.warehouses')}
          placeholder={t('inventoryCalendar.warehouses')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          multiple
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('inventoryCalendar.inventoryType')}
          placeholder={t('inventoryCalendar.inventoryType')}
          options={INVENTORY_TYPE_OPTIONS}
          getOptionLabel={(opt) => t(`${opt?.text}`)}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="checkPointDate"
          label={t('inventoryCalendar.closingDay')}
          placeholder={t('inventoryCalendar.closingDay')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('inventoryCalendar.status')}
          placeholder={t('inventoryCalendar.status')}
          options={INVENTORY_CALENDAR_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
