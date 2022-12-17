import React, { useCallback, useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'

const ItemSettingTableDetail = ({ items }) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseExportReceiptDetails },
  } = useWarehouseExportReceipt()

  const getAttrValue = useCallback((warehouseId = '', attrName = '') => {
    const lots =
      warehouseExportReceiptDetails?.saleOrderExportWarehouseLots || []

    return (
      lots.find(
        (item) => item?.saleOrderExportWarehouseDetailId === warehouseId,
      )?.[attrName] || ''
    )
  })

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
        field: 'itemName',
        headerName: t('warehouseExportReceipt.itemName'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.item?.name
        },
      },
      {
        field: 'suppliesCode',
        headerName: t('warehouseExportReceipt.items.suppliesCode'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.item?.code
        },
      },

      {
        field: 'unit',
        headerName: t('warehouseExportReceipt.unit'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.item?.itemUnit
        },
      },
      {
        field: 'quantityRequest',
        headerName: t('warehouseExportReceipt.items.quantityRequest'),
        align: 'right',
        headerAlign: 'left',
        width: 150,
        renderCell: ({ row }) => getAttrValue(row.id, 'quantity'),
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        align: 'right',
        headerAlign: 'left',
        width: 150,
        renderCell: ({ row }) => getAttrValue(row.id, 'collectedQuantity'),
      },
      {
        field: 'actualExportedQuantity',
        headerName: t('warehouseExportReceipt.actualExportedQuantity'),
        align: 'right',
        headerAlign: 'left',
        width: 150,
        renderCell: ({ row }) => getAttrValue(row.id, 'actualQuantity'),
      },
      {
        field: 'unitPriceRefer',
        headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
        align: 'right',
        headerAlign: 'left',
        width: 150,
        renderCell: ({ row }) => getAttrValue(row.id, 'price'),
      },
      {
        field: 'totalMoney',
        headerName: t('warehouseExportReceipt.items.totalMoney'),
        align: 'right',
        headerAlign: 'left',
        width: 150,
        renderCell: ({ row }) => getAttrValue(row.id, 'amount'),
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
    ],
    [items, getAttrValue],
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

export default ItemSettingTableDetail
