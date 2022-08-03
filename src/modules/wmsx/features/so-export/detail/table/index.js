import { Box, Checkbox, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { ORDER_STATUS_SO_EXPORT } from '~/modules/wmsx/constants'
import { convertUtcDateToLocalTz } from '~/utils'

function TableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, status } = props

  const isDisplay =
    status === ORDER_STATUS_SO_EXPORT.PENDING ||
    status === ORDER_STATUS_SO_EXPORT.CONFIRMED ||
    status === ORDER_STATUS_SO_EXPORT.REJECTED

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('soExport.item.code'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.itemCode
      },
    },
    {
      field: 'itemName',
      headerName: t('soExport.item.name'),
      width: 150,
    },
    {
      field: 'evenRow',
      headerName: t('soExport.item.evenRow'),
      width: 120,
      renderCell: (params) => {
        return <Checkbox disabled checked={params.row?.evenRow} />
      },
    },
    {
      field: 'lotNumber',
      headerName: t('soExport.item.lotNumber'),
      width: 150,
    },
    {
      field: 'mfg',
      headerName: t('soExport.item.mfg'),
      width: 150,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.mfg)
      },
    },
    {
      field: 'packageId',
      headerName: t('soExport.item.packageCode'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.packageId
      },
    },
    {
      field: 'palletId',
      headerName: t('soExport.item.palletCode'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.palletId
      },
    },
    {
      field: 'storageLocation',
      headerName: t('soExport.item.storageLocation'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.location
      },
    },
    {
      field: 'quantity',
      headerName: t('soExport.item.quantity'),
      width: 150,
    },
    !isDisplay && {
      field: 'actualQuantity',
      headerName: t('soExport.item.actualQuantity'),
      width: 150,
    },
    {
      field: 'unitType',
      headerName: t('soExport.item.unitType'),
      width: 150,
    },
    {
      field: 'qcCheck',
      headerName: t('soExport.item.qcCheck'),
      width: 150,
      renderCell: (params) => {
        return <Checkbox checked={params?.row?.qcCheck} disabled />
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('soExport.item.qcCriteria'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.qcCriteria
      },
    },
  ]
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
        <Typography variant="h4">{t('soExport.itemsDetails')}</Typography>
      </Box>
      <DataTable
        rows={items || []}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default TableDetail
