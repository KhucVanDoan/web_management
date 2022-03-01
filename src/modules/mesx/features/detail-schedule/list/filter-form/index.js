import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DETAIL_SCHEDULE_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="woCode"
          label={t('detailSchedule.woCode')}
          placeholder={t('detailSchedule.woCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="workCenters"
          label={t('detailSchedule.workCenter')}
          placeholder={t('detailSchedule.workCenter')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('detailSchedule.status')}
          placeholder={t('detailSchedule.status')}
          options={DETAIL_SCHEDULE_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
