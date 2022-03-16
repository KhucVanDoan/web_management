import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
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
  const { appStore } = useAppStore()

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
                value={
                  appStore.companies.find(
                    (item) => item.id === factoryDetails.companyId,
                  )?.name
                }
                // @TODO: <anh.nth> if factoryDetails has companyName -> fix, dont need to map
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineFactory.user')} value={factoryDetails.user} />
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
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineFactoryDetail
