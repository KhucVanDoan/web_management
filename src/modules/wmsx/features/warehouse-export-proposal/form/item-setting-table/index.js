import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchUomsApi } from '~/modules/wmsx/redux/sagas/define-uom/search-uom'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'

const ItemSettingTable = ({ items, mode, arrayHelpers, setFieldValue }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'suppliesName',
        headerName: t('warehouseExportProposal.items.suppliesName'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemName
          ) : (
            <Field.Autocomplete
              name={`items[${index}].suppliesName`}
              placeholder={t('warehouseExportProposal.items.suppliesName')}
              asyncRequest={(s) =>
                searchMaterialsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              freeSolo
              onBlur={(e) => {
                const newVal = e.target.value
                if (newVal) {
                  setFieldValue(`items[${index}].suppliesName`, {
                    code: '',
                    name: newVal,
                  })
                }
              }}
            />
          )
        },
      },
      {
        field: 'suppliesCode',
        headerName: t('warehouseExportProposal.items.suppliesCode'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemCode
          ) : params?.row?.suppliesName?.code ? (
            <Field.TextField
              name={`items[${index}].suppliesName.code`}
              disabled
              required
            />
          ) : (
            <Field.TextField
              name={`items[${index}].suppliesCode`}
              disabled={!params?.row?.suppliesName?.code}
              required
            />
          )
        },
      },
      {
        field: 'details',
        headerName: t('warehouseExportProposal.details'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.info
          ) : (
            <Field.TextField name={`items[${index}].details`} required />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportProposal.items.unit'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.itemResponse?.itemUnit?.name
          ) : !isEmpty(params?.row?.suppliesName?.itemUnit) ? (
            <Field.TextField
              name={`items[${index}].suppliesName.itemUnit.name`}
              disabled
              required
            />
          ) : (
            <Field.Autocomplete
              name={`items[${index}].unit`}
              asyncRequest={(s) =>
                searchUomsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              disabled={!params?.row?.suppliesName?.itemUnit}
            />
          )
        },
      },
      {
        field: 'quantityRequest',
        headerName: t('warehouseExportProposal.items.quantityRequest'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.requestedQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].quantityRequest`}
              required
            />
          )
        },
      },
      !isView && {
        field: 'planExportedQuantity',
        headerName: t('warehouseExportProposal.items.planExportedQuantity'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.importedQuantity
          ) : (
            <Field.TextField
              name={`items[${index}].items.planExportedQuantity`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'note',
        headerName: t('warehouseExportProposal.items.note'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.note
          ) : (
            <Field.TextField name={`items[${index}].note`} required />
          )
        },
      },
      !isView && {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params, idx) => {
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
          {t('warehouseExportProposal.items.suppliesList')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                suppliesCode: '',
                suppliesName: '',
                unit: '',
                quantityRequest: '',
                planExportedQuantity: '',
                note: '',
              })
            }}
          >
            {t('warehouseExportProposal.items.addSupplies')}
          </Button>
        )}
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
