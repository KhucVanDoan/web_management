import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { uniq, map, isEmpty, minBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  MOVEMENT_TYPE,
  DATA_TYPE,
  TABLE_NAME_ENUM,
  WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS,
  OrderTypeEnum,
} from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz, getLocalItem } from '~/utils'
import addNotification from '~/utils/toast'

import ItemSettingTable from './item-setting-table'
import { formSchema } from './schema'

function WarehouseExportReceiptPickAndExport() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { itemStockAvailabe },
    actions: GetItemStockAvailable,
  } = useWarehouseTransfer()
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH.replace(':id', id),
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.TITLE,
    },
  ]
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()

  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  const initialValues = useMemo(
    () => ({
      items: warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.map(
        (item, index) => {
          return {
            id: `${item?.id}-${index}`,
            quantity: item?.quantity,
            requestedQuantityWarehouseExportProposal:
              item?.requestedQuantityWarehouseExportProposal,
            exportedQuantity: item?.quantity,
            itemCode:
              {
                id: item?.itemId,
                ...item?.item,
              } || null,
            lotNumber: {
              lotNumber: item?.lotNumber,
              itemId: item?.itemId,
            },
            receivedQuantity: '',
            planQuantity: minBy(
              itemStockAvailabe?.find(
                (e) =>
                  e?.itemId === item?.itemId && e.lotNumber === item?.lotNumber,
              )?.itemAvailables,
              'quantity',
            )?.quantity,
            locator: minBy(
              itemStockAvailabe?.find(
                (e) =>
                  e?.itemId === item?.itemId && e.lotNumber === item?.lotNumber,
              )?.itemAvailables,
              'quantity',
            )?.locator,
          }
        },
      ),
    }),
    [warehouseExportReceiptDetails, itemStockAvailabe],
  )
  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id, (data) => {
      const attributes = data?.attributes?.filter((e) => e?.tableName)
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
      const payload = {
        order: {
          orderType: OrderTypeEnum.SO,
          orderId: +data?.id,
        },
        items: data?.saleOrderExportWarehouseLots?.map((item) => ({
          itemId: item?.itemId,
          warehouseId: data?.warehouse?.id,
          lotNumber: item?.lotNumber || null,
        })),
      }
      GetItemStockAvailable.getItemWarehouseStockAvailable(payload)
    })

    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const backToDetail = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToDetail}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const onSubmit = (values) => {
    try {
      const userInfo = getLocalItem('userInfo')
      const payload = {
        userId: +userInfo.id,
        movementType: MOVEMENT_TYPE.SO_EXPORT,
        orderId: Number(id),
        warehouseId: +warehouseExportReceiptDetails?.warehouse?.id,
        items: values.items?.map((item) => ({
          id: +item?.itemCode?.itemId || +item?.itemCode?.id,
          locatorId: +item.locator?.locatorId,
          lotNumber: item.lotNumber?.lotNumber,
          quantity: Number(item.exportedQuantity),
        })),
      }

      actions.exportWarehouse(payload, () => {
        actions.approveWarehouse(id, () => {
          backToDetail()
        })
      })
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('warehouseExportReceipt.pickAndExport.title')}
      onBack={backToDetail}
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
                label={t('warehouseExportReceipt.receiptDate')}
                value={convertUtcDateToLocalTz(
                  warehouseExportReceiptDetails?.receiptDate,
                )}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportProposalCode')}
                value={warehouseExportReceiptDetails?.code}
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
                    : `02${
                        warehouseExportReceiptDetails?.warehouse?.code
                          ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                          : ''
                      }${
                        warehouseExportReceiptDetails?.reason?.code
                          ? `.${warehouseExportReceiptDetails?.reason?.code}`
                          : ''
                      }`
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={
                  warehouseExportReceiptDetails?.transactionNumberCreated
                    ? warehouseExportReceiptDetails?.transactionNumberCreated
                    : `03${
                        warehouseExportReceiptDetails?.warehouse?.code
                          ? `.${warehouseExportReceiptDetails?.warehouse?.code}`
                          : ''
                      }${
                        warehouseExportReceiptDetails?.reason?.code
                          ? `.${warehouseExportReceiptDetails?.reason?.code}`
                          : ''
                      }`
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
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={formSchema(t)}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleReset, values, setFieldValue }) => {
                return (
                  <Form>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemSettingTable
                          items={values?.items || []}
                          lots={
                            warehouseExportReceiptDetails?.saleOrderExportWarehouseLots ||
                            []
                          }
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                          mode={mode}
                        />
                      )}
                    />
                    {renderActionBar(handleReset)}
                  </Form>
                )
              }}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptPickAndExport
