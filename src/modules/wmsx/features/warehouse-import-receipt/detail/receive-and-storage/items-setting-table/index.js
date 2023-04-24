import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { scrollToBottom } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, arrayHelpers, warehouse, setFieldValue, values } = props
  const {
    data: { warehouseImportReceiptDetails },
  } = useWarehouseImportReceipt()
  const itemList = []
  warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.forEach(
    (item) => {
      const findItem = itemList?.find((e) => e?.itemId === item?.itemId)
      if (isEmpty(findItem)) {
        itemList.push({
          ...item?.item,
          importQuantity: item?.quantity,
          receivedQuantity: item?.quantity,
          lotNumber: item?.lotNumber,
          itemId: item?.itemId,
        })
      }
    },
  )
  const lotNumberLists =
    warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.map(
      (item) => ({
        itemId: item?.itemId,
        lotNumber: item?.lotNumber,
      }),
    )
  const {
    data: { locationList },
  } = useLocationManagement()

  const handleChangeLotNumber = (val, index) => {
    if (val) {
      const findLotNumber =
        warehouseImportReceiptDetails?.purchasedOrderImportWarehouseLots?.find(
          (lot) =>
            lot?.itemId === val?.itemId && lot?.lotNumber === val?.lotNumber,
        )
      if (!isEmpty(findLotNumber)) {
        setFieldValue(`items[${index}].importQuantity`, findLotNumber?.quantity)
        setFieldValue(
          `items[${index}].receivedQuantity`,
          findLotNumber?.quantity,
        )
      }
    }
  }
  const handleChangeItem = (val, index) => {
    const findItem = itemList?.find((e) => e?.itemId === val?.itemId)
    if (!isEmpty(findItem)) {
      setFieldValue(`items[${index}].importQuantity`, findItem?.importQuantity)
      setFieldValue(
        `items[${index}].receivedQuantity`,
        findItem?.receivedQuantity,
      )
    }
  }

  const getColumns = useMemo(() => {
    return [
      {
        field: 'id',
        headerName: t('warehouseImportReceipt.table.number'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseImportReceipt.table.itemCode'),
        width: 400,
        renderCell: (_, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemList}
              getOptionLabel={(opt) => opt?.code || ''}
              getOptionSubLabel={(opt) => opt?.name || ''}
              isOptionEqualToValue={(opt, val) => opt?.itemId === val?.itemId}
              onChange={(val) => handleChangeItem(val, index)}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseImportReceipt.table.itemName'),
        width: 400,
        renderCell: (params) => {
          return params?.row?.itemCode?.name
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseImportReceipt.table.unit'),
        width: 100,
        renderCell: (params) => {
          return params?.row?.itemCode?.itemUnit
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseImportReceipt.table.lotNumber'),
        width: 200,
        hide: !warehouse?.manageByLot,
        renderCell: (params, index) => {
          const lotNumberList = lotNumberLists?.filter(
            (lot) => lot?.itemId === params?.row?.itemCode?.itemId,
          )
          return (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumberList}
              getOptionLabel={(opt) => opt.lotNumber}
              isOptionEqualToValue={(opt, val) =>
                opt?.lotNumber === val?.lotNumber
              }
              onChange={(val) => handleChangeLotNumber(val, index)}
              validate={(val) => {
                if (!val) {
                  return t('general:form.required')
                }
              }}
            />
          )
        },
      },
      {
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 100,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].importQuantity`}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'receivedQuantity',
        headerName: t('warehouseImportReceipt.table.receivedQuantity'),
        width: 100,
        headerAlign: 'left',
        align: 'right',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].receivedQuantity`}
              formatter="quantity"
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locatorStored'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              dropdownWidth={250}
              name={`items[${index}].locator`}
              options={locationList}
              getOptionLabel={(opt) => opt?.code}
              isOptionEqualToValue={(opt, val) =>
                opt?.locatorId === val?.locatorId
              }
              disabled={values?.storedNoLocation}
            />
          )
        },
      },
      {
        field: 'remove',
        hide: items?.length === 1,
        headerName: '',
        width: 50,
        renderCell: (_, idx) => {
          return (
            <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
  }, [itemList, values?.storedNoLocatin])

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
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemCode: '',
                locator: '',
                itemName: '',
                itemUnit: '',
                quantity: '',
                receivedQuantity: '',
              })
              scrollToBottom()
            }}
          >
            {t('warehouseImportReceipt.table.addButton')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemsSettingTable
