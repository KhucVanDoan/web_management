import React from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import { scrollToBottom } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers, itemList, setFieldValue, values } = props
  const {
    data: { detailSourceManagement },
  } = useSourceManagement()
  const isView = mode === MODAL_MODE.DETAIL
  const receiptRequired = values?.businessTypeId?.bussinessTypeAttributes?.find(
    (item) => item?.tableName === 'receipts' && item?.required === 1,
  )
  const handleChangeItem = (val, index) => {
    setFieldValue(`items[${index}].itemName`, val?.item?.name)
    setFieldValue(`items[${index}].unit`, val?.item?.itemUnit)
    setFieldValue(`items[${index}].lotNumber`, 'PO01923048')
    setFieldValue(
      `items[${index}].debitAcc`,
      val?.item?.itemWarehouseSources?.accountIdentifier,
    )
    if (values?.sourceId) {
      setFieldValue(
        `items[${index}].creditAcc`,
        [
          detailSourceManagement?.accountant,
          detailSourceManagement?.produceTypeCode,
          detailSourceManagement?.productCode,
          detailSourceManagement?.factorialCode,
        ].join('.'),
      )
    }
    setFieldValue(`items[${index}].importQuantity`, '')
    setFieldValue(`items[${index}].money`, '')
    if (!isEmpty(receiptRequired)) {
      setFieldValue(`items[${index}].importQuantity`, val?.quantity)
    }
  }
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
        const itemIdCodeList = items.map((item) => item?.itemId?.id)
        return isView ? (
          <>{params?.row?.item?.code}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].itemCode`}
            options={itemList}
            getOptionLabel={(opt) => opt?.item?.code || ''}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.itemId?.id
            }
            onChange={(val) => handleChangeItem(val, index)}
          />
        )
      },
    },
    {
      field: 'itemName',
      headerName: t('warehouseImportReceipt.table.itemName'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.item?.name}</>
        ) : (
          <Field.TextField name={`items[${index}].itemName`} disabled={true} />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseImportReceipt.table.unit'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.item?.itemUnit}</>
        ) : (
          <Field.TextField name={`items[${index}].unit`} disabled={true} />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('warehouseImportReceipt.table.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.lotNumber}</>
        ) : (
          <Field.TextField name={`items[${index}].lotNumber`} disabled={true} />
        )
      },
    },
    {
      field: 'requireQuantity',
      headerName: t('warehouseImportReceipt.table.requireQuantity'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.quantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].itemCode.quantity`}
            type="number"
            disabled={true}
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
          <>{params?.row?.storedQuantity}</>
        ) : !isEmpty(receiptRequired) ? (
          <Field.TextField
            name={`items[${index}].importQuantity`}
            disabled={true}
            type="number"
          />
        ) : (
          <Field.TextField
            name={`items[${index}].importQuantity`}
            type="number"
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
            numberProps={{
              thousandSeparator: true,
              decimalScale: 2,
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
          <>{params?.row?.item?.price}</>
        ) : (
          <Field.TextField
            name={`items[${index}].price`}
            type="number"
            value={params?.row?.money / params?.row?.importQuantity}
            numberProps={{
              thousandSeparator: true,
              decimalScale: 2,
            }}
            disabled={true}
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
            disabled={true}
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
          <Field.TextField name={`items[${index}].creditAcc`} disabled={true} />
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
                  itemCode: '',
                  itemName: '',
                  unit: '',
                  qcCheck: false,
                  lotNumber: '',
                  money: '',
                  importQuantity: '',
                  price: '',
                  debitAcc: '',
                  creditAcc: '',
                })
                scrollToBottom()
              }}
              disabled={items?.length === 10}
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
