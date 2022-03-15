import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { BOQ_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { userList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    commonManagementActions.getUsers()
  }, [])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineBOQ.boqCode')}
          placeholder={t('defineBOQ.boqCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineBOQ.boqName')}
          placeholder={t('defineBOQ.boqName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="pmName"
          label={t('defineBOQ.boqPm')}
          placeholder={t('defineBOQ.boqPm')}
          options={userList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.fullName || opt?.username}
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
