import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { ACTIVE_STATUS_OPTIONS, ROLE_MAP } from '~/modules/wmsx/constants'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
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
            <Grid item xs={12}>
              <LV
                label={t('userManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={userDetails?.isActive}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.code')} value={userDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userDetails.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userDetails.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.email')} value={userDetails.email} />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.phone')}
                value={userDetails.phoneNumber}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={convertUtcDateToLocalTz(userDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.updatedAt')}
                value={convertUtcDateToLocalTz(userDetails.updatedAt)}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.role')}
                value={ROLE_MAP[userDetails.role]}
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
