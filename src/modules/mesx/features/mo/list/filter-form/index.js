import React from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { MO_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useDefineFactory from '~/modules/mesx/redux/hooks/useDefineFactory'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { moListAll },
  } = useMo()
  const {
    data: { planList },
  } = useDefinePlan()
  const {
    data: { factoryList },
  } = useDefineFactory()
  const {
    data: { saleOrderList },
  } = useSaleOrder()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('Mo.moCode')}
          placeholder={t('Mo.moCode')}
          options={moListAll}
          getOptionLabel={(option) => option.code}
          getOptionValue={(option) => option.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('Mo.moName')}
          placeholder={t('Mo.moName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="planName"
          label={t('Mo.planName')}
          placeholder={t('Mo.planName')}
          options={planList}
          getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          getOptionValue={(option) => option?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="factoryId"
          label={t('Mo.moFactory')}
          placeholder={t('Mo.moFactory')}
          options={factoryList}
          getOptionLabel={(option) => option.name}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          getOptionValue={(option) => option.id.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderId"
          label={t('Mo.soName')}
          placeholder={t('Mo.soName')}
          options={saleOrderList}
          getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          getOptionValue={(option) => option.id.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('Mo.moPlan')}
          placeholder={t('Mo.moPlan')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('Mo.status')}
          placeholder={t('Mo.status')}
          options={MO_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('Mo.createDate')}
          placeholder={t('Mo.createDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
