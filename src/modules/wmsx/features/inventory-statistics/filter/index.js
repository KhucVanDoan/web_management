import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
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
          name="type"
          label={t('inventoryStatistics.type')}
          placeholder={t('inventoryStatistics.type')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
