import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { SALE_ORDER_STATUS_OPTIONS } from '~/modules/database/constants'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/database/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemsSettingTable from '../form/items-setting-table'

function SaleOrderDetail() {
  const history = useHistory()
  const { t } = useTranslation(['database'])
  const { id } = useParams()

  const {
    data: { saleOrderDetails: saleOrder, isLoading },
    actions: saleOrderAction,
  } = useSaleOrder()

  const mode = MODAL_MODE.DETAIL
  const { saleOrderDetails } = saleOrder

  useEffect(() => {
    saleOrderAction.getSaleOrderDetailsById(id)
    return () => saleOrderAction.resetSaleOrderState()
  }, [id])

  const breadcrumbs = [
    // {
    //   title: 'database',
    // },
    {
      route: ROUTE.SALE_ORDER.LIST.PATH,
      title: ROUTE.SALE_ORDER.LIST.TITLE,
    },
    {
      route: ROUTE.SALE_ORDER.DETAILS.PATH,
      title: ROUTE.SALE_ORDER.DETAILS.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.SALE_ORDER.LIST.PATH)
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.saleOrderDetails')}
        loading={isLoading}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
              {!isNil(saleOrder?.status) && (
                <Grid item xs={12}>
                  <LV
                    label={t('saleOrder.status')}
                    value={
                      <Status
                        options={SALE_ORDER_STATUS_OPTIONS}
                        value={saleOrder?.status}
                      />
                    }
                  />
                </Grid>
              )}
              <Grid item lg={6} xs={12}>
                <LV label={t('saleOrder.code')} value={saleOrder.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('saleOrder.name')} value={saleOrder.name} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('saleOrder.orderedAt')}
                  value={convertUtcDateTimeToLocalTz(saleOrder.orderedAt)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('saleOrder.boqCode')} value={saleOrder.boqId} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box>
                  <Typography variant="h4" mt={1}>
                    {t('saleOrder.vendor.title')}
                  </Typography>
                  <LV
                    label={t('saleOrder.vendor.name')}
                    value={saleOrder?.company?.name}
                    mt={4 / 3}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box>
                  <Typography variant="h4" mt={1}>
                    {t('saleOrder.customer.title')}
                  </Typography>
                  <LV
                    label={t('saleOrder.customer.name')}
                    value={saleOrder?.customer?.name}
                    mt={4 / 3}
                  />
                  <LV
                    label={t('saleOrder.deadline')}
                    value={convertUtcDateTimeToLocalTz(saleOrder?.deadline)}
                    mt={4 / 3}
                  />
                </Box>
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('saleOrder.createdByUser')}
                  value={saleOrder?.createdByUser?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('saleOrder.createdAt')}
                  value={convertUtcDateTimeToLocalTz(saleOrder?.createdAt)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('saleOrder.description')}
                  multiline
                  rows={3}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                  value={saleOrder.description}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <ItemsSettingTable items={saleOrderDetails} mode={mode} />
        </Box>
        <ActionBar onBack={backToList} />
      </Page>
    </>
  )
}

export default SaleOrderDetail
