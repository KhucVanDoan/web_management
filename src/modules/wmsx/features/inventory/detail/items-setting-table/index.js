import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['wmsx'])

  const {
    data: { itemUnitList },
    actions,
  } = useItemUnit()

  useEffect(() => {
    actions.searchItemUnits({ isGetAll: 1 })
  }, [])

  const itemIds = items?.map((item) => item.itemId) || []
  const uniqueIds = itemIds.filter(
    (item, index) => itemIds.indexOf(item) === index,
  )

  const formattedItems = []

  uniqueIds.forEach((id, index) => {
    const itemsWithIdList = items.filter((i) => i.itemId === id)
    formattedItems.push({
      id: '',
      code: itemsWithIdList[0].code,
      name: itemsWithIdList[0].name,
      itemType: '',
      planQuantity: itemsWithIdList.reduce(
        (total, item) => total + +item.planQuantity,
        0,
      ),
      inventoriesQuantity: itemsWithIdList.reduce(
        (total, item) => total + +item.actualQuantity,
        0,
      ),
    })
    itemsWithIdList?.forEach((item) => {
      formattedItems.push({
        id: formattedItems.length - index,
        code: item?.code,
        name: item?.name,
        itemType: item?.name,
        warehouseName: item?.warehouseName,
        warehouseSectorName: item?.warehouseSector?.name,
        warehouseShelfName: item?.warehouseShelf?.name,
        warehousePalletName: item?.warehouseShelfFloor?.name,
        lotNumber: item?.lotNumber,
        packageCode: item?.packages?.map((pk) => pk.code).join(','),
        inventoriesQuantity: +item?.actualQuantity,
        planQuantity: +item?.planQuantity,
        itemUnitId: item?.itemUnitId,
      })
    })
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 20,
    },
    {
      field: 'code',
      headerName: t('inventories.item.code'),
      width: 120,
    },
    {
      field: 'name',
      headerName: t('inventories.item.name'),
      width: 120,
    },
    {
      field: 'itemType',
      headerName: t('inventories.item.type'),
      width: 120,
    },
    {
      field: 'lotNumber',
      headerName: t('inventories.item.lotNumber'),
      width: 120,
    },
    {
      field: 'packageCode',
      headerName: t('inventories.item.packageCode'),
      width: 120,
    },
    {
      field: 'warehouseName',
      headerName: t('inventories.item.warehouseName'),
      width: 120,
    },
    {
      field: 'warehouseSectorName',
      headerName: t('movements.itemDetails.warehouseSectorName'),
      width: 120,
    },
    {
      field: 'warehouseShelfName',
      headerName: t('movements.itemDetails.warehouseShelfName'),
      width: 120,
    },
    {
      field: 'warehousePalletName',
      headerName: t('movements.itemDetails.warehousePalletName'),
      width: 120,
    },
    {
      field: 'planQuantity',
      headerName: t('inventories.item.quantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.planQuantity)
      },
    },
    {
      field: 'inventoriesQuantity',
      headerName: t('inventories.item.inventoriesQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.inventoriesQuantity)
      },
    },
    {
      field: 'itemUnitId',
      headerName: t('inventories.item.itemUnit'),
      width: 120,
      renderCell: (params) => {
        return itemUnitList.find((item) => item.id === params.row.itemUnitId)
          ?.name
      },
    },
  ]

  return (
    <>
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
        rows={formattedItems}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
}

ItemSettingTable.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingTable
