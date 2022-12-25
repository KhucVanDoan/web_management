import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import {
  MOVEMENT_TYPE,
  MOVEMENT_TYPE_MAP,
  WAREHOUSE_TRANSFER_MAP,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { getWarehouseImportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { getWarehouseTransferDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-warehouse-transfer-detail'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemsSettingTable from '../../warehouse-import-receipt/form/items-setting-table'
import ItemSettingTable from './items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT.DETAIL.TITLE,
  },
]

const WarehouseImportDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const [receiptDetail, setReceiptDetail] = useState({})
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()
  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  useEffect(() => {
    actions.getMovementsDetailsById(id, async (val) => {
      switch (val?.movementType) {
        case MOVEMENT_TYPE.PO_IMPORT_RECEIVE:
        case MOVEMENT_TYPE.PO_IMPORT:
          const res = await getWarehouseImportReceiptDetailsApi(val?.orderId)

          const attributes = res?.data?.attributes?.filter(
            (e) => e?.tableName && e?.value,
          )
          const params = {
            filter: JSON.stringify(
              uniq(map(attributes, 'tableName'))?.map((item) => ({
                tableName: item,
                id: (attributes || [])
                  ?.filter((e) => e?.tableName === item)
                  ?.map((d) => d?.value)
                  .toString(),
              })),
            ),
          }
          useWarehouseImportReceiptAction.getAttribuiteBusinessTypeDetailsById(
            params,
          )
          setReceiptDetail(res?.data)
          break
        case MOVEMENT_TYPE.TRANSFER_IMPORT:
          const response = await getWarehouseTransferDetailsApi(val?.orderId)

          const attributess = response?.data?.attributes?.filter(
            (e) => e?.tableName && e?.value,
          )
          const paramss = {
            filter: JSON.stringify(
              uniq(map(attributess, 'tableName'))?.map((item) => ({
                tableName: item,
                id: attributes
                  ?.filter((e) => e?.tableName === item)
                  ?.map((d) => d?.value)
                  .toString(),
              })),
            ),
          }
          useWarehouseImportReceiptAction.getAttribuiteBusinessTypeDetailsById(
            paramss,
          )

          setReceiptDetail(response?.data)
          break
        default:
          break
      }
    })
    return () => {
      actions.resetMovementsDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT.LIST.PATH)
  }
  const display = () => {
    switch (movementDetail?.movementType) {
      case MOVEMENT_TYPE.PO_IMPORT_RECEIVE:
        return (
          <>
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={receiptDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail?.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.attachedFile')}
                value={receiptDetail?.attachment?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.shipper')}
                value={receiptDetail?.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.unit')}
                value={receiptDetail?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.expenditureType')}
                value={receiptDetail?.businessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.warehouse')}
                value={receiptDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.reason')}
                value={receiptDetail?.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.source')}
                value={receiptDetail?.source?.name}
              />
            </Grid>
            {receiptDetail?.attributes?.map((item) => {
              if (item.tableName) {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={`${item.fieldName}`}
                      value={
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.name ||
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.code
                      }
                    />
                  </Grid>
                )
              } else {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV label={`${item.fieldName}`} value={item.value} />
                  </Grid>
                )
              }
            })}
            <Grid item xs={12}>
              <TextField
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={receiptDetail?.explanation}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </>
        )
      case MOVEMENT_TYPE.PO_IMPORT:
        return (
          <>
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={receiptDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail?.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.attachedFile')}
                value={receiptDetail?.attachment?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.shipper')}
                value={receiptDetail?.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.unit')}
                value={receiptDetail?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.expenditureType')}
                value={receiptDetail?.businessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.warehouse')}
                value={receiptDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.reason')}
                value={receiptDetail?.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.source')}
                value={receiptDetail?.source?.name}
              />
            </Grid>
            {receiptDetail?.attributes?.map((item) => {
              if (item.tableName) {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={`${item.fieldName}`}
                      value={
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.name ||
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.code
                      }
                    />
                  </Grid>
                )
              } else {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV label={`${item.fieldName}`} value={item.value} />
                  </Grid>
                )
              }
            })}
            <Grid item xs={12}>
              <TextField
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={receiptDetail?.explanation}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </>
        )
      case MOVEMENT_TYPE.TRANSFER_IMPORT:
        return (
          <>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.code')}
                value={receiptDetail.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.name')}
                value={receiptDetail.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.businessType')}
                value={receiptDetail?.bussinessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.type')}
                value={t(`${WAREHOUSE_TRANSFER_MAP[receiptDetail?.type]}`)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.source')}
                value={`${receiptDetail?.source?.code} - ${receiptDetail?.source?.name}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.reason')}
                value={`${receiptDetail?.reason?.code} - ${receiptDetail?.reason?.name}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseImport')}
                value={receiptDetail?.destinationWarehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseExport')}
                value={receiptDetail?.sourceWarehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail?.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.receiptNo')}
                value={receiptDetail?.ebsId}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.deliver')}
                value={receiptDetail?.receiver}
              />
            </Grid>
            {receiptDetail?.attributes?.map((item) => {
              if (item.tableName) {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={`${item.fieldName}`}
                      value={
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => `${itemDetail.id}` === item.value,
                        )?.name ||
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => `${itemDetail.id}` === item.value,
                        )?.code
                      }
                    />
                  </Grid>
                )
              } else {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV label={`${item.fieldName}`} value={item.value} />
                  </Grid>
                )
              }
            })}
            <Grid item xs={12}>
              <TextField
                name="explaination"
                label={t('warehouseTransfer.explaination')}
                multiline
                rows={3}
                value={receiptDetail?.explanation}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </>
        )
      case MOVEMENT_TYPE.SWIFT_FLOOR_IMPORT:
        return (
          <>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouses')}
                value={movementDetail?.warehouse?.name}
              />
            </Grid>
          </>
        )
      default:
        break
    }
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementCode')}
                value={movementDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementType')}
                value={t(MOVEMENT_TYPE_MAP[movementDetail?.movementType])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.createdUser')}
                value={movementDetail?.user?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementDate')}
                value={convertUtcDateToLocalTz(movementDetail?.createdAt)}
              />
            </Grid>
            {display()}
          </Grid>
        </Grid>
      </Grid>
      {[MOVEMENT_TYPE.PO_IMPORT_RECEIVE].includes(
        movementDetail?.movementType,
      ) && (
        <Box sx={{ mt: 3 }}>
          <ItemsSettingTable
            items={receiptDetail?.purchasedOrderImportDetails || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )}
      {[
        MOVEMENT_TYPE.PO_IMPORT,
        MOVEMENT_TYPE.TRANSFER_IMPORT,
        MOVEMENT_TYPE.SWIFT_FLOOR_IMPORT,
      ].includes(movementDetail?.movementType) && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTable
            items={movementDetail?.items || []}
            movementType={movementDetail?.movementType}
          />
        </Box>
      )}
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default WarehouseImportDetail
