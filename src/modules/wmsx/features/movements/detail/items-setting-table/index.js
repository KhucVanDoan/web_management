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
      field: 'itemCode',
      headerName: t('movements.itemDetails.itemCode'),
      width: 150,
      renderCell: (params) => {
        return params.row?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('movements.itemDetails.itemName'),
      width: 120,
      renderCell: (params) => {
        return params.row?.name
      },
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
      renderCell: (params) => {
        return params.row?.lots?.[0]?.warehouse?.name
      },
    },
    {
      field: 'warehouseSectorName',
      headerName: t('movements.itemDetails.warehouseSectorName'),
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
