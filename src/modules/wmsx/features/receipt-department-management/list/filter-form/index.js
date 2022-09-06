import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { RECEIPT_DEPARTMENT_TYPE_OPTIONS } from '~/modules/wmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('receiptDepartmentManagement.code')}
          placeholder={t('receiptDepartmentManagement.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('receiptDepartmentManagement.name')}
          placeholder={t('receiptDepartmentManagement.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="departmentType"
          label={t('receiptDepartmentManagement.departmentType')}
          placeholder={t('receiptDepartmentManagement.departmentType')}
          options={RECEIPT_DEPARTMENT_TYPE_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdTime"
          label={t('receiptDepartmentManagement.createdTime')}
          placeholder={t('receiptDepartmentManagement.createdTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
