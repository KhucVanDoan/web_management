import React from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  ENUM_BOOLEAN,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { scrollToBottom } from '~/utils'

function ItemSettingTable(props) {
  const { items, mode, arrayHelpers } = props
  const { t } = useTranslation(['database'])
  const isView = mode === MODAL_MODE.DETAIL
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
        renderCell: (params, index) => {
          const item = params?.row?.item
          const itemIdCodeList = items.map((i) => i?.item?.id)

          return isView ? (
            <>{item?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].item`}
              asyncRequest={(s) =>
                searchItemsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: JSON.stringify([
                    {
                      column: 'isHasBom',
                      text: ENUM_BOOLEAN.true,
                    },
                    {
                      column: 'isProductionObject',
                      text: ENUM_BOOLEAN.true,
                    },
                  ]),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              disabled={isView}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.item?.id
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('saleOrder.item.name'),
        width: 180,
        renderCell: (params, index) => {
          const item = params.row?.item
          return isView ? (
            <>{item?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].item.name`}
              value={item?.name || ''}
              disabled={true}
            />
          )
        },
      },

      {
        field: 'quantity',
        headerName: t('saleOrder.item.quantity'),
        width: 100,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          const { quantity } = params.row
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              disabled={isView}
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />
          )
        },
      },
      {
        field: 'unitType',
        headerName: t('saleOrder.item.unitType'),
        width: 200,
        renderCell: (params, index) => {
          const item = params?.row?.item
          return isView ? (
            <>{item?.itemUnit || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].item.itemUnit`}
              value={item?.itemUnit.name || item?.itemUnit || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'price',
        headerName: t('saleOrder.item.itemPrice'),
        width: 100,
        align: 'right',
        headerAlign: 'left',
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
              name={`items[${index}].price`}
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

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
