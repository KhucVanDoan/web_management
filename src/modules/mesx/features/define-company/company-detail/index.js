import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import LV from '~/components/LabelValue'
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
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.code')} value={companyDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.tax')} value={companyDetails.taxNo} />
            </Grid>
            <Grid item lg={6} xs={12} variant="detail">
              <LV label={t('defineCompany.name')} value={companyDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.email')}
                value={companyDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.address')}
                value={companyDetails.address}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.fax')} value={companyDetails.fax} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.phone')}
                value={companyDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.user')} value={companyDetails.user} />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>{' '}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.createDate')}
                value={formatDateTimeUtc(companyDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCompany.description')}
                multiline
                rows={3}
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
