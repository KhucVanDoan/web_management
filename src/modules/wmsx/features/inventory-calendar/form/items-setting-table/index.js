import React from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { searchDefineWarehousePalletApi } from '~/modules/wmsx/redux/sagas/define-warehouse-pallet/search-define-warehouse-pallet'
import { searchDefineWarehouseShelfApi } from '~/modules/wmsx/redux/sagas/define-warehouse-shelf/search-define-warehouse-shelf'
import { searchWarehouseAreasApi } from '~/modules/wmsx/redux/sagas/warehouse-area/search-warehouse-areas'
import { convertFilterParams, scrollToBottom } from '~/utils'

function ItemSettingTable({
  items,
  mode,
  arrayHelpers,
  values,
  setFieldValue,
}) {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'warehouseName',
        headerName: t('inventoryCalendar.items.warehouseName'),
        width: 180,
        renderCell: (params, index) => {
          const { warehouseName } = params.row

          return isView ? (
            <>{warehouseName}</>
          ) : (
            <Field.TextField
              name={`items[${index}].warehouseName`}
              value={values?.warehouses?.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'warehouseSector',
        headerName: t('inventoryCalendar.items.warehouseSectorName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehouseSector } = params.row

          const itemIdCodeList = items.map((item) => item.warehouseSector?.id)
          return isView ? (
            <>{warehouseSector?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseSector`}
              asyncRequest={(s) =>
                searchWarehouseAreasApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: values?.warehouses?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehouseSector?.id
              }
              onChange={() => setFieldValue('warehouseShelf', null)}
            />
          )
        },
      },
      {
        field: 'warehouseShelf',
        headerName: t('inventoryCalendar.items.warehouseShelfName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehouseShelf } = params.row

          const itemIdCodeList = items.map((item) => item.warehouseShelf?.id)
          return isView ? (
            <>{warehouseShelf?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseShelf`}
              asyncRequest={(s) =>
                searchDefineWarehouseShelfApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseSectorId: items[index].warehouseSector?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehouseShelf?.id
              }
            />
          )
        },
      },
      {
        field: 'warehousePallet',
        headerName: t('inventoryCalendar.items.warehousePalletName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehousePallet } = params.row

          const itemIdCodeList = items.map((item) => item.warehousePallet?.id)
          return isView ? (
            <>{warehousePallet?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehousePallet`}
              asyncRequest={(s) =>
                searchDefineWarehousePalletApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseShelfId: items[index]?.warehouseShelf?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehousePallet?.id
              }
            />
          )
        },
      },
      {
        field: 'itemCode',
        headerName: t('inventoryCalendar.items.itemCode'),
        width: 220,
        renderCell: (params, index) => {
          const { itemCode } = params.row
          const itemIdCodeList = items.map(
            (item) => item.itemId?.itemId || item.itemId?.id,
          )
          return isView ? (
            <>{itemCode}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              asyncRequest={(s) =>
                searchItemsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !==
                  (items[index]?.itemId?.itemId || items[index]?.itemId?.id)
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryCalendar.items.itemName'),
        width: 180,
        renderCell: (params, index) => {
          const { itemName } = params.row
          return isView ? (
            <>{itemName}</>
          ) : (
            <Field.TextField
              name={`items[${index}].itemName`}
              value={items[index]?.itemId?.name || ''}
              disabled={true}
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
        <Typography variant="h4">
          {t('inventoryCalendar.items.tableTitle')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  warehouseName: '',
                  warehouseSector: null,
                  warehouseShelf: null,
                  warehousePallet: null,
                  itemId: null,
                  itemName: '',
                })
                scrollToBottom()
              }}
            >
              {t('inventoryCalendar.items.addButton')}
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
