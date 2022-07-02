import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { WARNING_STATUS_LIST } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warningList.table.code')}
          placeholder={t('warningList.table.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warningList.table.name')}
          placeholder={t('warningList.table.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('warningList.table.serial')}
          placeholder={t('warningList.table.serial')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('warningList.table.deviceName')}
          placeholder={t('warningList.table.deviceName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="piority"
          label={t('warningList.table.piority')}
          placeholder={t('warningList.table.piority')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceCategory.form.status')}
          placeholder={t('deviceCategory.form.status')}
          options={WARNING_STATUS_LIST}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('warningList.table.createdAt')}
          placeholder={t('warningList.table.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
