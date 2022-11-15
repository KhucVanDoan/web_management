import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'

const ItemSettingTable = ({ items, movementType }) => {
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
      field: 'pickedQuantity',
      headerName: t('movements.itemDetails.pickedQuantity'),
      hide: movementType === !MOVEMENT_TYPE.SO_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.quantity),
    },
    {
      field: 'storedQuantity',
      headerName: t('movements.itemDetails.storedQuantity'),
      hide: movementType === MOVEMENT_TYPE.SO_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.quantity),
    },
    {
      field: 'unpickedQuantity',
      headerName: t('movements.itemDetails.unpickedQuantity'),
      hide: movementType === !MOVEMENT_TYPE.SO_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.planQuantity),
    },
    {
      field: 'unstoredQuantity',
      headerName: t('movements.itemDetails.unstoredQuantity'),
      hide: movementType === MOVEMENT_TYPE.SO_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.lots?.[0]?.planQuantity),
    },
    {
      field: 'location',
      headerName: t('movements.itemDetails.location'),
      width: 120,
      renderCell: (params) => params.row?.lots?.[0]?.locationName,
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
}

ItemSettingTable.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingTable
