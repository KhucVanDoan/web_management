import React, { useEffect } from 'react'

import { createFilterOptions, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { first } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import {
  convertFilterParams,
  convertUtcDateToLocalTz,
  scrollToBottom,
} from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers, values, setFieldValue } = props
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemList, warehouseList },
    actions,
  } = useCommonManagement()

  const {
    data: { itemQualityPoint },
    actions: commonActions,
  } = useCommonManagement()

  const {
    data: { lotNumberList },
    actions: warehouseTransferAction,
  } = useWarehouseTransfer()

  useEffect(() => {
    actions.getItems({})
    actions.getWarehouses({})
    actions.getBoms({ isGetAll: 1 })
    warehouseTransferAction.getLotNumberListWarehouseTransfer({ isGetAll: 1 })
  }, [])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }
  const getWarehouseTypeNames = (warehouseId) => {
    const warehouse = warehouseList?.find((item) => item?.id === warehouseId)
    return warehouse?.warehouseTypes?.length > 0
      ? warehouse?.warehouseTypes
          ?.map((warehouseType) => warehouseType?.name)
          ?.join(', ')
      : ''
  }
  const handleCheckQc = (itemId) => {
    const params = {
      page: 1,
      limit: 20,
      filter: convertFilterParams({
        itemId: itemId,
      }),
    }
    commonActions.getItemQualityPoint(params)
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
      field: 'name',
      headerName: t('productionOrder.item.name'),
      width: 250,

      renderCell: (params, index) => {
        const listItemId = values?.moCode?.manufacturingOrderDetails?.map(
          (item) => item.id,
        )
        const listItems = listItemId?.map((e) =>
          itemList?.filter((item) => item?.id === e),
        )
        return (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={listItems?.length > 0 ? first(listItems) : itemList}
            disabled={isView || !values?.moCode}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            filterOptions={createFilterOptions({
              stringify: (opt) => `${opt?.code}|${opt?.name}`,
            })}
            getOptionValue={(option) => option?.id || ''}
          />
        )
      },
    },
    {
      field: 'itemCode',
      headerName: t('productionOrder.item.code'),
      width: 180,
      renderCell: (params, index) => {
        const itemId = params.row?.itemId
        return (
          <Field.TextField
            name={`items[${index}].code`}
            value={getItemObject(itemId)?.code || ''}
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
        return (
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
        return (
          <Field.Autocomplete
            name={`items[${index}].warehouseName`}
            options={warehouseList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.name}
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

        return (
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
      renderCell: (params, index) => {
        const { itemId } = params?.row
        const lotList = lotNumberList.find((item) => item.itemId === itemId)
        return (
          <Field.Autocomplete
            name={`items[${index}].lotNumber`}
            options={lotList?.lotNumbers}
            disabled={isView}
            getOptionLabel={(opt) => opt?.lotNumber}
            getOptionValue={(option) => option?.lotNumber || ''}
            onChange={(val) => {
              const data = lotNumberList
                .find((i) => i.itemId === itemId)
                ?.lotNumbers?.find((j) => j.lotNumber === val)?.mfg
              setFieldValue(`items[${index}].mfg`, data)
            }}
          />
        )
      },
    },
    {
      field: 'mfg',
      headerName: t('productionOrder.item.mfg'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params?.row
        return (
          <Field.TextField
            name={`items[${index}].mfg`}
            disabled={true}
            value={convertUtcDateToLocalTz(
              values?.items?.find((item) => item.itemId === itemId)?.mfg,
            )}
          />
        )
      },
    },
    {
      field: 'packageId',
      headerName: t('productionOrder.item.packageCode'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params?.row
        return (
          <Field.Autocomplete
            name={`items[${index}].packageId`}
            options={getItemObject(itemId)?.packages}
            disabled={isView}
            getOptionLabel={(opt) => opt?.lotNumber}
            getOptionValue={(option) => option?.lotNumber || null}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('productionOrder.item.quantity'),
      width: 180,
      renderCell: (params, index) => {
        return (
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
      headerName: t('productionOrder.item.unitType'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        return (
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
      renderCell: (params, index) => {
        const { itemId } = params.row
        return (
          <Field.Checkbox
            name={`items[${index}].qcCheck`}
            onChange={() => handleCheckQc(itemId)}
          />
        )
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('productionOrder.item.qcCriteria'),
      width: 180,
      renderCell: (params) => {
        const { qcCheck, itemId } = params.row
        return qcCheck
          ? itemQualityPoint?.map((i) => i?.itemId === itemId)?.name
          : ''
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
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

export default ItemSettingTable
