import React, { useEffect } from 'react'

import { Button, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { searchDefineWarehousePalletApi } from '~/modules/wmsx/redux/sagas/define-warehouse-pallet/search-define-warehouse-pallet'
import { searchDefineWarehouseShelfApi } from '~/modules/wmsx/redux/sagas/define-warehouse-shelf/search-define-warehouse-shelf'
import { searchWarehouseAreasApi } from '~/modules/wmsx/redux/sagas/warehouse-area/search-warehouse-areas'
import { convertFilterParams } from '~/utils'
const LocklocationTable = (props) => {
  const { mode, arrayHelpers, locations } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { warehouseList },
    actions: defineWarehouseAction,
  } = useDefineWarehouse()

  const {
    data: { factoryList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    commonManagementActions.getFactories({ isGetAll: 1 })
    defineWarehouseAction.searchWarehouses({ isGetAll: 1 })
  }, [])

  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'factoryId',
        headerName: t('blockItemLocation.factoryName'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.factoryName}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].factoryId`}
              options={factoryList?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
            />
          )
        },
      },
      {
        field: 'warehouseId',
        headerName: t('blockItemLocation.warehouseName'),
        width: 200,
        renderCell: (params, index) => {
          const { factoryId } = params?.row
          return isView ? (
            <>{params?.row?.warehouseName || ''}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseId`}
              options={warehouseList?.filter(
                (warehouse) => warehouse?.factory?.id === factoryId,
              )}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
            />
          )
        },
      },
      {
        field: 'warehouseSector',
        headerName: t('blockItemLocation.sectorName'),
        width: 200,
        renderCell: (params, index) => {
          const { warehouseId, warehouseSector } = params?.row

          return isView ? (
            <>{warehouseSector?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseSector`}
              asyncRequest={(s) =>
                searchWarehouseAreasApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: warehouseId,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
            />
          )
        },
      },
      {
        field: 'warehouseShelf',
        headerName: t('blockItemLocation.shelfName'),
        width: 150,
        renderCell: (params, index) => {
          const { warehouseShelf, warehouseSector } = params?.row

          return isView ? (
            <>{warehouseShelf?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseShelf`}
              asyncRequest={(s) =>
                searchDefineWarehouseShelfApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseSectorId: warehouseSector?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name}
            />
          )
        },
      },
      {
        field: 'warehouseFloor',
        headerName: t('blockItemLocation.floorName'),
        width: 180,
        renderCell: (params, index) => {
          const { warehouseShelf, warehouseFloor } = params?.row

          return isView ? (
            <>{warehouseFloor?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseFloor`}
              asyncRequest={(s) =>
                searchDefineWarehousePalletApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseShelfId: warehouseShelf?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name}
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        hide: isView,
        renderCell: (params, idx) => {
          return isView ? null : (
            <IconButton
              onClick={() => arrayHelpers.remove(idx)}
              disabled={locations?.length === 1}
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
          {t('blockItemLocation.locationDetails')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  factoryId: null,
                  warehouseId: null,
                  warehouseSector: null,
                  warehouseShelf: null,
                  warehouseFloor: null,
                })
              }}
            >
              {t('blockItemLocation.location.addLocation')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        rows={locations}
        columns={getColumns()}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default LocklocationTable
