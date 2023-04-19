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
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import theme from '~/themes'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import { downloadFile } from '~/utils/file'
import addNotification from '~/utils/toast'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseImportReceiptDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const [modal, setModal] = useState({
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
    isOpenRejectedModal: false,
    isOpenConfirmEBSModal: false,
    isOpenCancelSyncEMSModal: false,
  })

  const {
    data: {
      warehouseImportReceiptDetails,
      isLoading,
      attributesBusinessTypeDetails,
    },
    actions,
  } = useWarehouseImportReceipt()

  const dowFile = async (params) => {
    const warehouseImportId = JSON.stringify(params)
    const uri = `/v1/sales/export/purchased-order-import?queryIds=${warehouseImportId}&type=3`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.status === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
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
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  useEffect(() => {
    actions.getWarehouseImportReceiptDetailsById(id, (data) => {
      const attributes = data?.attributes?.filter((e) => e?.value !== null)
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
      actions.getAttribuiteBusinessTypeDetailsById(params)
    })
    return () => {
      actions.resetWarehouseImportReceiptState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }
  const dowAttachment = async (params) => {
    const uri = `/v1/files/${params?.id}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.status === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
      downloadFile(
        res?.data,
        warehouseImportReceiptDetails.attachment?.fileName?.split('.').shift(),
        `${res?.data?.type}`,
        [`${params?.fileName?.split('.').pop()}`],
      )
    }
  }
  const renderHeaderRight = () => {
    const isEdit =
      warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING ||
      warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.REJECTED ||
      warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED
    const isDelete =
      warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING ||
      warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.REJECTED
    const isConfirmed =
      warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING
    const isRejected =
      warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING
    const isCancelSync =
      warehouseImportReceiptDetails?.syncStatus ===
      STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR
    const isEditHeader =
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseImportReceiptDetails?.syncStatus,
        )) ||
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.IN_PROGRESS &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseImportReceiptDetails?.syncStatus,
        )) ||
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED &&
        SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(
          warehouseImportReceiptDetails?.syncStatus,
        ))
    const isConfirmWarehouseImport =
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.IN_PROGRESS &&
        warehouseImportReceiptDetails?.syncStatus ===
          STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC) ||
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED &&
        warehouseImportReceiptDetails?.syncStatus ===
          STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC) ||
      (warehouseImportReceiptDetails?.status ===
        WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED &&
        warehouseImportReceiptDetails?.syncStatus ===
          STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC)
    return (
      <>
        {isRejected && (
          <Guard code={FUNCTION_CODE.SALE_REJECT_PURCHASED_ORDER_IMPORT}>
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
              {t('warehouseImportReceipt.rejected')}
            </Button>
          </Guard>
        )}
        {isConfirmed && (
          <Guard code={FUNCTION_CODE.SALE_CONFIRM_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() => setModal({ isOpenConfirmModal: true })}
              sx={{
                ml: 4 / 3,
              }}

              // icon="add"
            >
              {t('warehouseImportReceipt.confirmed')}
            </Button>
          </Guard>
        )}
        {isDelete && (
          <Guard code={FUNCTION_CODE.SALE_DELETE_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() => setModal({ isOpenDeleteModal: true })}
              sx={{
                ml: 4 / 3,
              }}
              color="error"
              // icon="add"
            >
              {t('warehouseImportReceipt.deleted')}
            </Button>
          </Guard>
        )}
        {isEdit && (
          <Guard code={FUNCTION_CODE.SALE_UPDATE_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH.replace(
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
              {t('warehouseImportReceipt.update')}
            </Button>
          </Guard>
        )}
        {isEditHeader && (
          <Guard code={FUNCTION_CODE.SALE_UPDATE_HEADER_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT_HEADER.PATH.replace(
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
              {t('warehouseImportReceipt.update')}
            </Button>
          </Guard>
        )}
        {isConfirmWarehouseImport && (
          <Guard code={FUNCTION_CODE.SALE_SYNC_PURCHASED_ORDER_IMPORT_TO_EBS}>
            <Button
              onClick={() => setModal({ isOpenConfirmEBSModal: true })}
              sx={{
                ml: 4 / 3,
              }}
              // icon="add"
            >
              {t('warehouseImportReceipt.confirmWarehouseImportERP')}
            </Button>
          </Guard>
        )}
        {isCancelSync && (
          <Guard code={FUNCTION_CODE.SALE_CANCEL_SYNC_PURCHASED_ORDER_IMPORT}>
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
              {t('warehouseImportReceipt.cancelEbs')}
            </Button>
          </Guard>
        )}
        {warehouseImportReceiptDetails?.status ===
          WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_RETURN_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() =>
                actions.returnWarehouseImportReceiptById(
                  warehouseImportReceiptDetails?.id,
                  () => {
                    actions.getWarehouseImportReceiptDetailsById(id)
                  },
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseImportReceipt.returnReceipt')}
            </Button>
          </Guard>
        )}
        {warehouseImportReceiptDetails?.status ===
          WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_RETURN_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              icon="add"
            >
              {t('warehouseImportReceipt.warehouseImport')}
            </Button>
          </Guard>
        )}
        {warehouseImportReceiptDetails?.status ===
          WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED && (
          <Guard
            code={FUNCTION_CODE.SALE_CREATE_PURCHASED_ORDER_IMPORT_RECEIVE}
          >
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.STORAGE.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              icon="add"
            >
              {t('warehouseImportReceipt.warehouseImportStore')}
            </Button>
          </Guard>
        )}
        {warehouseImportReceiptDetails?.status ===
          WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED && (
          <Guard code={FUNCTION_CODE.SALE_RECEIVE_PURCHASED_ORDER_IMPORT}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
              sx={{ ml: 4 / 3 }}
              icon="add"
            >
              {t('warehouseImportReceipt.receiveAndStorageBtn')}
            </Button>
          </Guard>
        )}
      </>
    )
  }
  const receiptRequired = warehouseImportReceiptDetails?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
  )

  const onSubmitDelete = () => {
    actions.deleteWarehouseImportReceipt(
      warehouseImportReceiptDetails?.id,
      () => {
        actions.getWarehouseImportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenDeleteModal: false })
  }
  const onSubmitConfirm = () => {
    actions.confirmWarehouseImportReceiptById(
      warehouseImportReceiptDetails?.id,
      () => {
        actions.getWarehouseImportReceiptDetailsById(id)
      },
    )

    setModal({ isOpenConfirmModal: false })
  }
  const onSubmitConfirmEBS = () => {
    actions.confirmWarehouseImportEBSById(
      warehouseImportReceiptDetails?.id,
      () => {
        actions.getWarehouseImportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenConfirmEBSModal: false })
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseImportReceiptById(
      warehouseImportReceiptDetails?.id,
      () => {
        actions.getWarehouseImportReceiptDetailsById(id)
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
    actions.cancelWarehouseImportEBSById(
      warehouseImportReceiptDetails?.id,
      () => {
        actions.getWarehouseImportReceiptDetailsById(id)
      },
    )
    setModal({ isOpenCancelSyncEMSModal: false })
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseImportReceiptDetail')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.status')}
                value={
                  <Status
                    options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
                    value={warehouseImportReceiptDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={warehouseImportReceiptDetails.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('warehouseImportReceipt.receiptEBS')}
                value={warehouseImportReceiptDetails.ebsId}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.receiptDate')}
                value={convertUtcDateToLocalTz(
                  warehouseImportReceiptDetails.receiptDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseImportReceiptDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdByUser')}
                value={warehouseImportReceiptDetails.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.attachedFile')}
                value={warehouseImportReceiptDetails.attachment?.fileName}
                file={true}
                onClick={() =>
                  dowAttachment(warehouseImportReceiptDetails.attachment)
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.shipper')}
                value={warehouseImportReceiptDetails.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.departmentReceipt')}
                value={
                  !isEmpty(warehouseImportReceiptDetails?.departmentReceipt)
                    ? `${warehouseImportReceiptDetails?.departmentReceipt?.code} - ${warehouseImportReceiptDetails?.departmentReceipt?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.expenditureType')}
                value={
                  !isEmpty(warehouseImportReceiptDetails.businessType)
                    ? `${warehouseImportReceiptDetails.businessType?.code} - ${warehouseImportReceiptDetails.businessType?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.warehouse')}
                value={
                  !isEmpty(warehouseImportReceiptDetails.warehouse)
                    ? `${warehouseImportReceiptDetails.warehouse?.code} - ${warehouseImportReceiptDetails.warehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.reason')}
                value={
                  !isEmpty(warehouseImportReceiptDetails.reason)
                    ? `${warehouseImportReceiptDetails.reason?.code} - ${warehouseImportReceiptDetails.reason?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.source')}
                value={
                  !isEmpty(warehouseImportReceiptDetails.source)
                    ? `${warehouseImportReceiptDetails.source?.code} - ${warehouseImportReceiptDetails.source?.name}`
                    : ''
                }
              />
            </Grid>
            {receiptRequired && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warehouseImportReceipt.contractNumber')}
                  value={warehouseImportReceiptDetails?.contractNumber}
                />
              </Grid>
            )}
            {warehouseImportReceiptDetails?.attributes?.map((item) => {
              if (item.tableName) {
                if (item?.tableName === TABLE_NAME_ENUM.RECEIPT) {
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
                          )?.receiptNumber ||
                          warehouseImportReceiptDetails?.receiptNumber
                        }
                      />
                    </Grid>
                  )
                } else if (
                  item?.tableName === TABLE_NAME_ENUM.ORGANIZATION_PAYMENT
                ) {
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
                  item?.tableName === TABLE_NAME_ENUM.SALE_ORDER_EXPORT ||
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="explain"
              label={t('warehouseExportReceipt.explain')}
              multiline
              rows={3}
              value={warehouseImportReceiptDetails?.explanation}
              readOnly
              sx={{
                'label.MuiFormLabel-root': {
                  color: (theme) => theme.palette.subText.main,
                },
              }}
            />
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemsSettingTable
              items={
                warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots ||
                []
              }
              mode={mode}
            />
          </Box>
          <ActionBar
            // onBack={backToList}
            elBefore={
              <Button
                sx={{ mr: 'auto' }}
                color="grayF4"
                onClick={() => dowFile([{ id: id }])}
              >
                {t(`warehouseImportReceipt.dowload`)}
              </Button>
            }
          />
        </Grid>
      </Grid>
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('warehouseImportReceipt.deleteTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseImportReceipt.deleteConfirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('warehouseImportReceipt.confirmTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseImportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenCancelSyncEMSModal}
        title={t('warehouseExportReceipt.cancelSyncTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitCancelEBS}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.cancelEBS')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmEBSModal}
        title={t('warehouseImportReceipt.confirmTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        <div>{t('warehouseImportReceipt.ConfirmEBS')}</div>
        {t('warehouseImportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenRejectedModal}
        title={t('warehouseImportReceipt.rejectTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejected}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseImportReceipt.rejectConfirm')}
      </Dialog>
    </Page>
  )
}

export default WarehouseImportReceiptDetail
