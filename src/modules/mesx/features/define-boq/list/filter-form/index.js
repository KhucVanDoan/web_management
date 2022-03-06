import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { BOQ_STATUS_OPTIONS } from '~/modules/mesx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineBOQ.boqCode')}
          placeholder={t('defineBOQ.boqCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineBOQ.boqName')}
          placeholder={t('defineBOQ.boqName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="pmName"
          label={t('defineBOQ.boqPm')}
          placeholder={t('defineBOQ.boqPm')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="planFrom"
          label={t('defineBOQ.boqPlan')}
          placeholder={t('defineBOQ.boqPlan')}
          type="date"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineBOQ.status')}
          placeholder={t('defineBOQ.status')}
          options={BOQ_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
