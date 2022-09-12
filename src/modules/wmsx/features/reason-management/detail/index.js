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
import useReasonManagement from '~/modules/wmsx/redux/hooks/useReasonManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.REASON_MANAGEMENT.LIST.PATH,
    title: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.REASON_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.REASON_MANAGEMENT.DETAIL.TITLE,
  },
]

const ManagementDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { detailReasonManagement, isLoading },
    actions,
  } = useReasonManagement()
  useEffect(() => {
    actions.getDetailReasonManagementById(id)
    return () => {
      actions?.resetReasonManagementState()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.REASON_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.reasonManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={<Typography>{t('reasonManagement.status')}</Typography>}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={detailReasonManagement?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('reasonManagement.code')}
                value={detailReasonManagement?.code}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('reasonManagement.name')}
                value={detailReasonManagement?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('reasonManagement.description')}
                multiline
                rows={3}
                value={detailReasonManagement?.description}
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

export default ManagementDetail
