import React, { useState } from 'react'

import { Box, FormHelperText, Paper, Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'

// import Logo from '~/assets/images/logo-solutions.png'
import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import { ROUTE } from '~/modules/auth/routes/config'
import { useClasses } from '~/themes'
import { isAuth } from '~/utils'
import qs from '~/utils/qs'

import { loginSchema } from './schema'
import style from './style'

const Login = () => {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const classes = useClasses(style)
  const { t } = useTranslation('auth')
  const { actions, isLoading } = useAuth()
  const history = useHistory()
  const location = useLocation()
  const { callbackUrl } = qs.parse(location.search)

  const initialValues = {
    username: '',
    password: '',
    rememberPassword: false,
  }

  const handleSubmit = (values) => {
    const params = { ...values, rememberPassword: +values.rememberPassword }
    actions.login(
      params,
      () => history.push(callbackUrl || '/'),
      (e) => {
        setError(e)
      },
    )
  }

  if (isAuth()) {
    return <Redirect to="/" />
  }

  return (
    <Box>
      <Typography variant="h2">{t('login.pageTitle')}</Typography>

      <Paper className={classes.paper}>
        <Box className={classes.logoBox}>
          {/* <img src={Logo} alt="logo" className={classes.logoLogin} /> */}
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema(t)}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form>
              <Field.TextField
                vertical
                label={t('login.username')}
                name="username"
                onChange={(e) => {
                  handleChange(e)
                  setError('')
                }}
                inputProps={{
                  maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
                }}
              />
              <Field.TextField
                vertical
                label={t('login.password')}
                type={visible ? 'text' : 'password'}
                name="password"
                onChange={(e) => {
                  handleChange(e)
                  setError('')
                }}
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
                allow={TEXTFIELD_ALLOW.EXCEPT_SPACES}
                inputProps={{
                  maxLength: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
                }}
                sx={{ mt: 4 / 3 }}
              />
              {!!error && (
                <FormHelperText error sx={{ mt: 4 / 3 }}>
                  {error}
                </FormHelperText>
              )}
              <Box className={classes.extraBox}>
                <FormControlLabel
                  control={<Field.Checkbox name="rememberPassword" />}
                  label={t('login.savePassword')}
                />
                <Link
                  to={ROUTE.FORGOT_PASSWORD.PATH}
                  className={classes.linkForgotPassword}
                >
                  <Typography color="primary" component="span">
                    {t('login.forgotPassword')}
                  </Typography>
                </Link>
              </Box>

              <Button type="submit" fullWidth loading={isLoading}>
                {t('login.loginButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

export default Login
