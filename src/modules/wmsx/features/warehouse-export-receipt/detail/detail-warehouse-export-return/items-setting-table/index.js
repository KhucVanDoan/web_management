import React, { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import NumberFormatText from '~/components/NumberFormat'
import { WAREHOUSE_EXPORT_RECEIPT_STATUS } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'

function ItemsSettingTableDetailReturn(props) {
  const { t } = useTranslation(['wmsx'])
  const { items } = props
  const {
    data: { warehouseExportReceiptDetails },
  } = useWarehouseExportReceipt()
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
        renderCell: (params) => {
          return params?.row?.item?.code
        },
      },
      {
        field: 'itemName',
        headerName: t('warehouseExportReceipt.items.suppliesName'),
        width: 400,
        renderCell: (params) => {
          return params?.row?.item?.name
        },
      },
      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 100,
        renderCell: (params) => {
          return params?.row?.item?.itemUnit
        },
      },
      {
        field: 'lotNumber',
        headerName: t('warehouseExportReceipt.items.lotNumber'),
        width: 200,
        renderCell: (params) => {
          return params?.row?.lotNumber
        },
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params) => (
          <NumberFormatText
            value={params?.row?.quantity}
            formatter="quantity"
          />
        ),
      },
      {
        field: 'actualExportedQuantity',
        headerName: t('warehouseExportReceipt.actualExportedQuantity'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        renderCell: (params) => (
          <NumberFormatText
            value={params?.row?.actualQuantity}
            formatter="quantity"
          />
        ),
      },
      {
        field: 'unitPriceRefer',
        headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
        align: 'right',
        headerAlign: 'left',
        hide:
          warehouseExportReceiptDetails?.status !==
          WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED,
        width: 150,
        renderCell: (params) => (
          <NumberFormatText value={params?.row?.price} formatter="price" />
        ),
      },
      {
        field: 'totalMoney',
        headerName: t('warehouseExportReceipt.items.totalMoney'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
        hide:
          warehouseExportReceiptDetails?.status !==
          WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED,
        renderCell: (params) => (
          <NumberFormatText value={params?.row?.amount} formatter="price" />
        ),
      },
      {
        field: 'debitAccount',
        headerName: t('warehouseExportReceipt.items.debitAccount'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.debitAccount
        },
      },
      {
        field: 'creditAccount',
        headerName: t('warehouseExportReceipt.items.creditAccount'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.creditAccount
        },
      },
    ]
  }, [])

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

export default ItemsSettingTableDetailReturn
