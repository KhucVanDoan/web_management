import { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_MAP } from '~/modules/mesx/constants'
import { QC_CHECK } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useProductionOrder from '~/modules/wmsx/redux/hooks/useProductionOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from './item-table-detail'

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
    data: { itemQualityPoint },
    actions: itemQualityPointActions,
  } = useCommonManagement()

  const {
    data: { isLoading, productionOrderDetails },
    actions,
  } = useProductionOrder()

  useEffect(() => {
    actions.getProductionOrderDetailsById(id)
    itemQualityPointActions.getItemQualityPoint()
    return () => actions.resetProductionOrderDetail()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_ORDER.LIST.PATH)
  }

  const productionOrderWarehouseLotsCopy = isEmpty(
    productionOrderDetails?.productionOrderWarehouseLots,
  )
    ? productionOrderDetails?.productionOrderWarehouseDetails
    : productionOrderDetails?.productionOrderWarehouseLots
  const items = productionOrderWarehouseLotsCopy?.map((detailLot, index) => ({
    id: index,
    itemId: detailLot.itemId,
    warehouseName: detailLot.warehouseId,
    qcCheck:
      productionOrderDetails?.productionOrderWarehouseDetails.find(
        (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
      )?.qcCheck === QC_CHECK.TRUE || detailLot?.qcCheck === QC_CHECK.TRUE,
    qcCriteriaId:
      productionOrderDetails?.productionOrderWarehouseDetails.find(
        (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
      )?.qcCriteriaId || detailLot?.qcCriteriaId,
    qcCriteria: itemQualityPoint.find(
      (quality) =>
        quality?.id ===
        productionOrderDetails?.productionOrderWarehouseDetails.find(
          (detail) => +detail.id === +detailLot.productionOrderWarehouseId,
        )?.qcCriteriaId,
    )?.code,
    actualQuantity: detailLot.actualQuantity,
    quantity: +detailLot.quantity,
    lotNumber: detailLot?.lotNumber,
    mfg: detailLot?.mfg,
    packageId: detailLot?.packageId,
  }))
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
        <ItemSettingTableDetail
          items={items}
          status={productionOrderDetails?.status}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ProductionOrderDetail
