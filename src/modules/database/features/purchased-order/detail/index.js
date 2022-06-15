import React, { useEffect } from 'react'

import { Box, Grid, Hidden, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { PURCHASED_ORDER_STATUS_OPTIONS } from '~/modules/database/constants'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import { ROUTE } from '~/modules/database/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemsSettingTable from '../form/items-setting-table'
const breadcrumbs = [
  {
    route: ROUTE.PURCHASED_ORDER.LIST.PATH,
    title: ROUTE.PURCHASED_ORDER.LIST.TITLE,
  },
  {
    route: ROUTE.PURCHASED_ORDER.DETAIL.PATH,
    title: ROUTE.PURCHASED_ORDER.DETAIL.TITLE,
  },
]

const PurchasedOrderDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, purchasedOrderDetails },
    actions,
  } = usePurchasedOrder()

  const {
    data: { companyList },
    actions: companyActions,
  } = useDefineCompany()

  useEffect(() => {
    companyActions.searchCompanies({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    actions.getPurchasedOrderDetailsById(id)
    return () => {
      actions.resetPurchasedOrderDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PURCHASED_ORDER.LIST.PATH)
  }

  const customerDetail = companyList.find(
    (item) => item.id === purchasedOrderDetails?.companyId,
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.purchasedOrderDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('purchasedOrder.status')}
                value={
                  <Status
                    options={PURCHASED_ORDER_STATUS_OPTIONS}
                    value={purchasedOrderDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.code')}
                value={purchasedOrderDetails.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.name')}
                value={purchasedOrderDetails.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.requestBuyMaterialCode')}
                value={
                  purchasedOrderDetails.manufacturingOrder?.requestBuyMaterial
                    ?.code
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.manufacturingOrder')}
                value={purchasedOrderDetails.manufacturingOrder?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.purchasedAt')}
                value={convertUtcDateTimeToLocalTz(
                  purchasedOrderDetails.purchasedAt,
                )}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>

            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.createdByUser')}
                value={purchasedOrderDetails.createdByUser?.username}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  purchasedOrderDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h4" mt={1}>
                {t('purchasedOrder.customer.subTitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h4" mt={1}>
                {t('purchasedOrder.vendor.subTitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.customer.name')}
                value={customerDetail?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.vendor.name')}
                value={purchasedOrderDetails.vendor?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.customer.location')}
                value={customerDetail?.address}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.vendor.location')}
                value={purchasedOrderDetails.vendor?.location}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.customer.phone')}
                value={customerDetail?.phone}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.vendor.phone')}
                value={purchasedOrderDetails.vendor?.phone}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.customer.email')}
                value={customerDetail?.phone}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.vendor.email')}
                value={purchasedOrderDetails.vendor?.email}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.customer.fax')}
                value={customerDetail?.fax}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.vendor.fax')}
                value={purchasedOrderDetails.vendor?.fax}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12} />
            </Hidden>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('purchasedOrder.deadline')}
                value={convertUtcDateTimeToLocalTz(
                  purchasedOrderDetails.deadline,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('purchasedOrder.description')}
                placeholder={t('purchasedOrder.description')}
                multiline
                readOnly
                rows={3}
                value={purchasedOrderDetails.description}
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable
          items={purchasedOrderDetails?.purchasedOrderDetails || []}
          mode={MODAL_MODE.DETAIL}
          purchasedOrderDetails={purchasedOrderDetails}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default PurchasedOrderDetail
