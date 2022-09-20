import React, { useEffect, useMemo } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/configuration/routes/config'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/mesx/constants'

import { validationSchema } from './schema'

function UserInfoForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { userInfo } = useAuth()

  const {
    data: { userInfoDetails, isLoading },
    actions,
  } = useUserInfo()

  const {
    data: { companyList },
    actions: companyActions,
  } = useDefineCompany()

  useEffect(() => {
    companyActions.searchCompanies({ isGetAll: 1 })
  }, [])

  const initialValues = useMemo(
    () => ({
      code: userInfoDetails?.code || '',
      username: userInfoDetails?.username || '',
      password: userInfoDetails?.password || '',
      showPassword: false,
      companyId: userInfoDetails?.companyId || '',
      fullName: userInfoDetails?.fullName || '',
      dateOfBirth: userInfoDetails?.dateOfBirth || null,
      email: userInfoDetails?.email || '',
      phone: userInfoDetails?.phone || '',
      status: userInfoDetails?.status || '1',
      factories: userInfoDetails.factories?.map((item) => item) || [],
      userRoleSettings: userInfoDetails.userRoleSettings?.[0]?.id || null,
      departmentSettings:
        userInfoDetails.departmentSettings?.map((item) => item.id) || [],
      userWarehouses:
        userInfoDetails.userWarehouses?.map((item) => item.id) || [],
    }),
    [userInfoDetails],
  )

  useEffect(() => {
    if (userInfo?.id) {
      actions.getUserInfoDetails(userInfo?.id)
    }

    return () => {
      actions.resetUserInfoDetailsState()
    }
  }, [userInfo?.id])

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      id: Number(userInfo?.id),
      status: values?.status?.toString(),
      factories: values?.factories?.map((item) => ({
        id: item?.id,
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
    actions.updateUserInfo(convertValues, backToList)
  }

  const breadcrumb = [
    {
      title: 'userInfo',
    },
  ]

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToList}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const backToList = () => {
    history.push(ROUTE.ACCOUNT.DETAIL.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('general:page.userInfo')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t)}
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
                  <Grid item xs={12}>
                    <LV
                      label={
                        <Typography>{t('userManagement.status')}</Typography>
                      }
                      value={
                        <Status
                          options={USER_MANAGEMENT_STATUS_OPTIONS}
                          value={userInfoDetails?.status}
                        />
                      }
                    />
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
                      disabled
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
                      disabled
                      required
                    />
                  </Grid>
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
                      options={companyList}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factories"
                      label={t('userManagement.factoryName')}
                      placeholder={t('userManagement.factoryName')}
                      options={userInfoDetails?.factories || []}
                      getOptionLabel={(option) => option.name}
                      multiple
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentSettings"
                      label={t('userManagement.departmentName')}
                      placeholder={t('userManagement.departmentName')}
                      options={userInfoDetails?.departmentSettings || []}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleSettings"
                      label={t('userManagement.roleAssign')}
                      placeholder={t('userManagement.roleAssign')}
                      options={userInfoDetails?.userRoleSettings || []}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userWarehouses"
                      label={t('userManagement.warehouse')}
                      placeholder={t('userManagement.warehouse')}
                      options={(userInfoDetails?.userWarehouses || []).filter(
                        (w) =>
                          values.factories
                            ?.map((f) => f.id)
                            .includes(w.factoryId),
                      )}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                      disabled
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

export default UserInfoForm
