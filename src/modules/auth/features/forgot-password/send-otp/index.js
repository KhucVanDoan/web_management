import React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { Field } from '~/components/Formik'
import { ROUTE } from '~/modules/auth/routes/config'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { useClasses } from '~/themes'
import { qsParse } from '~/utils'

import { RendOTPSchema } from './schema'
import style from './style'

const VerifyOTP = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('auth')
  const { actions, isLoading } = useUserManagement()
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = qsParse(location.search)

  const handleSubmitOTP = (values) => {
    const params = {
      code: values.code?.trim(),
      email: urlSearchParams?.email,
    }
    actions.verifyOTP(params, () =>
      history.push(
        `${
          ROUTE.RESET_PASSWORD.PATH +
          '?code=' +
          params?.code +
          '&email=' +
          params?.email
        }`,
      ),
    )
  }

  const resendOTP = () => {
    const params = {
      email: urlSearchParams?.email,
    }
    actions.generateOTP(params, () => {
      history.push(`${ROUTE.VERIFY_OTP.PATH + '?email=' + email}`)
    })
  }

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 / 3 }}>
        {t('forgotPassword.verifyOTP.title')}
      </Typography>
      <Typography variant="body2">
        {t('forgotPassword.verifyOTP.text')}
      </Typography>

      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            code: '',
          }}
          validationSchema={RendOTPSchema(t)}
          onSubmit={handleSubmitOTP}
        >
          {({ isValidating, isValid, dirty }) => (
            <Form>
              <Field.TextField
                vertical
                name="code"
                label={t('forgotPassword.verifyOTP.verifyCode')}
                inputProps={{
                  className: classes.inputText,
                  maxLength: 6,
                }}
              />
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={!dirty || !isValid || isValidating}
                sx={{ mt: 2 }}
              >
                {t('forgotPassword.verifyOTP.continue')}
              </Button>
              <Box className={classes.resendOTP}>
                <Typography variant="body2">
                  {t('forgotPassword.verifyOTP.notReceived')}
                </Typography>
                &nbsp;
                <Link className={classes.linkOTP} onClick={resendOTP}>
                  <Typography color="primary" component="span">
                    {t('forgotPassword.verifyOTP.resend')}
                  </Typography>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  )
}

export default VerifyOTP
