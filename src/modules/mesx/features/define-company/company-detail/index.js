import React, { useEffect } from 'react'

import { Typography, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_COMPANY.LIST.PATH,
    title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_COMPANY.DETAIL.PATH,
    title: ROUTE.DEFINE_COMPANY.DETAIL.TITLE,
  },
]

function DefineCompanyDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, companyDetails },
    actions,
  } = useDefineCompany()

  useEffect(() => {
    actions.getCompanyDetailsById(id)
    return () => {
      actions.resetCompanyDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_COMPANY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCompanyDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} sx={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.code')}
              </Typography>
              <Typography>{companyDetails.code}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.tax')}
              </Typography>
              <Typography>{companyDetails.taxNo}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.name')}
              </Typography>
              <Typography>{companyDetails.name}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.email')}
              </Typography>
              <Typography>{companyDetails.email}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.address')}
              </Typography>
              <Typography>{companyDetails.address}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.fax')}
              </Typography>
              <Typography>{companyDetails.fax}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.phone')}
              </Typography>
              <Typography>{companyDetails.phone}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.user')}
              </Typography>
              <Typography>{companyDetails.user}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex"></Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCompany.createDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(companyDetails.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCompany.description')}
                multiline
                rows={3}
                labelWidth={180}
                value={companyDetails.description}
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

export default DefineCompanyDetail
