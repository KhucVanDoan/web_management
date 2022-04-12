import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('itemGroupDefine.groupCode')}
          placeholder={t('itemGroupDefine.groupCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('itemGroupDefine.groupName')}
          placeholder={t('itemGroupDefine.groupName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('itemGroupDefine.createDate')}
          placeholder={t('itemGroupDefine.createDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
