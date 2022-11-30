import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

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
import { getWarehouseTransferDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-warehouse-transfer-detail'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from '../../warehouse-export-receipt/detail/item-setting-table'
import ItemsSettingTable from '../items-setting-table'

const MovementTransferDetail = ({ breadcrumbs, onBack }) => {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const [receiptDetail, setReceiptDetail] = useState({})
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()
  const formattedItem = receiptDetail?.warehouseTransferDetailLots?.map(
    (detail) => ({
      item: {
        name: detail?.item?.name,
        code: detail?.item?.code,
        itemUnit: detail?.item?.itemUnit?.name,
      },
      quantityRequest: Number(detail?.planQuantity),
      quantity: Number(detail?.exportedQuantity),
      actualQuantity: Number(detail?.actualQuantity),
      debitAccount: detail?.debitAccount,
      creditAccount:
        detail?.creditAccount ||
        detail?.item?.itemWarehouseSources?.find(
          (item) => item?.warehouseId === receiptDetail?.sourceWarehouse?.id,
        )?.accounting,
    }),
  )

  useEffect(() => {
    actions.getMovementsDetailsById(id, async (val) => {
      const res = await getWarehouseTransferDetailsApi(val?.orderId)

      setReceiptDetail(res?.data)
    })
    return () => {
      actions.resetMovementsDetailsState()
    }
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={onBack}
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
                value={receiptDetail?.source?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.reason')}
                value={receiptDetail?.reason?.name}
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
                value={receiptDetail?.createdAt}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.receiptNo')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.deliver')}
                value={receiptDetail?.receiver}
              />
            </Grid>

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
          </Grid>
        </Grid>
      </Grid>
      {movementDetail?.movementType === MOVEMENT_TYPE.TRANSFER_EXPORT && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTableDetail
            items={formattedItem || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )}
      {movementDetail?.movementType === MOVEMENT_TYPE.TRANSFER_IMPORT && (
        <Box sx={{ mt: 3 }}>
          <ItemsSettingTable items={movementDetail?.items || []} />
        </Box>
      )}
      <ActionBar onBack={onBack} />
    </Page>
  )
}

MovementTransferDetail.defaultProps = {
  breadcrumbs: [],
}

MovementTransferDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementTransferDetail
