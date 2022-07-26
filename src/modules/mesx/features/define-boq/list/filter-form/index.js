import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { BOQ_STATUS_OPTIONS_FILTER } from '~/modules/mesx/constants'
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineBOQ.boqCode')}
          placeholder={t('defineBOQ.boqCode')}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX }}
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
          asyncRequest={(s) =>
            searchUsersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.fullName || opt?.username}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="planFrom"
          label={t('defineBOQ.boqPlan')}
          placeholder={t('defineBOQ.boqPlan')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineBOQ.status')}
          placeholder={t('defineBOQ.status')}
          options={BOQ_STATUS_OPTIONS_FILTER}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdTime"
          label={t('defineBOQ.createdTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
