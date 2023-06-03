import React from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS, ROLE_MAP } from '~/modules/wmsx/constants'
import { getLocalItem } from '~/utils'

function UserInfoDetail() {
  const { t } = useTranslation(['mesx'])
  const userInfo = getLocalItem('userInfo')
  const breadcrumbs = [
    {
      title: 'Thông tin người dùng',
    },
  ]

  return (
    <Page breadcrumbs={breadcrumbs} title={t('general:page.userInfo')}>
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
                    value={userInfo?.isActive}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.code')} value={userInfo.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userInfo.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userInfo.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.email')} value={userInfo.email} />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.phone')}
                value={userInfo.phoneNumber}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={convertUtcDateToLocalTz(userInfo.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.updatedAt')}
                value={convertUtcDateToLocalTz(userInfo.updatedAt)}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.role')}
                value={ROLE_MAP[userInfo.role]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserInfoDetail
