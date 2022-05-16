import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useItemType from '~/modules/database/redux/hooks/useItemType'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  useEffect(() => {
    actionsItemType.searchItemTypes({ isGetAll: 1 })
  }, [])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('inventoryStatistics.name')}
          placeholder={t('inventoryStatistics.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemTypeId"
          label={t('inventoryStatistics.itemType')}
          placeholder={t('inventoryStatistics.itemType')}
          options={itemTypeList}
          getOptionValue={(opt) => opt?.id || ''}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseName"
          label={t('inventoryStatistics.warehouseName')}
          placeholder={t('inventoryStatistics.warehouseName')}
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
          name="lotNumber"
          label={t('inventoryStatistics.lotNumber')}
          placeholder={t('inventoryStatistics.lotNumber')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="package"
          label={t('inventoryStatistics.packageCode')}
          placeholder={t('inventoryStatistics.packageCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DatePicker
          name="reportDate"
          label={t('inventoryStatistics.reportDate')}
          placeholder={t('inventoryStatistics.reportDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
