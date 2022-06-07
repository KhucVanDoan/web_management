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
          name="code"
          label={t('defineVoucher.code')}
          placeholder={t('defineVoucher.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineVoucher.name')}
          placeholder={t('defineVoucher.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="date"
          label={t('defineVoucher.date')}
          placeholder={t('defineVoucher.date')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
