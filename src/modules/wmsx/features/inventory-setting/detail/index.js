import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useInventorySetting from '~/modules/wmsx/redux/hooks/useInventorySetting'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_SETTING.LIST.PATH,
    title: ROUTE.INVENTORY_SETTING.LIST.TITLE,
  },
  {
    route: ROUTE.INVENTORY_SETTING.DETAIL.PATH,
    title: ROUTE.INVENTORY_SETTING.DETAIL.TITLE,
  },
]

function InventorySettingDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, inventorySettingDetail },
    actions,
  } = useInventorySetting()

  useEffect(() => {
    actions.getDetailInventorySettingById(id)
    return () => {
      actions.resetInventorySettingState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.INVENTORY_SETTING.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventorySettingDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.warehouseCode')}
                value={inventorySettingDetail?.warehouse?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.warehouseName')}
                value={inventorySettingDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.itemCode')}
                value={inventorySettingDetail?.item?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.itemName')}
                value={inventorySettingDetail?.item?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.unit')}
                value={inventorySettingDetail?.itemUnit?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.inventoryLimit')}
                value={inventorySettingDetail?.inventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.minInventoryLimit')}
                value={inventorySettingDetail?.minInventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.maxInventoryLimit')}
                value={inventorySettingDetail?.maxInventoryLimit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.reorderPoint')}
                value={inventorySettingDetail?.reorderPoint}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.eoq')}
                value={inventorySettingDetail?.eoq}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventorySetting.leadtime')}
                value={inventorySettingDetail?.leadtime}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default InventorySettingDetail
