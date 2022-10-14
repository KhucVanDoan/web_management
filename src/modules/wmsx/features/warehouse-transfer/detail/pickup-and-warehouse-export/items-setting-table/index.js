import React from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const itemList = []
  const lots = []
  const locators = []
  items
    ?.filter((e) => !isEmpty(e?.itemCode))
    ?.forEach((item) => {
      const findLots = lots?.find(
        (e) =>
          e?.itemId === item?.itemCode?.itemId &&
          e?.lotNumber === item?.lotNumber,
      )
      if (isEmpty(findLots)) {
        lots.push({
          itemId: item?.itemCode?.itemId || item?.itemCode?.id,
          lotNumber: item?.lotNumber,
        })
      }
      const findLocator = locators?.find(
        (e) =>
          e?.itemId === item?.itemCode?.itemId &&
          e?.locatorId === item?.locator?.locatorId,
      )
      if (isEmpty(findLocator)) {
        locators.push({
          itemId: item?.itemCode?.itemId || item?.itemCode?.id,
          locatorId: item?.locator?.locatorId,
          code: item?.locator?.code,
          name: item?.locator?.name,
        })
      }
      const findItem = itemList?.find(
        (e) => e?.itemId === item?.itemCode?.itemId,
      )
      if (isEmpty(findItem)) {
        itemList.push(item?.itemCode)
      }
    })
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
          return <Field.TextField name={`items[${index}].ExportedQuantity`} />
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locator'),
        width: 150,
        renderCell: (params, index) => {
          const { itemCode } = params?.row
          const locationList = locators?.filter(
            (item) =>
              item?.itemId === params?.row?.itemCode?.itemId ||
              params?.row?.itemCode?.id,
          )

          return (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={locationList}
              disabled={isEmpty(itemCode)}
              getOptionLabel={(opt) => opt?.code}
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
              checked={params?.row?.required}
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
              value={1519}
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
                itemcode: '',
                lotNumber: '',
                packageId: '',
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
