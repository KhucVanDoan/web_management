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
          label={t('defineQualityPoint.code')}
          placeholder={t('defineQualityPoint.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineQualityPoint.name')}
          placeholder={t('defineQualityPoint.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="qcStageId"
          label={t('defineQualityPoint.stageQC')}
          placeholder={t('defineQualityPoint.stageQC')}
          options={STAGES}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="username"
          label={t('common.excutedBy')}
          placeholder={t('common.excutedBy')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineQualityPoint.status')}
          placeholder={t('defineQualityPoint.status')}
          options={QUALITY_POINT_STATUS}
          getOptionValue={(option) => option?.id?.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
