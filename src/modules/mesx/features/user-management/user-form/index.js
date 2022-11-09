import React, { useEffect, useMemo, useState } from 'react'

import { Grid, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import { sub } from 'date-fns'
import { Formik, Form } from 'formik'
import { first, isEmpty } from 'lodash'
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
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { getRolesApi } from '~/modules/mesx/redux/sagas/user-management/get-role'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchManagamentUnitApi } from '~/modules/wmsx/redux/sagas/management-unit/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import { validationSchema } from './schema'

function UserManagementForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
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
      companyId: userDetails?.company?.name || '',
      fullName: userDetails?.fullName || '',
      password: userDetails?.password || '',
      dateOfBirth: userDetails?.dateOfBirth || null,
      email: userDetails?.email || '',
      phone: userDetails?.phone || 'null',
      role: first(userDetails?.userRoleSettings) || null,
      departmentSettings: first(userDetails?.departmentSettings) || [],
      userWarehouses: userDetails.userWarehouses || [],
    }),
    [userDetails],
  )

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
      code: values?.code,
      companyId: JSON.parse(localStorage.getItem('userInfo'))?.companyId,
      email: values?.email || null,
      fullName: values?.fullName,
      username: values?.username,
      password: values?.password,
      phone: values?.phone,
      status: values?.status?.toString() || '1',
      userRoleSettings: !isEmpty(values.role) ? [{ id: values.role?.id }] : [],
      departmentSettings: !isEmpty(values?.departmentSettings)
        ? [{ id: values?.departmentSettings?.id }]
        : [],
      userWarehouses:
        values?.userWarehouses?.map((item) => ({
          id: item?.id,
        })) || [],
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
            {({ handleReset }) => {
              const company = JSON.parse(
                localStorage.getItem('userInfo'),
              )?.company
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
                        {...(cloneId ? { autoFocus: true } : {})}
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
                        disabled={isUpdate}
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
                        name="email"
                        label={t('userManagement.email')}
                        placeholder={t('userManagement.email')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                        }}
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
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="dateOfBirth"
                        label={t('userManagement.dateOfBirth')}
                        maxDate={
                          new Date(
                            sub(new Date(), {
                              years: 0,
                              months: 0,
                              weeks: 0,
                              days: 1,
                              hours: 0,
                              minutes: 0,
                              seconds: 0,
                            }),
                          )
                        }
                        placeholder={t('userManagement.dateOfBirth')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" mt={1}>
                        {t('userManagement.workInfo')}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="companyId"
                        label={t('userManagement.companyName')}
                        placeholder={t('userManagement.companyName')}
                        value={company?.name}
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentSettings"
                        label={t('userManagement.departmentName')}
                        placeholder={t('userManagement.departmentName')}
                        asyncRequest={(s) =>
                          searchManagamentUnitApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="role"
                        label={t('userManagement.role')}
                        placeholder={t('userManagement.role')}
                        asyncRequest={(s) =>
                          getRolesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data}
                        getOptionLabel={(opt) => opt?.name}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="userWarehouses"
                        label={t('userManagement.warehouse')}
                        placeholder={t('userManagement.warehouse')}
                        asyncRequest={(s) =>
                          searchWarehouseApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        multiple
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
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
