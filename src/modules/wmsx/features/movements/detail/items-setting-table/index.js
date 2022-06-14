import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['wmsx'])

  const formattedItems = []

  items.forEach((item, index) => {
    formattedItems.push({
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
      formattedItems.push({
        id: formattedItems.length - index,
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

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 20,
    },
    {
      field: 'code',
      headerName: t('movements.itemDetails.itemCode'),
      width: 150,
    },
    {
      field: 'name',
      headerName: t('movements.itemDetails.itemName'),
      width: 120,
    },
    {
      field: 'itemType',
      headerName: t('movements.itemDetails.itemType'),
      width: 120,
    },
    {
      field: 'warehouseName',
      headerName: t('movements.itemDetails.warehouseName'),
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
      headerName: t('movements.itemDetails.planQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.planQuantity)
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('movements.itemDetails.actualQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.quantity)
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
          {t('movements.itemDetails.titleTable')}
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
