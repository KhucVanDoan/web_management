import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ORDER_STATUS_SO_EXPORT_OPTIONS,
  QC_CHECK,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useSOExport from '~/modules/wmsx/redux/hooks/useSOExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import TableDetail from './table'
const breadcrumbs = [
  {
    title: ROUTE.ORDER_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.SO_EXPORT.LIST.PATH,
    title: ROUTE.SO_EXPORT.LIST.TITLE,
  },
  {
    route: ROUTE.SO_EXPORT.DETAIL.PATH,
    title: ROUTE.SO_EXPORT.DETAIL.TITLE,
  },
]
function SOExportDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, soExportDetails },
    actions,
  } = useSOExport()
  const {
    data: { itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()
  useEffect(() => {
    actions.getSOExportDetailsById(id)
    commonActions.getItemQualityPoint()
    return () => actions.resetSOExportState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.SO_EXPORT.LIST.PATH)
  }

  const cloneSOExportWarehouseLots = cloneDeep(
    soExportDetails?.saleOrderExportWarehouseLots,
  )
  const items = cloneSOExportWarehouseLots?.map((detailLot, index) => ({
    id: index,
    itemId: detailLot?.itemId,
    warehouseId: detailLot?.warehouseId,
    actualQuantity: detailLot?.actualQuantity,
    confirmQuantity: detailLot?.confirmQuantity,
    collectedQuantity: detailLot?.collectedQuantity,
    quantity: detailLot?.quantity,
    qcCheck:
      soExportDetails?.saleOrderExportWarehouseDetails?.find(
        (detail) => detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
      )?.qcCheck === QC_CHECK.TRUE,
    qcCriteriaId: soExportDetails?.saleOrderExportWarehouseDetails?.find(
      (detail) => detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
    )?.qcCriteriaId,
    qcCriteria: itemQualityPoint?.find(
      (quality) =>
        quality?.id ===
        soExportDetails?.saleOrderExportWarehouseDetails?.find(
          (detail) =>
            detail?.id === detailLot?.saleOrderExportWarehouseDetailId,
        )?.qcCriteriaId,
    )?.code,
    lotNumber: detailLot?.lotNumber,
    mfg: convertUtcDateToLocalTz(detailLot?.mfg),
    packageId: detailLot?.packageId,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.SO_EXPORT.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LabelValue
                label={t('soExport.status')}
                value={
                  <Status
                    options={ORDER_STATUS_SO_EXPORT_OPTIONS}
                    value={soExportDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.code')}
                value={soExportDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.name')}
                value={soExportDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.soCode')}
                value={soExportDetails?.saleOrder?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.soName')}
                value={soExportDetails?.saleOrder?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.exportWarehouse')}
                value={soExportDetails?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.deliveryDate')}
                value={convertUtcDateToLocalTz(soExportDetails?.deliveredAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.createdByUser')}
                value={soExportDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.createdAt')}
                value={convertUtcDateToLocalTz(soExportDetails?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.approver')}
                value={soExportDetails?.approver?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('soExport.approvedAt')}
                value={convertUtcDateToLocalTz(soExportDetails?.approvedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12} sx={{ mt: 1 }}>
              <Typography variant="h4">{t('soExport.vendor.title')}</Typography>
              <LabelValue
                label={t('soExport.vendor.companyName')}
                value={soExportDetails?.company?.name}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.vendor.address')}
                value={soExportDetails?.company?.address}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.vendor.phone')}
                value={soExportDetails?.company?.phone}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.vendor.email')}
                value={soExportDetails?.company?.email}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.vendor.fax')}
                value={soExportDetails?.company?.fax}
                mt={4 / 3}
              />
            </Grid>
            <Grid item lg={6} xs={12} sx={{ mt: 1 }}>
              <Typography variant="h4">
                {t('soExport.customer.title')}
              </Typography>
              <LabelValue
                label={t('soExport.customer.name')}
                value={soExportDetails?.customer?.name}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.customer.address')}
                value={soExportDetails?.customer?.address}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.customer.phone')}
                value={soExportDetails?.customer?.phone}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.customer.email')}
                value={soExportDetails?.customer?.email}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.customer.fax')}
                value={soExportDetails?.customer?.fax}
                mt={4 / 3}
              />
              <LabelValue
                label={t('soExport.orderedAt')}
                value={convertUtcDateToLocalTz(soExportDetails?.orderedAt)}
                mt={4 / 3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('soExport.description')}
                multiline
                value={soExportDetails?.description}
                rows={3}
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
        <TableDetail items={items || []} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default SOExportDetail
