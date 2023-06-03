import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { WAREHOUSE_IMPORT_RECEIPT_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label="Mã phiếu"
          placeholder="Mã phiếu"
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          multiple
          label="Trạng thái"
          placeholder="Trạng thái"
          options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Field.DateRangePicker
          name="receiptDate"
          label={t('warehouseImportReceipt.receiptDate')}
        />
      </Grid> */}
    </Grid>
  )
}

export default FilterForm
