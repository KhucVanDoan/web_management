import React, { useEffect } from 'react'

import { Grid, createFilterOptions } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { WAREHOUSE_IMPORT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')
  const {
    data: { warehouseList },
    actions: warehouseActions,
  } = useDefineWarehouse()

  useEffect(() => {
    warehouseActions.searchWarehouses({ isGetAll: 1 })
  }, [])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseName"
          label={t('movements.importExport.warehouseName')}
          placeholder={t('movements.importExport.warehouseName')}
          options={warehouseList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="orderType"
          label={t('movements.importExport.orderType')}
          placeholder={t('movements.importExport.orderType')}
          options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="planDate"
          label={t('movements.movementDateRange')}
          placeholder={t('movements.movementDateRange')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
