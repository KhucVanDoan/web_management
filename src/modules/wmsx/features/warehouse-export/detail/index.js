import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import {
  MOVEMENT_TYPE_MAP,
  WAREHOUSE_EXPORT_STATUS_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseExport from '~/modules/wmsx/redux/hooks/useWarehouseExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemTable from '../item-table'

// import ItemsSettingTable from './items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.DETAIL.TITLE,
  },
]

const WarehouseExportDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { warehouseExportDetail, isLoading },
    actions,
  } = useWarehouseExport()

  useEffect(() => {
    if (id) {
      actions.getWarehouseExportDetailsById(id)
    }
    return () => {
      actions.resetWarehouseExportDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementCode')}
                value={warehouseExportDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementType')}
                value={t(
                  MOVEMENT_TYPE_MAP[warehouseExportDetail?.movementType],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.letterCode')}
                value={warehouseExportDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.letterType')}
                value={t(
                  WAREHOUSE_EXPORT_STATUS_MAP[
                    warehouseExportDetail?.movementType
                  ],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.warehouseCode')}
                value={warehouseExportDetail?.warehouse?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.warehouseName')}
                value={warehouseExportDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.createdUser')}
                value={warehouseExportDetail?.user?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementDate')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseExportDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.confirmDate')}
                value={convertUtcDateTimeToLocalTz(
                  warehouseExportDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('movements.importExport.description')}
                multiline
                rows={3}
                value={warehouseExportDetail?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
            {/* <Box sx={{ mt: 3 }}>
              <ItemsSettingTable items={movementDetail?.items || []} />
            </Box> */}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ItemTable items={warehouseExportDetail?.items || []} />
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportDetail
