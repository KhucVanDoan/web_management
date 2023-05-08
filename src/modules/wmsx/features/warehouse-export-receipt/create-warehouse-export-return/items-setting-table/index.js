import React, { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import {
  STATUS_SYNC_ORDER_TO_EBS,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'

function ItemsSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items } = props
  const {
    data: { warehouseImportReceiptDetails },
  } = useWarehouseImportReceipt()
  const isReturnAll =
    (warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED &&
      warehouseImportReceiptDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC) ||
    (warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED &&
      warehouseImportReceiptDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR &&
      !warehouseImportReceiptDetails?.ebsId) ||
    (warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED &&
      warehouseImportReceiptDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC) ||
    (warehouseImportReceiptDetails?.status ===
      WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED &&
      warehouseImportReceiptDetails?.syncStatus ===
        STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR &&
      !warehouseImportReceiptDetails?.ebsId)

  const getColumns = useMemo(() => {
    return [
      {
        field: '#',
        headerName: t('warehouseExportReceipt.items.STT'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('warehouseExportReceipt.items.suppliesCode'),
        width: 400,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].itemCode`}
              disabled
              value={params?.row?.itemCode?.code}
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 400,
        renderCell: (params, index) => {
          return <Field.TextField name={`items[${index}].itemName`} disabled />
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 100,
        renderCell: (params, index) => {
          return <Field.TextField name={`items[${index}].unit`} disabled />
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseExportReceipt.items.lotNumber'),
        width: 200,
        renderCell: (params, index) => {
          return <Field.TextField name={`items[${index}].lotNumber`} disabled />
        },
      },
      {
        field: 'importQuantity',
        headerName: t('warehouseImportReceipt.table.importQuantity'),
        width: 100,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].importQuantity`}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'planExportedQuantity',
        headerName: t('warehouseExportReceipt.items.planExportedQuantity'),
        width: 150,
        headerAlign: 'left',
        align: 'right',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].planExportedQuantity`}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'returnExportedQuantity',
        headerName: t('warehouseExportReceipt.items.returnExportedQuantity'),
        width: 200,
        headerAlign: 'left',
        align: 'right',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].returnExportedQuantity`}
              formatter="quantity"
              disabled
            />
          )
        },
      },
      {
        field: 'returnQuantity',
        headerName: t('warehouseExportReceipt.items.returnQuantity'),
        width: 100,
        headerAlign: 'left',
        align: 'right',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].returnQuantity`}
              disabled={isReturnAll}
              formatter="quantity"
              validate={(val) => {
                if (val) {
                  if (val > params?.row?.planExportedQuantity) {
                    return t('general:form.maxNumber', {
                      max: params?.row?.planExportedQuantity,
                    })
                  }
                }
              }}
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
              name={`items[${index}].debitAccount`}
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
              name={`items[${index}].creditAccount`}
              disabled
              required
            />
          )
        },
      },
    ]
  }, [isReturnAll])

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
          {t('warehouseImportReceipt.table.title')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemsSettingTable
