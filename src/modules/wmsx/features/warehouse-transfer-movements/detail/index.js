import { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import {
  MOVEMENT_STATUS,
  MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT,
} from '~/modules/wmsx/constants'
import useWarehouseTransferMovements from '~/modules/wmsx/redux/hooks/useWarehouseTransferMovements'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.TITLE,
  },
]
function WarehouseTransferMovementsDetail() {
  const history = useHistory()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])

  const {
    data: { warehouseTransferMovementDetail, isLoading },
    actions,
  } = useWarehouseTransferMovements()

  const {
    data: { factoryList },
    actions: actionFactory,
  } = useDefineFactory()

  useEffect(() => {
    if (id) {
      actions.getWarehouseTransferMovementsDetailsById(id)
      actionFactory.searchFactories({ isGetAll: 1 })
    }
    return () => {
      actions.resetWarehouseTransferMovementsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.PATH)
  }

  const itemsColumns = [
    {
      field: 'id',
      headerName: t('warehouseTransferMovement.item.orderNumber'),
    },
    {
      field: 'code',
      width: 150,
      headerName: t('warehouseTransferMovement.item.code'),
    },
    {
      field: 'name',
      width: 150,
      headerName: t('warehouseTransferMovement.item.name'),
    },
    {
      field: 'itemType',
      width: 150,
      headerName: t('warehouseTransferMovement.item.type'),
    },
    {
      field: 'lotNumber',
      width: 150,
      headerName: t('warehouseTransferMovement.item.lotNumber'),
    },
    {
      field: 'packageCode',
      width: 150,
      headerName: t('warehouseTransferMovement.item.packageCode'),
    },
    {
      field: 'warehouseName',
      width: 150,
      headerName: t('warehouseTransferMovement.item.warehouseName'),
    },
    // {
    //   field: 'warehouseSectorName',
    //headerName: t('general.warehouseSectorName'),
    // },
    // {
    // width: 150,
    //   field: 'warehouseShelfName',
    //
    //headerName: t('general.warehouseShelfName'),
    // },
    // {
    //   field: 'warehousePalletName',
    //    headerName: t('general.warehousePalletName'),
    // },
    {
      field: 'planQuantity',
      width: 150,
      headerName: t('warehouseTransferMovement.item.quantity'),
    },
    {
      field: 'quantity',
      width: 150,
      headerName: t('warehouseTransferMovement.item.movementQuantity'),
    },
  ]

  const dataItems = useMemo(() => {
    const items = []

    warehouseTransferMovementDetail?.items?.forEach((item, index) => {
      items.push({
        id: '',
        code: item?.code,
        name: item?.name,
        itemType: '',
        warehouseName: '',
        warehouseSectorName: '',
        warehouseShelfName: '',
        warehousePalletName: '',
        lotNumber: '',
        packageCode: '',
        quantity: +item?.quantity,
        planQuantity: +item?.planQuantity,
      })
      item.lots.forEach((lot) => {
        items.push({
          id: items.length - index,
          code: item?.code,
          name: item?.name,
          itemType: item?.itemType,
          warehouseName: lot.warehouse?.name,
          warehouseSectorName: lot.warehouseSector?.name,
          warehouseShelfName: lot.warehouseShelf?.name,
          warehousePalletName: lot.warehouseShelfFloor?.name,
          lotNumber: lot.lotNumber,
          packageCode: item?.packages?.map((pk) => pk.code).join(','),
          quantity: +lot?.quantity,
          planQuantity: +lot?.planQuantity || +item?.planQuantity,
        })
      })
    })
    return items
  }, [warehouseTransferMovementDetail])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseTransferMovementDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            {!isNil(warehouseTransferMovementDetail?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('warehouseTransferMovement.status')}
                  value={
                    <Status
                      options={MOVEMENT_STATUS}
                      value={+warehouseTransferMovementDetail?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.calendar.code')}
                value={warehouseTransferMovementDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.calendar.type')}
                value={
                  warehouseTransferMovementDetail?.movementType
                    ? t(
                        MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT[
                          warehouseTransferMovementDetail.movementType
                        ],
                      )
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.calendar.inventoryCode')}
                value={warehouseTransferMovementDetail?.order?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12} />
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t(
                  'warehouseTransferMovement.calendar.sourceFactoryName',
                )}
                value={
                  factoryList?.find(
                    (f) =>
                      f.id ===
                      warehouseTransferMovementDetail?.order?.sourceWarehouse
                        ?.factoryId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t(
                  'warehouseTransferMovement.calendar.destinationFactoryName',
                )}
                value={
                  factoryList?.find(
                    (f) =>
                      f.id ===
                      warehouseTransferMovementDetail?.order?.sourceWarehouse
                        ?.factoryId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t(
                  'warehouseTransferMovement.calendar.sourceWarehouseName',
                )}
                value={
                  warehouseTransferMovementDetail?.order?.sourceWarehouse?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t(
                  'warehouseTransferMovement.calendar.destinationWarehouseName',
                )}
                value={
                  warehouseTransferMovementDetail?.order?.destinationWarehouse
                    ?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.createdByUser')}
                value={warehouseTransferMovementDetail?.user?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.movementDate')}
                value={convertUtcDateToLocalTz(
                  warehouseTransferMovementDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.confirmUser')}
                value={warehouseTransferMovementDetail?.user?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseTransferMovement.confirmDate')}
                value={convertUtcDateToLocalTz(
                  warehouseTransferMovementDetail?.postedAt,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseTransferMovement.description')}
                placeholder={t('warehouseTransferMovement.description')}
                multiline
                readOnly
                rows={3}
                value={warehouseTransferMovementDetail?.description}
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('warehouseTransferMovement.itemDetails')}
        </Typography>
        <DataTable
          rows={dataItems || []}
          columns={itemsColumns}
          striped={false}
          hideSetting
          hideFooter
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default WarehouseTransferMovementsDetail
