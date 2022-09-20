import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { RECEIPT_MANAGEMENT_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="receiptCode"
          label={t('receiptManagement.receiptCode')}
          placeholder={t('receiptManagement.receiptCode')}
          options={[]}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="receiptNo"
          label={t('receiptManagement.receiptNo')}
          placeholder={t('receiptManagement.receiptNo')}
          options={[]}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="contractNo"
          label={t('receiptManagement.contractNo')}
          placeholder={t('receiptManagement.contractNo')}
          options={[]}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('general.status')}
          placeholder={t('general.status')}
          options={RECEIPT_MANAGEMENT_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('receiptManagement.createdAt')}
          placeholder={t('receiptManagement.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
