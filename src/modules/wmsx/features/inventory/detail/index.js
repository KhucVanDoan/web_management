import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { INVENTORY_STATUS_OPTIONS } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const InventoryStatisticDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const { id, warehouseId } = useParams()
  const [formattedData, setFormattedData] = useState([])
  const breadcrumbs = [
    {
      title: 'warehouseManagement',
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
    data: { inventoryStatisticDetail },
    actions,
  } = useInventory()

  useEffect(() => {
    actions.getInventoryDetail({ id: id, warehouseId: warehouseId })
  }, [id])
  useEffect(() => {
    const itemIds =
      inventoryStatisticDetail?.warehouseItems?.map((item) => item.itemId) || []
    const uniqueIds = itemIds.filter(
      (item, index) => itemIds.indexOf(item) === index,
    )
    const items = []
    uniqueIds.forEach((id, index) => {
      const itemsWithIdList = inventoryStatisticDetail.warehouseItems.filter(
        (i) => i.itemId === id,
      )
      items.push({
        id: '',
        code: itemsWithIdList[0].code,
        name: itemsWithIdList[0].name,
        itemType: '',
        quantity: itemsWithIdList.reduce(
          (total, item) => total + +item.planQuantity,
          0,
        ),
        inventoriesQuantity: itemsWithIdList.reduce(
          (total, item) => total + +item.actualQuantity,
          0,
        ),
      })
      itemsWithIdList?.forEach((item) => {
        items.push({
          id: items.length - index,
          code: item?.code,
          name: item?.name,
          itemType: item?.itemType?.name,
          warehouseName: item?.warehouseName,
          warehouseSectorName: item?.warehouseSector?.name,
          warehouseShelfName: item?.warehouseShelf?.name,
          warehousePalletName: item?.warehouseShelfFloor?.name,
          lotNumber: item?.lotNumber,
          packageCode: item?.packages.map((pk) => pk.code).join(','),
          inventoriesQuantity: +item?.actualQuantity,
          quantity: +item?.planQuantity,
          itemUnitId: item?.itemUnitId,
        })
      })
    })

    setFormattedData(items)
  }, [inventoryStatisticDetail])

  const columns = [
    {
      field: 'id',
      headerName: t('inventories.item.orderNumber'),
      width: 150,
      align: 'left',
      sortable: false,
    },
    {
      field: 'code',
      headerName: t('inventories.item.code'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'name',
      headerName: t('inventories.item.name'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'itemType',
      headerName: t('inventories.item.type'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'lotNumber',
      headerName: t('inventories.item.lotNumber'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'packageCode',
      headerName: t('inventories.item.packageCode'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'warehouseName',
      headerName: t('inventories.item.warehouseName'),
      align: 'center',
      sortable: false,
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryDetail')}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            {!isNil(inventoryStatisticDetail?.status) && (
              <Grid item xs={12}>
                <LabelValue
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
              <LabelValue
                label={t('inventories.inventoryCalendar.inventoryPaperCode')}
                value={inventoryStatisticDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.inventoryCalendar.inventoryCode')}
                value={inventoryStatisticDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.inventoryCalendar.inventoryName')}
                value={inventoryStatisticDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.inventoryCalendar.planInventoryDate')}
                value={convertUtcDateToLocalTz(
                  inventoryStatisticDetail?.executionDay,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.warehouseCode')}
                value={inventoryStatisticDetail?.warehouse?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.warehouseName')}
                value={inventoryStatisticDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.createdUser')}
                value={
                  inventoryStatisticDetail?.createdByUser?.fullName ||
                  inventoryStatisticDetail?.createdByUser?.ussername
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.inventoryDate')}
                value={convertUtcDateToLocalTz(
                  inventoryStatisticDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.confirmUser')}
                value={
                  inventoryStatisticDetail?.approver?.fullName ||
                  inventoryStatisticDetail?.approver?.username
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('inventories.confirmDate')}
                value={
                  inventoryStatisticDetail?.approvedAt
                    ? convertUtcDateToLocalTz(
                        inventoryStatisticDetail?.approvedAt,
                      )
                    : convertUtcDateToLocalTz(
                        inventoryStatisticDetail?.postedAt,
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {t('inventories.itemDetails')}
        </Typography>
      </Box>
      <DataTable
        rows={formattedData}
        columns={columns}
        hideSetting
        hideFooter
      />
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InventoryStatisticDetail
