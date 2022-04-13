import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineActionGroup.code')}
          placeholder={t('defineActionGroup.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineActionGroup.name')}
          placeholder={t('defineActionGroup.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="description"
          label={t('defineActionGroup.description')}
          placeholder={t('defineActionGroup.description')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker name="createdAt" label={t('common.createdAt')} />
      </Grid>
    </Grid>
  )
}

export default FilterForm
