import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import { ORDER_STATUS_OPTIONS, QC_CHECK } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import usePurchasedOrdersImport from '~/modules/wmsx/redux/hooks/usePurchasedOrdersImport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from '../item-setting-table'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
    title: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
  },
  {
    route: ROUTE.PURCHASED_ORDER_IMPORT.DETAIL.PATH,
    title: ROUTE.PURCHASED_ORDER_IMPORT.DETAIL.TITLE,
  },
]

const PODetail = () => {
  const { t } = useTranslation(['wmsx'])
  const [dataTable, setDataTable] = useState([])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { poImportDetails, isLoading },
    actions,
  } = usePurchasedOrdersImport()

  const {
    data: { purchasedOrderDetails },
    actions: actionsPurchasedOrderDetails,
  } = usePurchasedOrder()

  const {
    data: { itemQualityPoint, warehouseList },
    actions: commonActions,
  } = useCommonManagement()

  useEffect(() => {
    commonActions.getItemQualityPoint()
    commonActions.getWarehouses({})
  }, [])
  useEffect(() => {
    if (id) {
      actions.getPOImportDetailsById(id)
    }
    return () => {
      actions.resetPODetailsState()
    }
  }, [id])

  useEffect(() => {
    const { purchasedOrder } = poImportDetails
    actionsPurchasedOrderDetails.getPurchasedOrderDetailsById(
      purchasedOrder?.id,
    )
    return () => {
      actionsPurchasedOrderDetails.resetPurchasedOrderDetailsState()
    }
  }, [poImportDetails])

  useEffect(() => {
    const {
      purchasedOrderImportWarehouseLots,
      purchasedOrderImportWarehouseDetails,
    } = poImportDetails
    let state = {
      items: purchasedOrderImportWarehouseLots?.map((detailLot, index) => ({
        id: index,
        itemId: detailLot.itemId,
        itemName: detailLot?.item?.name,
        itemCode: detailLot?.item?.code,
        quantity: detailLot.quantity,
        actualQuantity: detailLot.actualQuantity,
        lotNumber: detailLot?.lotNumber,
        mfg: convertUtcDateToLocalTz(detailLot?.mfg),
        packageId: detailLot?.packageId,
        qcCheck:
          purchasedOrderImportWarehouseDetails.find(
            (detail) =>
              detail.id === detailLot.purchasedOrderImportWarehouseDetailId,
          )?.qcCheck === QC_CHECK.TRUE || false,
        qcCriteriaId:
          purchasedOrderImportWarehouseDetails.find(
            (detail) =>
              detail.id === detailLot.purchasedOrderImportWarehouseDetailId,
          )?.qcCriteriaId || null,
        qcCriteria:
          itemQualityPoint.find(
            (quality) =>
              quality?.id ===
              purchasedOrderImportWarehouseDetails.find(
                (detail) =>
                  detail.id === detailLot.purchasedOrderImportWarehouseDetailId,
              )?.qcCriteriaId,
          )?.code || '',
        unitType: detailLot?.item?.itemUnit,
        storedQuantity: detailLot?.storedQuantity,
        evenRow: detailLot?.isEven,
        palletId: detailLot?.pallet?.code,
        location: detailLot?.location?.name,
      })),
    }
    setDataTable(state?.items)
  }, [purchasedOrderDetails])

  const backToList = () => {
    history.push(ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.purchasedOrderImportDetails')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('purchasedOrderImport.status')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={poImportDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.codePOimp')}
                value={poImportDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.codePO')}
                value={poImportDetails?.purchasedOrder?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.importWarehouse')}
                value={
                  warehouseList?.find(
                    (item) => item?.id === poImportDetails?.warehouseId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.namePOimp')}
                value={poImportDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.purchasedAt')}
                value={convertUtcDateTimeToLocalTz(poImportDetails.purchasedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('purchasedOrderImport.deadline')}
                value={convertUtcDateTimeToLocalTz(poImportDetails.deliveredAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('purchasedOrderImport.description')}
                multiline
                rows={3}
                value={poImportDetails.description}
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
          status={poImportDetails?.status}
          items={dataTable}
          mode={MODAL_MODE.DETAIL}
          itemFilterList={
            poImportDetails?.purchasedOrder?.purchasedOrderDetails
              ?.purchasedOrderDetails
          }
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default PODetail
