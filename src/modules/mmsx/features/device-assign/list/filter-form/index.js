import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { DEVICE_ASSIGN_STATUS } from '~/modules/mmsx/constants'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { responsibleSubject },
    actions: commonActions,
  } = useCommonInfo()

  useEffect(() => {
    commonActions.getResponsibleSubject()
  }, [])

  const responsibleSubjectList = useMemo(() => {
    if (responsibleSubject) {
      const responsibleUsers = responsibleSubject?.responsibleUsers || []
      const responsibleMaintenanceTeams =
        responsibleSubject?.responsibleMaintenanceTeams || []

      return [...responsibleUsers, ...responsibleMaintenanceTeams]
    }
    return []
  }, [responsibleSubject])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('deviceAssign.assign.serial')}
          placeholder={t('deviceAssign.assign.serial')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('deviceAssign.assign.code')}
          placeholder={t('deviceAssign.assign.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('deviceAssign.assign.name')}
          placeholder={t('deviceAssign.assign.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="user"
          label={t('deviceAssign.assign.user')}
          placeholder={t('deviceAssign.assign.user')}
          options={responsibleSubjectList}
          getOptionValue={(opt) => opt?.id || ''}
          getOptionLabel={(opt) => opt?.name || opt?.username || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceAssign.assign.status')}
          placeholder={t('deviceAssign.assign.status')}
          options={DEVICE_ASSIGN_STATUS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('common.updatedAt')}
          placeholder={t('common.updatedAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
