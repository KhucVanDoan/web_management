import React, { useState } from 'react'

import { IconButton, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { useClasses } from '~/themes'
import { qsParse } from '~/utils'

import { ResetPasswordSchema } from './schema'
import style from './style'

const ResetPassword = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('auth')
  const { actions, isLoading } = useUserManagement()
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = qsParse(location.search)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (values) => {
    const params = {
      code: urlSearchParams?.code?.trim(),
      email: urlSearchParams?.email,
      password: values.password,
    }
    actions.resetPassword(params, () => history.push('/login'))
  }

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 / 3 }}>
        {t('forgotPassword.resetPassword.title')}
      </Typography>
      <Typography variant="body2">
        {t('forgotPassword.resetPassword.text')}
      </Typography>

      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={ResetPasswordSchema(t)}
          onSubmit={handleSubmit}
        >
          {({ isValidating, isValid, dirty }) => (
            <Form>
              <Field.TextField
                vertical
                label={t('forgotPassword.resetPassword.newPassword')}
                type={showPassword ? 'text' : 'password'}
                name="password"
                endAdornment={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    {showPassword ? (
                      <Icon name="visible" />
                    ) : (
                      <Icon name="invisible" />
                    )}
                  </IconButton>
                }
                sx={{ mt: 4 / 3 }}
              />
              <Field.TextField
                vertical
                label={t('forgotPassword.resetPassword.confirmNewPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                endAdornment={
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    {showConfirmPassword ? (
                      <Icon name="visible" />
                    ) : (
                      <Icon name="invisible" />
                    )}
                  </IconButton>
                }
                sx={{ mt: 4 / 3 }}
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={!dirty || !isValid || isValidating}
                sx={{ mt: 2 }}
              >
                {t('forgotPassword.resetPassword.finish')}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  )
}

export default ResetPassword
