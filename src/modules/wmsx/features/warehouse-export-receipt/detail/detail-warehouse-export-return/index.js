import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemsSettingTableDetailReturn from './items-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL_RETURN.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL_RETURN.TITLE,
  },
]

function WarehouseExportReturnDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()
  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id)
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }
  const items =
    warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.map(
      (item) => ({
        ...item,
        price: item?.price,
        amount: item?.amount,
      }),
    )
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportReturnDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('warehouseExportReceipt.status')}
                value={
                  <Status
                    options={WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS}
                    value={warehouseExportReceiptDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.receiptId')}
                value={warehouseExportReceiptDetails?.code}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={warehouseExportReceiptDetails?.receiver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.receiptDate')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails?.receiptDate,
                )}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.suorceAccountant')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.source)
                    ? `${warehouseExportReceiptDetails?.source?.code} - ${warehouseExportReceiptDetails?.source?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.departmentReception')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.departmentReceipt)
                    ? `${warehouseExportReceiptDetails?.departmentReceipt?.code} - ${warehouseExportReceiptDetails?.departmentReceipt?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExport')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.warehouse)
                    ? `${warehouseExportReceiptDetails?.warehouse?.code} - ${warehouseExportReceiptDetails?.warehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.reason)
                    ? `${warehouseExportReceiptDetails?.reason?.code} - ${warehouseExportReceiptDetails?.reason?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.typeBusiness')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.businessType)
                    ? `${warehouseExportReceiptDetails?.businessType?.code} - ${warehouseExportReceiptDetails?.businessType?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={
                  warehouseExportReceiptDetails?.ebsId
                    ? warehouseExportReceiptDetails?.ebsId
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={
                  warehouseExportReceiptDetails?.transactionNumberCreated
                    ? warehouseExportReceiptDetails?.transactionNumberCreated
                    : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={warehouseExportReceiptDetails?.explaination}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemsSettingTableDetailReturn items={items || []} />
          </Box>
          <ActionBar
          // onBack={backToList}
          />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReturnDetail
