import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineFactory from '~/modules/mesx/redux/hooks/useDefineFactory'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_FACTORY.LIST.PATH,
    title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_FACTORY.DETAIL.PATH,
    title: ROUTE.DEFINE_FACTORY.DETAIL.TITLE,
  },
]

function DefineFactoryDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, factoryDetails },
    actions,
  } = useDefineFactory()

  useEffect(() => {
    actions.getFactoryDetailsById(id)
    return () => {
      actions.resetFactoryDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_FACTORY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineFactoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineFactory.code')} value={factoryDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.location')}
                value={factoryDetails.location}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineFactory.name')} value={factoryDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.phone')}
                value={factoryDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.companyName')}
                value={factoryDetails.companyName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.user')}
                value={factoryDetails.createdBy?.username}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.createDate')}
                value={formatDateTimeUtc(factoryDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineFactory.description')}
                multiline
                rows={3}
                value={factoryDetails.description}
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

export default DefineFactoryDetail
