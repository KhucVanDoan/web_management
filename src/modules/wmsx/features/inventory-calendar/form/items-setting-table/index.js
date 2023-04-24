import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { convertFilterParams } from '~/utils'
function ItemSettingTable({ items, mode, arrayHelpers, values }) {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const isView = mode === MODAL_MODE.DETAIL
  const { actions } = useInventoryCalendar()

  const { page, pageSize } = useQueryState()
  useEffect(() => {
    if (isView) {
      refreshData()
    }
  }, [page, pageSize])
  const refreshData = () => {
    const params = {
      id: id,
      page: page,
      limit: pageSize,
    }
    actions.getItem(params)
  }
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
        width: 400,
        renderCell: (params, index) => {
          const itemIdCodeList = items?.map((item) => item?.itemCode?.id)
          return isView ? (
            params?.row?.itemCode?.code
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemCode`}
              asyncRequest={(s) =>
                searchMaterialsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: values?.warehouses
                      ?.map((item) => item?.id)
                      .join(','),
                    status: ACTIVE_STATUS.ACTIVE,
                  }),
                })
              }
              disabled={!values?.warehouses}
              asyncRequestDeps={values?.warehouses}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.itemCode?.id
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('inventoryCalendar.items.itemName'),
        width: 400,
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
        renderCell: (params, idx) => {
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
