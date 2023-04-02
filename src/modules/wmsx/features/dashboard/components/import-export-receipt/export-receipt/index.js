import { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
import { useDashboardSaleOrderExports } from '~/modules/wmsx/redux/hooks/useDashboard'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const ExportReceipt = ({ fromDate, toDate }) => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseId, setWarehouseId] = useState('')

  const { data: saleOrderExports, actions } = useDashboardSaleOrderExports()

  useEffect(() => {
    if (warehouseId) {
      actions.getSaleOrderExports({
        warehouseId: warehouseId,
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      })
    } else {
      actions.getSaleOrderExports({
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      })
    }
  }, [warehouseId, fromDate, toDate])

  useEffect(() => {
    actions.getSaleOrderExports({
      from: fromDate?.toISOString(),
      to: toDate?.toISOString(),
    })
  }, [])

  const handleChangeWarehouse = (value) => {
    if (!isEmpty(value)) {
      setWarehouseId(value?.id)
    } else {
      setWarehouseId('')
    }
  }

  const columns = [
    {
      field: 'totalOrder',
      headerName: t('dashboard.exportReceipt.total'),
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'totalInCollecting',
      headerName: t('dashboard.exportReceipt.pickingItem'),
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'totalCollected',
      headerName: t('dashboard.exportReceipt.pendingExport'),
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'totalCompleted',
      headerName: t('dashboard.exportReceipt.exported'),
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'totalEbs',
      headerName: t('dashboard.exportReceipt.ebsExport'),
      align: 'right',
      headerAlign: 'left',
    },
  ]
  return (
    <Card sx={{ p: 2, height: 170 }}>
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
          getOptionSubLabel={(opt) => opt?.code}
          onChange={handleChangeWarehouse}
        />
      </Box>
      <DataTable
        hideFooter
        hideSetting
        rows={isEmpty(saleOrderExports) ? [] : [saleOrderExports]}
        columns={columns}
      />
    </Card>
  )
}

export default ExportReceipt
