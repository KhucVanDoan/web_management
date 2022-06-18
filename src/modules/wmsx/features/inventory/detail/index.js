import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { INVENTORY_STATUS_OPTIONS } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Dialog from '~/components/Dialog'
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
  const [isOpenModal, setIsOpenModal] = useState(false)
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

  const acceptTicket = () => {
    actions.approveInventory(id, backToList, () => {
      if (Object.entries(data).length !== 0) {
        setIsOpenModal(true)
      }
    })
  }

  const {
    data: { inventoryStatisticDetail, data, isLoading },
    actions,
  } = useInventory()

  useEffect(() => {
    actions.getInventoryDetail(id)
    return () => {
      actions.resetInventoryDetailsState()
    }
  }, [id])
  const onCloseModal = () => {
    setIsOpenModal(false)
  }
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
                value={convertUtcDateToLocalTz(
                  inventoryStatisticDetail?.executionDay,
                )}
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
      <ActionBar
        onBack={backToList}
        onAccept={inventoryStatisticDetail?.status === 5 ? acceptTicket : null}
      />
      <Dialog
        open={isOpenModal}
        title={t('inventories.confirmFail')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.close')}
        noBorderBottom
      >
        {!isEmpty(data?.logVolume) && (
          <Typography variant="h4" mt={1}>
            {t('inventories.overVolumn')}
          </Typography>
        )}
        {!isEmpty(data?.logVolume) &&
          data.logVolume?.map((err) => (
            <Typography mt={1}>
              {`
               ${err.warehouseName} /
               ${err.warehouseSectorName} /
               ${err.warehouseShelfName} /
                ${err.warehouseShelfFloorName}`}
            </Typography>
          ))}
        {!isEmpty(data?.logWeight) && (
          <Typography variant="h4" mt={1}>
            {t('inventories.overWeight')}
          </Typography>
        )}
        {!isEmpty(data?.logWeight) &&
          data.logWeight?.map((err) => (
            <Typography mt={1}>
              {`
               ${err.warehouseName} /
               ${err.warehouseSectorName} /
               ${err.warehouseShelfName} /
                ${err.warehouseShelfFloorName}`}
            </Typography>
          ))}
      </Dialog>
    </Page>
  )
}

export default InventoryStatisticDetail
