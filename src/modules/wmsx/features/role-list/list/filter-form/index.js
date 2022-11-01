import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { MAINTENANCE_TEAM_TYPE_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('maintenanceTeam.team.code')}
          placeholder={t('maintenanceTeam.team.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('maintenanceTeam.team.name')}
          placeholder={t('maintenanceTeam.team.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('maintenanceTeam.type')}
          placeholder={t('maintenanceTeam.type')}
          options={MAINTENANCE_TEAM_TYPE_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('maintenanceTeam.createAt')}
          placeholder={t('maintenanceTeam.createAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('maintenanceTeam.updateAt')}
          placeholder={t('maintenanceTeam.updateAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
