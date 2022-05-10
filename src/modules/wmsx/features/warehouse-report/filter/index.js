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
          name="code"
          label={t('warehouseReport.code')}
          placeholder={t('warehouseReport.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warehouseReport.name')}
          placeholder={t('warehouseReport.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="reportingPeriod"
          label={t('warehouseReport.periodReport')}
          placeholder={t('warehouseReport.periodReport')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdBy"
          label={t('warehouseReport.createdBy')}
          placeholder={t('warehouseReport.createdBy')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
