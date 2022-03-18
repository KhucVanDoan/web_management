import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation('mesx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineCustomer.code')}
          placeholder={t('defineCustomer.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineCustomer.name')}
          placeholder={t('defineCustomer.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="address"
          label={t('defineCustomer.address')}
          placeholder={t('defineCustomer.address')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="phone"
          label={t('defineCustomer.phone')}
          placeholder={t('defineCustomer.phone')}
          allow="phone"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="email"
          label={t('defineCustomer.email')}
          placeholder={t('defineCustomer.email')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="fax"
          label={t('defineCustomer.fax')}
          placeholder={t('defineCustomer.fax')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineCustomer.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
