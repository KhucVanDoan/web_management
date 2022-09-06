import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTIVE_STATUS_OPTIONS,
  WAREHOUSE_LOT_TYPE_MAP,
  WAREHOUSE_NATURE_MAP,
  WAREHOUSE_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
    title: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
    title: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
  },
]

function DefineWarehouseDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, warehouseDetails },
    actions,
  } = useDefineWarehouse()

  useEffect(() => {
    actions.getWarehouseDetailsById(id)
    return () => {
      actions.resetWarehouseDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_WAREHOUSE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehouseDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineWarehouse.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={warehouseDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.code')}
                value={warehouseDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.name')}
                value={warehouseDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.companyCode')}
                value={warehouseDetails?.oompany?.code || ''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.type')}
                value={t(WAREHOUSE_TYPE_MAP[warehouseDetails?.type])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.nature')}
                value={t(WAREHOUSE_NATURE_MAP[warehouseDetails?.nature])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineWarehouse.lotManagement')}
                value={t(
                  WAREHOUSE_LOT_TYPE_MAP[warehouseDetails?.lotManagement],
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineWarehouse.description')}
                multiline
                rows={3}
                value={warehouseDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>

          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineWarehouseDetail
