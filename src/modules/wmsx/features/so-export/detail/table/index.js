import { useEffect } from 'react'

import { Box, Checkbox, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { convertUtcDateToLocalTz } from '~/utils'

function TableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const { items } = props
  const {
    data: { itemList },
    actions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getItems()
  }, [])
  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }
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
        return getItemObject(params?.row?.itemId)?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('soExport.item.name'),
      width: 180,
      renderCell: (params) => {
        return getItemObject(params?.row?.itemId)?.name
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
        return convertUtcDateToLocalTz(params?.row?.mfg)
      },
    },
    {
      field: 'packageId',
      headerName: t('soExport.item.packageCode'),
      width: 180,
      renderCell: (params) => {
        return getItemObject(params?.row?.itemId)?.packages
      },
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
        return getItemObject(params?.row?.itemId)?.itemUnit?.name
      },
    },
    {
      field: 'qcCheck',
      headerName: t('soExport.item.qcCheck'),
      width: 180,
      renderCell: (params) => {
        return <Checkbox checked={params?.row?.qcCheck} disabled />
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('soExport.item.qcCriteria'),
      width: 180,
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
