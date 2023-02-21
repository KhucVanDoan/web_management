import React, { useEffect, useMemo, useState } from 'react'

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { add } from 'date-fns'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import {
  ACTIVE_STATUS,
  LENGTH_DEBITACCOUNT,
  TRANSFER_STATUS,
  WAREHOUSE_TRANSFER_TYPE,
} from '~/modules/wmsx/constants'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'
import {
  checkItemWarehouseImport,
  getListItemWarehouseStockApi,
  getListStorageDateApi,
} from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-list-item'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

const ItemSettingTable = (props) => {
  const { mode, arrayHelpers, items, values, setFieldValue, status, type } =
    props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const [storageDates, setStorageDates] = useState([])
  useEffect(() => {
    items?.forEach((item) => {
      item?.storageDates?.forEach((d) => {
        const findStorage = storageDates?.find(
          (e) =>
            e?.itemId === d?.itemId &&
            new Date(e?.storageDate)?.toISOString() ===
              new Date(d?.storageDate)?.toISOString(),
        )
        if (isEmpty(findStorage)) {
          storageDates.push(d)
        }
      })
    })
    setStorageDates([...storageDates])
  }, [items])
  const handleChangeItem = async (val, index) => {
    if (val) {
      const params = {
        items: [
          {
            itemId: val?.itemId || val?.id,
            warehouseId: values?.sourceWarehouseId?.id,
            lotNumber: null,
            locatorId: null,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      if (res?.statusCode === 200) {
        const planExportedQuantity = res?.data?.find(
          (item) => item?.itemId === val?.itemId || val?.id,
        )
        setFieldValue(
          `items[${index}].planExportedQuantity`,
          planExportedQuantity?.quantity,
        )
      }
      setFieldValue(`items[${index}].transferQuantity`, '')
      if (val?.itemWarehouseSources?.length > 0) {
        setFieldValue(
          `items[${index}].creditAcc`,
          val?.itemWarehouseSources?.find(
            (item) => item?.warehouseId === values?.sourceWarehouseId?.id,
          )?.accounting,
        )
      }
      const checkItem = await checkItemWarehouseImport({
        itemId: val?.itemId || val?.id,
        warehouseId: values?.destinationWarehouseId?.id,
      })
      if (checkItem?.statusCode === 200) {
        if (checkItem?.data?.length > 0) {
          setFieldValue(`items[${index}].itemCodeWarehouseImp`, true)
        } else {
          setFieldValue(`items[${index}].itemCodeWarehouseImp`, false)
        }
      }
      setFieldValue(`items[${index}].debitAcc`, '1519')
      if (values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG) {
        // const storageDate = await getListStorageDateApi(val?.itemId || val?.id)
        // if (storageDate?.statusCode === 200) {
        //   storageDate?.data?.storageDates?.forEach((item) => {
        //     const findStorage = storageDates?.find(
        //       (date) =>
        //         date?.itemId === item?.itemId &&
        //         new Date(date?.storageDate)?.toISOString() ===
        //           new Date(item?.storageDate)?.toISOString(),
        //     )
        //     if (isEmpty(findStorage)) {
        //       storageDates.push(item)
        //     }
        //   })
        //   setStorageDates([...storageDates])
        // }
      }
    } else {
      setFieldValue(`items[${index}].planExportedQuantity`, '')
      setFieldValue(`items[${index}].transferQuantity`, '')
      setFieldValue(`items[${index}].creditAcc`, '')
      setFieldValue(`items[${index}].itemCodeWarehouseImp`, false)
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
            locatorId: payload?.row?.loactor?.locatorId || null,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data
        ?.find(
          (item) =>
            item?.itemId ===
              (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId) &&
            item?.lotNumber === val,
        )
        ?.itemAvailables?.find(
          (e) =>
            e?.itemId ===
              (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId) &&
            e?.lotNumber === val,
        )
      setFieldValue(
        `items[${index}].planExportedQuantity`,
        planExportedQuantity?.quantity,
      )
    }
  }
  const handleChangeLocator = async (val, index, payload) => {
    if (val) {
      setFieldValue(`items[${index}].warehouseImportDate`, '')
      const storageDate = await getListStorageDateApi({
        id: payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId,
        locatorId: val?.locatorId,
      })
      if (storageDate?.statusCode === 200) {
        storageDate?.data?.storageDates?.forEach((item) => {
          const findStorage = storageDates?.find(
            (date) =>
              date?.itemId === item?.itemId &&
              date?.locatorId === item?.locatorId &&
              new Date(date?.storageDate)?.toISOString() ===
                new Date(item?.storageDate)?.toISOString(),
          )
          if (isEmpty(findStorage)) {
            storageDates.push(item)
          }
        })
        setStorageDates([...storageDates])
      }
      const params = {
        items: [
          {
            itemId:
              payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId,
            warehouseId: values?.sourceWarehouseId?.id,
            lotNumber: payload?.row?.lotNumber || null,
            locatorId: val?.locatorId || null,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data
        ?.find(
          (item) =>
            item?.itemId ===
            (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId),
        )
        ?.itemAvailables?.find(
          (e) =>
            e?.itemId ===
              (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId) &&
            e?.locatorId === val?.locatorId,
        )
      setFieldValue(
        `items[${index}].planExportedQuantity`,
        planExportedQuantity?.quantity,
      )
    }
  }
  const handleChangeStorageDate = async (val, index, payload) => {
    setFieldValue(`items[${index}].planExportedQuantity`, '')
    const params = {
      items: [
        {
          itemId: payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId,
          warehouseId: values?.sourceWarehouseId?.id,
          lotNumber: payload?.row?.lotNumber || null,
          locatorId: payload?.row?.locator?.locatorId || null,
          storageDate: new Date(
            add(new Date(val), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 7,
              minutes: 0,
              seconds: 0,
            }),
          ),
        },
      ],
    }
    if (val) {
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data
        ?.find(
          (item) =>
            item?.itemId ===
            (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId),
        )
        ?.itemAvailables?.find(
          (e) =>
            e?.itemId ===
              (payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId) &&
            e?.locatorId === payload?.row?.locator?.locatorId,
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
          const itemIdCodeList = items?.map(
            (item) => item?.itemCode?.id || item?.itemCode?.itemId,
          )
          return isView ? (
            <>{params?.row?.itemCode?.code}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              asyncRequest={(s) =>
                getListItemWarehouseStockApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: values?.sourceWarehouseId?.id,
                    status: ACTIVE_STATUS.ACTIVE,
                  }),
                })
              }
              asyncRequestDeps={values?.sourceWarehouseId}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => {
                return opt?.id === val?.id
              }}
              required
              disabled={
                !values?.sourceWarehouseId || !values?.destinationWarehouseId
              }
              onChange={(val) => handleChangeItem(val, index)}
              getOptionDisabled={(opt) => {
                if (values?.sourceWarehouseId?.manageByLot === 0) {
                  return (
                    itemIdCodeList.some((id) => id === opt?.id) &&
                    opt?.id !== items[index]?.itemCode?.id
                  )
                }
              }}
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
          values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT ||
          values?.type === '',
        renderCell: (params, index) => {
          const { itemCode } = params?.row
          const locationList = params?.row?.itemCode?.locations?.map(
            (item) => ({
              code: item?.locator?.code,
              name: item?.locator?.name,
              locatorId: item?.locator?.locatorId,
            }),
          )
          return isView ? (
            <>{params?.row?.locator?.code}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              options={locationList}
              disabled={isEmpty(itemCode)}
              onChange={(val) => handleChangeLocator(val, index, params)}
              getOptionLabel={(opt) => opt?.code}
              validate={(val) => {
                if (
                  values?.type ===
                  WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
                ) {
                  if (isEmpty(val)) {
                    return t('general:form.required')
                  }
                }
              }}
            />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseTransfer.table.lotNumber'),
        width: 150,
        renderCell: (params, index) => {
          const lotNumberList = flatMap(
            params?.row?.itemCode?.locations,
            'lots',
          )
            ?.filter((e) => e?.lotNumber !== null)
            ?.reduce((unique, o) => {
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
          values?.type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT ||
          type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT,
        renderCell: (params, index) => {
          const storageDateList = storageDates?.filter(
            (item) =>
              item?.itemId ===
                (params?.row?.itemCode?.itemId || params?.row?.itemCode?.id) &&
              item?.locatorId === params?.row?.locator?.locatorId,
          )
          return isView ? (
            params?.row?.storageDate
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseImportDate`}
              placeholder={t('warehouseTransfer.table.warehouseImportDate')}
              options={storageDateList}
              getOptionLabel={(opt) => convertUtcDateToLocalTz(opt.storageDate)}
              isOptionEqualToValue={(opt, val) => opt?.storageDate === val}
              getOptionValue={(option) => option?.storageDate}
              disabled={isEmpty(params?.row?.locator)}
              onChange={(val) => handleChangeStorageDate(val, index, params)}
              validate={(val) => {
                if (
                  values?.type ===
                  WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_LONG
                ) {
                  if (isEmpty(val)) {
                    return t('general:form.required')
                  }
                }
              }}
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
            <NumberFormatText
              value={params?.row?.planExportedQuantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].planExportedQuantity`}
              formatter="quantity"
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
            <NumberFormatText
              value={params?.row?.transferQuantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].transferQuantity`}
              formatter="quantity"
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
            status !== TRANSFER_STATUS.EXPORTED &&
            status !== TRANSFER_STATUS.EXPORTING &&
            status !== TRANSFER_STATUS.INCOLLECTING),
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={params?.row?.exportedQuantity}
              formatter="quantity"
            />
          )
        },
      },
      {
        field: 'actualImportedQuantity',
        headerName: t('warehouseTransfer.table.actualImportedQuantity'),
        hide:
          !isView ||
          (status !== TRANSFER_STATUS.COMPLETED &&
            status !== TRANSFER_STATUS.EXPORTED &&
            status !== TRANSFER_STATUS.EXPORTING &&
            status !== TRANSFER_STATUS.INCOLLECTING),
        width: 180,
        renderCell: (params) => {
          return (
            <NumberFormatText
              value={params?.row?.actualQuantity}
              formatter="quantity"
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
            <Checkbox checked={params?.row?.itemCodeWarehouseImp} disabled />
          ) : (
            <FormControlLabel
              control={
                <Field.Checkbox
                  name={`items[${index}].itemCodeWarehouseImp`}
                  disabled
                />
              }
              label=""
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('warehouseTransfer.table.price'),
        width: 180,
        hide:
          !isView ||
          (status !== TRANSFER_STATUS.COMPLETED &&
            status !== TRANSFER_STATUS.EXPORTED &&
            status !== TRANSFER_STATUS.EXPORTING &&
            status !== TRANSFER_STATUS.INCOLLECTING),
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText value={params?.row?.price} formatter="price" />
          ) : (
            <Field.TextField
              name={`items[${index}].price`}
              formatter="price"
              disabled={true}
            />
          )
        },
      },
      {
        field: 'amount',
        headerName: t('warehouseTransfer.table.amount'),
        width: 180,
        hide:
          !isView ||
          (status !== TRANSFER_STATUS.COMPLETED &&
            status !== TRANSFER_STATUS.EXPORTED &&
            status !== TRANSFER_STATUS.EXPORTING &&
            status !== TRANSFER_STATUS.INCOLLECTING),
        renderCell: (params, index) => {
          return isView ? (
            <NumberFormatText value={params?.row?.amount} formatter="price" />
          ) : (
            <Field.TextField
              name={`items[${index}].amount`}
              formatter="price"
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
            params?.row?.debitAcc?.length === LENGTH_DEBITACCOUNT ? (
              params?.row?.debitAcc
                .toString()
                .slice(18, 29)
                .replace(/^(\d*?[1-9])0+$/, '$1')
            ) : (
              params?.row?.debitAcc
            )
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
            params?.row?.creditAcc?.length === LENGTH_DEBITACCOUNT ? (
              params?.row?.creditAcc
                .toString()
                .slice(18, 29)
                .replace(/^(\d*?[1-9])0+$/, '$1')
            ) : (
              params?.row?.creditAcc
            )
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
        renderCell: (_, index) => {
          return isView ? null : (
            <IconButton
              onClick={() => arrayHelpers.remove(index)}
              disabled={items?.length === 1}
              size="large"
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [
      values?.type,
      values?.sourceWarehouseId,
      values?.items,
      storageDates,
      values?.destinationWarehouseId,
    ],
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
                  itemCodeWarehouseImp: false,
                  locator: '',
                  lotNumber: '',
                  planQuantity: 1,
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
