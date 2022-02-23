import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import ItemsSettingTable from '../form/items-setting-table'

function SaleOrderDetail() {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])
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
    {
      title: 'database',
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
        title={t('menu.saleOrderDefine')}
        loading={isLoading}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
              <Grid item lg={6} xs={12}>
                <LV label={t('saleOrder.code')} value={saleOrder.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('saleOrder.name')} value={saleOrder.name} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('saleOrder.orderedAt')}
                  value={formatDateTimeUtc(saleOrder.orderedAt)}
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
                    value={formatDateTimeUtc(saleOrder.deadline)}
                    mt={4 / 3}
                  />
                </Box>
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
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={backToList} color="grayF4">
            {t('common.close')}
          </Button>
        </Box>
      </Page>
    </>
  )
}

export default SaleOrderDetail
