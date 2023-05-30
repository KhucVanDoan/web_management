import React from 'react'

import { Button, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { searchDefineWarehousePalletApi } from '~/modules/wmsx/redux/sagas/define-warehouse-pallet/search-define-warehouse-pallet'
import { searchDefineWarehouseShelfApi } from '~/modules/wmsx/redux/sagas/define-warehouse-shelf/search-define-warehouse-shelf'
import { searchWarehousesApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouses'
import { searchWarehouseAreasApi } from '~/modules/wmsx/redux/sagas/warehouse-area/search-warehouse-areas'
import { convertFilterParams } from '~/utils'
const LocklocationTable = (props) => {
  const { mode, arrayHelpers, locations, setFieldValue } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

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
              asyncRequest={(s) =>
                searchFactoriesApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              onChange={() => {
                setFieldValue(`locations[${index}].warehouseId`, null)
                setFieldValue(`locations[${index}].warehouseSector`, null)
                setFieldValue(`locations[${index}].warehouseShelf`, null)
                setFieldValue(`locations[${index}].warehouseFloor`, null)
              }}
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
              asyncRequest={(s) =>
                searchWarehousesApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    factoryIds: factoryId?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              asyncRequestDeps={factoryId}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              onChange={() => {
                setFieldValue(`locations[${index}].warehouseSector`, null)
                setFieldValue(`locations[${index}].warehouseShelf`, null)
                setFieldValue(`locations[${index}].warehouseFloor`, null)
              }}
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
                    warehouseId: warehouseId?.id,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              asyncRequestDeps={warehouseId}
              onChange={() => {
                setFieldValue(`locations[${index}].warehouseShelf`, '')
                setFieldValue(`locations[${index}].warehouseFloor`, '')
              }}
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
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              getOptionLabel={(opt) => opt?.name}
              asyncRequestDeps={warehouseSector}
              onChange={() =>
                setFieldValue(`locations[${index}].warehouseFloor`, '')
              }
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
              asyncRequestDeps={warehouseShelf}
              asyncRequestHelper={(res) => res?.data?.items}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
        sticky: 'right',

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
