import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import NumberFormatText from '~/components/NumberFormat'
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
              item?.planQuantity > 0
                ? (item?.planQuantity - totalQuantityTaken).toFixed(2)
                : item?.planQuantity,
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
      field: 'storedQuantity',
      headerName: t('movements.itemDetails.storedQuantity'),
      width: 120,
      renderCell: (params) => (
        <NumberFormatText value={params.row?.quantity} formatter="quantity" />
      ),
    },
    {
      field: 'location',
      headerName:
        (movementType === MOVEMENT_TYPE.PO_IMPORT ||
          movementType === MOVEMENT_TYPE.TRANSFER_IMPORT ||
          movementType === MOVEMENT_TYPE.SWIFT_FLOOR_IMPORT) &&
        t('movements.itemDetails.locationStore'),
      width: 120,
      renderCell: (params) => params.row?.locationCode,
    },
    {
      field: 'unstoredQuantity',
      headerName: t('movements.itemDetails.unstoredQuantity'),
      width: 120,
      renderCell: (params) => (
        <NumberFormatText
          value={params.row?.planQuantity}
          formatter="quantity"
        />
      ),
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
        columns={columns}
        rows={getRows(items)?.rows}
        rowSpanMatrix={getRows(items).rowSpanMatrix}
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
