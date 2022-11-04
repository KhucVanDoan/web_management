import { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
import { useDashboardPurchasedOrderImports } from '~/modules/wmsx/redux/hooks/useDashboard'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
const ImportReceipt = () => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseId, setWarehouseId] = useState('')

  const { data: purchasedOrderImports, actions } =
    useDashboardPurchasedOrderImports()

  useEffect(() => {
    if (warehouseId) {
      actions.getPurchasedOrderImports({ warehouseId })
    }
  }, [warehouseId])

  useEffect(() => {
    actions.getPurchasedOrderImports()
  }, [])

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value?.id)
  }

  const columns = [
    {
      field: 'totalOrder',
      headerName: t('dashboard.importReceipt.total'),
    },
    {
      field: 'totalCompleted',
      headerName: t('dashboard.importReceipt.import'),
    },
    {
      field: 'totalStoring',
      headerName: t('dashboard.importReceipt.inStock'),
    },
    {
      field: 'totalReceived',
      headerName: t('dashboard.importReceipt.finishStock'),
    },
    {
      field: 'totalEbs',
      headerName: t('dashboard.importReceipt.ebsImport'),
    },
  ]
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.importReceipt.title')}
        </Typography>
        <Autocomplete
          sx={{ width: '30%' }}
          name="warehouseId"
          placeholder={t('dashboard.allWarehouse')}
          asyncRequest={(s) =>
            searchWarehouseApi({
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
        rows={[purchasedOrderImports]}
        columns={columns}
      />
    </Card>
  )
}

export default ImportReceipt
