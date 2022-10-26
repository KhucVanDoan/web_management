import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchLocationsApi } from '~/modules/wmsx/redux/sagas/location-management/search-locations'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers, values }) => {
  const { t } = useTranslation(['wmsx'])
  const itemList = values?.saleOrderExportWarehouseLots?.map(
    (detail) => detail?.item,
  )
  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: t('warehouseExportReceipt.items.STT'),
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseExportReceipt.items.suppliesCode'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].item`}
              placeholder={t('warehouseExportReceipt.items.suppliesCode')}
              options={itemList}
              getOptionLabel={(opt) => opt?.code}
              required
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.TextField name={`items[${index}].item.name`} disabled />
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField name={`items[${index}].item.itemUnit`} disabled />
          )
        },
      },
      {
        field: 'quantityRequest',
        headerName: t('warehouseExportReceipt.items.quantityRequest'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].item.quantityRequest`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].quantity`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 2,
              }}
              disabled
            />
          )
        },
      },
      {
        field: 'quantityExportActual',
        headerName: t('warehouseExportReceipt.items.quantityExportActual'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].quantityExportActual`}
              required
            />
          )
        },
      },
      {
        field: 'locator',
        headerName: t('warehouseExportReceipt.items.locator'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].locator`}
              placeholder={t('warehouseExportReceipt.items.locator')}
              asyncRequest={(s) =>
                searchLocationsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    warehouseId: params.row?.warehouseId,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              asyncRequestDeps={params.row?.warehouseId}
              required
            />
          )
        },
      },
      items?.length > 1 && {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params, idx) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
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
          {t('warehouseExportReceipt.items.suppliesList')}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            arrayHelpers.push({
              id: new Date().getTime(),
              item: '',
              unit: '',
              quantityRequest: '',
              quantityExport: '',
            })
          }}
          disabled={items?.length === 10}
        >
          {t('warehouseExportReceipt.addButton')}
        </Button>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
