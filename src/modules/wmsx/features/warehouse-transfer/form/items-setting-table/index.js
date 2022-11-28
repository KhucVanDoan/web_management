import React, { useMemo } from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  TRANSFER_STATUS,
  WAREHOUSE_TRANSFER_TYPE,
} from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, values, setFieldValue, type, status } =
    props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemWarehouseStockList },
  } = useWarehouseTransfer()
  const handleChangeItem = (val, index) => {
    if (val) {
      setFieldValue(`items[${index}].planExportedQuantity`, val?.quantity)
      if (val?.itemWarehouseSources?.length > 0) {
        setFieldValue(
          `items[${index}].creditAcc`,
          val?.itemWarehouseSources[0]?.accounting,
        )
      }
    }
  }

  const handleChangeLotnumber = async (val, index, payload) => {
    if (val) {
      const params = {
        items: [
          {
            itemId:
              payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId,
            warehouseId: values?.sourceWarehouseId?.id,
            lotNumber: val,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data?.find(
        (item) =>
          item?.itemId ===
            (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId) &&
          item?.lotNumber === val,
      )
      setFieldValue(
        `items[${index}].planExportedQuantity`,
        planExportedQuantity?.quantity,
      )
    }
  }
  const getColumns = useMemo(
    () => [
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
              isOptionEqualToValue={(opt, val) =>
                (opt?.id || opt?.itemId) === val?.id
              }
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              disabled={!values?.sourceWarehouseId}
              onChange={(val) => handleChangeItem(val, index)}
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
      {
        field: 'locator',
        headerName: t('warehouseTransfer.table.locator'),
        width: 150,
        hide:
          type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT ||
          values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT,
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
          const locationList = itemWarehouseStockList?.find(
            (item) =>
              item?.id ===
              (params?.row?.itemCode?.id || params?.row?.itemCode?.itemId),
          )
          const lotNumberList = flatMap(
            locationList?.locations,
            'lots',
          )?.reduce((unique, o) => {
            if (!unique.some((obj) => obj.lotNumber === o.lotNumber)) {
              unique.push(o)
            }
            return unique
          }, [])

          return isView ? (
            <>{params?.row?.lotNumber}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumberList}
              disabled={!Boolean(values?.sourceWarehouseId?.manageByLot)}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              onChange={(val) => handleChangeLotnumber(val, index, params)}
              validate={(val) => {
                if (Boolean(values?.sourceWarehouseId?.manageByLot)) {
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
        field: 'warehouseImportDate',
        headerName: t('warehouseTransfer.table.warehouseImportDate'),
        width: 180,
        hide:
          type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT ||
          values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT,
        renderCell: (params, index) => {
          return isView ? (
            ''
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
        hide: isView,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.planExportedQuantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].planExportedQuantity`}
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
              validate={(val) => {
                if (+val > +params?.row?.planExportedQuantity) {
                  return t('general:form.maxNumber', {
                    max: params?.row?.planExportedQuantity,
                  })
                }
              }}
              disabled={isEmpty(itemCode)}
            />
          )
        },
      },
      {
        field: 'actualExportedQuantity',
        headerName: t('warehouseTransfer.table.actualExportedQuantity'),
        width: 180,
        hide:
          !isView ||
          (status !== TRANSFER_STATUS.COMPLETED &&
            status !== TRANSFER_STATUS.EXPORTED),
        renderCell: (params) => {
          return params?.row?.exportedQuantity
        },
      },
      {
        field: 'actualImportedQuantity',
        headerName: t('warehouseTransfer.table.actualImportedQuantity'),
        hide:
          !isView ||
          (status !== TRANSFER_STATUS.COMPLETED &&
            status !== TRANSFER_STATUS.EXPORTED),
        width: 180,
        renderCell: (params) => {
          return params?.row?.actualQuantity
        },
      },
      {
        field: 'itemCodeWarehouseImp',
        headerName: t('warehouseTransfer.table.itemCodeWarehouseImp'),
        width: 100,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox name="itemCodeWarehouseImp" disabled />
          ) : (
            <Field.Checkbox
              name={`itemDefault[${index}].itemCodeWarehouseImp`}
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
    ],
    [values?.type, values?.sourceWarehouseId, itemWarehouseStockList, type],
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
        columns={getColumns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
