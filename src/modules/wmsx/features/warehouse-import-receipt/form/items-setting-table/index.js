import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
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
  } = props

  const isView = mode === MODAL_MODE.DETAIL
  const receiptRequired = values?.businessTypeId?.bussinessTypeAttributes?.find(
    (item) => item?.tableName === 'receipts',
  )?.id
  const handleChangeItem = (val, index) => {
    setFieldValue(
      `items[${index}].itemName`,
      val?.item?.name || val?.name || val?.itemCode?.name,
    )
    setFieldValue(
      `items[${index}].unit`,
      val?.item?.itemUnit || val?.itemUnit?.name,
    )
    setFieldValue(
      `items[${index}].debitAcc`,
      val?.itemWarehouseSources[0]?.accounting,
    )

    setFieldValue(`items[${index}].importQuantity`, '')
    setFieldValue(`items[${index}].money`, '')
    if (receiptRequired) {
      setFieldValue(`items[${index}].importQuantity`, val?.requestedQuantity)
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
            (item) => item?.itemCode?.itemId || item?.itemCode?.id,
          )
          return isView ? (
            params?.row?.item?.code
          ) : itemList?.length > 0 ? (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              options={itemList}
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
              asyncRequestDeps={values?.warehouseId}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.itemCode?.id}
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
          return isView ? (
            params?.row?.item?.name
          ) : (
            <Field.TextField
              name={`items[${index}].itemName`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseImportReceipt.table.unit'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.item?.itemUnit
          ) : (
            <Field.TextField name={`items[${index}].unit`} disabled={true} />
          )
        },
      },
      isView && {
        field: 'lotNumber',
        headerName: t('warehouseImportReceipt.table.lotNumber'),
        width: 180,
        renderCell: (params) => {
          return params?.row?.lotNumber
        },
      },
      {
        field: 'requireQuantity',
        headerName: t('warehouseImportReceipt.table.requireQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.requestedQuantity`}
              type="number"
              disabled={true}
            />
          )
        },
      },
      {
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.quantity
          ) : values[receiptRequired] ? (
            <Field.TextField
              name={`items[${index}].importQuantity`}
              disabled={true}
            />
          ) : (
            <Field.TextField
              name={`items[${index}].importQuantity`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              validate={(val) => {
                if (val) {
                  if (val > params?.row?.itemCode?.requestedQuantity) {
                    return t('general:form.maxNumber', {
                      max: params?.row?.itemCode?.requestedQuantity,
                    })
                  }
                }
              }}
            />
          )
        },
      },
      {
        field: 'money',
        headerName: t('warehouseImportReceipt.table.money'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.amount}</>
          ) : (
            <Field.TextField
              name={`items[${index}].money`}
              type="number"
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('warehouseImportReceipt.table.price'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.price
          ) : (
            <Field.TextField
              name={`items[${index}].price`}
              type="number"
              value={params?.row?.money / params?.row?.importQuantity}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'debitAcc',
        headerName: t('warehouseImportReceipt.table.debitAcc'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.debitAccount}</>
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
        headerName: t('warehouseImportReceipt.table.creditAcc'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.creditAccount}</>
          ) : (
            <Field.TextField
              name={`items[${index}].creditAcc`}
              value={creditAccount}
              disabled={true}
            />
          )
        },
      },
      items?.length > 1 && {
        field: 'remove',
        headerName: '',
        width: 50,
        renderCell: (params, idx) => {
          return isView ? null : (
            <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items, itemList, creditAccount],
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
        {!isView && (
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
              disabled={items?.length === 10}
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
