import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useConstructionManagement from '~/modules/wmsx/redux/hooks/useConstructionManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseImportReceiptDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, constructionDetails },
    actions,
  } = useConstructionManagement()

  useEffect(() => {
    actions.getConstructionDetailsById(id)
    return () => {
      actions.resetConstructionDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseImportReceiptDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={constructionDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('warehouseImportReceipt.id')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.createdAt')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.attachedFile')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.shipper')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.unit')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.expenditureType')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.warehouse')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.reason')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.source')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.project')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.task')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.project')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.task')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.receiptNo')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.suggestExport')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.explain')}
                value={constructionDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportReceipt.contractNo')}
                value={constructionDetails.code}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemsSettingTable
              items={constructionDetails?.producingSteps || []}
              mode={MODAL_MODE.DETAIL}
            />
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseImportReceiptDetail
