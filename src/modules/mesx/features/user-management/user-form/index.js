import React, { useEffect, useMemo, useState } from 'react'

import { Grid, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { ACTIVE_STATUS_OPTIONS, ROLE_OPTIONS } from '~/modules/wmsx/constants'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validationSchema } from './schema'

function UserManagementForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.USER_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.USER_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const [visible, setVisible] = useState(false)
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { userDetails, isLoading },
    actions,
  } = useUserManagement()

  const initialValues = useMemo(
    () => ({
      code: isUpdate ? userDetails?.code : '',
      username: userDetails?.username || '',
      fullName: userDetails?.fullName || '',
      password: userDetails?.password || '',
      phone: userDetails?.phoneNumber || '',
      role: userDetails?.role ?? '',
    }),
    [userDetails],
  )
  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getUserDetailsById(id)
    }
    return () => {
      actions.resetUserDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      code: values?.code,
      fullName: values?.fullName,
      username: values?.username,
      password: values?.password,
      phoneNumber: values?.phone || null,
      role: +values?.role,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createUser(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateUser({ ...convertValues, id: id }, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.USER_MANAGEMENT.LIST.PATH,
        title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.USER_MANAGEMENT.CREATE.PATH,
          title: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.USER_MANAGEMENT.EDIT.PATH,
          title: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.USER_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.USER_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.USER_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={getTitle()}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t, mode)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => {
              return (
                <Form>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h4" mt={1}>
                        {t('userManagement.commonInfo')}
                      </Typography>
                    </Grid>
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('userManagement.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={ACTIVE_STATUS_OPTIONS}
                              value={userDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('userManagement.code')}
                        name="code"
                        placeholder={t('userManagement.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="fullName"
                        label={t('userManagement.fullName')}
                        placeholder={t('userManagement.fullName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('userManagement.username')}
                        name="username"
                        placeholder={t('userManagement.username')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    {!isUpdate && (
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="password"
                          type={visible ? 'text' : 'password'}
                          label={t('userManagement.password')}
                          placeholder={t('userManagement.password')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
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
                          validate={(val) => {
                            if (!val) {
                              return t('general:form.required')
                            }
                          }}
                          required
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
                        />
                      </Grid>
                    )}

                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="phone"
                        label={t('userManagement.phone')}
                        placeholder={t('userManagement.phone')}
                        allow={TEXTFIELD_ALLOW.NUMERIC}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="role"
                        label={t('userManagement.role')}
                        placeholder={t('userManagement.role')}
                        options={ROLE_OPTIONS}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.text}
                        required
                      />
                    </Grid>
                  </Grid>
                  {renderActionBar(handleReset)}
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserManagementForm
