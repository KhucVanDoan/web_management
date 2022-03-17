import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
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
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.code')}
                value={customerDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.phone')}
                value={customerDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.name')}
                value={customerDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.email')}
                value={customerDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.address')}
                value={customerDetails.address}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCustomer.fax')} value={customerDetails.fax} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.user')}
                value={customerDetails.user}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomer.createDate')}
                value={formatDateTimeUtc(customerDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCustomer.description')}
                multiline
                rows={3}
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
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineCustomerDetail
