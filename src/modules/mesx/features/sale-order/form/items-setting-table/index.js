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
import { DEFAULT_ITEM_TYPE_ENUM } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

function ItemSettingTable(props) {
  const { items, mode, arrayHelpers } = props
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemList },
    actions,
  } = useCommonManagement()
  useEffect(() => {
    actions.getItems({})
    actions.getWarehouses({})
    actions.getBoms({ isGetAll: 1 })
  }, [])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }
  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'code',
        headerName: t('saleOrder.item.code'),
        width: 250,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId } = params.row
          const itemListFilter = itemList.filter(
            (item) =>
              item?.itemType?.code === DEFAULT_ITEM_TYPE_ENUM.PRODUCT.code,
          )
          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={itemListFilter}
              disabled={isView}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionValue={(option) => option?.id}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id)
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('saleOrder.item.name'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(itemId)?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].name`}
              value={getItemObject(itemId)?.name || ''}
              disabled={true}
            />
          )
        },
      },

      {
        field: 'quantity',
        headerName: t('saleOrder.item.quantity'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          const { quantity } = params.row
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'unitType',
        headerName: t('saleOrder.item.unitType'),
        width: 180,
        align: 'center',
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
        headerName: t('saleOrder.item.itemPrice'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId } = params.row
          return isView ? (
            <>
              {items?.map((e) => {
                if (e?.itemId === itemId) {
                  return e?.price
                }
                return null
              })}
            </>
          ) : (
            <Field.TextField
              name={`items[${index}].itemPrice`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
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
        <Typography variant="h4">{t('saleOrder.itemsDetails')}</Typography>
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
              {t('saleOrder.item.addItem')}
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
