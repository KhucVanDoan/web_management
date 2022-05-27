import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { INVENTORY_STATUS_OPTIONS } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ItemsSettingTable from './items-setting-table'

const InventoryStatisticDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const breadcrumbs = [
    {
      title: 'warehouseManagement',
    },
    {
      route: ROUTE.INVENTORY.LIST.PATH,
      title: ROUTE.INVENTORY.LIST.TITLE,
    },
    {
      route: ROUTE.INVENTORY.DETAIL.PATH,
      title: ROUTE.INVENTORY.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.INVENTORY.LIST.PATH)
  }

  const {
    data: { inventoryStatisticDetail, isLoading },
    actions,
  } = useInventory()

  useEffect(() => {
    actions.getInventoryDetail(id)
    return () => {
      actions.resetInventoryDetailsState()
    }
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            {!isNil(inventoryStatisticDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('inventories.status')}
                  value={
                    <Status
                      options={INVENTORY_STATUS_OPTIONS}
                      value={inventoryStatisticDetail?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.inventoryCalendar.inventoryPaperCode')}
                value={inventoryStatisticDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.inventoryCalendar.inventoryCode')}
                value={inventoryStatisticDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.inventoryCalendar.inventoryName')}
                value={inventoryStatisticDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.inventoryCalendar.planInventoryDate')}
                value={convertUtcDateToLocalTz(
                  inventoryStatisticDetail?.executionDay,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.warehouseCode')}
                value={inventoryStatisticDetail?.warehouses
                  ?.map((w) => w?.id)
                  ?.join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.warehouseName')}
                value={inventoryStatisticDetail?.warehouses
                  ?.map((w) => w?.name)
                  ?.join('; ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.createdUser')}
                value={
                  inventoryStatisticDetail?.createdByUser?.fullName ||
                  inventoryStatisticDetail?.createdByUser?.ussername
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.inventoryDate')}
                value={convertUtcDateToLocalTz(
                  inventoryStatisticDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.confirmUser')}
                value={
                  inventoryStatisticDetail?.confirmer?.fullName ||
                  inventoryStatisticDetail?.confirmer?.username
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventories.confirmDate')}
                value={
                  inventoryStatisticDetail?.executionDay
                    ? convertUtcDateToLocalTz(
                        inventoryStatisticDetail?.executionDay,
                      )
                    : convertUtcDateToLocalTz(
                        inventoryStatisticDetail?.executionDay,
                      )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('inventories.description')}
                multiline
                value={inventoryStatisticDetail?.description}
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
        <ItemsSettingTable
          items={inventoryStatisticDetail?.warehouseItems || []}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InventoryStatisticDetail
