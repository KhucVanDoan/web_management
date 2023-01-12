import React, { useEffect } from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { OrderTypeEnum } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, setFieldValue, values } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { warehouseTransferDetails, itemStockAvailabe },
    actions,
  } = useWarehouseTransfer()
  useEffect(() => {
    if (!isEmpty(warehouseTransferDetails)) {
      const params = {
        order: {
          orderType: OrderTypeEnum.TRANSFER,
          orderId: warehouseTransferDetails?.id,
        },
        items: warehouseTransferDetails?.warehouseTransferDetailLots?.map?.(
          (item) => ({
            itemId: item?.itemId,
            warehouseId: warehouseTransferDetails?.sourceWarehouse?.id,
            lotNumber: item?.lotNumber || null,
          }),
        ),
      }
      actions.getItemWarehouseStockAvailable(params)
    }
  }, [warehouseTransferDetails])
  const handleChangItem = (val, index) => {
    if (!isEmpty(val)) {
      const planQuantity =
        warehouseTransferDetails?.warehouseTransferDetailLots?.find(
          (item) => item?.itemId === val?.itemId,
        )?.planQuantity
      const findItem = values?.items?.find(
        (item) => item?.id && item?.itemCode?.itemId === val?.itemId,
      )
      setFieldValue(`items[${index}].transferQuantity`, +planQuantity)
      setFieldValue(`items[${index}].debitAcc`, findItem?.debitAcc || 1519)
      setFieldValue(`items[${index}].creditAcc`, findItem?.creditAcc)
      setFieldValue(`items[${index}].price`, findItem?.price)
      setFieldValue(`items[${index}].amount`, findItem?.amount)
      setFieldValue(
        `items[${index}].itemCodeWarehouseImp`,
        findItem?.itemCodeWarehouseImp,
      )
    } else {
      setFieldValue(`items[${index}].transferQuantity`, '')
      setFieldValue(`items[${index}].debitAcc`, '')
      setFieldValue(`items[${index}].creditAcc`, '')
      setFieldValue(`items[${index}].price`, '')
      setFieldValue(`items[${index}].amount`, '')
      setFieldValue(`items[${index}].itemCodeWarehouseImp`, '')
    }
  }
  const handleChangLotNumber = (val, params, index) => {
    const planQuantity =
      warehouseTransferDetails?.warehouseTransferDetailLots?.find(
        (item) =>
          item?.itemId === params?.row?.itemCode?.itemId &&
          item?.lotNumber === val,
      )?.planQuantity
    setFieldValue(`items[${index}].transferQuantity`, +planQuantity)
  }
  const itemList = warehouseTransferDetails?.warehouseTransferDetailLots?.map(
    (item) => ({
      ...item?.item,
      itemId: item?.itemId,
    }),
  )
  const lots = warehouseTransferDetails?.warehouseTransferDetailLots?.map(
    (item) => ({
      lotNumber: item?.lotNumber,
      itemId: item?.itemId,
    }),
  )
  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseTransfer.table.itemCode'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemList}
              isOptionEqualToValue={(opt, val) => opt?.itemId === val?.itemId}
              getOptionLabel={(opt) => opt?.code}
              onChange={(val) => handleChangItem(val, index)}
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseTransfer.table.itemName'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].itemCode.name`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'itemUnit',
        headerName: t('warehouseTransfer.table.unit'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].itemCode.itemUnit.name`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseTransfer.table.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const lotNumberList = lots?.filter(
            (item) =>
              item?.itemId === params?.row?.itemCode?.itemId ||
              item?.itemId === params?.row?.itemCode?.id,
          )
          return (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumberList}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              onChange={(val) => handleChangLotNumber(val, params, index)}
              disabled={
                !Boolean(warehouseTransferDetails?.sourceWarehouse?.manageByLot)
              }
              validate={(val) => {
                if (
                  Boolean(
                    warehouseTransferDetails?.sourceWarehouse?.manageByLot,
                  )
                ) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
              isOptionEqualToValue={(opt, val) => opt?.lotNumber === val}
            />
          )
        },
      },
      {
        field: 'transferQuantity',
        headerName: t('warehouseTransfer.table.transferQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].transferQuantity`}
              disabled
            />
          )
        },
      },

      {
        field: 'ExportedQuantity',
        headerName: t('warehouseTransfer.table.exportedQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].ExportedQuantity`}
              type="number"
              validate={(val) => {
                const totalExportedQuantity = items
                  .filter(
                    (item) =>
                      item.itemCode?.itemId === params?.row?.itemCode?.itemId &&
                      item?.id !== params?.row?.id,
                  )
                  .reduce((prev, cur) => prev + Number(cur.ExportedQuantity), 0)
                if (
                  totalExportedQuantity + Number(val) !==
                  params?.row?.transferQuantity
                ) {
                  return t('general:form.totalExportedQuantity', {
                    exportQuantity: params?.row?.transferQuantity,
                  })
                }
              }}
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locatorPickUp'),
        width: 200,
        renderCell: (params, index) => {
          const { itemCode } = params?.row

          const locationList = itemStockAvailabe
            ?.find(
              (item) =>
                item?.itemId === params?.row?.itemCode?.itemId &&
                item?.itemAvailables?.length > 0,
            )
            ?.itemAvailables?.map((item) => ({
              ...item,
              code: item?.locator?.code,
            }))
          return (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={locationList}
              disabled={isEmpty(itemCode)}
              getOptionLabel={(opt) => opt?.code}
              isOptionEqualToValue={(opt, val) =>
                opt?.locatorId === val?.locatorId
              }
            />
          )
        },
      },
      {
        field: 'itemCodeWarehouseImp',
        headerName: t('warehouseTransfer.table.itemCodeWarehouseImp'),
        width: 100,
        renderCell: (params) => {
          return (
            <Checkbox
              checked={params?.row?.itemCodeWarehouseImp}
              name="itemCodeWarehouseImp"
              disabled
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('warehouseTransfer.table.price'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].price`}
              type="number"
              disabled={true}
            />
          )
        },
      },
      {
        field: 'amount',
        headerName: t('warehouseTransfer.table.amount'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].amount`}
              type="number"
              disabled={true}
            />
          )
        },
      },
      {
        field: 'debitAcc',
        headerName: t('warehouseTransfer.table.debitAcc'),
        width: 180,
        renderCell: (params, index) => {
          return (
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
        headerName: t('warehouseTransfer.table.creditAcc'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].creditAcc`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        hide: isView,
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
          {t('warehouseTransfer.table.title')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemCodeWarehouseImp: false,
                planQuantity: 1,
              })
            }}
          >
            {t('warehouseTransfer.table.addButton')}
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

export default ItemSettingTable
