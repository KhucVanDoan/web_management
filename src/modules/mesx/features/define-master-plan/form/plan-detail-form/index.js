import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const PlanDetailForm = () => {
  const { t } = useTranslation(['mesx'])

  return (
    <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
      <Grid item lg={6} xs={12}>
        <Field.DatePicker
          name="dateFromSo"
          label={t('defineMasterPlan.executionDate')}
          placeholder={t('defineMasterPlan.executionDate')}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Field.TextField
          name="dateCompletion"
          type="number"
          label={t('defineMasterPlan.completionTime')}
          placeholder={t('defineMasterPlan.completionTime')}
        />
      </Grid>
    </Grid>
  )
}

export default PlanDetailForm
