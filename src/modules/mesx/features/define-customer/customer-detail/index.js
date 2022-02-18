import React, { useEffect } from 'react'

import { Typography, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineCustomer from '~/modules/mesx/redux/hooks/useDefineCustomer'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
    title: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
    title: ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE,
  },
]

function DefineCustomerDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, customerDetails },
    actions,
  } = useDefineCustomer()

  useEffect(() => {
    actions.getCustomerDetailsById(id)
    return () => {
      actions.resetCustomerDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_CUSTOMER.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCustomerDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} sx={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.code')}
              </Typography>
              <Typography>{customerDetails.code}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.phone')}
              </Typography>
              <Typography>{customerDetails.phone}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.name')}
              </Typography>
              <Typography>{customerDetails.name}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.email')}
              </Typography>
              <Typography>{customerDetails.email}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.address')}
              </Typography>
              <Typography>{customerDetails.address}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.fax')}
              </Typography>
              <Typography>{customerDetails.fax}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.user')}
              </Typography>
              <Typography>{customerDetails.user}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography variant="body2" width={180}>
                {t('defineCustomer.createDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(customerDetails.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCustomer.description')}
                multiline
                rows={3}
                labelWidth={180}
                value={customerDetails.description}
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

export default DefineCustomerDetail
