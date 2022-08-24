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
import useConstructionItemsManagement from '~/modules/wmsx/redux/hooks/useConstructionItemsManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH,
    title: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.TITLE,
  },
]

function ConstructionItemsManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, constructionItemsDetails },
    actions,
  } = useConstructionItemsManagement()

  useEffect(() => {
    actions.getConstructionItemsDetailsById(id)
    return () => {
      actions.resetConstructionItemsDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.constructionItemsManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('constructionItemsManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={constructionItemsDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('constructionItemsManagement.code')}
                value={constructionItemsDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('constructionItemsManagement.name')}
                value={constructionItemsDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('constructionItemsManagement.constructionCode')}
                value={constructionItemsDetails?.construction?.code}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('constructionItemsManagement.description')}
                multiline
                rows={3}
                value={constructionItemsDetails.description}
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

export default ConstructionItemsManagementDetail
