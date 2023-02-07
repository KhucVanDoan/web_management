import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map, isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import {
  DATA_TYPE,
  MOVEMENT_TYPE_MAP,
  WAREHOUSE_TRANSFER_MAP,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { getWarehouseTransferDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-warehouse-transfer-detail'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemsSettingTable from '../items-setting-table'

const MovementTransferDetail = ({ breadcrumbs, onBack }) => {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const [receiptDetail, setReceiptDetail] = useState({})
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()
  const {
    data: { attributesBusinessTypeDetails },
    actions: useWarehouseImportReceiptAction,
  } = useWarehouseImportReceipt()
  // const formattedItem = receiptDetail?.warehouseTransferDetailLots?.map(
  //   (detail) => ({
  //     item: {
  //       name: detail?.item?.name,
  //       code: detail?.item?.code,
  //       itemUnit: detail?.item?.itemUnit?.name,
  //     },
  //     quantityRequest: Number(detail?.planQuantity),
  //     quantity: Number(detail?.exportedQuantity),
  //     actualQuantity: Number(detail?.actualQuantity),
  //     debitAccount: detail?.debitAccount,
  //     creditAccount:
  //       detail?.creditAccount ||
  //       detail?.item?.itemWarehouseSources?.find(
  //         (item) => item?.warehouseId === receiptDetail?.sourceWarehouse?.id,
  //       )?.accounting,
  //   }),
  // )
  useEffect(() => {
    actions.getMovementsDetailsById(id, async (val) => {
      const res = await getWarehouseTransferDetailsApi(val?.orderId)
      const attributes = res?.data?.attributes?.filter(
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
                value={movementDetail?.user?.fullName}
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
                value={
                  !isEmpty(receiptDetail?.bussinessType)
                    ? `${receiptDetail?.bussinessType?.code} - ${receiptDetail?.bussinessType?.name}`
                    : ''
                }
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
                value={
                  !isEmpty(receiptDetail?.source)
                    ? `${receiptDetail?.source?.code} - ${receiptDetail?.source?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.reason')}
                value={
                  !isEmpty(receiptDetail?.reason)
                    ? `${receiptDetail?.reason?.code} - ${receiptDetail?.reason?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseImport')}
                value={
                  !isEmpty(receiptDetail?.destinationWarehouse)
                    ? `${receiptDetail?.destinationWarehouse?.code} - ${receiptDetail?.destinationWarehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.warehouseExport')}
                value={
                  !isEmpty(receiptDetail?.sourceWarehouse)
                    ? `${receiptDetail?.sourceWarehouse?.code} - ${receiptDetail?.sourceWarehouse?.name}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail?.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.receiptNo')}
                value={receiptDetail?.ebsId}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseTransfer.deliver')}
                value={receiptDetail?.receiver}
              />
            </Grid>
            {receiptDetail?.attributes?.map((item) => {
              if (item.tableName) {
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
      {/* {movementDetail?.movementType === MOVEMENT_TYPE.TRANSFER_EXPORT && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTableDetail
            items={formattedItem || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )} */}

      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable
          items={movementDetail?.items || []}
          movementType={movementDetail?.movementType}
        />
      </Box>

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
