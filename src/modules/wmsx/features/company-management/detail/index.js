import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useCompanyManagement from '~/modules/wmsx/redux/hooks/useCompanyManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.COMPANY_MANAGEMENT.LIST.PATH,
    title: ROUTE.COMPANY_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.COMPANY_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.COMPANY_MANAGEMENT.DETAIL.TITLE,
  },
]

function CompanyManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, companyDetails },
    actions,
  } = useCompanyManagement()

  useEffect(() => {
    actions.getCompanyDetailsById(id)
    return () => {
      actions.resetCompanyDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.COMPANY_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.companyManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('companyManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={companyDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.code')}
                value={companyDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12} variant="detail">
              <LV
                label={t('companyManagement.name')}
                value={companyDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.email')}
                value={companyDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.phone')}
                value={companyDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.address')}
                value={companyDetails.address}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>{' '}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.user')}
                value={companyDetails.createdBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('companyManagement.createDate')}
                value={convertUtcDateTimeToLocalTz(companyDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('companyManagement.description')}
                multiline
                rows={3}
                value={companyDetails.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default CompanyManagementDetail
