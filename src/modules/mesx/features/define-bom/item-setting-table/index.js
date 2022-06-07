import React, { useEffect, useMemo } from 'react'

import { createFilterOptions, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, MATERIAL_CODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  DEFAULT_ITEM_TYPE_OPTIONS,
  ORDER_STATUS,
} from '~/modules/mesx/constants'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = (props) => {
  const { items, mode, arrayHelpers } = props
  const { t } = useTranslation(['mesx'])
  const { setFieldValue } = useFormikContext() ?? {}
  const {
    data: { itemList },
    actions,
  } = useCommonManagement()

  const {
    data: { BOMList },
    actions: bomActions,
  } = useBOM()

  useEffect(() => {
    bomActions.searchBOM({ isGetAll: 1 })
  }, [])

  const isView = mode === MODAL_MODE.DETAIL

  useEffect(() => {
    actions.getItems()
  }, [])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('defineBOM.item.orderNumber'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemType',
        headerName: t('defineBOM.item.type'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId } = params.row
          return isView ? (
            <>{getItemObject(itemId)?.itemType?.name || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemType`}
              options={DEFAULT_ITEM_TYPE_OPTIONS}
              getOptionValue={(opt) => opt?.code}
              getOptionLabel={(opt) => t(opt?.text)}
              onChange={() =>
                setFieldValue(`items[${index}]`, {
                  ...items[index],
                  itemId: '',
                })
              }
            />
          )
        },
      },
      {
        field: 'code',
        headerName: t('defineBOM.item.code'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          const itemType = params.row?.itemType
          let itemListFilter = []

          if (itemType !== MATERIAL_CODE) {
            itemListFilter = itemList.filter(
              (i) =>
                i.itemType.code === itemType &&
                i.isHasBom &&
                (BOMList || []).find((bom) => bom.item?.itemId === i.id)
                  ?.status === ORDER_STATUS.CONFIRMED,
            )
          } else {
            itemListFilter = itemList.filter(
              (i) => i.itemType.code === itemType && !i.isHasBom,
            )
          }

          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={itemListFilter}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
              filterOptions={createFilterOptions({
                stringify: (opt) => `${opt?.code}|${opt?.name}`,
              })}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.itemId
              }
            />
          )
        },
      },
      {
        field: 'name',
        headerName: t('defineBOM.item.name'),
        width: 150,
        align: 'center',
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
        field: 'quantity',
        headerName: t('defineBOM.item.quantity'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          const { quantity } = params.row
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'unitType',
        headerName: t('defineBOM.item.unitType'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
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
        field: 'isProductionObject',
        headerName: t('defineBOM.item.isProductionObject'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const itemId = params.row?.itemId
          const isProductionObject = getItemObject(itemId)?.isProductionObject
          return isProductionObject ? (
            <IconButton>
              <Icon name="tick" />
            </IconButton>
          ) : null
        },
      },
      {
        field: 'remove',
        headerName: t('defineBOM.item.action'),
        width: 50,
        align: 'center',
        hide: isView,
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params?.row?.id)
          return (
            <IconButton
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
    [itemList, items],
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
          {t('defineBOM.itemsDetails')}
        </Typography>
        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: '',
                quantity: 1,
              })
              scrollToBottom()
            }}
          >
            {t('defineBOM.item.addItem')}
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

export default ItemSettingTable
