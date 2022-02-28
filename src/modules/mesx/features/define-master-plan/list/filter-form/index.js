import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { PLAN_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { soList },
    actions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getSaleOrders()
  }, [])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineMasterPlan.code')}
          placeholder={t('defineMasterPlan.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineMasterPlan.planName')}
          placeholder={t('defineMasterPlan.planName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soId"
          label={t('defineMasterPlan.saleOrder')}
          placeholder={t('defineMasterPlan.saleOrder')}
          options={soList}
          getOptionLabel={(option) => option?.name || ''}
          getOptionValue={(option) => option?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="planDate"
          label={t('defineMasterPlan.planDate')}
          placeholder={t('defineMasterPlan.planDate')}
          type="date"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineMasterPlan.status')}
          placeholder={t('defineMasterPlan.status')}
          options={PLAN_STATUS_OPTIONS.map((status) => ({
            value: status.id.toString(),
            label: t(status.text),
          }))}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineMasterPlan.createdAt')}
          placeholder={t('defineMasterPlan.createdAt')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
