import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="id"
          label={t('warehouseImportReceipt.id')}
          placeholder={t('warehouseImportReceipt.id')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="expenditureType"
          label={t('warehouseImportReceipt.expenditureType')}
          placeholder={t('warehouseImportReceipt.expenditureType')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="unit"
          label={t('warehouseImportReceipt.unit')}
          placeholder={t('warehouseImportReceipt.unit')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouse"
          label={t('warehouseImportReceipt.warehouse')}
          placeholder={t('warehouseImportReceipt.warehouse')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="source"
          label={t('warehouseImportReceipt.sourceFilter')}
          placeholder={t('warehouseImportReceipt.sourceFilter')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('general.status')}
          placeholder={t('general.status')}
          options={[]}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('warehouseImportReceipt.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
