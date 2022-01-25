import React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ROUTE } from '~/modules/auth/routes/config'
import { useUserManagement } from '~/modules/mesx/redux/hooks/useUserManagement'
import { useClasses } from '~/themes'

import { forgotPasswordSchema } from './schema'
import style from './style'

const GenerateOTP = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('auth')
  const { actions, isLoading } = useUserManagement()
  const history = useHistory()

  const handleSubmit = ({ email }) => {
    actions.generateOTP({ email }, () =>
      history.push(`${ROUTE.VERIFY_OTP.PATH + '?email=' + email}`),
    )
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2 / 3 }}>
        {t('forgotPassword.generateOTP.title')}
      </Typography>
      <Typography variant="body2">
        {t('forgotPassword.generateOTP.text')}
      </Typography>

      <Paper className={classes.paper}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema(t)}
          onSubmit={handleSubmit}
        >
          {({ isValidating, isValid, dirty }) => (
            <Form>
              <Field.TextField
                vertical
                label={t('forgotPassword.generateOTP.account')}
                placeholder={t('forgotPassword.generateOTP.placeholder')}
                name="email"
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={!dirty || !isValid || isValidating}
                sx={{ mt: 2 }}
              >
                {t('forgotPassword.generateOTP.continue')}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className={classes.goBackBox}>
        <Link className={classes.goBack} to={ROUTE.LOGIN.PATH}>
          <Icon name="arrowLeft" size={12} sx={{ mr: '3px' }} />
          {t('forgotPassword.generateOTP.backToLogin')}
        </Link>
      </Box>
    </Box>
  )
}

export default GenerateOTP
