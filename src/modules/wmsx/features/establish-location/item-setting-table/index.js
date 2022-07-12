import { useEffect } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useDefineWarehousePallet from '~/modules/wmsx/redux/hooks/useDefineWarehousePallet'
import useDefineWarehouseShelf from '~/modules/wmsx/redux/hooks/useDefineWarehouseShelf'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
import { searchWarehousesApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouses'
import { scrollToBottom } from '~/utils'

function ItemSettingTableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items = [], mode, arrayHelpers, setFieldValue } = props
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { warehouseAreaList },
    actions: actionArea,
  } = useWarehouseArea()

  const {
    data: { defineWarehouseShelfList },
    actions: actionShelf,
  } = useDefineWarehouseShelf()

  const {
    data: { defineWarehousePalletList },
    actions: actionPallet,
  } = useDefineWarehousePallet()

  useEffect(() => {
    actionArea.searchWarehouseAreas({ isGetAll: 1 })
    actionShelf.searchDefineWarehouseShelf({ isGetAll: 1 })
    actionPallet.searchDefineWarehousePallet({ isGetAll: 1 })
  }, [])

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
        const listArea = warehouseAreaList.filter(
          (item) => item?.warehouseId === warehouseId,
        )
        return isView ? (
          <>{params.row?.warehouseSetor?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].area`}
            options={listArea}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionValue={(option) => option?.id || ''}
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
        const areaId = params.row?.area
        const listShelf = areaId
          ? defineWarehouseShelfList.filter(
              (item) => item?.warehouseSector?.id === areaId,
            )
          : []
        return isView ? (
          <>{params.row?.warehouseShelf?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].shelf`}
            options={listShelf}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionValue={(option) => option?.id || ''}
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
        const shelfId = params.row?.shelf
        const listFloor = shelfId
          ? defineWarehousePalletList.filter(
              (item) => item?.warehouseShelf?.id === shelfId,
            )
          : []
        return isView ? (
          <>{params.row?.warehouseShelfFloor?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].floor`}
            options={listFloor}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionValue={(option) => option?.id || ''}
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
