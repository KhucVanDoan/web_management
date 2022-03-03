import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = ({ moList, saleOrderList, itemList }) => {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
          options={moList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soId"
          label={t('qualityReport.saleOrder')}
          placeholder={t('qualityReport.saleOrder')}
          options={saleOrderList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('qualityReport.productName')}
          placeholder={t('qualityReport.productName')}
          options={itemList}
          getOptionValue={(opt) => opt?.name}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
