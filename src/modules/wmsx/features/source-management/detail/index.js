import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.SOURCE_MANAGEMENT.LIST.PATH,
    title: ROUTE.SOURCE_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.SOURCE_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.SOURCE_MANAGEMENT.DETAIL.TITLE,
  },
]

const SourceManagementDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { detailSourceManagement, isLoading },
    actions,
  } = useSourceManagement()
  useEffect(() => {
    actions.getDetailSourceManagementById(id)
    return () => {
      actions?.resetSourceManagementState()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.SOURCE_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.sourceManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('sourceManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={detailSourceManagement?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.code')}
                value={detailSourceManagement?.code}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.name')}
                value={detailSourceManagement?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.accountIdentifier')}
                value={detailSourceManagement?.accountIdentifier}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.effectiveDate')}
                value={convertUtcDateToLocalTz(
                  detailSourceManagement?.effectiveDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.warehouse')}
                value={detailSourceManagement?.warehouse?.code}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('sourceManagement.accountDetail')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.companyId')}
                value={detailSourceManagement?.company?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.produceTypeCode')}
                value={detailSourceManagement?.produceTypeCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.branchCode')}
                value={detailSourceManagement?.branchCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.productCode')}
                value={detailSourceManagement?.productCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.costCenterCode')}
                value={detailSourceManagement?.costCenterCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.factorialCode')}
                value={detailSourceManagement?.factorialCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.accountant')}
                value={detailSourceManagement?.accountant}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.internalDepartmentCode')}
                value={detailSourceManagement?.internalDepartmentCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.departmentBackupCode')}
                value={detailSourceManagement?.departmentBackupCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('sourceManagement.EVNBackupCode')}
                value={detailSourceManagement?.EVNBackupCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('sourceManagement.description')}
                multiline
                rows={3}
                value={detailSourceManagement?.description}
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

export default SourceManagementDetail
