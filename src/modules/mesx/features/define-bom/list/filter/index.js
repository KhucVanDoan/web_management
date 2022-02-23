import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BOM_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineBOM.bomCode')}
          placeholder={t('defineBOM.bomCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineBOM.bomName')}
          placeholder={t('defineBOM.bomName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineBOM.status')}
          placeholder={t('defineBOM.status')}
          options={BOM_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
