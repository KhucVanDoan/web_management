import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/configuration/routes/config'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { convertUtcDateTimeToLocalTz } from '~/utils'

function UserInfoDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { userInfo } = useAuth()
  const {
    data: { isLoading, userInfoDetails },
    actions,
  } = useUserInfo()

  const breadcrumbs = [
    {
      title: 'userInfo',
    },
  ]
  const {
    data: { companyList },
    actions: companyActions,
  } = useDefineCompany()

  useEffect(() => {
    companyActions.searchCompanies({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    if (userInfo?.id) {
      actions.getUserInfoDetails(userInfo?.id)
    }
    return () => {
      actions.resetUserInfoDetailsState()
    }
  }, [userInfo?.id])

  const renderHeaderRight = () => {
    return (
      <Button
        onClick={() => history.push(ROUTE.ACCOUNT.EDIT.PATH)}
        sx={{ ml: 4 / 3 }}
        icon="edit"
      >
        {t('general:common.update')}
      </Button>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('general:page.userInfo')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.commonInfo')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LV
                label={<Typography>{t('userManagement.status')}</Typography>}
                value={
                  <Status
                    options={USER_MANAGEMENT_STATUS_OPTIONS}
                    value={userInfoDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.code')}
                value={userInfoDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.email')}
                value={userInfoDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userInfoDetails.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.phone')}
                value={userInfoDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userInfoDetails.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.dateOfBirth')}
                value={userInfoDetails.dateOfBirth}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.user')}
                value={userInfoDetails.createdBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={convertUtcDateTimeToLocalTz(userInfoDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.workInfo')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.companyName')}
                value={
                  companyList?.find(
                    (item) => item.id === userInfoDetails.companyId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.factoryName')}
                value={userInfoDetails.factories
                  ?.map((factory) => factory?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.departmentName')}
                value={userInfoDetails.departmentSettings
                  ?.map((department) => department?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.roleAssign')}
                value={userInfoDetails.userRoleSettings
                  ?.map((role) => role?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.warehouse')}
                value={userInfoDetails.userWarehouses
                  ?.map((warehouse) => warehouse?.name)
                  ?.join('; ')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserInfoDetail
