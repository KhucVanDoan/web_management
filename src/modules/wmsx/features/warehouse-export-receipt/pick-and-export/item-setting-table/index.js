import React, { useMemo, useEffect } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty, uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { OrderTypeEnum, TABLE_NAME_ENUM } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'

const ItemSettingTable = ({ items, lots, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseExportReceiptDetails },
  } = useWarehouseExportReceipt()
  const {
    data: { itemStockAvailabe },
    actions,
  } = useWarehouseTransfer()
  const itemList = warehouseExportReceiptDetails?.itemsSync?.map((item) => ({
    ...item?.item,
    quantity: item?.quantity,
    exportedQuantity: item?.quantity,
    requestedQuantityWarehouseExportProposal:
      item?.requestedQuantityWarehouseExportProposal,
    id: item?.id,
  }))
  useEffect(() => {
    if (!isEmpty(lots)) {
      const params = {
        order: {
          orderType: OrderTypeEnum.SO,
          orderId: warehouseExportReceiptDetails?.id,
        },
        items: lots?.map?.((lot) => ({
          itemId: lot.itemId,
          warehouseId: lot.warehouseId,
          lotNumber: lot.lotNumber || null,
        })),
      }
      actions.getItemWarehouseStockAvailable(params)
    }
  }, [lots])
  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: t('warehouseExportReceipt.items.STT'),
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseExportReceipt.items.suppliesCode'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemList}
              getOptionLabel={(opt) => opt?.code || ''}
              getOptionSubLabel={(opt) => opt?.name || ''}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.itemCode?.name
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.itemCode?.itemUnit
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseExportReceipt.items.lotNumber'),
        width: 250,
        renderCell: (params, index) => {
          const lotNumbersOfItem = lots?.filter(
            (lot) => lot.itemId === params?.row?.itemCode?.id,
          )
          return (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              dropdownWidth={250}
              options={lotNumbersOfItem}
              getOptionLabel={(opt) => opt?.lotNumber || ''}
              required
              // disabled={lotNumbersOfItem.some((lot) => !lot.lotNumber)}
              disabled={
                !Boolean(warehouseExportReceiptDetails?.warehouse?.manageByLot)
              }
              validate={(val) => {
                if (warehouseExportReceiptDetails?.warehouse?.manageByLot) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
            />
          )
        },
      },
      {
        field: 'quantityRequest',
        headerName: t('warehouseExportReceipt.items.quantityRequest'),
        width: 150,
        renderCell: (params) => {
          return !isEmpty(
            warehouseExportReceiptDetails?.attributes?.find(
              (item) =>
                item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
                item?.value,
            ),
          ) ? (
            <NumberFormatText
              value={
                params?.row?.requestedQuantityWarehouseExportProposal ||
                params?.row?.itemCode?.requestedQuantityWarehouseExportProposal
              }
              formatter="quantity"
            />
          ) : (
            ''
          )
        },
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        width: 150,
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={+params?.row?.quantity || params?.row?.itemCode?.quantity}
              formatter="quantity"
            />
          )
        },
      },
      {
        field: 'exportedQuantity',
        headerName: t('warehouseExportReceipt.items.quantityExportActual'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].exportedQuantity`}
              formatter="quantity"
              validate={(val) => {
                const exportPlanQuantity =
                  params?.row?.lotNumber?.quantity ||
                  params?.row?.item?.quantity
                const comparedQuantity = params?.row?.lotNumber
                  ?.requestedQuantity
                  ? Math.min(
                      params?.row?.lotNumber?.requestedQuantity,
                      exportPlanQuantity,
                    )
                  : exportPlanQuantity
                if (Number(val) > comparedQuantity) {
                  return t('general:form.maxNumber', {
                    max: comparedQuantity,
                  })
                }
              }}
              required
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseExportReceipt.items.locator'),
        width: 250,
        renderCell: (params, index) => {
          const locationList = uniqBy(
            itemStockAvailabe
              ?.find(
                (item) =>
                  item?.itemId === params?.row?.itemCode?.id &&
                  item?.itemAvailables?.length > 0,
              )
              ?.itemAvailables?.map((item) => ({
                ...item,
                code: item?.locator?.code,
                name: item?.locator?.name,
              })),
            'code',
          )

          return (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              dropdownWidth={250}
              options={locationList}
              getOptionLabel={(opt) => opt?.code || opt?.name}
              required
            />
          )
        },
      },
      {
        field: 'action',
        hide: items?.length === 1,
        width: 100,
        align: 'center',
        renderCell: (params, idx) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items, itemList],
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
          {t('warehouseExportReceipt.items.suppliesList')}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            arrayHelpers.push({
              id: new Date().getTime(),
              itemCode: '',
              unit: '',
              quantityRequest: '',
              exportedQuantity: '',
            })
          }}
          disabled={items?.length === 10}
        >
          {t('warehouseExportReceipt.addButton')}
        </Button>
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
