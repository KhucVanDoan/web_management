import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="itemCode"
          label={t('inventoryWarning.code')}
          placeholder={t('inventoryWarning.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('inventoryWarning.name')}
          placeholder={t('inventoryWarning.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemTypeName"
          label={t('inventoryWarning.type')}
          placeholder={t('inventoryWarning.type')}
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
        <Field.TextField
          name="warehouseSectorName"
          label={t('general.warehouseSectorName')}
          placeholder={t('general.warehouseSectorName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseShelfName"
          label={t('general.warehouseShelfName')}
          placeholder={t('general.warehouseShelfName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseShelfFloorName"
          label={t('general.warehousePalletName')}
          placeholder={t('general.warehousePalletName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemGroupName"
          label={t('inventoryWarning.itemGroup')}
          placeholder={t('inventoryWarning.itemGroup')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemUnitName"
          label={t('inventoryWarning.itemUnit')}
          placeholder={t('inventoryWarning.itemUnit')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
