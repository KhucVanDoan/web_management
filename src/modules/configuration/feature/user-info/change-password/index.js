import React, { useMemo, useState } from 'react'

import { Grid, IconButton } from '@mui/material'
// import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'

import { validationSchema } from './schema'

function ChangePassword() {
  const { t } = useTranslation('configuration')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    data: { isLoading },
    actions,
  } = useUserInfo()

  const initialValues = useMemo(
    () => ({
      password: '',
      newPassword: '',
      confirmPassword: '',
    }),
    [],
  )

  const onSubmit = (values) => {
    const params = {
      oldPassword: values.password,
      password: values.newPassword,
    }
    actions.changePassword(params, () => {
      window.location.reload()
    })
  }

  const breadcrumb = [
    {
      title: 'changePassword',
    },
  ]

  const renderActionBar = (handleReset) => {
    return <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  }

  const renderHeaderRight = () => {}

  return (
    <Page
      breadcrumbs={breadcrumb}
      title="Đổi mật khẩu"
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema(t)}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            {/* <Typography variant="h2" sx={{ mb: 2 }}>
              {t('general:page.changePassword')}
            </Typography> */}
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Grid item xl={5} lg={7} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item xs={12}>
                    <Field.TextField
                      label={t('changePassword.password')}
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
                      allow={TEXTFIELD_ALLOW.EXCEPT_SPACES}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      label={t('changePassword.newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      endAdornment={
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          size="small"
                          sx={{ mx: 0.5 }}
                        >
                          {showNewPassword ? (
                            <Icon name="visible" />
                          ) : (
                            <Icon name="invisible" />
                          )}
                        </IconButton>
                      }
                      allow={TEXTFIELD_ALLOW.EXCEPT_SPACES}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      label={t('changePassword.confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      endAdornment={
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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
                      allow={TEXTFIELD_ALLOW.EXCEPT_SPACES}
                      required
                    />
                  </Grid>
                  {/* <Grid item lg={12} xs={12}>
                    <LV>
                      <Link to={AUTH_ROUTE.FORGOT_PASSWORD.PATH}>
                        <Typography color="primary" component="span">
                          {t('changePassword.forgotPassword')}
                        </Typography>
                      </Link>
                    </LV>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ChangePassword
