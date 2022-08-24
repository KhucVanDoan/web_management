import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'

const FilterForm = () => {
  const { t } = useTranslation('mmsx')
  const {
    data: { itemsUnitList },
    actions,
  } = useCommonInfo()

  useEffect(() => {
    actions.getItemUnits()
  }, [])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('attributeType.table.code')}
          placeholder={t('attributeType.table.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('attributeType.table.name')}
          placeholder={t('attributeType.table.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="unit"
          label={t('attributeType.table.unit')}
          placeholder={t('attributeType.table.unit')}
          options={itemsUnitList}
          getOptionValue={(opt) => opt?.id || ''}
          getOptionLabel={(opt) => opt?.name || ''}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
