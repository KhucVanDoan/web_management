import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  DATA_TYPE,
  STATUS_SYNC_ORDER_TO_EBS,
  SYNC_STATUS_CAN_UPDATE_HEADER_POI,
  TABLE_NAME_ENUM,
  WAREHOUSE_EXPORT_RECEIPT_STATUS,
  WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import theme from '~/themes'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

import ItemSettingTableDetail from './item-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseExportReceiptDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const [loadingDowFile, setLoadingDowFile] = useState(false)
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

  const [modal, setModal] = useState({
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
    isOpenConfirmEBSModal: false,
    isOpenRejectedModal: false,
    isOpenCancelSyncEMSModal: false,
  })
  const items =
    warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.map(
      (item) => ({
        ...item,
        price: item?.price,
        amount: item?.amount,
      }),
    )
  const dowFile = async (params) => {
    setLoadingDowFile(true)
    const uri = `/v1/sales/sale-order-exports/export-delivery-ticket/${params}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.statusCode === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
      setLoadingDowFile(false)
      const filename = getFileNameFromHeader(res)
      const blob = new Blob([res?.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const nameFile = decodeURI(filename)
      link.setAttribute('download', nameFile)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
    }
  }
  const dowWarehouseExportReceipt = async (params) => {
    setLoadingDowFile(true)
    const uri = `/v1/sales/sale-order-exports/export-soexport-ticket/${params}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.statusCode === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
      setLoadingDowFile(false)
      const filename = getFileNameFromHeader(res)
      const blob = new Blob([res?.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const nameFile = decodeURI(filename)
      link.setAttribute('download', nameFile)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
    }
  }
  const dowDeliveryRecord = async (params) => {
    setLoadingDowFile(true)
    const uri = `/v1/sales/sale-order-exports/export-delivery-record/${params}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.statusCode === 400) {
      addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
    } else {
      setLoadingDowFile(false)
      const filename = getFileNameFromHeader(res)
      const blob = new Blob([res?.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const nameFile = decodeURI(filename)
      link.setAttribute('download', nameFile)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
    }
  }
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

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const renderHeaderRight = () => {
    const isEdit =
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING ||
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.REJECTED ||
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
    const isDelete =
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING ||
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.REJECTED
    const isConfirmed =
      warehouseExportReceiptDetails?.status ===
      WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING
    const isRejected =
      warehouseExportReceiptDetails?.status ===
      WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING
    const isCancelSync =
      warehouseExportReceiptDetails?.syncStatus ===
      STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR
    const isEditHeader =
      (warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.IN_COLLECTING &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseExportReceiptDetails?.syncStatus,
        )) ||
      (warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseExportReceiptDetails?.syncStatus,
        )) ||
      (warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.COLLECTED &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseExportReceiptDetails?.syncStatus,
        ))
    const isConfirmWarehouseExport =
      warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED &&
      warehouseExportReceiptDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC
    return (
      <>
        {isRejected && (
          <Guard code={FUNCTION_CODE.SALE_REJECT_SALE_ORDER_EXPORT}>
            <Button
              onClick={() => setModal({ isOpenRejectedModal: true })}
              sx={{
                ml: 4 / 3,
                borderColor: theme.palette.borderButtonRemove,
                color: theme.palette.borderButtonRemove,
              }}
              variant="outlined"
              // icon="add"
            >
              {t('warehouseExportReceipt.rejected')}
            </Button>
          </Guard>
        )}
        {isConfirmed && (
          <Guard code={FUNCTION_CODE.SALE_CONFIRM_SALE_ORDER_EXPORT}>
            <Button
              onClick={() => setModal({ isOpenConfirmModal: true })}
              sx={{
                ml: 4 / 3,
              }}

              // icon="add"
            >
              {t('warehouseExportReceipt.confirmed')}
            </Button>
          </Guard>
        )}
        {isDelete && (
          <Guard code={FUNCTION_CODE.SALE_DELETE_SALE_ORDER_EXPORT}>
            <Button
              onClick={() => setModal({ isOpenDeleteModal: true })}
              sx={{
                ml: 4 / 3,
              }}
              color="error"
              // icon="add"
            >
              {t('warehouseExportReceipt.deleted')}
            </Button>
          </Guard>
        )}
        {isEdit && (
          <Guard code={FUNCTION_CODE.SALE_UPDATE_SALE_ORDER_EXPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseExportReceipt.update')}
            </Button>
          </Guard>
        )}
        {isEditHeader && (
          <Guard code={FUNCTION_CODE.SALE_UPDATE_HEADER_SALE_ORDER_EXPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseExportReceipt.update')}
            </Button>
          </Guard>
        )}
        {isConfirmWarehouseExport && (
          <Guard code={FUNCTION_CODE.SALE_SYNC_PURCHASED_ORDER_IMPORT_TO_EBS}>
            <Button
              onClick={() => setModal({ isOpenConfirmEBSModal: true })}
              sx={{
                ml: 4 / 3,
              }}
              // icon="add"
            >
              {t('warehouseExportReceipt.confirmWarehouseExportERP')}
            </Button>
          </Guard>
        )}
        {isCancelSync && (
          <Guard code={FUNCTION_CODE.SALE_CANCEL_SYNC_SALE_ORDER_EXPORT}>
            <Button
              onClick={() => setModal({ isOpenCancelSyncEMSModal: true })}
              sx={{
                ml: 4 / 3,
                borderColor: theme.palette.borderButtonRemove,
                color: theme.palette.borderButtonRemove,
              }}
              // icon="add"
              variant="outlined"
            >
              {t('warehouseExportReceipt.cancelEbs')}
            </Button>
          </Guard>
        )}
        {warehouseExportReceiptDetails?.status ===
          WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_RETURN_SALE_ORDER_EXPORT}>
            <Button
              onClick={() =>
                actions.returnWarehouseExportReceiptById(
                  warehouseExportReceiptDetails?.id,
                  () => {
                    actions.getWarehouseExportReceiptDetailsById(id)
                  },
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseExportReceipt.returnReceipt')}
            </Button>
          </Guard>
        )}

        {warehouseExportReceiptDetails?.status ===
          WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_COLLECT_SALE_ORDER_EXPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{ ml: 4 / 3 }}
              icon="add"
            >
              {t('warehouseExportReceipt.pickAndExport.title')}
            </Button>
          </Guard>
        )}
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouseExportReceipt(
      warehouseExportReceiptDetails?.id,
      () => {
        history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
      },
    )
    setModal({ isOpenDeleteModal: false })
  }
  const onSubmitConfirm = () => {
    actions.confirmWarehouseExportReceiptById(
      warehouseExportReceiptDetails?.id,
      () => {
        actions.getWarehouseExportReceiptDetailsById(id)
      },
    )

    setModal({ isOpenConfirmModal: false })
  }
  const onSubmitConfirmEBS = () => {
    actions.confirmWarehouseExportEBSById(
      warehouseExportReceiptDetails?.id,
      () => {
        actions.getWarehouseExportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenConfirmEBSModal: false })
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseExportReceiptById(
      warehouseExportReceiptDetails?.id,
      () => {
        actions.getWarehouseExportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenRejectedModal: false })
  }
  const onCloseDeleteModal = () => {
    setModal({
      isOpenDeleteModal: false,
      tempItem: null,
      isOpenConfirmModal: false,
      isOpenRejectedModal: false,
      isOpenConfirmEBSModal: false,
    })
  }

  const onSubmitCancelEBS = () => {
    actions.cancelWarehouseExportEBSById(
      warehouseExportReceiptDetails?.id,
      () => {
        actions.getWarehouseExportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenCancelSyncEMSModal: false })
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportReceiptDetail')}
      onBack={backToList}
      loading={isLoading || loadingDowFile}
      renderHeaderRight={renderHeaderRight}
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseExportReceiptDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdByUser')}
                value={warehouseExportReceiptDetails?.user?.fullName}
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
          <Box sx={{ mt: 3 }}>
            <ItemSettingTableDetail items={items || []} mode={mode} />
          </Box>
          <ActionBar
            // onBack={backToList}
            elBefore={
              <>
                <Box sx={{ mr: 'auto' }}>
                  <Button color="grayF4" onClick={() => dowFile(id)}>
                    {t(`warehouseExportReceipt.dowload`)}
                  </Button>
                  <Button
                    color="grayF4"
                    onClick={() => dowWarehouseExportReceipt(id)}
                  >
                    {t(`warehouseExportReceipt.dowloadWarehouseExportReceipt`)}
                  </Button>
                  {warehouseExportReceiptDetails?.status ===
                    WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED && (
                    <Button
                      color="grayF4"
                      onClick={() => dowDeliveryRecord(id)}
                    >
                      {t(`warehouseExportReceipt.dowloadDeliveryRecord`)}
                    </Button>
                  )}
                </Box>
              </>
            }
          />
        </Grid>
      </Grid>
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('warehouseExportReceipt.deleteTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.deleteConfirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('warehouseExportReceipt.confirmTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseExportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmEBSModal}
        title={t('warehouseExportReceipt.confirmTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        <div>{t('warehouseExportReceipt.ConfirmEBS')}</div>
        {t('warehouseExportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenCancelSyncEMSModal}
        title={t('warehouseExportReceipt.cancelSyncTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitCancelEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseExportReceipt.cancelEBS')}
      </Dialog>
      <Dialog
        open={modal.isOpenRejectedModal}
        title={t('warehouseExportReceipt.rejectTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejected}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.rejectConfirm')}
      </Dialog>
    </Page>
  )
}

export default WarehouseExportReceiptDetail
