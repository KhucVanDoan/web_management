import React, { useEffect } from 'react'

import { createFilterOptions, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { PURCHASED_ORDER_STATUS } from '~/modules/database/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import { scrollToBottom } from '~/utils'

function ItemSettingTable({
  items,
  mode,
  arrayHelpers,
  requestBuyMaterialId,
  setFieldValue,
  purchasedOrderDetails,
  values,
}) {
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { itemList },
    actions,
  } = useCommonManagement()

  const {
    data: { requestBuyMaterialDetails },
    actions: requestBuyMaterialAction,
  } = useRequestBuyMaterial()

  const requestBuyMaterial = values?.requestBuyMaterialCode
    ? requestBuyMaterialDetails?.itemDetails?.map((item) => item)
    : itemList.filter((i) => i.itemType?.code === '00')

  useEffect(() => {
    actions.getItems({})
    actions.getWarehouses({})
    actions.getBoms({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    if (requestBuyMaterialId)
      requestBuyMaterialAction.getRequestBuyMaterialDetailsById(
        requestBuyMaterialId,
      )
  }, [requestBuyMaterialId])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const onChangeItem = (id, index, setFieldValue) => {
    const quantity = requestBuyMaterial.find(
      (material) => material.id === id,
    )?.quantity
    setFieldValue(`items[${index}].itemPrice`, getItemObject(id)?.price || 0)
    setFieldValue(`items[${index}].quantity`, +quantity || 0)
  }

  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemName',
        headerName: t('purchasedOrder.item.name'),
        width: 220,
        renderCell: (params, index) => {
          const { itemId } = params.row

          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(itemId)?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={requestBuyMaterial}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionValue={(opt) => opt?.itemId || opt?.id || ''}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some(
                  (id) =>
                    id === (opt?.id || opt?.itemId) &&
                    (opt?.id || opt?.itemId) !== items[index]?.itemId,
                )
              }
              onChange={(id) => onChangeItem(id, index, setFieldValue)}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'itemCode',
        headerName: t('purchasedOrder.item.code'),
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].code`}
              value={getItemObject(itemId)?.code || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'itemType',
        headerName: t('purchasedOrder.item.type'),
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.itemType.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].type`}
              value={getItemObject(itemId)?.itemType.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('purchasedOrder.item.quantity'),
        align: 'right',
        renderCell: (params, index) => {
          const { quantity } = params.row
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              disabled={isView}
              numberProps={{
                decimalScale: 3,
              }}
            />
          )
        },
      },
      ...(PURCHASED_ORDER_STATUS.IN_PROGRESS ===
        purchasedOrderDetails?.status ||
      PURCHASED_ORDER_STATUS.COMPLETED === purchasedOrderDetails?.status
        ? [
            {
              field: 'remainQuantity',
              headerName: t('purchasedOrder.item.remainQuantity'),
              align: 'right',
              renderCell: (params, index) => {
                const { quantity } = params.row
                return (
                  +quantity -
                  Number(
                    purchasedOrderDetails?.purchasedOrderDetails?.[index]
                      ?.actualQuantity,
                  )
                )
              },
            },
            {
              field: 'actualQuantity',
              headerName: t('purchasedOrder.item.actualQuantity'),
              align: 'right',
              renderCell: (params, index) => {
                return Number(
                  purchasedOrderDetails?.purchasedOrderDetails?.[index]
                    ?.actualQuantity,
                )
              },
            },
          ]
        : []),
      {
        field: 'unitType',
        headerName: t('purchasedOrder.item.unitType'),
        renderCell: (params, index) => {
          const { itemId } = params.row
          return isView ? (
            <>{getItemObject(itemId)?.itemUnit?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].unitType`}
              value={getItemObject(itemId)?.itemUnit?.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'itemPrice',
        headerName: t('purchasedOrder.item.price'),
        align: 'right',
        renderCell: (params, index) => {
          return isView ? (
            <>{<NumberFormatText value={items[index]?.price || ''} />}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemPrice`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 3,
              }}
              disabled
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
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
        <Typography variant="h4">{t('purchasedOrder.itemsDetails')}</Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: null,
                  quantity: 1,
                  warehouseId: null,
                })
                scrollToBottom()
              }}
            >
              {t('purchasedOrder.item.addItem')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns()}
        total={items?.length}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
