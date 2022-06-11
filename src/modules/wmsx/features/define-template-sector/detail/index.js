import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { DEFAULT_UNITS } from '~/modules/wmsx/constants'
import { useTemplateSector } from '~/modules/wmsx/redux/hooks/useDefineTemplateSector'
import { ROUTE } from '~/modules/wmsx/routes/config'

const TemplateSectorDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: 'warehouseSetup',
    },
    {
      route: ROUTE.TEMPLATE_SECTOR.DETAIL.PATH,
      title: ROUTE.TEMPLATE_SECTOR.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.TEMPLATE_SECTOR.LIST.PATH)
  }
  const {
    data: { templateSectorDetails, isLoading },
    actions,
  } = useTemplateSector()
  useEffect(() => {
    actions.getTemplateSectorDetailById(id)
    return () => actions.resetTemplateSectorState()
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateSectorDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.name')}
                value={templateSectorDetails.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('templateSector.storage')}
              </Typography>
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.unit')}
                value={t(
                  DEFAULT_UNITS?.find(
                    (unit) => unit.id === templateSectorDetails?.width?.unit,
                  )?.name,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.long')}
                value={templateSectorDetails?.long?.value}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.width')}
                value={templateSectorDetails?.width?.value}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.height')}
                value={templateSectorDetails?.height?.value}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4" component="span">
                {t('templateSector.sheftInArea')}
              </Typography>
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.templateSheft')}
                value={templateSectorDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateSector.numberOfShelfs')}
                value={templateSectorDetails?.templateShelfs?.length}
              />
            </Grid>
            {[...(templateSectorDetails?.templateShelfs || [])]
              .reverse()
              .map((shelf, index) => (
                <Grid item lg={6} xs={12} key={shelf?.id}>
                  <LV
                    label={`${t('templateSector.nameSheft')} ${index + 1}`}
                    value={shelf?.name}
                  />
                </Grid>
              ))}
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default TemplateSectorDetail
