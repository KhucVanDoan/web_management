import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Field } from '~/components/Formik'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const moList = useSelector((state) => state.Mo.moList)
  const {
    data: { saleOrderList },
  } = useSaleOrder()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moName"
          label={t('planReport.moName')}
          placeholder={t('planReport.moName')}
          options={moList}
          getOptionValue={(opt) => opt?.code}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderIds"
          label={t('planReport.saleOrder')}
          placeholder={t('planReport.saleOrder')}
          options={saleOrderList}
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('planReport.labledateSX')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
