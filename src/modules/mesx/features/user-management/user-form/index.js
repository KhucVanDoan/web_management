import React, { useEffect, useMemo, useState } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { ROUTE } from '~/modules/mesx/routes/config'
import qs from '~/utils/qs'

import { validationSchema } from './schema'

function UserManagementForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const routeMatch = useRouteMatch()
  const { appStore } = useAppStore()
  const MODE_MAP = {
    [ROUTE.USER_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.USER_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const [visible, setVisible] = useState(false)

  const {
    data: { userDetails, isLoading },
    actions,
  } = useUserManagement()

  const {
    data: { warehouseList },
    actions: commonManagementActions,
  } = useCommonManagement()

  const initialValues = useMemo(
    () => ({
      code: isUpdate ? userDetails?.code : '',
      username: userDetails?.username || '',
      password: userDetails?.password || '',
      showPassword: false,
      companyId: userDetails?.companyId || '',
      fullName: userDetails?.fullName || '',
      dateOfBirth: userDetails?.dateOfBirth || null,
      email: userDetails?.email || '',
      phone: userDetails?.phone || '',
      status: userDetails?.status || '',
      factories: userDetails.factories?.map((item) => item.id) || [],
      userRoleSettings: userDetails.userRoleSettings?.[0]?.id || null,
      departmentSettings:
        userDetails.departmentSettings?.map((item) => item.id) || [],
      userWarehouses: userDetails.userWarehouses?.map((item) => item.id) || [],
    }),
    [userDetails],
  )

  useEffect(() => {
    commonManagementActions.getWarehouses()
  }, [])

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getUserDetailsById(id)
    }
    if (cloneId) {
      actions.getUserDetailsById(cloneId)
    }
    return () => {
      actions.resetUserDetailsState()
    }
  }, [params?.id, cloneId])

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      factories: values?.factories?.map((item) => ({
        id: item,
      })),
      userRoleSettings: values.userRoleSettings
        ? [{ id: values.userRoleSettings }]
        : [{ id: 1 }],
      departmentSettings: values.departmentSettings?.map((item) => ({
        id: item,
      })),
      userWarehouses: values?.userWarehouses?.map((item) => ({
        id: item,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createUser(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateUser(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'setting',
      },
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
            elBefore={
              <Button
                variant="outlined"
                onClick={() => {}} //@TODO: <anh.nth> handle resetPassword
                sx={{ mr: 'auto' }}
              >
                {t('userManagement.resetPassword')}
              </Button>
            }
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
      title={t('menu.' + getTitle())}
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
            {({ handleReset, values }) => (
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
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('userManagement.code')}
                      name="code"
                      placeholder={t('userManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="email"
                      label={t('userManagement.email')}
                      placeholder={t('userManagement.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
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
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
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
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="status"
                        label={t('userManagement.status')}
                        placeholder={t('userManagement.status')}
                        options={USER_MANAGEMENT_STATUS_OPTIONS}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => t(opt?.text)}
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="fullName"
                      label={t('userManagement.fullName')}
                      placeholder={t('userManagement.fullName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="dateOfBirth"
                      label={t('userManagement.dateOfBirth')}
                      placeholder={t('userManagement.dateOfBirth')}
                    />
                  </Grid>
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
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('userManagement.workInfo')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="companyId"
                      label={t('userManagement.companyName')}
                      placeholder={t('userManagement.companyName')}
                      options={appStore?.companies}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factories"
                      label={t('userManagement.factoryName')}
                      placeholder={t('userManagement.factoryName')}
                      options={appStore?.factories?.filter(
                        (factory) => factory.companyId === values.companyId,
                      )}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentSettings"
                      label={t('userManagement.departmentName')}
                      placeholder={t('userManagement.departmentName')}
                      options={appStore?.deparments}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleSettings"
                      label={t('userManagement.roleAssign')}
                      placeholder={t('userManagement.roleAssign')}
                      options={appStore?.roles}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userWarehouses"
                      label={t('userManagement.warehouse')}
                      placeholder={t('userManagement.warehouse')}
                      options={(warehouseList || []).filter((w) =>
                        values.factories?.includes(w.factoryId),
                      )}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserManagementForm
