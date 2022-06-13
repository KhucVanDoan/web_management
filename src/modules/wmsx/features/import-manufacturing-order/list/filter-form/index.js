import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { ORDER_TYPE } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('importManufacturingOrder.nameList')}
          placeholder={t('importManufacturingOrder.nameList')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('importManufacturingOrder.typeList')}
          placeholder={t('importManufacturingOrder.typeList')}
          options={ORDER_TYPE}
          getOptionLabel={(opt) => (opt?.name ? t(opt?.name) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
