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
          label={t('defineCauseGroup.code')}
          placeholder={t('defineCauseGroup.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineCauseGroup.name')}
          placeholder={t('defineCauseGroup.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="description"
          label={t('defineCauseGroup.description')}
          placeholder={t('defineCauseGroup.description')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('general:common.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
