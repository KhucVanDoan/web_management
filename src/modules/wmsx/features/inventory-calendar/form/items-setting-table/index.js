import React, { useEffect } from 'react'

import { createFilterOptions, IconButton } from '@mui/material'
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
import useDefineWarehousePallet from '~/modules/wmsx/redux/hooks/useDefineWarehousePallet'
import useDefineWarehouseShelf from '~/modules/wmsx/redux/hooks/useDefineWarehouseShelf'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
import { scrollToBottom } from '~/utils'

function ItemSettingTable({
  items,
  mode,
  arrayHelpers,
  values,
  setFieldValue,
}) {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { warehouseAreaList },
    actions: sectorActions,
  } = useWarehouseArea()

  const {
    data: { defineWarehouseShelfList },
    actions: shelfActions,
  } = useDefineWarehouseShelf()

  const {
    data: { defineWarehousePalletList },
    actions: palletActions,
  } = useDefineWarehousePallet()

  useEffect(() => {
    sectorActions.searchWarehouseAreas({ isGetAll: 1 })
    shelfActions.searchDefineWarehouseShelf({ isGetAll: 1 })
    palletActions.searchDefineWarehousePallet({ isGetAll: 1 })
  }, [])

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
        field: 'warehouseSectorName',
        headerName: t('inventoryCalendar.items.warehouseSectorName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehouseSectorName } = params.row

          const itemIdCodeList = items.map(
            (item) => item.warehouseSectorName?.id,
          )
          return isView ? (
            <>{warehouseSectorName}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseSectorName`}
              options={warehouseAreaList.filter(
                (sector) => sector.warehouseId === values?.warehouses?.id,
              )}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehouseSectorName?.id
              }
              onChange={() => setFieldValue('warehouseShelfName', null)}
            />
          )
        },
      },
      {
        field: 'warehouseShelfName',
        headerName: t('inventoryCalendar.items.warehouseShelfName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehouseShelfName } = params.row

          const itemIdCodeList = items.map(
            (item) => item.warehouseShelfName?.id,
          )
          return isView ? (
            <>{warehouseShelfName}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehouseShelfName`}
              options={defineWarehouseShelfList.filter(
                (shelf) =>
                  shelf.warehouseSector?.id ===
                  items[index].warehouseSectorName,
              )}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehouseShelfName?.id
              }
            />
          )
        },
      },
      {
        field: 'warehousePalletName',
        headerName: t('inventoryCalendar.items.warehousePalletName'),
        width: 220,
        renderCell: (params, index) => {
          const { warehousePalletName } = params.row

          const itemIdCodeList = items.map(
            (item) => item.warehousePalletName?.id,
          )
          return isView ? (
            <>{warehousePalletName}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].warehousePalletName`}
              options={defineWarehousePalletList.filter(
                (pallet) =>
                  pallet.warehouseShelf?.id === items[index].warehouseShelfName,
              )}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehousePalletName?.id
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
                  warehouseSectorName: null,
                  warehouseShelfName: null,
                  warehousePalletName: null,
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
