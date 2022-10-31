import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { MOVEMENT_TYPE, MOVEMENT_TYPE_MAP } from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import { getWarehouseExportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/get-details'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from '../../warehouse-export-receipt/detail/item-setting-table'
import ItemSettingTable from './items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.DETAIL.TITLE,
  },
]

const WarehouseExportDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const [receiptDetail, setReceiptDetail] = useState({})

  // const {
  //   data: { movementDetail, isLoading },
  //   actions,
  // } = useWarehouseExport()
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()

  // useEffect(() => {
  //   if (id) {
  //     actions.getWarehouseExportDetailsById(id)
  //   }
  //   return () => {
  //     actions.resetWarehouseExportDetailsState()
  //   }
  // }, [id])

  useEffect(() => {
    actions.getMovementsDetailsById(id, async (val) => {
      const res = await getWarehouseExportReceiptDetailsApi(val?.orderId)

      setReceiptDetail(res?.data)
    })
    return () => {
      actions.resetMovementsDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT.LIST.PATH)
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail?.createdAt)}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportProposalCode')}
                value={receiptDetail?.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={receiptDetail?.receiver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.departmentReception')}
                value={receiptDetail?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExport')}
                value={receiptDetail?.warehouse?.name}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.accountingAccountCode')}
                value={receiptDetail?.source?.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={receiptDetail?.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={`02${
                  receiptDetail?.warehouse?.code
                    ? `.${receiptDetail?.warehouse?.code}`
                    : ''
                }${
                  receiptDetail?.reason?.code
                    ? `.${receiptDetail?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={`03${
                  receiptDetail?.warehouse?.code
                    ? `.${receiptDetail?.warehouse?.code}`
                    : ''
                }${
                  receiptDetail?.reason?.code
                    ? `.${receiptDetail?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.suorceAccountant')}
                value={receiptDetail.source?.name}
              />
            </Grid>
            {[]?.map((item) => {
              if (item.tableName) {
                return (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={`${item.fieldName}`}
                      value={
                        [][item.tableName]?.find(
                          (itemDetail) => itemDetail.id + '' === item.value,
                        )?.name ||
                        [][item.tableName]?.find(
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
                value={receiptDetail?.explaination}
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
      {[MOVEMENT_TYPE.SO_EXPORT, MOVEMENT_TYPE.TRANSFER_EXPORT].includes(
        movementDetail?.movementType,
      ) && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTableDetail
            items={receiptDetail?.saleOrderExportDetails || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )}
      {[MOVEMENT_TYPE.SWIFT_FLOOR_EXPORT].includes(
        movementDetail?.movementType,
      ) && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTable items={movementDetail?.items || []} />
        </Box>
      )}
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default WarehouseExportDetail
