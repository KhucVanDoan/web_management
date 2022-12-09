import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from '../../detail/item-setting-table'

const MovementExportWarehouseDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()
  const history = useHistory()
  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id)
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
    },
    {
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.LIST.TITLE,
    },
    {
      title:
        ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.DETAIL_TRANSACTION.TITLE,
    },
  ]
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={() => history.push(breadcrumbs[1].route)}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementCode')}
                value={warehouseExportReceiptDetails?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementType')}
                value={t('movementType.warehouseExportReceipt')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.createdUser')}
                value={warehouseExportReceiptDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementDate')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails?.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.receiptId')}
                value={warehouseExportReceiptDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails.receiptDate,
                )}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.attachedFile')}
                value={warehouseExportReceiptDetails.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={warehouseExportReceiptDetails.receiver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.departmentReception')}
                value={warehouseExportReceiptDetails?.departmentReceipt?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.typeBusiness')}
                value={warehouseExportReceiptDetails.businessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.exportInWarehouse')}
                value={warehouseExportReceiptDetails.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={warehouseExportReceiptDetails.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={`02${
                  warehouseExportReceiptDetails?.warehouse?.code
                    ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                    : ''
                }${
                  warehouseExportReceiptDetails?.reason?.code
                    ? `.${warehouseExportReceiptDetails?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={`03${
                  warehouseExportReceiptDetails?.warehouse?.code
                    ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                    : ''
                }${
                  warehouseExportReceiptDetails?.reason?.code
                    ? `.${warehouseExportReceiptDetails?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.suorceAccountant')}
                value={warehouseExportReceiptDetails.source?.name}
              />
            </Grid>
            {[].map((item) => {
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
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <ItemSettingTableDetail
          items={warehouseExportReceiptDetails?.saleOrderExportDetails || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>

      <ActionBar onBack={() => history.push(breadcrumbs[1].route)} />
    </Page>
  )
}

MovementExportWarehouseDetail.defaultProps = {
  breadcrumbs: [],
}

MovementExportWarehouseDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementExportWarehouseDetail
