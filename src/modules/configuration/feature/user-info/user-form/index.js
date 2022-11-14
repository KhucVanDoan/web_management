import React, { useMemo } from 'react'

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
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validationSchema } from './schema'

function UserInfoForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

  const {
    data: { userInfo, isLoading },
    actions,
  } = useUserInfo()

  const initialValues = useMemo(
    () => ({
      code: userInfo?.code || '',
      username: userInfo?.username || '',
      password: userInfo?.password || '',
      showPassword: false,
      companyId: userInfo?.companyId || '',
      fullName: userInfo?.fullName || '',
      dateOfBirth: userInfo?.dateOfBirth || null,
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      status: userInfo?.status || '1',
      factories: userInfo.factories?.map((item) => item) || [],
      userRoleSettings: userInfo.userRoleSettings?.[0]?.id || null,
      departmentSettings: userInfo.departmentSettings?.[0]?.id || null,
      userWarehouses: userInfo.userWarehouses?.map((item) => item.id) || [],
    }),
    [userInfo],
  )

  const onSubmit = (values) => {
    const convertValues = {
      phone: values.phone,
      dateOfBirth: values.dateOfBirth,
    }
    actions.updateUserInfo(convertValues, () => {
      backToList()
    })
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
                          value={userInfo?.status}
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
                      disabled
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
                      disabled
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
                      options={[userInfo.company]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentSettings"
                      label={t('userManagement.departmentName')}
                      placeholder={t('userManagement.departmentName')}
                      options={userInfo?.departmentSettings || []}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleSettings"
                      label={t('userManagement.role')}
                      placeholder={t('userManagement.role')}
                      options={userInfo?.userRoleSettings || []}
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
                      options={(userInfo?.userWarehouses || []).filter((w) =>
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
