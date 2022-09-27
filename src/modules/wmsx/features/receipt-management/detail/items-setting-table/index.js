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
        planQuantity: lot?.planQuantity || item?.planQuantity,
      })
    })
  })

  const columns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
    },
    {
      field: 'code',
      headerName: t('movements.itemDetails.itemCode'),
      width: 120,
    },
    {
      field: 'name',
      headerName: t('movements.itemDetails.itemName'),
      width: 120,
    },
    {
      field: 'lotNumber',
      headerName: t('movements.itemDetails.lotNumber'),
      width: 120,
    },
    {
      field: 'locationCode',
      headerName: t('movements.itemDetails.locationCode'),
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
      field: 'receiveQuantity',
      headerName: t('movements.itemDetails.receiveQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'storedQuantity',
      headerName: t('movements.itemDetails.storedQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'unstoredQuantity',
      headerName: t('movements.itemDetails.unstoredQuantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'unit',
      headerName: t('movements.itemDetails.unit'),
      width: 120,
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
