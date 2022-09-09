import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
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
        field: 'suppliesCode',
        headerName: t('warehouseExportReceipt.items.suppliesCode'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.suplliesCode
          ) : (
            <Field.Autocomplete
              name={`items[${index}].suppliesCode`}
              options={[]}
              getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
              getOptionValue={(opt) => opt?.id?.toString()}
              disabled
            />
          )
        },
      },
      {
        field: 'suppliesName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.suppliesName
          ) : (
            <Field.TextField
              name={`items[${index}].suppliesName`}
              required
              disabled
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.unit
          ) : (
            <Field.TextField name={`items[${index}].unit`} required disabled />
          )
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseExportReceipt.items.lotNumber'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].lotNumber`}
              options={[]}
              getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
              getOptionValue={(opt) => opt?.id?.toString()}
              disabled
            />
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
              name={`items[${index}].items.quantityRequest`}
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
          return isView ? (
            params?.row?.quantityExport
          ) : (
            <Field.TextField
              name={`items[${index}].items.quantityExport`}
              required
            />
          )
        },
      },
      {
        field: 'planExportedQuantity',
        headerName: t('warehouseExportReceipt.items.planExportedQuantity'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.planExportedQuantity
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
        field: 'unitPriceRefer',
        headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].items.unitPriceRefer`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'totalMoney',
        headerName: t('warehouseExportReceipt.items.totalMoney'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].items.totalMoney`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'debitAccount',
        headerName: t('warehouseExportReceipt.items.debitAccount'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].items.debitAccount`}
              disabled
              required
            />
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('warehouseExportReceipt.items.creditAccount'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].items.creditAccount`}
              disabled
              required
            />
          )
        },
      },
      {
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
          {t('warehouseExportReceipt.items.suppliesList')}
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
                lotNumber: '',
                quantityRequest: '',
                quantityExport: '',
                planExportedQuantity: '',
                unitPriceRefer: '',
                totalMoney: '',
                debitAccount: '',
                creditAccount: '',
              })
            }}
          >
            {t('warehouseExportReceipt.addButton')}
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
