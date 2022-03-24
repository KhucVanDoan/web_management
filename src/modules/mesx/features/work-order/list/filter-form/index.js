import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('workOrder.lblcodeWorkOrder')}
          placeholder={t('workOrder.lblcodeWorkOrder')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="moPlanCode"
          label={t('workOrder.codeKH')}
          placeholder={t('workOrder.codeKH')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="moDetailItemCode"
          label={t('workOrder.codeTP')}
          placeholder={t('workOrder.codeTP')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomItemName"
          label={t('workOrder.codeBTP')}
          placeholder={t('workOrder.codeBTP')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="producingStepName"
          label={t('workOrder.nameCD')}
          placeholder={t('workOrder.nameCD')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('workOrder.plan')}
          placeholder={t('workOrder.plan')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="workCenter"
          label={t('workOrder.workshop')}
          placeholder={t('workOrder.workshop')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
