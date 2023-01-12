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
  TABLE_NAME_ENUM,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { getWarehouseImportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemsSettingTable from '../../warehouse-import-receipt/form/items-setting-table'
import ItemSettingTable from '../items-setting-table'

const MovementImportDetail = ({ breadcrumbs, onBack }) => {
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
      const res = await getWarehouseImportReceiptDetailsApi(val?.orderId)
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
  const receiptRequired = receiptDetail?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
  )
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
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={receiptDetail.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdAt')}
                value={convertUtcDateToLocalTz(receiptDetail.receiptDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.attachedFile')}
                value={receiptDetail.attachment?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.shipper')}
                value={receiptDetail.deliver}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.unit')}
                value={receiptDetail?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.expenditureType')}
                value={receiptDetail.businessType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.warehouse')}
                value={receiptDetail.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.reason')}
                value={receiptDetail.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.source')}
                value={receiptDetail.source?.name}
              />
            </Grid>
            {receiptRequired && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warehouseImportReceipt.contractNumber')}
                  value={receiptDetail?.contractNumber}
                />
              </Grid>
            )}
            {receiptDetail?.attributes?.map((item) => {
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
                          )?.code ||
                          receiptDetail?.receiptNumber
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
                            (itemDetail) => `${itemDetail.id}` === item.value,
                          )?.name ||
                          attributesBusinessTypeDetails[item.tableName]?.find(
                            (itemDetail) => `${itemDetail.id}` === item.value,
                          )?.code
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
      {movementDetail?.movementType === MOVEMENT_TYPE.PO_IMPORT_RECEIVE && (
        <Box sx={{ mt: 3 }}>
          <ItemsSettingTable
            items={receiptDetail?.purchasedOrderImportDetails || []}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      )}
      {movementDetail?.movementType === MOVEMENT_TYPE.PO_IMPORT && (
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

MovementImportDetail.defaultProps = {
  breadcrumbs: [],
}

MovementImportDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementImportDetail
