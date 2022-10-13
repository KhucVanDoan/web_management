import React, { useState } from 'react'

import { Box, Paper, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import { LICENSE_ITEM_OPTIONS } from '../../../constants'
import useLicense from '../../../redux/hooks/useLicense'
import { formSchema } from './schema'
import style from './style'

const LicenseForm = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('auth')

  const [visible, setVisible] = useState(false)

  const initialValues = {
    item: 0,
    license: '',
    numberContract: '',
  }

  const { actions } = useLicense()

  const onSubmit = (values) => {
    const paramUpdate = {
      license: values?.license,
      numberContract: values?.numberContract,
    }
    actions.activeLicense(paramUpdate)
  }

  return (
    <Box className={classes.background}>
      <Box className={classes.main}>
        <Paper className={classes.paper}>
          <Typography variant="h2" mb={2} sx={{ textAlign: 'center' }}>
            {t('licenseActivation.title')}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <Field.Autocomplete
                  name="item"
                  label={t('licenseActivation.item')}
                  placeholder={t('licenseActivation.item')}
                  options={LICENSE_ITEM_OPTIONS}
                  getOptionLabel={(opt) => t(opt?.text)}
                  getOptionValue={(opt) => opt?.id}
                  vertical
                  disabled
                />
                <Field.TextField
                  name="license"
                  vertical
                  required
                  label={t('licenseActivation.license')}
                  placeholder={t('licenseActivation.licenseForm')}
                  type={visible ? 'text' : 'password'}
                  endAdornment={
                    <IconButton
                      onClick={() => setVisible(!visible)}
                      size="small"
                      sx={{ mx: 0.5 }}
                    >
                      {visible ? (
                        <Icon name="visible" />
                      ) : (
                        <Icon name="invisible" />
                      )}
                    </IconButton>
                  }
                  allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                  }}
                  sx={{ mt: 4 / 3 }}
                />
                <Field.TextField
                  name="numberContract"
                  label={t('licenseActivation.numberContract')}
                  placeholder={t('licenseActivation.numberContractForm')}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                  }}
                  sx={{ mt: 4 / 3 }}
                  vertical
                  required
                />
                <Button type="submit" fullWidth sx={{ mt: 2 }}>
                  {t('licenseActivation.active')}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  )
}

export default LicenseForm
