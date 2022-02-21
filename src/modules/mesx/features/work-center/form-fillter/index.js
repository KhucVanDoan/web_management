import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { WORK_CENTER_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

import { useAppStore } from '../../../../auth/redux/hooks/useAppStore'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { appStore } = useAppStore()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('workCenter.code')}
          placeholder={t('workCenter.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('workCenter.name')}
          placeholder={t('workCenter.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          label={t('workCenter.factoryName')}
          placeholder={t('workCenter.factoryName')}
          name="factoryName"
          options={appStore?.factories}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('workCenter.status')}
          placeholder={t('workCenter.status')}
          options={WORK_CENTER_STATUS_OPTIONS.map((work) => ({
            value: work.id.toString(),
            label: t(work.text),
          }))}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
