import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map, isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { DATA_TYPE, TABLE_NAME_ENUM } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from '../../../warehouse-export-receipt/detail/item-setting-table'

const MovementWarehouseExportDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()
  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  const history = useHistory()
  const items =
    warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.map(
      (item) => ({
        ...item,
        price: item?.price || 0,
        amount: item?.amount || 0,
      }),
    )
  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id, (data) => {
      const attributes = data?.attributes?.filter(
        (e) => e?.tableName && e?.value,
      )
      const params = {
        filter: JSON.stringify(
          uniq(map(attributes, 'tableName'))?.map((item) => ({
            tableName: item,
            id: attributes
              ?.filter((e) => e?.tableName === item)
              ?.map((d) => d?.value)
              .toString(),
          })),
        ),
      }
      useWarehouseImportReceiptAction.getAttribuiteBusinessTypeDetailsById(
        params,
      )
    })
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])
  const breadcrumbs = [
    {
      title: ROUTE.REPORT_STATISTICS.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
      title: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.PATH,
      title: ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.TITLE,
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={() => history.push(ROUTE.WAREHOUSE_EXPORT.LIST.PATH)}
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
                value={warehouseExportReceiptDetails?.code}
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
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.attachedFile')}
                value={warehouseExportReceiptDetails.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={warehouseExportReceiptDetails?.receiver}
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
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.accountingAccountCode')}
                value={warehouseExportReceiptDetails?.source?.code}
              />
            </Grid> */}
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
                label={t('warehouseExportReceipt.typeBusiness')}
                value={
                  !isEmpty(warehouseExportReceiptDetails?.businessType)
                    ? `${warehouseExportReceiptDetails?.businessType?.code} - ${warehouseExportReceiptDetails?.businessType?.name}`
                    : ''
                }
              />
            </Grid>
            {warehouseExportReceiptDetails?.attributes?.map((item) => {
              if (item.tableName) {
                if (item?.tableName === TABLE_NAME_ENUM.ORGANIZATION_PAYMENT) {
                  return (
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={`${item.fieldName}`}
                        value={
                          attributesBusinessTypeDetails[item.tableName]?.find(
                            (itemDetail) => `${itemDetail.id}` === item.value,
                          )?.name
                        }
                      />
                    </Grid>
                  )
                } else if (
                  item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT ||
                  item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL
                ) {
                  return (
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={`${item.fieldName}`}
                        value={
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
                      <LV
                        label={`${item.fieldName}`}
                        value={
                          attributesBusinessTypeDetails[item.tableName]?.find(
                            (itemDetail) => itemDetail.id + '' === item.value,
                          )?.code &&
                          attributesBusinessTypeDetails[item.tableName]?.find(
                            (itemDetail) => itemDetail.id + '' === item.value,
                          )?.name
                            ? `${
                                attributesBusinessTypeDetails[
                                  item.tableName
                                ]?.find(
                                  (itemDetail) =>
                                    itemDetail.id + '' === item.value,
                                )?.code
                              } - ${
                                attributesBusinessTypeDetails[
                                  item.tableName
                                ]?.find(
                                  (itemDetail) =>
                                    itemDetail.id + '' === item.value,
                                )?.name
                              }`
                            : ''
                        }
                      />
                    </Grid>
                  )
                }
              } else {
                if (item?.type === DATA_TYPE.DATE) {
                  return (
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={`${item.fieldName}`}
                        value={convertUtcDateToLocalTz(item.value)}
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
        <ItemSettingTableDetail items={items || []} mode={MODAL_MODE.DETAIL} />
      </Box>

      <ActionBar
        onBack={() => history.push(ROUTE.WAREHOUSE_EXPORT.LIST.PATH)}
      />
    </Page>
  )
}

MovementWarehouseExportDetail.defaultProps = {
  breadcrumbs: [],
}

MovementWarehouseExportDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementWarehouseExportDetail
