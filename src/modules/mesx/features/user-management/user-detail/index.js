import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { USER_MANAGEMENT_STATUS_MAP } from '~/modules/mesx/constants'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.USER_MANAGEMENT.LIST.PATH,
    title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
  },
]

function UserManagementDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, userDetails },
    actions,
  } = useUserManagement()

  const { appStore } = useAppStore()

  useEffect(() => {
    actions.getUserDetailsById(id)
    return () => {
      actions.resetUserDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.USER_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.commonInfo')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.code')} value={userDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.email')} value={userDetails.email} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userDetails.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.phone')} value={userDetails.phone} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userDetails.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.dateOfBirth')}
                value={userDetails.dateOfBirth}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.status')}
                value={t(USER_MANAGEMENT_STATUS_MAP[userDetails?.status])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.user')} value={userDetails.user} />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>{' '}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={formatDateTimeUtc(userDetails.createdAt)}
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
                  appStore?.companies?.find(
                    (item) => item.id === userDetails.companyId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.factoryName')}
                value={userDetails.factories
                  ?.map((factory) => factory?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.departmentName')}
                value={userDetails.departmentSettings
                  ?.map((department) => department?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.roleAssign')}
                value={userDetails.userRoleSettings
                  ?.map((role) => role?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.warehouse')}
                value={userDetails.userWarehouses
                  ?.map((warehouse) => warehouse?.name)
                  ?.join('; ')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default UserManagementDetail
