import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import NumberFormatText from '~/components/NumberFormat'
import {
  LENGTH_DEBITACCOUNT,
  WAREHOUSE_EXPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
const ItemSettingTableDetail = ({ items, isEdit, setFieldValue }) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseExportReceiptDetails },
  } = useWarehouseExportReceipt()
  const addSeperators = (str, mask) => {
    const chars = str.split('')
    let count = 0

    let formatted = ''
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i]
      if (chars[count]) {
        if (/#/.test(m)) {
          formatted += chars[count]
          count++
        } else {
          formatted += m
        }
      }
    }
    return formatted
  }
  const handleChangeDebitAccount = (val = '', setFieldValue, index) => {
    setFieldValue(
      `items[${index}].debitAccount`,
      addSeperators(
        val.replace(TEXTFIELD_ALLOW.ALPHANUMERIC, ''),
        '###########.####.####.###',
      ),
    )
  }

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
      // {
      //   field: 'quantityRequest',
      //   headerName: t('warehouseExportReceipt.items.quantityRequest'),
      //   width: 150,
      //   renderCell: (params) => {
      //     return !isEmpty(
      //       warehouseExportReceiptDetails?.attributes?.find(
      //         (item) =>
      //           item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
      //           item?.value,
      //       ),
      //     )
      //       ? Math.round(
      //           params?.row?.requestedQuantityWarehouseExportProposal * 100,
      //         ) / 100
      //       : ''
      //   },
      // },
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
        renderCell: (params, index) => {
          return isEdit && warehouseExportReceiptDetails?.ebsId ? (
            <Field.TextField
              name={`items[${index}].debitAccount`}
              onInput={(val) => {
                handleChangeDebitAccount(val, setFieldValue, index)
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              validate={(val) => {
                if (val?.length !== 25) {
                  return t(`general:form.formatDebitAccount`)
                }
              }}
            />
          ) : params?.row?.debitAccount?.length === LENGTH_DEBITACCOUNT ? (
            params?.row?.debitAccount.toString()?.slice(18, 43)
          ) : (
            params?.row?.debitAccount
          )
        },
      },
      {
        field: 'creditAccount',
        headerName: t('warehouseExportReceipt.items.creditAccount'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.creditAccount?.length === LENGTH_DEBITACCOUNT
            ? params?.row?.creditAccount
                .toString()
                .slice(18, 29)
                ?.replace(/^(\d*?[1-9])0+$/, '$1')
            : params?.row?.creditAccount
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
