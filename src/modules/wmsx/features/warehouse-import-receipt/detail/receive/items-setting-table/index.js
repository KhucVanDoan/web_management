import React, { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import NumberFormatText from '~/components/NumberFormat'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, warehouse } = props
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
        renderCell: (params) => {
          return params?.row?.itemCode?.code
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
        width: 180,
        renderCell: (params) => {
          return params?.row?.itemCode?.itemUnit
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseImportReceipt.table.lotNumber'),
        width: 200,
        hide: !warehouse?.manageByLot,
        renderCell: (params) => {
          return params?.row?.lotNumber
        },
      },
      {
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 180,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={params?.row?.importQuantity}
              formatter="price"
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
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={params?.row?.receivedQuantity}
              formatter="price"
            />
          )
        },
      },
      // {
      //   field: 'locator',
      //   headerName: t('warehouseTransfer.table.locatorStored'),
      //   width: 150,
      //   renderCell: (params, index) => {
      //     const selectedLocators = items
      //       .filter(
      //         (item) =>
      //           item.itemCode?.itemId === params?.row?.itemCode?.itemId &&
      //           item?.lotNumber?.lotNumber ===
      //             params?.row?.lotNumber?.lotNumber &&
      //           item?.id !== params?.row?.id,
      //       )
      //       .map((item) => item.locator?.locatorId)
      //     const availableLocators = locationList.filter(
      //       (locator) => !selectedLocators.includes(locator.locatorId),
      //     )
      //     return (
      //       <Field.Autocomplete
      //         dropdownWidth={250}
      //         name={`items[${index}].locator`}
      //         options={availableLocators}
      //         getOptionLabel={(opt) => opt?.code}
      //       />
      //     )
      //   },
      // },
      // {
      //   field: 'remove',
      //   hide: items?.length === 1,
      //   headerName: '',
      //   width: 50,
      //   renderCell: (_, idx) => {
      //     return (
      //       <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
      //         <Icon name="remove" />
      //       </IconButton>
      //     )
      //   },
      // },
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
