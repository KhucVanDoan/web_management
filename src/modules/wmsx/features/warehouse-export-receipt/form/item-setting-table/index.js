import React, { useMemo } from 'react'

import { createFilterOptions, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { flatMap, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { OrderTypeEnum, TABLE_NAME_ENUM } from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'
const ItemSettingTable = ({
  items,
  mode,
  arrayHelpers,
  itemList,
  itemWarehouseExportProposal,
  setFieldValue,
  values,
  debitAccount,
  warehouseExportProposalId,
}) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const hiden = Boolean(
    values?.warehouseId?.isManageByLot || values?.warehouseId?.manageByLot,
  )
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
        order: !isEmpty(values[warehouseExprotProposal])
          ? {
              orderType: OrderTypeEnum.PROPOSAL,
              orderId: warehouseExportProposalId,
            }
          : null,
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
        val?.itemWarehouseSources?.find(
          (item) => item?.warehouseId === values?.warehouseId?.id,
        )?.accounting,
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
  const filterOptions = createFilterOptions({
    stringify: ({ code, name }) => `${code} ${name}`,
  })
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
          const itemIdCodeList = items.map(
            (item) =>
              item?.itemCode?.itemCode?.itemId ||
              item?.itemCode?.itemId ||
              item?.itemCode?.id,
          )
          return isView ? (
            params?.row?.suplliesCode
          ) : !isEmpty(values[warehouseExprotProposal]) ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemWarehouseExportProposal?.filter(
                (item) => item?.warehouseExport?.id === values?.warehouseId?.id,
              )}
              getOptionLabel={(opt) => opt?.item?.code}
              getOptionSubLabel={(opt) => opt?.item?.name}
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) =>
                opt?.item?.itemId === val?.itemId
              }
              getOptionDisabled={(opt) =>
                itemIdCodeList.some(
                  (id) => id === (opt?.itemId || opt?.itemCode?.itemId),
                ) &&
                (opt?.itemId || opt?.itemCode?.itemId) !==
                  (items[index]?.itemId ||
                    items[index]?.itemCode?.itemId ||
                    items[index]?.itemCode?.id)
              }
              disabled={isEmpty(values?.warehouseId)}
            />
          ) : itemList?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemList}
              getOptionLabel={(opt) => opt?.item?.code}
              getOptionSubLabel={(opt) => opt?.item?.name}
              onChange={(val) => handleChangeItem(val, index)}
              filterOptions={filterOptions}
              // filterSelectedOptions
              isOptionEqualToValue={(opt, val) =>
                opt?.itemId === (val?.itemId || val?.id)
              }
              getOptionDisabled={(opt) =>
                itemIdCodeList.some(
                  (id) => id === (opt?.itemId || opt?.itemCode?.itemId),
                ) &&
                (opt?.itemId || opt?.itemCode?.itemId) !==
                  (items[index]?.itemId ||
                    items[index]?.itemCode?.itemId ||
                    items[index]?.itemCode?.id)
              }
              disabled={isEmpty(values?.warehouseId)}
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemWarehouseStockList}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              filterOptions={filterOptions}
              // filterSelectedOptions
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) =>
                opt?.id === (val?.id || val?.itemId)
              }
              getOptionDisabled={(opt) => {
                if (!hiden) {
                  return (
                    itemIdCodeList.some(
                      (id) => id === (opt?.id || opt?.itemId),
                    ) &&
                    (opt?.id || opt?.itemId) !==
                      (items[index]?.id || items[index]?.itemId)
                  )
                }
              }}
              disabled={isEmpty(values?.warehouseId)}
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
          const lotNumber = []
          itemWarehouseExportProposal?.forEach((item) => {
            if (
              item?.itemId === params?.row?.itemCode?.itemId &&
              item?.lotNumber
            ) {
              const findLotNumber = lotNumber?.find(
                (lot) =>
                  lot?.itemId === item?.itemId &&
                  lot?.lotNumber === item?.lotNumber,
              )
              if (isEmpty(findLotNumber)) {
                lotNumber.push({
                  itemId: item?.itemId,
                  lotNumber: item?.lotNumber,
                })
              }
            }
          })
          return itemList?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumbers?.lots?.filter(
                (lot) => !lotsSelected.includes(lot.lotNumber),
              )}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              disabled={!hiden}
              isOptionEqualToValue={(opt, val) => opt?.lotNumber === val}
              validate={(val) => {
                if (values?.warehouseId?.manageByLot) {
                  if (!val) {
                    return t('general:form.required')
                  }
                }
              }}
              onChange={(val) => handleChangeLotNumber(val, index, params)}
            />
          ) : itemWarehouseExportProposal?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={lotNumber}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              isOptionEqualToValue={(opt, val) => opt?.lotNumber === val}
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
          ) : (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={flatMap(locationList?.locations, 'lots')?.filter(
                (lot) =>
                  !lotsSelected.includes(lot.lotNumber) && lot?.lotNumber,
              )}
              getOptionLabel={(opt) => opt.lotNumber}
              getOptionValue={(option) => option?.lotNumber}
              isOptionEqualToValue={(opt, val) => opt?.lotNumber === val}
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
              formatter="quantity"
              disabled
              required
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
            <NumberFormatText
              value={params?.row?.planExportedQuantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].planExportedQuantity`}
              formatter="quantity"
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
            <NumberFormatText
              value={params?.row?.quantityExport}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].quantityExport`}
              placeholder={t('warehouseExportReceipt.items.quantityExport')}
              formatter="quantity"
            />
          )
        },
      },
      // {
      //   field: 'unitPriceRefer',
      //   headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
      //   hide: !isView,
      //   width: 150,
      //   renderCell: (params, index) => {
      //     return (
      //       <Field.TextField
      //         name={`items[${index}].unitPriceRefer`}
      //         formatter="price"
      //         disabled
      //         required
      //       />
      //     )
      //   },
      // },
      // {
      //   field: 'totalMoney',
      //   headerName: t('warehouseExportReceipt.items.totalMoney'),
      //   width: 150,
      //   hide: !isView,
      //   renderCell: (params, index) => {
      //     return (
      //       <Field.TextField
      //         name={`items[${index}].totalMoney`}
      //         formatter="price"
      //         disabled
      //         required
      //       />
      //     )
      //   },
      // },
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
      {
        field: 'action',
        width: 100,
        align: 'center',
        hide: !items?.length > 1,
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
      values?.businessTypeId,
      itemWarehouseExportProposal,
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
