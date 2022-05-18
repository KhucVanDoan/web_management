import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { USER_MANAGEMENT_STATUS } from '~/modules/qmsx/constants'
import { useCommonManagement } from '~/modules/qmsx/redux/hooks/useCommonManagement'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  const {
    data: { departmentList },
  } = useCommonManagement()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="username"
          label={t('userManagement.username')}
          placeholder={t('userManagement.username')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="fullName"
          label={t('userManagement.fullName')}
          placeholder={t('userManagement.fullName')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="departmentName"
          label={t('userManagement.department')}
          placeholder={t('userManagement.department')}
          options={departmentList}
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('userManagement.status')}
          placeholder={t('userManagement.status')}
          options={USER_MANAGEMENT_STATUS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('userManagement.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm