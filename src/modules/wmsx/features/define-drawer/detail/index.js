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
import useDefineDrawer from '~/modules/wmsx/redux/hooks/useDefineDrawer'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_DRAWER.LIST.PATH,
    title: ROUTE.DEFINE_DRAWER.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_DRAWER.DETAIL.PATH,
    title: ROUTE.DEFINE_DRAWER.DETAIL.TITLE,
  },
]

function DefineDrawerDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, drawerDetails },
    actions,
  } = useDefineDrawer()

  useEffect(() => {
    actions.getDrawerDetailsById(id)
    return () => {
      actions.resetDrawerDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_DRAWER.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineDrawerDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineDrawer.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={drawerDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineDrawer.code')} value={drawerDetails?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineDrawer.name')} value={drawerDetails?.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineDrawer.description')}
                multiline
                rows={3}
                value={drawerDetails?.description}
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

export default DefineDrawerDetail
