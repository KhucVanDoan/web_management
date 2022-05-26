import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  const {
    data: { warehouseType },
    actions,
  } = useInventory()

  useEffect(() => {
    actions.getWarehouseType()
  }, [])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseTypeId"
          label={t('movements.warehouseType')}
          placeholder={t('movements.warehouseType')}
          options={warehouseType}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.name)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('movements.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
