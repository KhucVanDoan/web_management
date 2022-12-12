import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
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
      renderCell: (params) => {
        return params?.row?.lots[0]?.lotNumber
      },
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
        return Number(params.row?.lots[0]?.planQuantity)
      },
    },
    {
      field: 'location',
      headerName:
        (movementType === MOVEMENT_TYPE.SO_EXPORT ||
          movementType === MOVEMENT_TYPE.TRANSFER_EXPORT ||
          movementType === MOVEMENT_TYPE.SWIFT_FLOOR_EXPORT) &&
        t('movements.itemDetails.locationPick'),
      width: 120,
      renderCell: (params) => {
        return params?.row?.lots[0]?.locationCode
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

export default ItemSettingTable
