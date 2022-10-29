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
import useInventoryAdjust from '~/modules/wmsx/redux/hooks/useInventoryAdjust'
import { ROUTE } from '~/modules/wmsx/routes/config'

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
                  <Status options={[]} value={inventoryAdjustDetails?.status} />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.createdAt')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.createdByUser')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.confirmDate')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.confirmByUser')} value={''} />
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
              <LV label={t('inventoryAdjust.type')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.warehouse')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.departmentReceipts')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.inventoryCalendar')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.licenseDate')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.licenseNumber')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.source')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.reason')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('inventoryAdjust.attachment')} value={''} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="explanation"
                label={t('inventoryAdjust.explanation')}
                multiline
                rows={3}
                value={inventoryAdjustDetails?.explanation}
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
        <ItemSettingTable items={[]} mode={MODAL_MODE.DETAIL} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InventoryAdjustDetail
