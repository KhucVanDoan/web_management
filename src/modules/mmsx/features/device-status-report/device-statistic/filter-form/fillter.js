import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { DEVICE_ASSIGN_STATUS } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('reportDevice.serialTable.serial')}
          placeholder={t('reportDevice.serialTable.serial')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceName"
          label={t('reportDevice.serialTable.name')}
          placeholder={t('reportDevice.serialTable.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="usedAt"
          label={t('reportDevice.serialTable.usageDate')}
          placeholder={t('reportDevice.serialTable.usageDate')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceCategory.form.status')}
          placeholder={t('deviceCategory.form.status')}
          options={DEVICE_ASSIGN_STATUS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt.id.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
