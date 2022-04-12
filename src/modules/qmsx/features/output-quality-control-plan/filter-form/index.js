import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { OUTPUT_QC_PLAN_STATUS, STAGES_OUTPUT } from '~/modules/qmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('inputQualityControlPlan.code')}
          placeholder={t('inputQualityControlPlan.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('inputQualityControlPlan.name')}
          placeholder={t('inputQualityControlPlan.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="qcStageId"
          label={t('inputQualityControlPlan.stageQc')}
          placeholder={t('inputQualityControlPlan.stageQc')}
          options={STAGES_OUTPUT}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderName"
          label={t('inputQualityControlPlan.orderName')}
          placeholder={t('inputQualityControlPlan.orderName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('inputQualityControlPlan.status')}
          placeholder={t('inputQualityControlPlan.status')}
          options={OUTPUT_QC_PLAN_STATUS}
          getOptionValue={(option) => option?.id.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
