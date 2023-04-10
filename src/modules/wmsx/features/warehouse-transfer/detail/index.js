import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { uniq, map, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

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
  TABLE_NAME_ENUM,
  TRANSFER_STATUS,
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_MAP,
  WAREHOUSE_TRANSFER_TYPE,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import theme from '~/themes'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

import ItemSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
    title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_TRANSFER.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_TRANSFER.DETAIL.TITLE,
  },
]

const WarehouseTransferDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [isOpenConfirmEBSModal, setIsOpenConfirmEBSModal] = useState(false)
  const [isOpenCancelEBSModal, setIsOpenCancelEBSModal] = useState(false)
  const {
    data: { warehouseTransferDetails, isLoading },
    actions,
  } = useWarehouseTransfer()
  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  useEffect(() => {
    actions.getWarehouseTransferDetailsById(id, (data) => {
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
      actions.resetWarehouseTransfer()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_TRANSFER.LIST.PATH)
  }
  const getDataItem =
    warehouseTransferDetails?.warehouseTransferDetailLots?.map((item) => ({
      itemCode: {
        itemId: item?.itemId,
        id: item?.itemId,
        ...item?.item,
      },
      creditAcc:
        item?.creditAccount ||
        item?.item?.itemWarehouseSources?.find(
          (item) =>
            item?.warehouseId === warehouseTransferDetails?.sourceWarehouse?.id,
        )?.accounting,
      debitAcc: item?.debitAccount || 1519,
      actualQuantity: Number(item?.actualQuantity),
      exportedQuantity:
        warehouseTransferDetails?.type ===
        WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
          ? Number(item?.actualQuantity)
          : Number(item?.exportedQuantity),
      itemCodeWarehouseImp: Boolean(item?.isExistInDestinationWarehouse),
      storageDate: convertUtcDateToLocalTz(item?.storageDate),
      lotNumber: item?.lotNumber,
      locator: item?.locator,
      itemName: item?.item?.name,
      itemType: item?.item?.itemType?.name,
      planExportedQuantity: item?.exportableQuantity,
      transferQuantity: +item?.planQuantity,
      amount: +item?.amount,
      price: +item?.price,
    }))
  const renderHeaderRight = () => {
    const isEdit =
      warehouseTransferDetails?.status === TRANSFER_STATUS.PENDING ||
      warehouseTransferDetails?.status === TRANSFER_STATUS.CONFIRMED ||
      warehouseTransferDetails?.status === TRANSFER_STATUS.REJECTED
    const isConfirmed =
      warehouseTransferDetails?.status === TRANSFER_STATUS.PENDING
    const isRejected =
      warehouseTransferDetails?.status === TRANSFER_STATUS.PENDING
    const isDelete =
      warehouseTransferDetails?.status === TRANSFER_STATUS.PENDING ||
      warehouseTransferDetails?.status === TRANSFER_STATUS.REJECTED
    const isConfirmWarehouseTransfer =
      warehouseTransferDetails?.syncStatus ===
      STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC
    const isCancelSync =
      warehouseTransferDetails?.status === TRANSFER_STATUS.COMPLETED &&
      warehouseTransferDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR
    return (
      <>
        {isRejected && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_REJECT_WAREHOUSE_TRANSFER}>
            <Button
              onClick={() => setIsOpenRejectModal(true)}
              sx={{
                ml: 4 / 3,
                borderColor: theme.palette.borderButtonRemove,
                color: theme.palette.borderButtonRemove,
              }}
              variant="outlined"
              // icon="add"
            >
              {t('warehouseTransfer.rejected')}
            </Button>
          </Guard>
        )}
        {isConfirmed && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_CONFIRM_WAREHOUSE_TRANSFER}>
            <Button
              onClick={() => setIsOpenConfirmModal(true)}
              sx={{
                ml: 4 / 3,
              }}

              // icon="add"
            >
              {t('warehouseTransfer.confirmed')}
            </Button>
          </Guard>
        )}
        {isDelete && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_DELETE_WAREHOUSE_TRANSFER}>
            <Button
              onClick={() => setIsOpenDeleteModal(true)}
              sx={{
                ml: 4 / 3,
              }}
              color="error"
              // icon="add"
            >
              {t('warehouseTransfer.deleted')}
            </Button>
          </Guard>
        )}
        {isEdit && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE_TRANSFER}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_TRANSFER.EDIT.PATH.replace(':id', `${id}`),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseTransfer.update')}
            </Button>
          </Guard>
        )}

        {isConfirmWarehouseTransfer && (
          <Guard code={FUNCTION_CODE.SALE_SYNC_PURCHASED_ORDER_IMPORT_TO_EBS}>
            <Button
              onClick={() => setIsOpenConfirmEBSModal(true)}
              sx={{
                ml: 4 / 3,
              }}
              // icon="add"
            >
              {t('warehouseTransfer.confirmWarehouseExport')}
            </Button>
          </Guard>
        )}
        {isCancelSync && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_CANCEL_SYNC_WAREHOUSE_TRANSFER}>
            <Button
              onClick={() => setIsOpenCancelEBSModal(true)}
              sx={{
                ml: 4 / 3,
                borderColor: theme.palette.borderButtonRemove,
                color: theme.palette.borderButtonRemove,
              }}
              // icon="add"
              variant="outlined"
            >
              {t('warehouseTransfer.cancelEbs')}
            </Button>
          </Guard>
        )}
        {warehouseTransferDetails?.status === TRANSFER_STATUS.CONFIRMED && (
          <>
            <Guard code={FUNCTION_CODE.WAREHOUSE_RETURN_WAREHOUSE_TRANSFER}>
              <Button
                onClick={() =>
                  actions.returnWarehouseTransferById(
                    warehouseTransferDetails?.id,
                    () => {
                      window.location.reload()
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
            <Guard
              code={FUNCTION_CODE.WAREHOUSE_CONFIRM_EXPORT_WAREHOUSE_TRANSFER}
            >
              <Button
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_TRANSFER.PICKUP.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
                icon="add"
                sx={{ ml: 4 / 3 }}
              >
                {t('warehouseTransfer.pickupAndWarehouseExport')}
              </Button>
            </Guard>
          </>
        )}
        {warehouseTransferDetails?.status === TRANSFER_STATUS.EXPORTED && (
          <Guard
            code={FUNCTION_CODE.WAREHOUSE_CONFIRM_IMPORT_WAREHOUSE_TRANSFER}
          >
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_TRANSFER.RECEIVE.PATH.replace(':id', `${id}`),
                )
              }
              icon="add"
              sx={{ ml: 4 / 3 }}
            >
              {t('warehouseTransfer.receiveAndStored')}
            </Button>
          </Guard>
        )}
      </>
    )
  }
  const dowFile = async (params) => {
    const uri = `/v1/warehouses/transfers/export-warehouse-transfer/${params}?type=1`
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

  const onSubmitDelete = () => {
    actions.deleteWarehouseTransfer(warehouseTransferDetails?.id, () => {
      window.location.reload()
    })
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseTransferById(warehouseTransferDetails?.id, () => {
      window.location.reload()
    })
    setIsOpenConfirmModal(false)
  }
  const onSubmitConfirmEBS = () => {
    actions.confirmWarehouseTransferEBS(warehouseTransferDetails?.id, () => {
      window.location.reload()
    })
    setIsOpenConfirmEBSModal(false)
  }

  const submitReject = () => {
    actions.rejectWarehouseTransferById(warehouseTransferDetails?.id, () => {
      window.location.reload()
    })
    setIsOpenRejectModal(false)
  }
  const onSubmitCancelEBS = () => {
    actions.cancelWarehouseTransferEBS(warehouseTransferDetails?.id, () => {
      window.location.reload()
    })
    setIsOpenCancelEBSModal(false)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseTransfersDetails')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('warehouseTransfer.status')}
                value={
                  <Status
                    options={TRANSFER_STATUS_OPTIONS}
                    value={warehouseTransferDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.code')}
                value={warehouseTransferDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.name')}
                value={warehouseTransferDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.businessType')}
                value={
                  !isEmpty(warehouseTransferDetails?.bussinessType)
                    ? `${warehouseTransferDetails?.bussinessType?.code} - ${warehouseTransferDetails?.bussinessType?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.type')}
                value={t(
                  `${WAREHOUSE_TRANSFER_MAP[warehouseTransferDetails?.type]}`,
                )}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.source')}
                value={
                  !isEmpty(warehouseTransferDetails?.source)
                    ? `${warehouseTransferDetails?.source?.code} - ${warehouseTransferDetails?.source?.name}`
                    : ''
                }
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.reason')}
                value={
                  !isEmpty(warehouseTransferDetails?.reason)
                    ? `${warehouseTransferDetails?.reason?.code} - ${warehouseTransferDetails?.reason?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseImport')}
                value={
                  !isEmpty(warehouseTransferDetails?.destinationWarehouse)
                    ? `${warehouseTransferDetails?.destinationWarehouse?.code} - ${warehouseTransferDetails?.destinationWarehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseExport')}
                value={
                  !isEmpty(warehouseTransferDetails?.sourceWarehouse)
                    ? `${warehouseTransferDetails?.sourceWarehouse?.code} - ${warehouseTransferDetails?.sourceWarehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.createdAt')}
                value={convertUtcDateToLocalTz(
                  warehouseTransferDetails?.receiptDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.receiptDate')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseTransferDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.createdByUser')}
                value={warehouseTransferDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.receiptNo')}
                value={warehouseTransferDetails?.ebsId}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.deliver')}
                value={warehouseTransferDetails?.receiver}
              />
            </Grid>
            {warehouseTransferDetails?.attributes?.map((item) => {
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
                name="explaination"
                label={t('warehouseTransfer.explaination')}
                multiline
                rows={3}
                value={warehouseTransferDetails?.explanation}
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
          items={getDataItem}
          mode={mode}
          status={warehouseTransferDetails?.status}
          type={warehouseTransferDetails?.type}
        />
      </Box>
      <ActionBar
        onBack={backToList}
        elBefore={
          <Button
            sx={{ mr: 'auto' }}
            color="grayF4"
            onClick={() => dowFile(id)}
          >
            {t(`warehouseTransfer.dowload`)}
          </Button>
        }
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('warehouseTransfer.deleteTitlePopup')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseTransfer.deleteConfirm')}
        <LV
          label={t('warehouseTransfer.code')}
          value={warehouseTransferDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={warehouseTransferDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('warehouseTransfer.code')}
          value={warehouseTransferDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={warehouseTransferDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmEBSModal}
        title={t('warehouseTransfer.confirmTitlePopupEBS')}
        onCancel={() => setIsOpenConfirmEBSModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        <div>{t('warehouseTransfer.ConfirmEBS')}</div>
        {t('warehouseTransfer.Confirm')}
      </Dialog>
      <Dialog
        open={isOpenRejectModal}
        title={t('general:common.reject')}
        onCancel={() => setIsOpenRejectModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        submitProps={{
          color: 'error',
        }}
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('warehouseTransfer.code')}
          value={warehouseTransferDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={warehouseTransferDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenCancelEBSModal}
        title={t('warehouseTransfer.cancelSyncTitlePopupEBS')}
        onCancel={() => setIsOpenCancelEBSModal(false)}
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
    </Page>
  )
}

export default WarehouseTransferDetail
