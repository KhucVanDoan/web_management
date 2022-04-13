import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { QUALITY_POINT_STATUS, STAGES } from '~/modules/qmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineQualityAlert.code')}
          placeholder={t('defineQualityAlert.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineQualityAlert.name')}
          placeholder={t('defineQualityAlert.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="qcStageId"
          label={t('defineQualityAlert.stageQc')}
          placeholder={t('defineQualityAlert.stageQc')}
          options={STAGES}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdBy"
          label={t('common.createdBy')}
          placeholder={t('common.createdBy')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineQualityAlert.status')}
          placeholder={t('defineQualityAlert.status')}
          options={QUALITY_POINT_STATUS}
          getOptionValue={(option) => option?.id?.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
