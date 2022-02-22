import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('itemUnitDefine.unitCode')}
          placeholder={t('itemUnitDefine.unitCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('itemUnitDefine.unitName')}
          placeholder={t('itemUnitDefine.unitName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('itemUnitDefine.createDate')}
          placeholder={t('itemUnitDefine.createDate')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm