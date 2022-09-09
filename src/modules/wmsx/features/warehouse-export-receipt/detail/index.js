import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTableDetail from './item-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseExportReceiptDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()

  useEffect(() => {
    actions.getWarehouseExportReceiptDetailsById(id)
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.WarehouseExportReceiptDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.createdAt')}
                value={warehouseExportReceiptDetails?.createdAt}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportProposalCode')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.nameOfReceiver')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseExportReceipt.address')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.exportInWarehouse')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.accountingAccountCode')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReason')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseExportReceipt')}
                value={''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseExportReceipt.number')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseExportReceipt.category')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('warehouseExportReceipt.construction')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportReceipt.warehouseImportReceipt')}
                value={''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="explain"
                label={t('warehouseExportReceipt.explain')}
                multiline
                rows={3}
                value={warehouseExportReceiptDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemSettingTableDetail items={[]} mode={mode} />
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptDetail
