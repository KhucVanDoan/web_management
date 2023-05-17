import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'

const ItemSettingTableAdjustDelivery = ({ items }) => {
  const { t } = useTranslation(['wmsx'])

  const columns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('receiptManagement.itemDetails.code'),
      width: 300,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].code`}
            values={params.row?.item?.code}
            disabled
          />
        )
      },
    },
    {
      field: 'name',
      headerName: t('receiptManagement.itemDetails.name'),
      width: 250,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].name`}
            values={params.row?.item?.name}
            disabled
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('receiptManagement.itemDetails.unit'),
      width: 250,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].unit`}
            values={params.row?.item?.itemUnit}
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('receiptManagement.itemDetails.quantity'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].quantity`}
            values={params.row?.quantity}
            formatter="quantity"
            disabled
          />
        )
      },
    },
    {
      field: 'payAbleQuantity',
      headerName: t('receiptManagement.itemDetails.remainReturnQuantity'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].payAbleQuantity`}
            values={params.row?.payAbleQuantity}
            formatter="quantity"
            disabled
          />
        )
      },
    },
    {
      field: ' returnQuantity',
      headerName: t('receiptManagement.itemDetails.returnQuantity'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].returnQuantity`}
            values={params.row?.payAbleQuantity}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'debitAccount',
      headerName: t('receiptManagement.itemDetails.debitAccount'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].debitAccount`}
            values={params.row?.debitAccount}
            disabled
          />
        )
      },
    },
    {
      field: 'creditAccount',
      headerName: t('receiptManagement.itemDetails.creditAccount'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].creditAccount`}
            values={params.row?.creditAccount}
            disabled
          />
        )
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

ItemSettingTableAdjustDelivery.defaultProps = {
  items: [],
}

ItemSettingTableAdjustDelivery.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingTableAdjustDelivery
