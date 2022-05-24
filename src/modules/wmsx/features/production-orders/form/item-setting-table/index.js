import React, { useEffect } from 'react'

import { createFilterOptions, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers } = props
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemList, warehouseList },
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
  const getWarehouseObject = (id) => {
    return warehouseList?.find((item) => item?.id === id)
  }
  const getWarehouseTypeNames = (warehouseId) => {
    const warehouse = warehouseList?.find((item) => item?.id === warehouseId)
    return warehouse?.warehouseTypes?.length > 0
      ? warehouse?.warehouseTypes
          ?.map((warehouseType) => warehouseType?.name)
          ?.join(', ')
      : ''
  }

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
      field: 'code',
      headerName: t('productionOrder.item.code'),
      width: 250,

      renderCell: (params, index) => {
        // @TODO: wait BA confirm
        const { itemId } = params.row
        const itemIdCodeList = items.map((item) => item.itemId)
        return isView ? (
          <>{getItemObject(itemId)?.code || ''}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={itemList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
            filterOptions={createFilterOptions({
              stringify: (opt) => `${opt?.code}|${opt?.name}`,
            })}
            getOptionValue={(option) => option?.id || ''}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id)
            }
          />
        )
      },
    },
    {
      field: 'itemName',
      headerName: t('productionOrder.item.name'),
      width: 180,

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
      field: 'itemType',
      headerName: t('productionOrder.item.type'),
      width: 180,

      renderCell: (params, index) => {
        const { itemId } = params.row
        return isView ? (
          <>{getItemObject(itemId)?.itemType?.name || ''}</>
        ) : (
          <Field.TextField
            name={`items[${index}].unitType`}
            value={getItemObject(itemId)?.itemType?.name || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'warehouseName',
      headerName: t('productionOrder.item.warehouseName'),
      width: 180,

      renderCell: (params, index) => {
        const { warehouseName } = params?.row
        return isView ? (
          <>{getWarehouseObject(warehouseName)?.name || ''}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].warehouseName`}
            options={warehouseList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
            filterOptions={createFilterOptions({
              stringify: (opt) => `${opt?.code}|${opt?.name}`,
            })}
            getOptionValue={(option) => option?.id || ''}
          />
        )
      },
    },
    {
      field: 'warehouseType',
      headerName: t('productionOrder.item.warehouseType'),
      width: 180,

      renderCell: (params, index) => {
        const { warehouseName } = params.row

        return isView ? (
          <>{getWarehouseTypeNames(warehouseName)?.name || ''}</>
        ) : (
          <Field.TextField
            name={`items[${index}].warehouseType`}
            value={getWarehouseTypeNames(warehouseName) || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('productionOrder.item.lotNumber'),
      width: 180,

      // @TODO: wait confirm BA
    },
    {
      field: 'mfg',
      headerName: t('productionOrder.item.mfg'),
      width: 180,

      // @TODO: wait confirm BA
    },
    {
      field: 'packageId',
      headerName: t('productionOrder.item.packageCode'),
      width: 180,

      // @TODO: wait confirm BA
    },
    {
      field: 'quantity',
      headerName: t('productionOrder.item.quantity'),
      width: 180,

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
    // {
    //   field: 'remainQuantity',
    //   headerName: t('productionOrder.item.remainQuantity'),
    //   width: 180,
    //
    // },
    // {
    //   field: 'actualQuantity',
    //   headerName: t('productionOrder.item.actualQuantity'),
    //   width: 180,
    //
    // },
    {
      field: 'unitType',
      headerName: t('productionOrder.item.unitType'),
      width: 180,

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
      field: 'qcCheck',
      headerName: t('productionOrder.item.qcCheck'),
      width: 180,

      // @TODO: wait confirm BA
    },
    {
      field: 'qcCriteriaId',
      headerName: t('productionOrder.item.qcCriteria'),
      width: 180,

      // @TODO: wait confirm BA
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
          {t('productionOrder.itemsDetails')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: null,
                  warehouseId: null,
                  quantity: 1,
                  qcCheck: false,
                  lotNumber: '',
                  mfg: null,
                  packageId: null,
                })
                scrollToBottom()
              }}
            >
              {t('productionOrder.item.addItem')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={100}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
