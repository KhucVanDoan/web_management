import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { TABLE_NAME_ENUM } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'
const ItemSettingTable = ({
  items,
  mode,
  arrayHelpers,
  itemList,
  setFieldValue,
  values,
  debitAccount,
}) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const hiden = Boolean(values?.warehouseId?.manageByLot)
  const warehouseExprotProposal =
    values?.businessTypeId?.bussinessTypeAttributes?.find(
      (item) => item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
    )?.id

  const {
    data: { itemWarehouseStockList },
  } = useWarehouseTransfer()
  const handleChangeItem = async (val, index) => {
    if (!isEmpty(val)) {
      const params = {
        items: [
          {
            itemId: val?.itemId || val?.id,
            warehouseId: values?.warehouseId?.id,
            lotNumber: null,
            locatorId: null,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(params)
      const planExportedQuantity = res?.data?.find(
        (item) => item?.itemId === val?.itemId || val?.id,
      )
      setFieldValue(
        `items[${index}].planExportedQuantity`,
        planExportedQuantity?.quantity,
      )
    }
    if (val?.itemWarehouseSources?.length > 0) {
      setFieldValue(
        `items[${index}].creditAccount`,
        val?.itemWarehouseSources[0]?.accounting,
      )
    }

    setFieldValue(`items[${index}].itemName`, val?.item?.name || val?.name)
    setFieldValue(
      `items[${index}].unit`,
      val?.item?.itemUnit || val?.itemUnit?.name,
    )
  }
  const handleChangeLotNumber = async (val, index, payload) => {
    if (val) {
      const params = {
        items: [
          {
            itemId:
              payload?.row?.itemCode?.id || payload?.row?.itemCode?.itemId,
            warehouseId: values?.warehouseId?.id,
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
          return isView ? (
            params?.row?.suplliesCode
          ) : itemList?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemList}
              getOptionLabel={(opt) => opt?.item?.code}
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) => opt?.itemId === val?.itemId}
              disabled={isEmpty(values?.warehouseId)}
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemWarehouseStockList}
              getOptionLabel={(opt) => opt?.code}
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              disabled={isEmpty(values?.warehouseId)}
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.suppliesName
          ) : (
            <Field.TextField
              name={`items[${index}].itemName`}
              required
              disabled
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.unit
          ) : (
            <Field.TextField name={`items[${index}].unit`} required disabled />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseExportReceipt.items.lotNumber'),
        width: 250,
        renderCell: (params, index) => {
          const lotsSelected = items
            ?.filter(
              (selectedItem) =>
                selectedItem?.itemCode?.code === params?.row?.itemCode?.code &&
                selectedItem?.id !== params?.row?.id,
            )
            ?.map((selectedItem) => selectedItem.lotNumber)
          const locationList = itemWarehouseStockList?.find(
            (item) =>
              item?.id === params?.row?.itemCode?.id ||
              item?.id === params?.row?.itemCode?.itemId,
          )
          const lotNumbers = itemList?.find(
            (item) =>
              item?.itemId === params?.row?.itemCode?.id ||
              item?.itemId === params?.row?.itemCode?.itemId,
          )
          return itemList?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumbers?.lots?.filter(
                (lot) => !lotsSelected.includes(lot.lotNumber),
              )}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              disabled={!hiden}
              isOptionEqualToValue={(opt, val) =>
                opt?.lotNumber === val?.lotNumber
              }
              validate={(val) => {
                if (values?.warehouseId?.manageByLot) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
              onChange={(val) => handleChangeLotNumber(val, index, params)}
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={flatMap(locationList?.locations, 'lots')?.filter(
                (lot) => !lotsSelected.includes(lot.lotNumber),
              )}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              isOptionEqualToValue={(opt, val) =>
                opt?.lotNumber === val?.lotNumber
              }
              disabled={!hiden}
              onChange={(val) => handleChangeLotNumber(val, index, params)}
              validate={(val) => {
                if (values?.warehouseId?.manageByLot) {
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
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].itemCode.requestedQuantity`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantityExport
          ) : (
            <Field.TextField
              name={`items[${index}].quantityExport`}
              placeholder={t('warehouseExportReceipt.items.quantityExport')}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              validate={(val) => {
                if (val > params?.row?.planExportedQuantity) {
                  return t('general:form.maxNumber', {
                    max: params?.row?.planExportedQuantity,
                  })
                }
              }}
            />
          )
        },
      },
      {
        field: 'planExportedQuantity',
        headerName: t('warehouseExportReceipt.items.planExportedQuantity'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.planExportedQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].planExportedQuantity`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'unitPriceRefer',
        headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].unitPriceRefer`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'totalMoney',
        headerName: t('warehouseExportReceipt.items.totalMoney'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].totalMoney`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('warehouseExportReceipt.items.debitAccount'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].debitAccount`}
              value={debitAccount}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('warehouseExportReceipt.items.creditAccount'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].creditAccount`}
              disabled
              required
            />
          )
        },
      },
      items?.length > 1 && {
        field: 'action',
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
    [
      items,
      itemList,
      values,
      itemWarehouseStockList,
      values[warehouseExprotProposal],
      debitAccount,
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
        <Typography variant="h4" component="span">
          {t('warehouseExportReceipt.items.suppliesList')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                suppliesCode: '',
                suppliesName: '',
                unit: '',
                lotNumber: '',
                quantityRequest: '',
                quantityExport: '',
                planExportedQuantity: '',
                unitPriceRefer: '',
                totalMoney: '',
                debitAccount: '',
                creditAccount: '',
              })
            }}
            disabled={items?.length === 10}
          >
            {t('warehouseExportReceipt.addButton')}
          </Button>
        )}
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
