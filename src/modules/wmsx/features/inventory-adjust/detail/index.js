import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  INVENTORY_ADJUST_STATUS_OPTIONS,
  INVENTORY_ADJUST_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useInventoryAdjust from '~/modules/wmsx/redux/hooks/useInventoryAdjust'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTable from '../form/item-setting-table'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_ADJUST.LIST.PATH,
    title: ROUTE.INVENTORY_ADJUST.LIST.TITLE,
  },
  {
    route: ROUTE.INVENTORY_ADJUST.DETAIL.PATH,
    title: ROUTE.INVENTORY_ADJUST.DETAIL.TITLE,
  },
]

const InventoryAdjustDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { inventoryAdjustDetails, isLoading },
    actions,
  } = useInventoryAdjust()

  useEffect(() => {
    actions.getInventoryAdjustDetailsById(id)
    return () => {
      actions.resetInventoryAdjust()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.INVENTORY_ADJUST.LIST.PATH)
  }
  const items = inventoryAdjustDetails?.items?.map((item) => ({
    itemCode: item?.item,
    lotNumber: item?.lotNumber,
    itemName: item?.item?.name,
    itemUnit: item?.item?.unitName,
    locator: item?.locator,
    quantity: item?.quantity,
    price: item?.price,
    amount: item?.amount,
    debitAccount: item?.debitAccount,
    creditAccount: item?.creditAccount,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryAdjustDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('inventoryAdjust.status')}
                value={
                  <Status
                    options={INVENTORY_ADJUST_STATUS_OPTIONS}
                    value={inventoryAdjustDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.createdAt')}
                value={convertUtcDateToLocalTz(
                  inventoryAdjustDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.createdByUser')}
                value={inventoryAdjustDetails.createdBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.confirmDate')}
                value={convertUtcDateToLocalTz(
                  inventoryAdjustDetails?.confirmedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.confirmByUser')}
                value={inventoryAdjustDetails?.confirmedBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.code')}
                value={inventoryAdjustDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.name')}
                value={inventoryAdjustDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.type')}
                value={t(
                  `${INVENTORY_ADJUST_TYPE_MAP[inventoryAdjustDetails.type]}`,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.warehouse')}
                value={inventoryAdjustDetails?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.departmentReceipts')}
                value={inventoryAdjustDetails?.departmentReceipt?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.inventoryCalendar')}
                value={inventoryAdjustDetails.inventory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.licenseDate')}
                value={convertUtcDateToLocalTz(
                  inventoryAdjustDetails?.receiptDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.licenseNumber')}
                value={inventoryAdjustDetails?.receiptNumber}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.source')}
                value={inventoryAdjustDetails?.source?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.reason')}
                value={inventoryAdjustDetails?.reason?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryAdjust.attachment')}
                value={inventoryAdjustDetails?.attachment}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="explanation"
                label={t('inventoryAdjust.explanation')}
                multiline
                rows={3}
                value={inventoryAdjustDetails?.explaination}
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
          items={items}
          mode={MODAL_MODE.DETAIL}
          type={inventoryAdjustDetails.type}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InventoryAdjustDetail
