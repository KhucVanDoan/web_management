import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import {
  ACTIVE_STATUS,
  LENGTH_DEBITACCOUNT,
  TABLE_NAME_ENUM,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { convertFilterParams, scrollToBottom } from '~/utils'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const {
    items,
    mode,
    arrayHelpers,
    itemList,
    setFieldValue,
    values,
    creditAccount,
    receiptDetail,
    isEdit,
  } = props
  const {
    data: { warehouseImportReceiptDetails },
  } = useWarehouseImportReceipt()
  const isView = mode === MODAL_MODE.DETAIL
  const receiptRequired = values?.businessTypeId?.bussinessTypeAttributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT,
  )?.id
  const valuesReceiptRequired = warehouseImportReceiptDetails?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT && item?.value,
  )
  const valuesReceiptRequiredtransaction = receiptDetail?.attributes?.find(
    (item) => item?.tableName === TABLE_NAME_ENUM.RECEIPT && item?.value,
  )
  const warehouseExportProposal =
    values?.businessTypeId?.bussinessTypeAttributes?.find(
      (item) => item?.tableName === 'warehouse_export_proposals',
    )?.id
  const handleChangeItem = (val, index) => {
    setFieldValue(
      `items[${index}].itemName`,
      val?.item?.name || val?.name || val?.itemCode?.name,
    )
    if (val?.itemWarehouseSources?.length > 0) {
      setFieldValue(
        `items[${index}].debitAcc`,
        val?.itemWarehouseSources
          ?.find((item) => item?.warehouseId === values?.warehouse?.id)
          ?.accounting?.replace(/^(\d*?[1-9])0+$/, '$1'),
      )
    }
    if (!isEmpty(warehouseExportProposal) && isEmpty(receiptRequired)) {
      setFieldValue(`items[${index}].importQuantity`, +val?.quantity)
    }
    setFieldValue(
      `items[${index}].unit`,
      val?.item?.itemUnit ||
        val?.itemUnit?.name ||
        val?.itemCode?.itemUnit?.name,
    )
    setFieldValue(`items[${index}].importQuantity`, '')
    setFieldValue(`items[${index}].money`, '')
    if (!isEmpty(values[receiptRequired])) {
      setFieldValue(`items[${index}].importQuantity`, +val?.quantity)
      setFieldValue(`items[${index}].quantity`, +val?.quantity)
      setFieldValue(`items[${index}].requestedQuantity`, +val?.quantity)
    }
  }

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('warehouseImportReceipt.table.number'),
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseImportReceipt.table.itemCode'),
        width: 250,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map(
            (item) =>
              item?.itemCode?.itemCode?.itemId ||
              item?.itemCode?.itemId ||
              item?.itemCode?.id,
          )
          return isView || isEdit ? (
            params?.row?.item?.code || params?.row?.itemCode?.item?.code
          ) : itemList?.length > 0 && isEmpty(values[receiptRequired]) ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemList}
              getOptionLabel={(opt) => opt?.item?.code || opt?.itemCode?.code}
              getOptionSubLabel={(opt) =>
                opt?.item?.name || opt?.itemCode?.name
              }
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) =>
                (opt?.itemId || opt?.itemCode?.itemId) ===
                (val?.itemId || val?.itemCode?.itemId)
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
            />
          ) : !isEmpty(values[receiptRequired]) ? (
            params?.row?.itemCode?.code
          ) : !isEmpty(values[warehouseExportProposal]) &&
            isEmpty(values[receiptRequired]) ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={[]}
              getOptionLabel={(opt) => opt?.item?.code || opt?.itemCode?.code}
              getOptionSubLabel={(opt) =>
                opt?.item?.name || opt?.itemCode?.name
              }
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) =>
                opt?.itemCode?.itemId === val?.itemCode?.itemId
              }
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.itemId) &&
                opt?.itemId !==
                  (items[index]?.itemCode?.itemId || items[index]?.itemCode?.id)
              }
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              placeholder={t('warehouseImportReceipt.table.itemCode')}
              asyncRequest={(s) =>
                searchMaterialsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: ACTIVE_STATUS.ACTIVE,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              onChange={(val) => handleChangeItem(val, index)}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name || ''}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.itemCode?.id
              }
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseImportReceipt.table.itemName'),
        width: 180,
        renderCell: (params, index) => {
          return isView || isEdit ? (
            params?.row?.item?.name || params?.row?.itemCode?.item?.name
          ) : !isEmpty(values[receiptRequired]) ? (
            params?.row?.itemCode?.name
          ) : (
            <Field.TextField name={`items[${index}].itemName`} disabled />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseImportReceipt.table.unit'),
        width: 180,
        renderCell: (params, index) => {
          return isView || isEdit ? (
            params?.row?.item?.itemUnit || params?.row?.itemCode?.item?.itemUnit
          ) : !isEmpty(values[receiptRequired]) ? (
            params?.row?.itemCode?.itemUnit || params?.row?.unit
          ) : (
            <Field.TextField name={`items[${index}].unit`} disabled />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseImportReceipt.table.lotNumber'),
        width: 180,
        hide: !isView,
        renderCell: (params) => {
          return params?.row?.lots[0]?.lotNumber
        },
      },
      {
        field: 'requireQuantity',
        headerName: t('warehouseImportReceipt.table.requireQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView || isEdit ? (
            <NumberFormatText
              value={
                valuesReceiptRequired || valuesReceiptRequiredtransaction
                  ? params?.row?.quantity
                  : params?.row?.requestedQuantityWarehouseExportProposal
              }
              formatter="quantity"
            />
          ) : !isEmpty(values[warehouseExportProposal]) &&
            isEmpty(values[receiptRequired]) ? (
            <Field.TextField
              name={`items[${index}].requestedQuantity`}
              value={+params?.row?.itemCode?.requestedQuantity}
              formatter="quantity"
              disabled
            />
          ) : !isEmpty(values[receiptRequired]) ? (
            <NumberFormatText
              value={params?.row?.quantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].requestedQuantity`}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView || isEdit ? (
            <NumberFormatText
              value={+params?.row?.importQuantity || params?.row?.quantity}
              formatter="quantity"
            />
          ) : !isEmpty(values[receiptRequired]) ? (
            <NumberFormatText
              value={params?.row?.importQuantity}
              formatter="quantity"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].importQuantity`}
              formatter="quantity"
              // validate={(val) => {
              //   if (val) {
              //     if (val > params?.row?.itemCode?.requestedQuantity) {
              //       return t('general:form.maxNumber', {
              //         max: params?.row?.itemCode?.requestedQuantity,
              //       })
              //     }
              //   }
              // }}
            />
          )
        },
      },
      {
        field: 'money',
        headerName: t('warehouseImportReceipt.table.money'),
        width: 180,
        headerAlign: 'left',
        align: 'right',
        renderCell: (params, index) => {
          return isView || isEdit ? (
            <NumberFormatText
              value={params?.row?.amount || params?.row?.money}
              formatter="price"
            />
          ) : !isEmpty(values[receiptRequired]) ? (
            <NumberFormatText value={params?.row?.money} formatter="price" />
          ) : (
            <Field.TextField name={`items[${index}].money`} formatter="price" />
          )
        },
      },
      {
        field: 'price',
        headerName: t('warehouseImportReceipt.table.price'),
        width: 180,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return isView || isEdit ? (
            <NumberFormatText value={params?.row?.price} formatter="price" />
          ) : !isEmpty(values[receiptRequired]) ? (
            <NumberFormatText
              value={Number(params?.row?.money / params?.row?.importQuantity)}
              formatter="price"
            />
          ) : (
            <Field.TextField
              name={`items[${index}].price`}
              value={params?.row?.money / params?.row?.importQuantity}
              formatter="price"
              disabled
            />
          )
        },
      },
      {
        field: 'debitAcc',
        headerName: t('warehouseImportReceipt.table.debitAcc'),
        width: 180,
        renderCell: (params, index) => {
          return isView || isEdit ? (
            params?.row?.debitAccount?.length === LENGTH_DEBITACCOUNT ? (
              params?.row?.debitAccount
                .slice(18, 29)
                .replace(/^(\d*?[1-9])0+$/, '$1')
            ) : (
              params?.row?.debitAccount
            )
          ) : !isEmpty(values[receiptRequired]) ? (
            params?.row?.debitAcc
          ) : (
            <Field.TextField name={`items[${index}].debitAcc`} disabled />
          )
        },
      },
      {
        field: 'creditAcc',
        headerName: t('warehouseImportReceipt.table.creditAcc'),
        width: 250,
        renderCell: (params, index) => {
          return isView || (isEdit && !warehouseImportReceiptDetails?.ebsId) ? (
            params?.row?.creditAccount?.length === LENGTH_DEBITACCOUNT ? (
              params?.row?.creditAccount
                .slice(18, 29)
                .replace(/^(\d*?[1-9])0+$/, '$1')
            ) : (
              params?.row?.creditAccount
            )
          ) : isEdit && warehouseImportReceiptDetails?.ebsId ? (
            <Field.TextField
              name={`items[${index}].creditAccount`}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              validate={(val) => {
                if (!val) {
                  return t('general:form.required')
                }
              }}
            />
          ) : !isEmpty(values[receiptRequired]) ? (
            params?.row?.creditAccount
          ) : (
            <Field.TextField
              name={`items[${index}].creditAcc`}
              value={creditAccount.replace(/^(\d*?[1-9])0+$/, '$1')}
              disabled
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        hide:
          (items || []).length <= 1 ||
          isView ||
          !isEmpty(values[receiptRequired]),
        renderCell: (params, idx) => {
          return isView || isEdit ? null : (
            <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [
      items,
      itemList,
      creditAccount,
      values?.warehouse,
      values?.businessTypeId,
      isView,
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
          {t('warehouseImportReceipt.table.title')}
        </Typography>
        {!isView && !isEdit && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemCode: '',
                  itemName: '',
                  unit: '',
                  qcCheck: false,
                  lotNumber: '',
                  money: '',
                  importQuantity: '',
                  price: '',
                  debitAcc: '',
                  creditAcc: '',
                })
                scrollToBottom()
              }}
              disabled={
                !isEmpty(values[receiptRequired]) || items?.length === 10
              }
            >
              {t('warehouseImportReceipt.table.addButton')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemsSettingTable
