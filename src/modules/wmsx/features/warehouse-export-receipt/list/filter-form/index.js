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
          label={t('warehouseExportReceipt.receiptId')}
          placeholder={t('warehouseExportReceipt.receiptId')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="typeBusiness"
          label={t('warehouseExportReceipt.typeBusiness')}
          placeholder={t('warehouseExportReceipt.typeBusiness')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="unit"
          label={t('warehouseExportReceipt.unit')}
          placeholder={t('warehouseExportReceipt.unit')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseExport"
          label={t('warehouseExportReceipt.warehouseExport')}
          placeholder={t('warehouseExportReceipt.warehouseExport')}
          asyncRequest={() => {}}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="suorceAccountant"
          label={t('warehouseExportReceipt.suorceAccountant')}
          placeholder={t('warehouseExportReceipt.suorceAccountant')}
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
          label={t('warehouseExportReceipt.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
