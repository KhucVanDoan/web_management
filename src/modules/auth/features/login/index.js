import React, { useState } from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormHelperText, Paper } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import Button from 'components/Button'
import Icon from 'components/Icon'
import { Field } from 'components/Formik'
import { isAuth } from 'utils'
import { qsParse } from 'utils/qs'
import { useClasses } from 'themes'
import Logo from 'assets/images/Logo-Client.png'
import { ROUTE } from 'modules/auth/routes/config'
import { useAuth } from 'modules/auth/redux/hooks/useAuth'
import style from './style'
import { loginSchema } from './schema'

const Login = () => {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const classes = useClasses(style)
  const { t } = useTranslation(['auth'])
  const { actions, isLoading } = useAuth()
  const history = useHistory()
  const location = useLocation()
  const { callbackUrl } = qsParse(location.search)

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
        // @TODO: <yen.nguyenhai> need to return an error code or message key insteadof message.
        setError(e)
      },
    )
  }

  if (isAuth()) {
    return <Redirect to="/" />
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {t('login.pageTitle')}
      </Typography>

      <Paper className={classes.paper}>
        <Box className={classes.logoBox}>
          <img src={Logo} alt="logo" className={classes.logoLogin} />
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
                  if (!!error) setError('')
                }}
              />
              <Field.TextField
                vertical
                label={t('login.password')}
                type={visible ? 'text' : 'password'}
                name="password"
                onChange={(e) => {
                  handleChange(e)
                  if (!!error) setError('')
                }}
                endAdornment={
                  <IconButton
                    onClick={() => setVisible(!visible)}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    {visible ? <Icon name="show" /> : <Icon name="hide" />}
                  </IconButton>
                }
                sx={{ mt: '16px' }}
              />
              {!!error && (
                <FormHelperText error sx={{ mt: '4px' }}>
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
