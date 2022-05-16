import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  MOVEMENT_STATUS,
  TRANSFER_MOVEMENT_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="id"
          label={t('warehouseTransferMovement.code')}
          placeholder={t('warehouseTransferMovement.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderCode"
          label={t('warehouseTransferMovement.letterCode')}
          placeholder={t('warehouseTransferMovement.letterCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="warehouseTypes"
          label={t('warehouseTransferMovement.warehouseType')}
          placeholder={t('warehouseTransferMovement.warehouseType')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="movementType"
          label={t('warehouseTransferMovement.type')}
          placeholder={t('warehouseTransferMovement.type')}
          options={TRANSFER_MOVEMENT_TYPE_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.name)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="orderStatus"
          label={t('warehouseTransferMovement.letterStatus')}
          placeholder={t('warehouseTransferMovement.letterStatus')}
          options={MOVEMENT_STATUS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('warehouseTransferMovement.transferOn')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdBy"
          label={t('warehouseTransferMovement.createdByUser')}
          placeholder={t('warehouseTransferMovement.createdByUser')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="sourceWarehouseName"
          label={t('warehouseTransferMovement.sourceWarehouseName')}
          placeholder={t('warehouseTransferMovement.sourceWarehouseName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="destinationWarehouseName"
          label={t('warehouseTransferMovement.destinationWarehouseName')}
          placeholder={t('warehouseTransferMovement.destinationWarehouseName')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
