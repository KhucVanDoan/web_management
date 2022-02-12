import React, { useEffect } from 'react'

import { Typography, Grid, Hidden } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
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
        <Grid item xl={11} sx={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.code')}
              </Typography>
              <Typography>{factoryDetails.code}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.location')}
              </Typography>
              <Typography>{factoryDetails.location}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.name')}
              </Typography>
              <Typography>{factoryDetails.name}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.phone')}
              </Typography>
              <Typography>{factoryDetails.phone}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.companyName')}
              </Typography>
              <Typography>{factoryDetails.companyName}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.user')}
              </Typography>
              <Typography>{factoryDetails.user}</Typography>
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12} display="flex"></Grid>
            </Hidden>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineFactory.createDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(factoryDetails.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineFactory.description')}
                multiline
                rows={3}
                labelWidth={180}
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
