import React from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import { WORK_CENTER_STATUS_OPTIONS } from '~/modules/mesx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { factoryList },
  } = useDefineFactory()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('workCenter.code')}
          placeholder={t('workCenter.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('workCenter.name')}
          placeholder={t('workCenter.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          label={t('workCenter.factoryName')}
          placeholder={t('workCenter.factoryName')}
          name="factoryId"
          options={factoryList}
          getOptionValue={(opt) => opt?.id.toString()}
          getOptionLabel={(opt) => opt?.name}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('workCenter.status')}
          placeholder={t('workCenter.status')}
          options={WORK_CENTER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('workCenter.createdAt')}
          placeholder={t('workCenter.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
