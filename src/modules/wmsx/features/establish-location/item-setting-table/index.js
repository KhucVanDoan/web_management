import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchDefineWarehousePalletApi } from '~/modules/wmsx/redux/sagas/define-warehouse-pallet/search-define-warehouse-pallet'
import { searchDefineWarehouseShelfApi } from '~/modules/wmsx/redux/sagas/define-warehouse-shelf/search-define-warehouse-shelf'
import { searchWarehousesApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouses'
import { searchWarehouseAreasApi } from '~/modules/wmsx/redux/sagas/warehouse-area/search-warehouse-areas'
import { convertFilterParams, scrollToBottom } from '~/utils'

function ItemSettingTableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items = [], mode, arrayHelpers, setFieldValue } = props
  const isView = mode === MODAL_MODE.DETAIL

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'warehouse',
      headerName: t('locationSetting.item.warehouse'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row?.warehouse?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].warehouse`}
            asyncRequest={(s) =>
              searchWarehousesApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => {
              setFieldValue(`items[${index}].area`, null)
              setFieldValue(`items[${index}].shelf`, null)
              setFieldValue(`items[${index}].floor`, null)
            }}
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('locationSetting.item.area'),
      width: 180,
      renderCell: (params, index) => {
        const warehouseId = params.row?.warehouse?.id

        return isView ? (
          <>{params.row?.warehouseSetor?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].area`}
            asyncRequest={(s) =>
              searchWarehouseAreasApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  warehouseId: warehouseId,
                }),
              })
            }
            asyncRequestDeps={warehouseId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => {
              setFieldValue(`items[${index}].shelf`, null)
              setFieldValue(`items[${index}].floor`, null)
            }}
          />
        )
      },
    },
    {
      field: 'shelf',
      headerName: t('locationSetting.item.shelf'),
      width: 180,
      renderCell: (params, index) => {
        const areaId = params.row?.area?.id

        return isView ? (
          <>{params.row?.warehouseShelf?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].shelf`}
            asyncRequest={(s) =>
              searchDefineWarehouseShelfApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  warehouseSectorId: areaId,
                }),
              })
            }
            asyncRequestDeps={areaId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => {
              setFieldValue(`items[${index}].floor`, null)
            }}
          />
        )
      },
    },
    {
      field: 'floor',
      headerName: t('locationSetting.item.floor'),
      width: 180,
      renderCell: (params, index) => {
        const shelfId = params.row?.shelf?.id

        return isView ? (
          <>{params.row?.warehouseShelfFloor?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].floor`}
            asyncRequest={(s) =>
              searchDefineWarehousePalletApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  warehouseShelfId: shelfId,
                }),
              })
            }
            asyncRequestDeps={shelfId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
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
          {t('locationSetting.detailTableTitle')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  floor: null,
                  shelf: null,
                  area: null,
                  warehouse: null,
                })
                scrollToBottom()
              }}
            >
              {t('locationSetting.item.addItem')}
            </Button>
          )}
        </Box>
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

export default ItemSettingTableDetail
