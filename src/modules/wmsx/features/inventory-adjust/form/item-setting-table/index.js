import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
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
        field: 'itemCode',
        headerName: t('inventoryAdjust.items.itemCode'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('inventoryAdjust.items.itemCode')}
              options={[]}
              getOptionLabel={(opt) => opt?.code}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryAdjust.items.itemName'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemName
          ) : (
            <Field.TextField
              name={`items[${index}].itemName`}
              required
              disabled
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('inventoryAdjust.unit'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.unit
          ) : (
            <Field.TextField name={`items[${index}].unit`} required disabled />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('inventoryAdjust.items.lotNumber'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.lotNumber
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={[]}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('inventoryAdjust.items.locator'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.locator
          ) : (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={[]}
              getOptionLabel={(opt) => opt.code}
              getOptionValue={(option) => option?.id}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('inventoryAdjust.items.quantity'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantity
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.quantity`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              required
            />
          )
        },
      },
      {
        field: 'quantityExported',
        headerName: t('inventoryAdjust.items.quantityExported'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantityExported
          ) : (
            <Field.TextField
              name={`items[${index}].quantityExported`}
              placeholder={t('inventoryAdjust.items.quantityExported')}
              disabled
            />
          )
        },
      },
      {
        field: 'totalMoney',
        headerName: t('inventoryAdjust.items.totalMoney'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.totalMoney
          ) : (
            <Field.TextField
              name={`items[${index}].totalMoney`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('inventoryAdjust.items.price'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.price
          ) : (
            <Field.TextField name={`items[${index}].price`} disabled required />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('inventoryAdjust.items.debitAccount'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.debitAccount
          ) : (
            <Field.TextField
              name={`items[${index}].debitAccount`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('inventoryAdjust.items.creditAccount'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.creditAccount
          ) : (
            <Field.TextField
              name={`items[${index}].creditAccount`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params, idx) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
  )
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
          {t('inventoryAdjust.items.itemList')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemCode: '',
                itemName: '',
                unit: '',
                lotNumber: '',
                quantity: '',
                price: '',
                totalMoney: '',
                debitAccount: '',
                creditAccount: '',
              })
            }}
            disabled={items?.length === 10}
          >
            {t('inventoryAdjust.items.addButton')}
          </Button>
        )}
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
