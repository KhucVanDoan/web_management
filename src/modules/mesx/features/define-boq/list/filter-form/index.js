import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BOQ_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

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
          options={BOQ_STATUS_OPTIONS.map((boq) => ({
            value: boq.id.toString(),
            label: t(boq.text),
          }))}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
