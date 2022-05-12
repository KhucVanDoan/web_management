import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'productionInformationManagement',
  },
  {
    route: ROUTE.DEFINE_VENDEOR.LIST.PATH,
    title: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_VENDEOR.DETAIL.PATH,
    title: ROUTE.DEFINE_VENDEOR.DETAIL.TITLE,
  },
]

const DefineVendorDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, vendorDetails },
    actions,
  } = useDefineVendor()

  useEffect(() => {
    actions.getVendorDetailsById(id)
    return () => {
      actions.resetDetailVendorState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_VENDEOR.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineVendorDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.code')} value={vendorDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.name')} value={vendorDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineVendor.address')}
                value={vendorDetails.address}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.phone')} value={vendorDetails.phone} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.fax')} value={vendorDetails.fax} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.email')} value={vendorDetails.email} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineVendor.description')}
                multiline
                rows={3}
                value={vendorDetails.description}
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

export default DefineVendorDetail
