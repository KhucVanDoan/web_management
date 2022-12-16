import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ACTIVE_STATUS,
  UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE,
} from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
// import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { convertFilterParams, scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const search = useLocation().search
  const type = new URLSearchParams(search).get('type')
  const isView = mode === MODAL_MODE.DETAIL

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('#'),
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'warehouse',
        headerName: t('materialManagement.item.name'),
        width: 200,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.warehouse?.id)
          return isView ? (
            <>{params.row?.warehouse?.name || ''}</>
          ) : (
            <Field.Autocomplete
              disabled={
                type !== UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_WAREHOUSE
              }
              name={`itemWarehouseSources[${index}].warehouse`}
              placeholder={t('materialManagement.item.name')}
              asyncRequest={(s) =>
                searchWarehouseApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: ACTIVE_STATUS.ACTIVE,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.warehouse?.id
              }
            />
          )
        },
      },
      {
        field: 'source',
        headerName: t('materialManagement.item.source'),
        width: 200,
        renderCell: (params, index) => {
          const row = params.row
          return isView ? (
            <>{row?.accounting || ''}</>
          ) : (
            // <Field.Autocomplete
            //   disabled={
            //     type !== UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_SOURCE
            //   }
            //   name={`itemWarehouseSources[${index}].source`}
            //   placeholder={t('materialManagement.item.source')}
            //   asyncRequest={(s) =>
            //     searchSourceManagementApi({
            //       keyword: s,
            //       limit: ASYNC_SEARCH_LIMIT,
            //     })
            //   }
            //   asyncRequestHelper={(res) => res?.data?.items}
            //   isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            //   getOptionLabel={(opt) => opt?.code}
            //   getOptionSubLabel={(opt) => opt?.name}
            // />

            <Field.TextField
              disabled={
                type !== UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_SOURCE
              }
              name={`itemWarehouseSources[${index}].accounting`}
              placeholder={t('materialManagement.item.source')}
              inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX }}
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
          return (
            <IconButton
              type="button"
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
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
          {t('materialManagement.itemsDetails')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                warehouseId: '',
                accounting: '',
              })
              scrollToBottom()
            }}
          >
            {t('materialManagement.item.addItem')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
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
