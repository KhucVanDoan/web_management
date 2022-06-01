import { Box, Checkbox, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { convertUtcDateToLocalTz } from '~/utils'

function TableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items } = props
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,

      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('soExport.item.code'),
      width: 250,
      renderCell: (params) => {
        const { row } = params
        return row?.item.code
      },
    },
    {
      field: 'itemName',
      headerName: t('soExport.item.name'),
      width: 180,
      renderCell: (params) => {
        const { row } = params
        return row?.item.name
      },
    },
    {
      field: 'lotNumber',
      headerName: t('soExport.item.lotNumber'),
      width: 180,
    },
    {
      field: 'mfg',
      headerName: t('soExport.item.mfg'),
      width: 180,
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row?.mfg)
      },
    },
    {
      field: 'packageId',
      headerName: t('soExport.item.packageCode'),
      width: 180,
    },
    {
      field: 'quantity',
      headerName: t('soExport.item.quantity'),
      width: 180,
    },
    {
      field: 'unitType',
      headerName: t('soExport.item.unitType'),
      width: 180,
      renderCell: (params) => {
        const { row } = params
        return row?.item.itemUnit
      },
    },
    {
      field: 'qcCheck',
      headerName: t('soExport.item.qcCheck'),
      width: 180,
      renderCell: () => {
        return <Checkbox disabled />
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('soExport.item.qcCriteria'),
      width: 180,
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
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default TableDetail
