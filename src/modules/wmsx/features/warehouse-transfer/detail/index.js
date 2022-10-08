import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { TRANSFER_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'

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
  const getDataItem = () => {
    const items = []
    warehouseTransferDetails?.warehouseTransferDetailLots?.forEach((e) => {
      items.push({
        itemId: e?.item?.code,
        itemName: e?.item?.name,
        itemType: e?.item?.itemType?.name,
        lotNumber: e?.lotNumber,
        mfg: e?.mfg,
        packageId: e?.package?.code,
        planQuantity: +e?.planQuantity,
        actualQuantity: +e?.actualQuantity,
        unitType: e?.item?.itemUnit?.name,
      })
    })
    return items
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseTransfersDetails')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
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
            <Grid item lg={6} xs={12}></Grid>
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
              <LV label={t('warehouseTransfer.businessType')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.type')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.source')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.reason')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.warehouseImport')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.warehouseExport')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.receiptDate')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.receiptNo')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseTransfer.deliver')} value={''} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="explaination"
                label={t('warehouseTransfer.explaination')}
                multiline
                rows={3}
                value={warehouseTransferDetails?.description}
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
          items={getDataItem()}
          mode={mode}
          status={warehouseTransferDetails?.status}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default WarehouseTransferDetail
