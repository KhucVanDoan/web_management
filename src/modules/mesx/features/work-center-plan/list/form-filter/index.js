import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
const FilterForm = () => {
  const { t } = useTranslation(['mesx'])

  const {
    data: { moList },
    actions,
  } = useMo()
  useEffect(() => {
    actions.searchMO({ isGetAll: 1 })
  }, [])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="mpCode"
          label={t('workCenterPlan.planCode')}
          placeholder={t('workCenterPlan.planCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          label={t('workCenterPlan.moCode')}
          placeholder={t('workCenterPlan.moCode')}
          name="moCode"
          options={moList}
          getOptionValue={(opt) => opt?.name}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="woCode"
          label={t('workCenterPlan.woCode')}
          placeholder={t('workCenterPlan.woCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('workCenterPlan.itemName')}
          placeholder={t('workCenterPlan.itemName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="producingStepName"
          label={t('workCenterPlan.producingStepName')}
          placeholder={t('workCenterPlan.producingStepName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="wcName"
          label={t('workCenterPlan.name')}
          placeholder={t('workCenterPlan.name')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
