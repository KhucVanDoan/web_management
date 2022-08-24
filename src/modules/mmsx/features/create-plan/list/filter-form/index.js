import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { CREATE_PLAN_STATUS_OPTIONS } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('mmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('createPlanList.table.code')}
          placeholder={t('createPlanList.table.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('createPlanList.table.name')}
          placeholder={t('createPlanList.table.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('createPlanList.table.status')}
          placeholder={t('createPlanList.table.status')}
          options={CREATE_PLAN_STATUS_OPTIONS}
          getOptionLabel={(option) => (option?.text ? t(option?.text) : '')}
          getOptionValue={(option) => option?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
