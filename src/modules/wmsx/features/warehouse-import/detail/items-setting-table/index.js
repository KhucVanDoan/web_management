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
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
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
      field: 'itemUnit',
      headerName: t('movements.itemDetails.unit'),
      width: 120,
    },
    {
      field: 'lotNumber',
      headerName: t('movements.itemDetails.lotNumber'),
      width: 120,
      renderCell: (params) => params.row?.lots?.[0]?.lotNumber,
    },
    {
      field: 'storedQuantity',
      headerName: t('movements.itemDetails.storedQuantity'),
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.quantity),
    },
    {
      field: 'unstoredQuantity',
      headerName: t('movements.itemDetails.unstoredQuantity'),
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.planQuantity),
    },
    {
      field: 'location',
      headerName: t('movements.itemDetails.location'),
      width: 120,
      renderCell: (params) => params.row?.lots?.[0]?.locationCode,
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

ItemSettingTable.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingTable
