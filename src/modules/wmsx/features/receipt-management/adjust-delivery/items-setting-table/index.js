import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'

const ItemSettingTableAdjustDelivery = ({
  items,
  values,
  setFieldValue,
  arrayHelpers,
}) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { receiptDetail },
  } = useReceiptManagement()
  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'action',
        headerName: '',
        width: 50,
        hide: values?.isReturned,
        align: 'center',
        renderCell: (params, idx) => {
          return (
            <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
              <Icon name="remove" />
            </IconButton>
          )
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
              values={params.row?.returnQuantity}
              formatter="quantity"
              disabled={values?.isReturned}
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
    ],
    [items, values?.isReturned],
  )
  const handleChangeChecked = (val) => {
    if (val) {
      const items = receiptDetail?.items?.map((item) => ({
        ...item,
        code: item?.item?.code,
        name: item?.item?.name,
        unit: item?.item?.itemUnit,
        quantity: +item?.quantity,
        creditAccount: item?.creditAccount,
        debitAccount: item?.debitAccount,
        returnQuantity: +item?.payAbleQuantity,
        payAbleQuantity: +item?.payAbleQuantity,
      }))
      setFieldValue('items', items)
    }
  }
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mr: 2,
          }}
        >
          <Field.Checkbox
            name="isReturned"
            value={values?.isReturned}
            onChange={(val) => handleChangeChecked(val)}
          />
          <Typography component="span">
            {t('receiptManagement.returnAllItem')}
          </Typography>
        </Box>
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
