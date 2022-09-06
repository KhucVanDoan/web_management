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
import useDefineShelf from '~/modules/wmsx/redux/hooks/useDefineShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_SHELF.LIST.PATH,
    title: ROUTE.DEFINE_SHELF.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_SHELF.DETAIL.PATH,
    title: ROUTE.DEFINE_SHELF.DETAIL.TITLE,
  },
]

function DefineShelfDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, shelfDetails },
    actions,
  } = useDefineShelf()

  useEffect(() => {
    actions.getShelfDetailsById(id)
    return () => {
      actions.resetShelfDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_SHELF.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineShelfDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineShelf.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={shelfDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineShelf.code')} value={shelfDetails?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineShelf.name')} value={shelfDetails?.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineShelf.description')}
                multiline
                rows={3}
                value={shelfDetails?.description}
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

export default DefineShelfDetail
