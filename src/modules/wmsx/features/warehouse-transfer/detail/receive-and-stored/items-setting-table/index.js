import React from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { searchLocationsApi } from '~/modules/wmsx/redux/sagas/location-management/search-locations'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, setFieldValue } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { warehouseTransferDetails },
  } = useWarehouseTransfer()
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
  const handleChangItem = (val, index) => {
    const planQuantity =
      warehouseTransferDetails?.warehouseTransferDetailLots?.find(
        (item) => item?.itemId === val?.itemId,
      )?.planQuantity
    setFieldValue(`items[${index}].transferQuantity`, +planQuantity)
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
              isOptionEqualToValue={(opt, val) => opt?.lotNumber === val}
              onChange={(val) => handleChangLotNumber(val, params, index)}
              disabled={
                !Boolean(
                  warehouseTransferDetails?.destinationWarehouse?.manageByLot,
                )
              }
              validate={(val) => {
                if (
                  Boolean(
                    warehouseTransferDetails?.destinationWarehouse?.manageByLot,
                  )
                ) {
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
        field: 'locator',
        headerName: t('warehouseTransfer.table.locatorStored'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              asyncRequest={(s) =>
                searchLocationsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: ACTIVE_STATUS.ACTIVE,
                    rootId: warehouseTransferDetails?.sourceWarehouse?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
        field: 'actualExportedQuantity',
        headerName: t('warehouseTransfer.table.actualexportedQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].actualExportedQuantity`}
              disabled
            />
          )
        },
      },
      {
        field: 'inputedQuantity',
        headerName: t('warehouseTransfer.table.inputedQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].inputedQuantity`}
              type="number"
              validate={(val) => {
                const totalInputedQuantity = items
                  .filter(
                    (item) =>
                      item.itemCode?.itemId === params?.row?.itemCode?.itemId &&
                      item?.id !== params?.row?.id,
                  )
                  .reduce((prev, cur) => prev + Number(cur.inputedQuantity), 0)
                if (
                  totalInputedQuantity + Number(val) >
                  params?.row?.transferQuantity
                ) {
                  return t('general:form.totalInputedQuantity', {
                    inputQuantity: params?.row?.transferQuantity,
                  })
                }
              }}
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
                itemCode: null,
                itemName: null,
                itemUnit: '',
                locator: '',
                lotNumber: '',
                packageId: '',
                inputedQuantity: '',
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
