import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { scrollToBottom, convertFilterParams } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, arrayHelpers, warehouseId } = props
  const {
    data: { warehouseImportReceiptDetails },
  } = useWarehouseImportReceipt()
  const itemList =
    warehouseImportReceiptDetails?.purchasedOrderImportDetails?.map((item) => ({
      ...item?.item,
      quantity: item?.quantity,
      receivedQuantity: item?.quantity,
      itemId: item?.itemId,
    }))
  const {
    actions,
    data: { locationList },
  } = useLocationManagement()

  useEffect(() => {
    if (warehouseId) {
      actions.searchLocations({
        limit: ASYNC_SEARCH_LIMIT,
        filter: convertFilterParams({
          warehouseId,
          status: ACTIVE_STATUS.ACTIVE,
          type: [0, 1],
        }),
      })
    }
  }, [warehouseId])
  const getColumns = () => {
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
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 180,
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={params?.row?.itemCode?.quantity}
              formatter="quantity"
            />
          )
        },
      },
      {
        field: 'receivedQuantity',
        headerName: t('warehouseImportReceipt.table.receivedQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].receivedQuantity`}
              formatter="quantity"
              validate={() => {
                const totalReceivedQuantity = items
                  .filter(
                    (item) =>
                      item.itemCode?.itemId === params?.row?.itemCode?.itemId,
                  )
                  .reduce((prev, cur) => prev + Number(cur.receivedQuantity), 0)
                if (
                  totalReceivedQuantity &&
                  totalReceivedQuantity !== params?.row?.itemCode?.quantity
                ) {
                  return t('general:form.equalItem', {
                    quantity: params?.row?.itemCode?.quantity,
                  })
                }
              }}
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
        columns={getColumns()}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemsSettingTable
