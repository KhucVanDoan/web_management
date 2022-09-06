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
import useDefineBin from '~/modules/wmsx/redux/hooks/useDefineBin'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_BIN.LIST.PATH,
    title: ROUTE.DEFINE_BIN.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_BIN.DETAIL.PATH,
    title: ROUTE.DEFINE_BIN.DETAIL.TITLE,
  },
]

function DefineBinDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, binDetails },
    actions,
  } = useDefineBin()

  useEffect(() => {
    actions.getBinDetailsById(id)
    return () => {
      actions.resetBinDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BIN.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineBinDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineBin.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={binDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineBin.code')} value={binDetails?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineBin.name')} value={binDetails?.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineBin.description')}
                multiline
                rows={3}
                value={binDetails?.description}
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

export default DefineBinDetail
