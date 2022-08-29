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
import useDefineMaterialQuality from '~/modules/wmsx/redux/hooks/useDefineMaterialQuality'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.PATH,
    title: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.PATH,
    title: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.TITLE,
  },
]

function DefineMaterialQualityDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, materialQualityDetails },
    actions,
  } = useDefineMaterialQuality()

  useEffect(() => {
    actions.getMaterialQualityDetailsById(id)
    return () => {
      actions.resetMaterialQualityDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_MATERIAL_QUALITY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineMaterialQualityDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineMaterialQuality.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={materialQualityDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineMaterialQuality.code')}
                value={materialQualityDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineMaterialQuality.name')}
                value={materialQualityDetails.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineMaterialQuality.description')}
                multiline
                rows={3}
                value={materialQualityDetails.description}
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

export default DefineMaterialQualityDetail
