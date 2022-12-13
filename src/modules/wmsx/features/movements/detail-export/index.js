import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { uniq, map } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import {
  DATA_TYPE,
  MOVEMENT_TYPE,
  MOVEMENT_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { getWarehouseExportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/get-details'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableDetail from '../../warehouse-export-receipt/detail/item-setting-table'
import ItemSettingTable from '../items-setting-table'

const MovementExportDetail = ({ breadcrumbs, onBack }) => {
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
  useEffect(() => {
    actions.getMovementsDetailsById(id, async (val) => {
      const res = await getWarehouseExportReceiptDetailsApi(val?.orderId)
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
                label={t('warehouseExportReceipt.receiptId')}
                value={receiptDetail.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail.receiptDate)}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.attachedFile')}
                value={receiptDetail.code}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={receiptDetail.receiver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.departmentReception')}
                value={receiptDetail?.departmentReceipt?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.typeBusiness')}
                value={receiptDetail.businessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.exportInWarehouse')}
                value={receiptDetail.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={receiptDetail.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={`02${
                  receiptDetail?.warehouse?.code
                    ? `.${receiptDetail?.warehouse?.code}`
                    : ''
                }${
                  receiptDetail?.reason?.code
                    ? `.${receiptDetail?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.number')}
                value={`03${
                  receiptDetail?.warehouse?.code
                    ? `.${receiptDetail?.warehouse?.code}`
                    : ''
                }${
                  receiptDetail?.reason?.code
                    ? `.${receiptDetail?.reason?.code}`
                    : ''
                }`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.suorceAccountant')}
                value={receiptDetail.source?.name}
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
                          (itemDetail) => `${itemDetail.id}` === item.value,
                        )?.name ||
                        attributesBusinessTypeDetails[item.tableName]?.find(
                          (itemDetail) => `${itemDetail.id}` === item.value,
                        )?.code
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
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={receiptDetail?.explaination}
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
      {movementDetail?.movementType !== MOVEMENT_TYPE.SO_EXPORT && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTableDetail
            items={receiptDetail?.saleOrderExportDetails || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )}
      {movementDetail?.movementType === MOVEMENT_TYPE.SO_EXPORT && (
        <Box sx={{ mt: 3 }}>
          <ItemSettingTable
            items={movementDetail?.items || []}
            movementType={movementDetail?.movementType}
          />
        </Box>
      )}
      <ActionBar onBack={onBack} />
    </Page>
  )
}

MovementExportDetail.defaultProps = {
  breadcrumbs: [],
}

MovementExportDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementExportDetail
