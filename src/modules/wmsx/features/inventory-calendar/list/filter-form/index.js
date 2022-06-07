import React, { useEffect } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { INVENTORY_CALENDAR_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  const {
    data: { warehouseList },
    actions,
  } = useDefineWarehouse()

  useEffect(() => {
    actions.searchWarehouses({ isGetAll: 1 })
  }, [])

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
          name="warehouseName"
          label={t('inventoryCalendar.warehouses')}
          placeholder={t('inventoryCalendar.warehouses')}
          options={warehouseList}
          getOptionValue={(opt) => opt?.name}
          getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
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
