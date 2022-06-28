import React, { useEffect } from 'react'

import { Button, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useDefineWarehousePallet from '~/modules/wmsx/redux/hooks/useDefineWarehousePallet'
import useDefineWarehouseShelf from '~/modules/wmsx/redux/hooks/useDefineWarehouseShelf'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
const LocklocationTable = (props) => {
  const { mode, arrayHelpers, locations } = props
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { warehouseList },
    actions: defineWarehouseAction,
  } = useDefineWarehouse()
  const {
    data: { warehouseAreaList },
    actions: actionArea,
  } = useWarehouseArea()
  const {
    data: { factoryList },
    actions: commonManagementActions,
  } = useCommonManagement()
  const {
    data: { defineWarehouseShelfList },
    actions: actionShelf,
  } = useDefineWarehouseShelf()

  const {
    data: { defineWarehousePalletList },
    actions: actionPallet,
  } = useDefineWarehousePallet()

  useEffect(() => {
    commonManagementActions.getFactories({ isGetAll: 1 })
    defineWarehouseAction.searchWarehouses({ isGetAll: 1 })
    actionArea.searchWarehouseAreas({ isGetAll: 1 })
    actionShelf.searchDefineWarehouseShelf({ isGetAll: 1 })
    actionPallet.searchDefineWarehousePallet({ isGetAll: 1 })
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
        field: 'warehouseSectorId',
        headerName: t('blockItemLocation.sectorName'),
        width: 200,
        renderCell: (params, index) => {
          const { warehouseId, warehouseSectorName } = params?.row
          const listArea = warehouseAreaList.filter(
            (item) => item?.warehouseId === warehouseId,
          )
          return isView ? (
            <>{warehouseSectorName || ''}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseSectorId`}
              options={listArea}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id || ''}
            />
          )
        },
      },
      {
        field: 'warehouseShelfId',
        headerName: t('blockItemLocation.shelfName'),
        width: 150,
        renderCell: (params, index) => {
          const { warehouseShelfName, warehouseSectorId } = params?.row
          const listShelf = defineWarehouseShelfList.filter(
            (item) => item?.warehouseSector?.id === warehouseSectorId,
          )
          return isView ? (
            <>{warehouseShelfName}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseShelfId`}
              options={listShelf}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id}
            />
          )
        },
      },
      {
        field: 'warehouseFloorId',
        headerName: t('blockItemLocation.floorName'),
        width: 180,
        renderCell: (params, index) => {
          const { warehouseShelfId, warehouseFloorName } = params?.row
          const listFloor = defineWarehousePalletList.filter(
            (item) => item?.warehouseShelf?.id === warehouseShelfId,
          )
          return isView ? (
            <>{warehouseFloorName}</>
          ) : (
            <Field.Autocomplete
              name={`locations[${index}].warehouseFloorId`}
              options={listFloor}
              disabled={isView}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(option) => option?.id}
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
                  warehouseSectorId: null,
                  warehouseShelfId: null,
                  warehouseFloorId: null,
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
