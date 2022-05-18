import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  ORDER_STATUS_OPTIONS,
  TRANSFER_MOVEMENT_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])
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
        <Field.Autocomplete
          name="warehouseTypeId"
          label={t('warehouseTransferMovement.warehouseType')}
          placeholder={t('warehouseTransferMovement.warehouseType')}
          options={warehouseType}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.name)}
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
          options={ORDER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="postedAt"
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
