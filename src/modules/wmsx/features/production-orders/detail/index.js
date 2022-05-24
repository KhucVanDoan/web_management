import { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_MAP } from '~/modules/mesx/constants'
import useProductionOrder from '~/modules/wmsx/redux/hooks/useProductionOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from '../form/item-setting-table'

const breadcrumbs = [
  {
    title: ROUTE.ORDER_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.PRODUCTION_ORDER.LIST.PATH,
    title: ROUTE.PRODUCTION_ORDER.LIST.TITLE,
  },
  {
    route: ROUTE.PRODUCTION_ORDER.DETAIL.PATH,
    title: ROUTE.PRODUCTION_ORDER.DETAIL.TITLE,
  },
]
function ProductionOrderDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, productionOrderDetails },
    actions,
  } = useProductionOrder()

  useEffect(() => {
    actions.getProductionOrderDetailsById(id)
    return () => actions.resetProductionOrderDetail()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_ORDER.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.PRODUCTION_ORDER.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(productionOrderDetails?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('productionOrder.status')}
                  value={
                    <Status
                      options={ORDER_STATUS_OPTIONS}
                      value={productionOrderDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('productionOrder.codeList')}
                value={productionOrderDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('productionOrder.nameList')}
                value={productionOrderDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('productionOrder.moCode')}
                value={productionOrderDetails?.manufacturingOrder?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('productionOrder.moName')}
                value={productionOrderDetails?.manufacturingOrder?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('productionOrder.type')}
                value={t(ORDER_TYPE_MAP[productionOrderDetails?.type])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('productionOrder.planDate')}>
                {convertUtcDateToLocalTz(productionOrderDetails?.createdAt)} -{' '}
                {convertUtcDateToLocalTz(productionOrderDetails?.deadline)}
              </LabelValue>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('productionOrder.description')}
                multiline
                value={productionOrderDetails?.description}
                rows={3}
                readOnly
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
        <ItemSettingTable
          items={productionOrderDetails?.productionOrderDetails}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ProductionOrderDetail
