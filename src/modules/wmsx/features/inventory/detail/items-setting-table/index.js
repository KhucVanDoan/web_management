import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['wmsx'])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 20,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('inventories.item.code'),
      width: 120,
      renderCell: (params) => {
        return params.row?.code
      },
    },
    {
      field: 'name',
      headerName: t('inventories.item.name'),
      width: 120,
      renderCell: (params) => {
        return params.row?.name
      },
    },
    {
      field: 'itemType',
      headerName: t('inventories.item.type'),
      width: 120,
      renderCell: (params) => {
        return params.row?.itemType?.name
      },
    },
    {
      field: 'lotNumber',
      headerName: t('inventories.item.lotNumber'),
      width: 120,
      sortable: false,
    },
    {
      field: 'packageCode',
      headerName: t('inventories.item.packageCode'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params.row?.packages?.[0]?.code
      },
    },
    {
      field: 'warehouseName',
      headerName: t('inventories.item.warehouseName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.warehouseName
      },
    },
    {
      field: 'warehouseSectorName',
      headerName: t('movements.itemDetails.warehouseShelfName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.lots?.[0]?.warehouseSector?.name
      },
    },
    {
      field: 'warehouseShelfName',
      headerName: t('movements.itemDetails.warehouseShelfName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.lots?.[0]?.warehouseShelf?.name
      },
    },
    {
      field: 'warehousePalletName',
      headerName: t('movements.itemDetails.warehousePalletName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.lots?.[0]?.warehouseShelfFloor?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t('movements.itemDetails.planQuantity'),
      width: 120,
      renderCell: (params) => {
        return Number(params.row?.planQuantity)
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('movements.itemDetails.actualQuantity'),
      width: 120,
      renderCell: (params) => {
        return Number(params.row?.actualQuantity)
      },
    },
    {
      field: 'itemUnit',
      headerName: t('inventories.item.itemUnit'),
      width: 120,
      sortable: false,
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
        rows={items}
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
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
