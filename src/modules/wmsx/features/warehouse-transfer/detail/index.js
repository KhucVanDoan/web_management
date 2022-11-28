import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  TRANSFER_STATUS,
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import { convertUtcDateToLocalTz } from '~/utils'
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
  const {
    data: { warehouseTransferDetails, isLoading },
    actions,
  } = useWarehouseTransfer()
  useEffect(() => {
    actions.getWarehouseTransferDetailsById(id)
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
      debitAcc: item?.debitAccount,
      actualQuantity: Number(item?.actualQuantity),
      exportedQuantity: Number(item?.exportedQuantity),
      lotNumber: item?.lotNumber,
      locator: item?.locator,
      itemName: item?.item?.name,
      itemType: item?.item?.itemType?.name,
      planExportedQuantity: item?.exportableQuantity,
      transferQuantity: +item?.planQuantity,
    }))
  const renderHeaderRight = () => {
    switch (warehouseTransferDetails?.status) {
      case TRANSFER_STATUS.CONFIRMED:
        return (
          <Guard
            code={FUNCTION_CODE.WAREHOUSE_CONFIRM_EXPORT_WAREHOUSE_TRANSFER}
          >
            <Button
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_TRANSFER.PICKUP.PATH.replace(':id', `${id}`),
                )
              }
              icon="add"
              sx={{ ml: 4 / 3 }}
            >
              {t('warehouseTransfer.pickupAndWarehouseExport')}
            </Button>
          </Guard>
        )
      case TRANSFER_STATUS.EXPORTED:
        return (
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
        )
      default:
        break
    }
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
                value={warehouseTransferDetails?.bussinessType?.name}
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.source')}
                value={`${warehouseTransferDetails?.source?.code} - ${warehouseTransferDetails?.source?.name}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.reason')}
                value={`${warehouseTransferDetails?.reason?.code} - ${warehouseTransferDetails?.reason?.name}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseImport')}
                value={warehouseTransferDetails?.destinationWarehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseExport')}
                value={warehouseTransferDetails?.sourceWarehouse?.name}
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
              <LV label={t('warehouseTransfer.receiptNo')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.deliver')}
                value={warehouseTransferDetails?.receiver}
              />
            </Grid>

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
            {t(`warehouseExportReceipt.dowload`)}
          </Button>
        }
      />
    </Page>
  )
}

export default WarehouseTransferDetail
