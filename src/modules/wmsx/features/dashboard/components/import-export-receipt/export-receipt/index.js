import { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
import { useDashboardSaleOrderExports } from '~/modules/wmsx/redux/hooks/useDashboard'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const ExportReceipt = () => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseId, setWarehouseId] = useState('')

  const { data: saleOrderExports, actions } = useDashboardSaleOrderExports()

  useEffect(() => {
    if (warehouseId) {
      actions.getSaleOrderExports({ warehouseId })
    }
  }, [warehouseId])

  useEffect(() => {
    actions.getSaleOrderExports()
  }, [])

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value?.id)
  }

  const columns = [
    {
      field: 'totalOrder',
      headerName: t('dashboard.exportReceipt.total'),
    },
    {
      field: 'totalInCollecting',
      headerName: t('dashboard.exportReceipt.pickingItem'),
    },
    {
      field: 'totalCollected',
      headerName: t('dashboard.exportReceipt.pendingExport'),
    },
    {
      field: 'totalCompleted',
      headerName: t('dashboard.exportReceipt.exported'),
    },
    {
      field: 'totalEbs',
      headerName: t('dashboard.exportReceipt.ebsExport'),
    },
  ]
  return (
    <Card sx={{ p: 2, mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.exportReceipt.title')}
        </Typography>
        <Autocomplete
          sx={{ width: '30%' }}
          name="warehouseId"
          placeholder={t('dashboard.allWarehouse')}
          asyncRequest={(s) =>
            getDashboardWarehouses({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={handleChangeWarehouse}
        />
      </Box>
      <DataTable
        hideFooter
        hideSetting
        rows={[saleOrderExports]}
        columns={columns}
      />
    </Card>
  )
}

export default ExportReceipt
