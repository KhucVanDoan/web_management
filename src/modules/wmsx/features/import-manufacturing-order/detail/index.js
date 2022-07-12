import React, { useEffect, useMemo } from 'react'

import { Grid, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ORDER_STATUS_OPTIONS,
  ORDER_TYPE,
  QC_CHECK,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useImportManufacturingOrder from '~/modules/wmsx/redux/hooks/useImportManufacturingOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemSettingTableDetail from './item-table-detail'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
    title: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
  },
  {
    route: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.PATH,
    title: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.TITLE,
  },
]

const ImportManufacturingOrderDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { importManufacturingOrderDetails, isLoading },
    actions,
  } = useImportManufacturingOrder()

  const {
    data: { itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getImportManufacturingOrderDetailsById(id)
    return () => {
      actions.resetImportManufacturingOrder()
    }
  }, [id])

  useEffect(() => {
    commonActions.getItemQualityPoint({})
  }, [])

  const backToList = () => {
    history.push(ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH)
  }

  const items = useMemo(() => {
    const importOrderWarehouseDetails =
      importManufacturingOrderDetails?.importOrderWarehouseDetails || []
    return importManufacturingOrderDetails?.importOrderWarehouseLots?.map(
      (detailLot, index) => ({
        id: index,
        itemId: detailLot?.itemId,
        warehouseId: detailLot?.warehouseId,
        qcCheck:
          importOrderWarehouseDetails?.find(
            (detailWarehouse) =>
              detailWarehouse?.id === detailLot?.importOrderWarehouseDetailId,
          )?.qcCheck === QC_CHECK.TRUE,
        qcCriteriaId:
          importOrderWarehouseDetails?.find(
            (detailWarehouse) =>
              detailWarehouse?.id === detailLot?.importOrderWarehouseDetailId,
          )?.qcCriteriaId || null,
        qcCriteria:
          itemQualityPoint?.find(
            (quality) =>
              quality?.id ===
              importOrderWarehouseDetails?.find(
                (detailWarehouse) =>
                  detailWarehouse?.id ===
                  detailLot?.importOrderWarehouseDetailId,
              )?.qcCriteriaId,
          )?.code || '',
        actualQuantity: detailLot?.actualQuantity,
        quantity: detailLot?.quantity,
        lotNumber: detailLot?.lotNumber,
        mfg: detailLot?.mfg,
        packageId: detailLot?.packageId,
      }),
    )
  }, [importManufacturingOrderDetails, itemQualityPoint])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.importManufacturingOrderDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('importManufacturingOrder.status')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={importManufacturingOrderDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.code')}
                value={importManufacturingOrderDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.name')}
                value={importManufacturingOrderDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.requestCode')}
                value={importManufacturingOrderDetails?.request?.code || ''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.requestName')}
                value={importManufacturingOrderDetails?.request?.name || ''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.type')}
                value={t(
                  ORDER_TYPE.find(
                    (item) => item.id === importManufacturingOrderDetails.type,
                  )?.name || '',
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('importManufacturingOrder.planDate')}
                value={`${convertUtcDateTimeToLocalTz(
                  importManufacturingOrderDetails.planAt,
                )} đến ${convertUtcDateTimeToLocalTz(
                  importManufacturingOrderDetails.deadline,
                )}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('importManufacturingOrder.description')}
                multiline
                rows={3}
                value={importManufacturingOrderDetails.description}
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
        <ItemSettingTableDetail
          items={items || []}
          mode={MODAL_MODE.DETAIL}
          status={importManufacturingOrderDetails?.status}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ImportManufacturingOrderDetail
