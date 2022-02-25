import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BOM_PRODUCING_STEP_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const {
    data: { bomProducingStepList },
  } = useBomProducingStep()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('bomProducingStep.code')}
          placeholder={t('bomProducingStep.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('bomProducingStep.name')}
          placeholder={t('bomProducingStep.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="routingName"
          label={t('bomProducingStep.routingName')}
          placeholder={t('bomProducingStep.routingName')}
          options={bomProducingStepList}
          getOptionLabel={(opt) => opt?.routingName}
          getOptionValue={(opt) => opt?.routingName}
          // @TODO: <anh.nguyenthihai> edit option to routing, env doesnt have
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('bomProducingStep.status')}
          placeholder={t('bomProducingStep.status')}
          options={BOM_PRODUCING_STEP_STATUS_OPTIONS}
          getOptionLabel={(option) => t(option.text)}
          getOptionValue={(option) => option?.id.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineFactory.createTime')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
