import React from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'

function ItemSettingTable({ items, mode, arrayHelpers }) {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('inventoryCalendar.items.itemCode'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode?.code
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              asyncRequest={(s) =>
                searchMaterialsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryCalendar.items.itemName'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode?.name
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.name`}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('inventoryCalendar.items.unit'),
        width: 180,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode?.itemUnit?.name
          ) : (
            <Field.TextField
              name={`items[${index}].itemCode.itemUnit.name`}
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
          return isView ? null : (
            <IconButton onClick={() => arrayHelpers.remove(idx)} size="large">
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
          {t('inventoryCalendar.items.tableTitle')}
        </Typography>
        <Box>
          {!isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemName: '',
                  itemCode: '',
                })
              }}
            >
              {t('inventoryCalendar.items.addButton')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns()}
        total={items?.length}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
