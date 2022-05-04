import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { CHECK_LIST_STATUS } from '~/modules/qmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineCheckList.code')}
          placeholder={t('defineCheckList.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineCheckList.name')}
          placeholder={t('defineCheckList.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="description"
          label={t('defineCheckList.description')}
          placeholder={t('defineCheckList.description')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('general:common.createdAt')}
          placeholder={t('general:common.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineCheckList.status')}
          placeholder={t('defineCheckList.status')}
          options={CHECK_LIST_STATUS}
          getOptionValue={(option) => option?.id?.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
