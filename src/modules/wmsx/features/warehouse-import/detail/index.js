import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
// import Status from '~/components/Status'
import {
  MOVEMENT_ORDER_TYPE_MAP,
  MOVEMENT_TYPE_MAP,
  // ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemsSettingTable from './items-setting-table'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT.DETAIL.TITLE,
  },
]

const WarehouseImportDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()

  useEffect(() => {
    actions.getMovementsDetailsById(id)
    return () => {
      actions.resetMovementsDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT.LIST.PATH)
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
            {/* <Grid item xs={12}>
              <LV
                label={t('movements.movementStatus')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={Number(movementDetail?.status)}
                  />
                }
              />
            </Grid> */}
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
                label={t('warehouseImport.code')}
                value={movementDetail?.order?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.formNumber')}
                value={t(MOVEMENT_ORDER_TYPE_MAP[movementDetail?.movementType])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImport.warehouseName')}
                value={movementDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={6} />
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.createdUser')}
                value={movementDetail?.user?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementDate')}
                value={convertUtcDateTimeToLocalTz(movementDetail?.createdAt)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable items={movementDetail?.items || []} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default WarehouseImportDetail
