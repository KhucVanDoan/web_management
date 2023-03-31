import React, { useEffect, useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { scrollToBottom, convertFilterParams } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, arrayHelpers, warehouse, setFieldValue } = props
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
    actions,
    data: { locationList },
  } = useLocationManagement()

  useEffect(() => {
    if (!isEmpty(warehouse)) {
      actions.searchLocations({
        limit: ASYNC_SEARCH_LIMIT,
        filter: convertFilterParams({
          warehouseId: warehouse?.id,
          status: ACTIVE_STATUS.ACTIVE,
          type: [0, 1],
        }),
      })
    }
  }, [warehouse])
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
  const getColumns = useMemo(() => {
    return [
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
        width: 200,
        renderCell: (_, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemList}
              getOptionLabel={(opt) => opt?.code || ''}
              getOptionSubLabel={(opt) => opt?.name || ''}
              isOptionEqualToValue={(opt, val) => opt?.itemId === val?.itemId}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseImportReceipt.table.itemName'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.name
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseImportReceipt.table.unit'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.itemUnit
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseImportReceipt.table.lotNumber'),
        width: 180,
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
        width: 180,
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
        width: 180,
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
        width: 150,
        renderCell: (params, index) => {
          const selectedLocators = items
            .filter(
              (item) =>
                item.itemCode?.itemId === params?.row?.itemCode?.itemId &&
                item?.lotNumber?.lotNumber ===
                  params?.row?.lotNumber?.lotNumber &&
                item?.id !== params?.row?.id,
            )
            .map((item) => item.locator?.locatorId)
          const availableLocators = locationList.filter(
            (locator) => !selectedLocators.includes(locator.locatorId),
          )
          return (
            <Field.Autocomplete
              dropdownWidth={250}
              name={`items[${index}].locator`}
              options={availableLocators}
              getOptionLabel={(opt) => opt?.code}
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
  }, [itemList])

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
