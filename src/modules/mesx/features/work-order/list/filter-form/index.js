import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { WORK_ORDER_STATUS_OPTIONS } from '~/modules/mesx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('workOrder.codeCV')}
          placeholder={t('workOrder.codeCV')}
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
          name="moName"
          label={t('workOrder.moName')}
          placeholder={t('workOrder.moName')}
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
          name="moDetailItemName"
          label={t('workOrder.nameTP')}
          placeholder={t('workOrder.nameTP')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomItemName"
          label={t('workOrder.nameBTP')}
          placeholder={t('workOrder.nameBTP')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomName"
          label={t('defineBOM.bomName')}
          placeholder={t('defineBOM.bomName')}
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
          type="date"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="workCenter"
          label={t('workOrder.workshop')}
          placeholder={t('workOrder.workshop')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="quantity"
          label={t('workOrder.quantityPlan')}
          placeholder={t('workOrder.quantityPlan')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('workOrder.status')}
          placeholder={t('workOrder.status')}
          options={WORK_ORDER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.name)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
