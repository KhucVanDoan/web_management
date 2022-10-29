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
      field: 'unit',
      headerName: t('movements.itemDetails.unit'),
      width: 120,
    },
    {
      field: 'lotNumber',
      headerName: t('movements.itemDetails.lotNumber'),
      width: 120,
    },
    {
      field: 'pickedQuantity',
      headerName: t('movements.itemDetails.pickedQuantity'),
      width: 120,
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'unpickedQuantity',
      headerName: t('movements.itemDetails.unpickedQuantity'),
      width: 120,
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'location',
      headerName: t('movements.itemDetails.location'),
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
        rows={[]}
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
