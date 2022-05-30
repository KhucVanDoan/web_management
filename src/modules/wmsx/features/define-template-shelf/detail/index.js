import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { DEFAULT_UNITS_MAP, WEIGHT_UNITS_MAP } from '~/modules/wmsx/constants'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH,
    title: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.PATH,
    title: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.TITLE,
  },
]

const DefineTemplateShelfDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, templateShelfDetails },
    actions,
  } = useDefineTemplateShelf()

  useEffect(() => {
    actions.getTemplateShelfDetailById(id)
    return () => {
      actions.resetTemplateShelfDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineTemplateShelfDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineTemplateShelf.name')}
                value={templateShelfDetails.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('defineTemplateShelf.storageSpace.title')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.storageSpace.unitName')}
                value={t(DEFAULT_UNITS_MAP[templateShelfDetails.width?.unit])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.storageSpace.long')}
                value={templateShelfDetails.long?.value}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.storageSpace.width')}
                value={templateShelfDetails.width?.value}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.storageSpace.height')}
                value={templateShelfDetails.height?.value}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('defineTemplateShelf.weightLoadSection.title')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.weightLoadSection.unitName')}
                value={t(
                  WEIGHT_UNITS_MAP[templateShelfDetails.weightLoad?.unit],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTemplateShelf.weightLoadSection.title')}
                value={templateShelfDetails.weightLoad?.value}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('defineTemplateShelf.shelfFloor.title')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <LV
                label={t('defineTemplateShelf.shelfFloor.numberOfFloors')}
                value={templateShelfDetails.templateShelfFloors?.length}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LV
                label={t('defineTemplateShelf.long')}
                value={templateShelfDetails.long?.value}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LV
                label={t('defineTemplateShelf.width')}
                value={templateShelfDetails.width?.value}
              />
            </Grid>
            {templateShelfDetails.templateShelfFloors?.map((item) => (
              <>
                <Grid item xs={12} lg={4}>
                  <LV
                    label={t('defineTemplateShelf.shelfFloor.name')}
                    value={item.name}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <LV
                    label={t('defineTemplateShelf.shelfFloor.height')}
                    value={item.height.value}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <LV
                    label={t('defineTemplateShelf.shelfFloor.weightLoad')}
                    value={item.weightLoad.value}
                  />
                </Grid>
              </>
            ))}
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineTemplateShelfDetail
