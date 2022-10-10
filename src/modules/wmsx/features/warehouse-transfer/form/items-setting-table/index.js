import React from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { flatMap } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { scrollToBottom } from '~/utils'

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
            <>{params?.row?.itemId}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemWarehouseStockList}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
            <>{params?.row?.itemUnit}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.itemUnit.name`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locator'),
        width: 150,
        renderCell: (params, index) => {
          const { id } = params?.row?.itemCode
          const locationList = itemWarehouseStockList?.find(
            (item) => item?.id === id,
          )
          return isView ? (
            <>{params?.row?.lotNumber}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={locationList?.locations}
              disabled={Boolean(values?.sourceWarehouseId?.manageByLot)}
              getOptionLabel={(opt) => opt?.locator?.code}
              getOptionValue={(option) => option?.locator?.id}
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseTransfer.table.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const { id } = params?.row?.itemCode
          const locationList = itemWarehouseStockList?.find(
            (item) => item?.id === id,
          )
          return isView ? (
            <>{params?.row?.lotNumber}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={flatMap(locationList?.locations, 'lots')}
              disabled={Boolean(values?.sourceWarehouseId?.manageByLot)}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
            />
          )
        },
      },
      {
        field: 'transferQuantity',
        headerName: t('warehouseTransfer.table.transferQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.transferQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].transferQuantity`}
              disabled={true}
              placeholder={t(
                'warehouseTransfer.table.placeholderTransferQuantity',
              )}
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
            <Field.TextField name={`items[${index}].planExportedQuantity`} />
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
        field: 'debitAcc',
        headerName: t('warehouseTransfer.table.debitAcc'),
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
        headerName: t('warehouseTransfer.table.creditAcc'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.planQuantity}</>
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
                scrollToBottom()
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
