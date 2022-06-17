import React, { useEffect, useState } from 'react'

import { createFilterOptions, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import {
  MODAL_MODE,
  NOTIFICATION_TYPE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { STAGES_OPTION, TRANSACTION_TYPE_ENUM } from '~/modules/wmsx/constants'
import useProductionOrder from '~/modules/wmsx/redux/hooks/useProductionOrder'
import {
  convertFilterParams,
  convertUtcDateToLocalTz,
  scrollToBottom,
} from '~/utils'
import addNotification from '~/utils/toast'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const {
    items,
    mode,
    arrayHelpers,
    values,
    setFieldValue,
    materialPlanDetail,
  } = props
  const [setItemQualityPoint] = useState([])
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { lotNumberList, productionOrderDetails },
  } = useProductionOrder()
  const {
    data: { itemList, warehouseList },
    actions: commonActions,
  } = useCommonManagement()

  const {
    data: { moList },
  } = useMo()

  useEffect(() => {
    commonActions.getItems({ isGetAll: 1 })
    commonActions.getWarehouses({ isGetAll: 1 })
    commonActions.getBoms({ isGetAll: 1 })
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
  const handleCheckQc = (itemId, value) => {
    let stageId = -1
    if (values?.type === TRANSACTION_TYPE_ENUM.IMPORT) {
      stageId = STAGES_OPTION.PRO_IMPORT
    } else if (values?.type === TRANSACTION_TYPE_ENUM.EXPORT) {
      stageId = STAGES_OPTION.PRO_EXPORT
    }
    const params = {
      page: 1,
      limit: 20,
      filter: convertFilterParams({
        itemId: itemId,
        stageId: stageId,
      }),
    }
    commonActions.getItemQualityPoint(params, (data) => {
      if (data?.items.length > 0) {
        const itemQuality = data?.items[0]
        items.forEach((item, itemIndex) => {
          if (item.itemId === itemId) {
            setFieldValue(`items[${itemIndex}]['qcCheck']`, value)
            setFieldValue(
              `items[${itemIndex}]['qcCriteria']`,
              itemQuality?.code,
            )
            setFieldValue(
              `items[${itemIndex}]['qcCriteriaId']`,
              itemQuality?.id,
            )
          }
        })
      } else {
        addNotification(
          t('productionOrder.item.notHaveQC'),
          NOTIFICATION_TYPE.ERROR,
        )
        items.forEach((item, itemIndex) => {
          if (item.itemId === itemId) {
            setFieldValue(`items[${itemIndex}]['qcCheck']`, false)
            setFieldValue(`items[${itemIndex}]['qcCriteria']`, null)
            setFieldValue(`items[${itemIndex}]['qcCriteriaId']`, null)
          }
        })
      }
    })
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
      renderCell: (_, index) => {
        const itemFilterList =
          moList?.find(
            (mo) => productionOrderDetails?.manufacturingOrder?.id === mo.id,
          )?.manufacturingOrderDetails || lotNumberList
        const materialPlanDetailIds =
          materialPlanDetail.materialPlanStructures?.map(
            (material) => material.itemId,
          )
        const materialFilterList = itemList
          ?.filter((item) => materialPlanDetailIds?.includes(item.id))
          ?.map((item) => ({
            ...item,
            itemId: item.id,
            quantity: materialPlanDetail.materialPlanStructures
              ?.filter((material) => material.itemId === item.id)
              ?.reduce((total, item) => total + item.quantity, 0),
          }))
        const listItem =
          values?.type === TRANSACTION_TYPE_ENUM.IMPORT
            ? itemFilterList
            : materialFilterList

        return (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={
              listItem?.length > 0
                ? itemList.filter((item) =>
                    listItem?.find((listItem) => listItem.itemId === item.id),
                  )
                : itemList
            }
            disabled={isView || !values?.moCode}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(option) => option?.id || ''}
            onChange={(val) => {
              if (!val) {
                setFieldValue(`items[${index}].warehouseName`, '')
              }
              setFieldValue(`items[${index}].qcCheck`, false)
              setItemQualityPoint([])
            }}
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
        const lotList =
          itemId && values?.type === TRANSACTION_TYPE_ENUM.IMPORT
            ? lotNumberList
            : lotNumberList.filter((item) => item?.itemId === itemId)

        return (
          <Field.Autocomplete
            name={`items[${index}].lotNumber`}
            options={lotList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.lotNumber}
            getOptionValue={(option) => option?.lotNumber || ''}
            onChange={(val) => {
              if (val) {
                const data = lotNumberList?.find(
                  (i) => i.itemId === itemId,
                )?.mfg
                setFieldValue(`items[${index}].mfg`, data)
              } else {
                setFieldValue(`items[${index}].mfg`, '')
              }
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
            onChange={(val) => handleCheckQc(itemId, val)}
          />
        )
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('productionOrder.item.qcCriteria'),
      width: 180,
      renderCell: (params) => {
        const { qcCheck, qcCriteria } = params.row
        return qcCheck ? qcCriteria : ''
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
