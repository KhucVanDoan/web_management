import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { TABLE_NAME_ENUM } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'

const ItemSettingTableDetail = ({ items }) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseExportReceiptDetails },
  } = useWarehouseExportReceipt()
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
        width: 150,
        renderCell: (params) => {
          return !isEmpty(
            warehouseExportReceiptDetails?.attributes?.find(
              (item) =>
                item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
                item?.value,
            ),
          )
            ? params?.row?.quantity
            : ''
        },
      },
      {
        field: 'quantityExport',
        headerName: t('warehouseExportReceipt.items.quantityExport'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.quantity
        },
      },
      {
        field: 'actualExportedQuantity',
        headerName: t('warehouseExportReceipt.actualExportedQuantity'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.actualQuantity
        },
      },
      {
        field: 'unitPriceRefer',
        headerName: t('warehouseExportReceipt.items.unitPriceRefer'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.price
        },
      },
      {
        field: 'totalMoney',
        headerName: t('warehouseExportReceipt.items.totalMoney'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.amount
        },
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
