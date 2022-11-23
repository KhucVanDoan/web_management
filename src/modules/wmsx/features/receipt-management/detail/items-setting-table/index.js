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
      field: '#',
      headerName: '#',
      width: 50,
    },
    {
      field: 'code',
      headerName: t('receiptManagement.itemDetails.code'),
      width: 120,
      renderCell: (params) => {
        return params.row?.item?.code
      },
    },
    {
      field: 'name',
      headerName: t('receiptManagement.itemDetails.name'),
      width: 120,
      renderCell: (params) => {
        return params.row?.item?.name
      },
    },
    {
      field: 'unit',
      headerName: t('receiptManagement.itemDetails.unit'),
      width: 120,
      renderCell: (params) => {
        return params.row?.item?.itemUnit
      },
    },
    {
      field: 'quantity',
      headerName: t('receiptManagement.itemDetails.quantity'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.quantity)
      },
    },
    {
      field: 'price',
      headerName: t('receiptManagement.itemDetails.price'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.price)
      },
    },
    {
      field: 'amount',
      headerName: t('receiptManagement.itemDetails.amount'),
      width: 120,
      align: 'right',
      renderCell: (params) => {
        return Number(params.row?.amount)
      },
    },
    {
      field: 'debitAccount',
      headerName: t('receiptManagement.itemDetails.debitAccount'),
      width: 120,
    },
    {
      field: 'creditAccount',
      headerName: t('receiptManagement.itemDetails.creditAccount'),
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
          {t('receiptManagement.itemDetails.title')}
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
