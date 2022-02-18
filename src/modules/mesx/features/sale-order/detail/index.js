import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
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
        <Grid container justifyContent={'center'}>
          <Grid item xl={11} sx={12}>
            <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
              <Grid item lg={6} xs={12} display="flex">
                <Typography variant="body2" width={180}>
                  {t('saleOrder.code')}
                </Typography>
                <Typography>{saleOrder.code}</Typography>
              </Grid>
              <Grid item lg={6} xs={12} display="flex">
                <Typography variant="body2" width={180}>
                  {t('saleOrder.name')}
                </Typography>
                <Typography>{saleOrder.name}</Typography>
              </Grid>
              <Grid item lg={6} xs={12} display="flex">
                <Typography variant="body2" width={180}>
                  {t('saleOrder.orderedAt')}
                </Typography>
                <Typography>{saleOrder.orderedAt}</Typography>
              </Grid>
              <Grid item lg={6} xs={12} display="flex">
                <Typography variant="body2" width={180}>
                  {t('saleOrder.boqCode')}
                </Typography>
                <Typography>{saleOrder.boqId}</Typography>
              </Grid>
              <Grid item lg={6} xs={12} display="flex">
                <Box>
                  <Typography variant="h4" mt={1}>
                    {t('saleOrder.vendor.title')}
                  </Typography>
                  <Box display="flex" mt={4 / 3}>
                    <Typography variant="body2" width={180}>
                      {t('saleOrder.vendor.name')}
                    </Typography>
                    <Typography>{saleOrder?.company?.name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12} display="flex">
                <Box>
                  <Typography variant="h4" mt={1}>
                    {t('saleOrder.customer.title')}
                  </Typography>
                  <Box sx={{ mt: 4 / 3 }} display="flex">
                    <Typography variant="body2" width={180}>
                      {t('saleOrder.customer.name')}
                    </Typography>
                    <Typography>{saleOrder?.customer?.name}</Typography>
                  </Box>
                  <Box sx={{ mt: 4 / 3 }} display="flex">
                    <Typography variant="body2" width={180}>
                      {t('saleOrder.deadline')}
                    </Typography>
                    <Typography>
                      {formatDateTimeUtc(saleOrder.deadline)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} display="flex">
                <TextField
                  name="description"
                  label={t('saleOrder.description')}
                  multiline
                  rows={3}
                  labelWidth={180}
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
        <Box sx={{ mt: 2 }}>
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
