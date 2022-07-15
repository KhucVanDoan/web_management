import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="devideCode"
          label={t('reportDevice.table.code')}
          placeholder={t('reportDevice.table.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="devideName"
          label={t('reportDevice.table.name')}
          placeholder={t('reportDevice.table.name')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
