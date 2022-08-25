import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useConstructionManagement from '~/modules/wmsx/redux/hooks/useConstructionManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH,
    title: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.TITLE,
  },
]

function ConstructionManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, constructionDetails },
    actions,
  } = useConstructionManagement()

  useEffect(() => {
    actions.getConstructionDetailsById(id)
    return () => {
      actions.resetConstructionDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.constructionManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('constructionManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={constructionDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('constructionManagement.code')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('constructionManagement.name')}
                value={constructionDetails.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('constructionManagement.description')}
                multiline
                rows={3}
                value={constructionDetails.description}
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

export default ConstructionManagementDetail
