import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import {
  PRODUCTION_QC_PLAN_STATUS,
  STAGES_PRODUCTION,
} from '~/modules/qmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('productionQualityControlPlan.code')}
          placeholder={t('productionQualityControlPlan.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('productionQualityControlPlan.name')}
          placeholder={t('productionQualityControlPlan.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="qcStageId"
          label={t('productionQualityControlPlan.stageQc')}
          placeholder={t('productionQualityControlPlan.stageQc')}
          options={STAGES_PRODUCTION}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderName"
          label={t('productionQualityControlPlan.moName')}
          placeholder={t('productionQualityControlPlan.moName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('productionQualityControlPlan.status')}
          placeholder={t('productionQualityControlPlan.status')}
          options={PRODUCTION_QC_PLAN_STATUS}
          getOptionValue={(option) => option?.id.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
