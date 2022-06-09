import React, { useEffect } from 'react'

import { Checkbox, createFilterOptions, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { ORDER_STATUS } from '~/modules/wmsx/constants'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import usePurchasedOrdersImport from '~/modules/wmsx/redux/hooks/usePurchasedOrdersImport'
import { scrollToBottom, convertUtcDateToLocalTz } from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers, status, itemsFilter } = props
  const hideCols = ![
    ORDER_STATUS.IN_PROGRESS,
    ORDER_STATUS.APPROVED,
    ORDER_STATUS.COMPLETED,
  ].includes(status)
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { itemList },
    actions,
  } = useCommonManagement()

  const {
    data: { packageList },
    actions: actionsPackage,
  } = useDefinePackage()
  const {
    data: { lotNumberList },
    actions: actionsPurchasedOrdersImport,
  } = usePurchasedOrdersImport()

  useEffect(() => {
    actions.getItems({})
    actionsPackage.searchPackages()
  }, [])

  useEffect(() => {
    const itemIds = items?.map((item) => item.itemId)
    actionsPurchasedOrdersImport.getLotNumberList({
      itemIds: itemIds
        ?.filter((id, index) => itemIds.indexOf(id) === index)
        .join(','),
    })
  }, [items])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
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
      field: 'itemName',
      headerName: t('productionOrder.item.name'),
      width: 180,
      renderCell: (params, index) => {
        const itemId = params.row?.itemId
        const itemListFilter =
          itemsFilter?.length > 0
            ? itemList.filter((item) =>
                itemsFilter.find((itemFilter) => itemFilter.itemId === item.id),
              )
            : itemList
        return isView ? (
          <>{getItemObject(itemId)?.name || ''}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={itemListFilter}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(option) => option?.id || ''}
          />
        )
      },
    },
    {
      field: 'code',
      headerName: t('purchasedOrder.item.code'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        return isView ? (
          <>{getItemObject(itemId)?.code || ''}</>
        ) : (
          <Field.TextField
            name={`itemName[${index}]`}
            value={getItemObject(itemId)?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('purchasedOrderImport.item.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        const { lotNumber } = params.row
        return isView ? (
          <>{lotNumber}</>
        ) : (
          <Field.TextField name={`items[${index}].lotNumber`} />
        )
      },
    },
    {
      field: 'mfg',
      headerName: t('purchasedOrder.item.manufactureDate'),
      width: 180,
      renderCell: (params, index) => {
        const { lotNumber, itemId, mfg } = params.row
        const isFilled =
          (lotNumberList
            ?.find((item) => item.itemId === itemId)
            ?.lotNumbers?.find((lot) => lot.lotNumber === lotNumber)?.mfg ===
            mfg ||
            items?.filter(
              (item) => item.itemId === itemId && item.lotNumber === lotNumber,
            ).length > 1) &&
          mfg
        const isSelectedLotNum = lotNumberList
          ?.find((item) => item.itemId === itemId)
          ?.lotNumbers?.find((lot) => lot.lotNumber === lotNumber)
        return isView || isFilled || isSelectedLotNum ? (
          <>
            {isSelectedLotNum
              ? convertUtcDateToLocalTz(isSelectedLotNum.mfg)
              : mfg}
          </>
        ) : (
          <Field.DatePicker
            name={`items[${index}].mfg`}
            placeholder={t('purchasedOrder.item.manufactureDate')}
          />
        )
      },
    },
    {
      field: 'packageId',
      headerName: t('purchasedOrder.item.packageCode'),
      width: 180,
      renderCell: (params, index) => {
        const { packageId, itemId } = params.row
        const packageFilter = packageList?.filter((pk) =>
          pk?.packageItems?.map((item) => item.itemId)?.includes(itemId),
        )
        return isView ? (
          <>{packageList?.find((pk) => pk?.id === packageId)?.code || ''}</>
        ) : (
          <Field.Autocomplete
            name={`packageId${index}`}
            disabled={true}
            options={packageFilter}
            getOptionLabel={(opt) => opt?.code}
            filterOptions={createFilterOptions({
              stringify: (opt) => opt?.code,
            })}
            getOptionValue={(option) => option?.id || ''}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('purchasedOrder.item.quantity'),
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
    {
      field: 'storedQuantity',
      headerName: t('purchasedOrder.item.storedQuantity'),
      width: 180,
      hide: hideCols,
      renderCell: (params, index) => {
        const { storedQuantity } = params.row
        return isView ? (
          <>{+storedQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].storedQuantity`}
            type="number"
            disabled={isView}
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'remainQuantity',
      headerName: t('purchasedOrder.item.remainQuantity'),
      width: 180,
      hide: hideCols,
      renderCell: (params, index) => {
        const { quantity, actualQuantity } = params.row
        return isView ? (
          <>{+quantity - actualQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].remainQuantity`}
            type="number"
            disabled={isView}
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('purchasedOrder.item.actualQuantity'),
      width: 180,
      hide: hideCols,
      renderCell: (params, index) => {
        const { actualQuantity } = params.row
        return isView ? (
          <>{+actualQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].actualQuantity`}
            type="number"
            disabled={isView}
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'unitType',
      headerName: t('purchasedOrder.item.unitType'),
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
      renderCell: (params) => {
        const { qcCheck } = params.row
        return <Checkbox disabled={isView} checked={qcCheck} />
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
        <Typography variant="h4">{t('purchasedOrder.itemsDetails')}</Typography>
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
