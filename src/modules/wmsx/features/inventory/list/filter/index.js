import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseType },
  } = useInventory()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('inventories.code')}
          placeholder={t('inventories.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="executionDay"
          label={t('inventories.inventoryExecutionDay')}
          placeholder={t('inventories.inventoryExecutionDay')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdByUser"
          label={t('inventories.createdByUser')}
          placeholder={t('inventories.createdByUser')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseName"
          label={t('inventoryWarning.warehouseName')}
          placeholder={t('inventoryWarning.warehouseName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseType"
          label={t('inventories.warehouseType')}
          placeholder={t('inventories.warehouseType')}
          options={warehouseType}
          getOptionValue={(opt) => opt?.id || ''}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="inventoryStatus"
          label={t('inventories.inventoryStatus')}
          placeholder={t('inventories.inventoryStatus')}
          options={[]}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
