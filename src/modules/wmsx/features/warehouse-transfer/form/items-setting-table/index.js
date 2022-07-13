import React, { useEffect } from 'react'

import { Button, IconButton, InputAdornment, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useDefineItem from '~/modules/database/redux/hooks/useDefineItem'
import { TRANSFER_STATUS } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import {
  convertFilterParams,
  convertUtcDateToLocalTz,
  scrollToBottom,
} from '~/utils'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, values, setFieldValue, status } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const isDisplay =
    status === TRANSFER_STATUS.PENDING ||
    status === TRANSFER_STATUS.CONFIRMED ||
    status === TRANSFER_STATUS.REJECTED
  const {
    data: { itemWarehouseStockList, lotNumberList, itemStocks },
    actions,
  } = useWarehouseTransfer()
  const {
    data: { itemList },
    actions: defineItemActions,
  } = useDefineItem()

  useEffect(() => {
    const params = {
      limit: 100,
      filter: convertFilterParams({
        warehouseId: values?.sourceWarehouseName,
      }),
    }
    actions.getListItemWarehouseStock(params)
    defineItemActions.searchItems({ isGetAll: 1 })
  }, [values?.sourceWarehouseName])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }
  const sumObj = (objArr) => {
    let newArr = []
    objArr?.forEach((object) => {
      const tempObj = newArr.find(
        (obj) =>
          obj.itemId === object.itemId && obj.lotNumber === object.lotNumber,
      )
      if (tempObj) {
        tempObj.stock = tempObj.stock + object.stock
      } else {
        newArr.push(object)
      }
    })
    return newArr
  }

  const handleChange = (val, values, index) => {
    setFieldValue(`items[${index}].lotNumber`, '')
    const params = {
      itemId: val,
      warehouseIds: values?.sourceWarehouseName,
    }
    actions.getLotNumberListWarehouseTransfer(params)
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
        field: 'code',
        headerName: t('warehouseTransfer.item.code'),
        width: 150,
        renderCell: (params, index) => {
          const itemWarehouseFilterList = itemWarehouseStockList?.filter(
            (item) => parseInt(item?.quantity) > 0,
          )
          const itemWarehouseIds = map(
            itemWarehouseFilterList?.filter((item) => item?.quantity > 0),
            'id',
          )
          const itemId = itemList?.filter((item) =>
            itemWarehouseIds?.includes(item?.id),
          )
          return isView ? (
            <>{params?.row?.itemId}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={itemId}
              disabled={isView || !values?.sourceWarehouseName}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
              onChange={(val) => handleChange(val, values, index)}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseTransfer.item.name'),
        width: 200,
        renderCell: (params, index) => {
          const itemId = params?.row?.itemId
          return isView ? (
            <>{params?.row?.itemName}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemName`}
              value={getItemObject(itemId)?.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'itemType',
        headerName: t('warehouseTransfer.item.type'),
        width: 150,
        renderCell: (params, index) => {
          const itemId = params?.row?.itemId
          return isView ? (
            <>{params?.row?.itemType}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemType`}
              value={getItemObject(itemId)?.itemType?.name}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseTransfer.item.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          const lotList = lotNumberList?.filter((e) => e?.itemId === itemId)
          var result = lotList[0]?.lotNumbers.reduce((unique, o) => {
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
              options={result}
              disabled={isView}
              getOptionLabel={(opt) => opt?.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              onChange={(val) => {
                actions.getStockByItemAndLotNumber({
                  keyword: val,
                  itemId: itemId,
                })
                const data = lotNumberList
                  .find((i) => i.itemId === itemId)
                  ?.lotNumbers?.find((j) => j.lotNumber === val)?.mfg
                setFieldValue(`items[${index}].mfg`, data)
              }}
            />
          )
        },
      },
      {
        field: 'mfg',
        headerName: t('warehouseTransfer.item.manufactureDate'),
        width: 180,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{convertUtcDateToLocalTz(params?.row?.mfg)}</>
          ) : (
            <Field.TextField
              name={`items[${index}].mfg`}
              disabled={true}
              value={convertUtcDateToLocalTz(
                values?.items?.find((item) => item.itemId === itemId)?.mfg,
              )}
            />
          )
        },
      },
      {
        field: 'packageId',
        headerName: t('warehouseTransfer.item.packageCode'),
        width: 180,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{params?.row?.packageId}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].packageId`}
              options={getItemObject(itemId)?.packages}
              disabled={isView}
              getOptionLabel={(opt) => opt?.lotNumber}
              getOptionValue={(option) => option?.lotNumber || null}
            />
          )
        },
      },
      {
        field: 'planQuantity',
        headerName: t('warehouseTransfer.item.planQuantity'),
        width: 100,
        renderCell: (params, index) => {
          const { itemId, lotNumber } = params?.row
          const itemStockFormat = sumObj(
            itemStocks?.lots?.map((item) => ({
              ...item,
              stock: parseFloat(item.quantity),
            })),
          )
          const itemStock = parseInt(
            itemStockFormat?.find(
              (itemStock) =>
                itemStock?.itemId === itemId &&
                itemStock?.lotNumber === lotNumber,
            )?.stock,
          )

          return isView ? (
            <>{params?.row?.planQuantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].planQuantity`}
              type="number"
              disabled={isView}
              numberProps={{
                decimalScale: 3,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                    {itemStock ? `/${itemStock}` : ''}
                  </InputAdornment>
                ),
              }}
            />
          )
        },
      },
      !isDisplay &&
        isView && {
          field: 'actualQuantity',
          headerName: t('warehouseTransfer.item.actualQuantity'),
          width: 100,
          renderCell: (params) => {
            return params?.row?.actualQuantity
          },
        },
      {
        field: 'unitType',
        headerName: t('warehouseTransfer.item.unitType'),
        width: 100,
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{params?.row?.unitType}</>
          ) : (
            <Field.TextField
              name={`items[${index}].unitType`}
              value={getItemObject(itemId)?.itemUnit?.name}
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
          {t('warehouseTransfer.itemsDetails')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: null,
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
              {t('warehouseTransfer.item.addItem')}
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
