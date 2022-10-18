import React from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { WAREHOUSE_TRANSFER_TYPE } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, values } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemWarehouseStockList },
  } = useWarehouseTransfer()
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
          return isView ? (
            <>{params?.row?.itemCode?.code}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemWarehouseStockList}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              getOptionLabel={(opt) => opt?.code}
              disabled={!values?.sourceWarehouseId}
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
          return isView ? (
            <>{params?.row?.itemName}</>
          ) : (
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
          return isView ? (
            <>{params?.row?.itemCode?.itemUnit?.name}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.itemUnit.name`}
              disabled={true}
            />
          )
        },
      },
      values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG && {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locator'),
        width: 150,
        renderCell: (params, index) => {
          const { itemCode } = params?.row
          const locations = itemWarehouseStockList?.find(
            (item) =>
              item?.id === params?.row?.itemCode?.id ||
              params?.row?.itemCode?.itemId,
          )?.locations
          const locationList = locations?.map((item) => ({
            code: item?.locator?.code,
            name: item?.locator?.name,
            locatorId: item?.locator?.locatorId,
          }))
          return isView ? (
            <>{params?.row?.locator?.code}</>
          ) : (
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
        field: 'lotNumber',
        headerName: t('warehouseTransfer.table.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const { itemCode } = params?.row
          const locationList = itemWarehouseStockList?.find(
            (item) =>
              item?.id === params?.row?.itemCode?.id ||
              params?.row?.itemCode?.itemId,
          )
          return isView ? (
            <>{params?.row?.lotNumber}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={flatMap(locationList?.locations, 'lots')}
              disabled={
                Boolean(values?.sourceWarehouseId?.manageByLot) &&
                isEmpty(itemCode)
              }
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
            />
          )
        },
      },
      values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG && {
        field: 'warehouseImportDate',
        headerName: t('warehouseTransfer.table.warehouseImportDate'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.transferQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].warehouseImportDate`}
              disabled={true}
              placeholder={t('warehouseTransfer.table.warehouseImportDate')}
            />
          )
        },
      },
      {
        field: 'planExportedQuantity',
        headerName: t('warehouseTransfer.table.planExportedQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.planExportedQuantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.quantity`}
              disabled
            />
          )
        },
      },
      {
        field: 'transferQuantity',
        headerName: t('warehouseTransfer.table.transferQuantity'),
        width: 180,
        renderCell: (params, index) => {
          const { itemCode } = params?.row
          return isView ? (
            params?.row?.transferQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].transferQuantity`}
              disabled={isEmpty(itemCode)}
            />
          )
        },
      },

      {
        field: 'itemCodeWarehouseImp',
        headerName: t('warehouseTransfer.table.itemCodeWarehouseImp'),
        width: 100,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox
              checked={params?.row?.required}
              name="itemCodeWarehouseImp"
              disabled
            />
          ) : (
            <Field.Checkbox
              name={`itemDefault[${index}].itemCodeWarehouseImp`}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('warehouseTransfer.table.price'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.price}</>
          ) : (
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
          return isView ? (
            <>{params?.row?.amount}</>
          ) : (
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
          return isView ? (
            1519
          ) : (
            <Field.TextField
              name={`items[${index}].d ebitAcc`}
              type="number"
              value={'1519'}
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
          return isView ? (
            <>{params?.row?.creditAcc}</>
          ) : (
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
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  ids: new Date().getTime(),
                  itemcode: null,
                  itemName: '',
                  itemType: '',
                  lotNumber: '',
                  mfg: '',
                  packageId: '',
                  planQuantity: 1,
                  unitType: '',
                })
              }}
            >
              {t('warehouseTransfer.table.addButton')}
            </Button>
          )}
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
