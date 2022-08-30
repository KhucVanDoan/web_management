import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { DEFAULT_ITEM_TYPE_ENUM } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const {
    data: { itemList },
    actions,
  } = useCommonManagement()
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL

  useEffect(() => {
    actions.getItems({ isGetAll: 1 })
  }, [])

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('defineBOQ.item.orderNumber'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'code',
        headerName: t('defineBOQ.item.code'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          const itemListFilter = itemList.filter(
            (i) =>
              i.itemType.code === DEFAULT_ITEM_TYPE_ENUM.PRODUCT.code &&
              i.isHasBom,
          )
          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(itemId)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={itemListFilter}
              disabled={isView}
              getOptionLabel={(opt) => opt?.code || ''}
              getOptionValue={(opt) => opt?.id}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.itemId
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('defineBOQ.item.name'),
        width: 200,
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
        headerName: t('defineBOQ.item.quantity'),
        width: 200,
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
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />
          )
        },
      },
      {
        field: 'unitType',
        headerName: t('defineBOQ.item.unitType'),
        width: 200,
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
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: isView,
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              type="button"
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
          {t('defineBOQ.itemsDetails')}
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
            {t('defineBOQ.item.addItem')}
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

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
