import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { TRANSFER_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseTransfer.code')}
          placeholder={t('warehouseTransfer.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warehouseTransfer.name')}
          placeholder={t('warehouseTransfer.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('warehouseTransfer.status')}
          placeholder={t('warehouseTransfer.status')}
          options={TRANSFER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
