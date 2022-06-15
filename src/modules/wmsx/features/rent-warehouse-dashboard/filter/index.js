import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

function FilterForm() {
  const { t } = useTranslation(['wmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="customerName"
          label={t('rentWarehouseDashboard.customer')}
          placeholder={t('rentWarehouseDashboard.customer')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="billCode"
          label={t('rentWarehouseDashboard.bill')}
          placeholder={t('rentWarehouseDashboard.bill')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="serviceName"
          label={t('rentWarehouseDashboard.service')}
          placeholder={t('rentWarehouseDashboard.service')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="billDate"
          label={t('rentWarehouseDashboard.billDate')}
          placeholder={t('rentWarehouseDashboard.billDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
