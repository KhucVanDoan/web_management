import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { MOVEMENT_TYPE } from '~/modules/wmsx/constants'

const ItemSettingTable = ({ items, movementType }) => {
  const { t } = useTranslation(['wmsx'])
  const getRows = (items) => {
    let rows = []
    let rowSpanMatrix = []
    items?.forEach((item, index) => {
      const totalLotsInItem = item?.lots?.length
      const totalQuantityTaken = item?.lots?.reduce(
        (acc, curr) => acc + Number(curr?.quantity),
        0,
      )
      if (item?.lots.length > 0) {
        item?.lots?.forEach((lot, lotIndex) => {
          let obj = {
            index: index,
            code: item?.code,
            name: item?.name,
            itemUnit: item?.itemUnit,
            quantity: lot?.quantity,
            lotNumber: lot?.lotNumber,
            locationCode: lot?.locationCode,
            locationName: lot?.locationName,
            planQuantity:
              lot?.planQuantity > 0
                ? lot?.planQuantity - totalQuantityTaken
                : lot?.planQuantity,
          }
          if (totalLotsInItem === 1) {
            rowSpanMatrix.push([1])
          } else if (lotIndex === totalLotsInItem - 1) {
            rowSpanMatrix.push([-1, -1, -1, -1, -1, 1, 1, -1, 1])
          } else if (lotIndex === 0) {
            rowSpanMatrix.push([
              totalLotsInItem,
              totalLotsInItem,
              totalLotsInItem,
              totalLotsInItem,
              totalLotsInItem,
              1,
              1,
              totalLotsInItem,
              1,
            ])
          } else {
            rowSpanMatrix.push([-1, -1, -1, -1, -1, 1, 1, -1, 1])
          }
          rows.push(obj)
        })
      } else {
        let obj = {
          index: index,
          code: item?.code,
          name: item?.name,
          itemUnit: item?.itemUnit,
          quantity: item?.quantity,
          lotNumber: '',
          mfg: '',
          confirmedQuantity: '',
          actualQuantity: '',
        }
        rowSpanMatrix.push([1])
        rows.push(obj)
      }
    })
    return { rows, rowSpanMatrix }
  }
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (params) => {
        return params?.row?.index + 1
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
      renderCell: (params) => params.row?.lotNumber,
    },
    {
      field: 'pickedQuantity',
      headerName: t('movements.itemDetails.pickedQuantity'),
      hide:
        movementType === !MOVEMENT_TYPE.SO_EXPORT ||
        movementType === !MOVEMENT_TYPE.TRANSFER_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_IMPORT ||
        movementType === MOVEMENT_TYPE.PO_IMPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.quantity),
    },
    {
      field: 'location',
      hide:
        movementType === !MOVEMENT_TYPE.SO_EXPORT ||
        movementType === !MOVEMENT_TYPE.TRANSFER_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_IMPORT ||
        movementType === MOVEMENT_TYPE.PO_IMPORT,
      headerName:
        movementType === MOVEMENT_TYPE.TRANSFER_EXPORT ||
        movementType === MOVEMENT_TYPE.SO_EXPORT
          ? t('movements.itemDetails.locationPick')
          : t('movements.itemDetails.locationStore'),
      width: 120,
      renderCell: (params) => params.row?.locationCode,
    },
    {
      field: 'storedQuantity',
      headerName: t('movements.itemDetails.storedQuantity'),
      hide:
        movementType === MOVEMENT_TYPE.SO_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.quantity),
    },
    {
      field: 'unpickedQuantity',
      headerName: t('movements.itemDetails.unpickedQuantity'),
      hide:
        movementType === !MOVEMENT_TYPE.SO_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_IMPORT ||
        movementType === MOVEMENT_TYPE.PO_IMPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.planQuantity),
    },
    {
      field: 'location',
      hide:
        movementType === MOVEMENT_TYPE.SO_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_EXPORT,
      headerName:
        movementType === MOVEMENT_TYPE.TRANSFER_EXPORT ||
        movementType === MOVEMENT_TYPE.SO_EXPORT
          ? t('movements.itemDetails.locationPick')
          : t('movements.itemDetails.locationStore'),
      width: 120,
      renderCell: (params) => params.row?.locationCode,
    },
    {
      field: 'unstoredQuantity',
      headerName: t('movements.itemDetails.unstoredQuantity'),
      hide:
        movementType === MOVEMENT_TYPE.SO_EXPORT ||
        movementType === MOVEMENT_TYPE.TRANSFER_EXPORT,
      width: 120,
      renderCell: (params) => Number(params.row?.planQuantity),
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
        rows={getRows(items)?.rows}
        rowSpanMatrix={getRows(items).rowSpanMatrix}
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
