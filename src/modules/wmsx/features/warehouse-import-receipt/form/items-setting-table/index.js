import React from 'react'

import { IconButton, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers } = props
  const isView = mode === MODAL_MODE.DETAIL

  const columns = [
    {
      field: 'id',
      headerName: t('warehouseImportReceipt.table.number'),
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'itemCode',
      headerName: t('warehouseImportReceipt.table.itemCode'),
      width: 250,
      renderCell: (params, index) => {
        const { itemCode } = params.row
        const itemIdCodeList = items.map((item) => item?.itemId?.id)
        return isView ? (
          <>{itemCode}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            asyncRequest={() => {}}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code || ''}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.itemId?.id
            }
          />
        )
      },
    },
    {
      field: 'itemName',
      headerName: t('warehouseImportReceipt.table.itemName'),
      width: 180,
      renderCell: (params, index) => {
        const { itemCode } = params.row
        return isView ? (
          <>{itemCode}</>
        ) : (
          <Field.TextField
            name={`items[${index}].itemCode`}
            value={items[index]?.itemId?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseImportReceipt.table.unit'),
      width: 180,
      renderCell: (params, index) => {
        const { itemCode } = params.row
        return isView ? (
          <>{itemCode}</>
        ) : (
          <Field.TextField
            name={`items[${index}].unit`}
            value={items[index]?.itemId?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('warehouseImportReceipt.table.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        const { itemCode } = params.row
        return isView ? (
          <>{itemCode}</>
        ) : (
          <Field.TextField
            name={`items[${index}].lotNumber`}
            value={items[index]?.itemId?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'requireQuantity',
      headerName: t('warehouseImportReceipt.table.requireQuantity'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].requireQuantity`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'importQuantity',
      headerName: t('warehouseImportReceipt.table.importQuantity'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].importQuantity`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'money',
      headerName: t('warehouseImportReceipt.table.money'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].money`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'price',
      headerName: t('warehouseImportReceipt.table.price'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].price`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'debitAcc',
      headerName: t('warehouseImportReceipt.table.debitAcc'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].debitAcc`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'creditAcc',
      headerName: t('warehouseImportReceipt.table.creditAcc'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].creditAcc`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        return isView ? null : (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
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
        <Typography variant="h4">
          {t('warehouseImportReceipt.table.title')}
        </Typography>
        {!isView && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: '',
                  warehouseId: null,
                  quantity: 1,
                  qcCheck: false,
                  lotNumber: '',
                  mfg: null,
                  packageId: null,
                  palletId: null,
                })
                scrollToBottom()
              }}
            >
              {t('warehouseImportReceipt.table.addButton')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemsSettingTable
