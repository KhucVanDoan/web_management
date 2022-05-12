import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['database'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('itemUnitDefine.unitCode')}
          placeholder={t('itemUnitDefine.unitCode')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('itemUnitDefine.unitName')}
          placeholder={t('itemUnitDefine.unitName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('itemUnitDefine.createDate')}
          placeholder={t('itemUnitDefine.createDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
