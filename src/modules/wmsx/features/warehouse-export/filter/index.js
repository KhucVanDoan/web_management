import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  // ORDER_STATUS_OPTIONS,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('movements.code')}
          placeholder={t('movements.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdByUser"
          label={t('movements.createdByUser')}
          placeholder={t('movements.createdByUser')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('movements.movementStatus')}
          placeholder={t('movements.movementStatus')}
          options={ORDER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid> */}
      <Grid item xs={12}>
        <Field.Autocomplete
          name="movementType"
          label={t('movements.importExport.orderType')}
          placeholder={t('movements.importExport.orderType')}
          options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
