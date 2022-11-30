import { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
import { useDashboardPurchasedOrderImports } from '~/modules/wmsx/redux/hooks/useDashboard'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const ImportReceipt = ({ fromDate, toDate }) => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseId, setWarehouseId] = useState('')

  const { data: purchasedOrderImports, actions } =
    useDashboardPurchasedOrderImports()

  useEffect(() => {
    if (warehouseId) {
      actions.getPurchasedOrderImports({
        warehouseId: warehouseId,
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      })
    } else {
      actions.getPurchasedOrderImports({
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      })
    }
  }, [warehouseId, fromDate, toDate])

  useEffect(() => {
    actions.getPurchasedOrderImports({
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
      headerName: t('dashboard.importReceipt.total'),
    },
    {
      field: 'totalReceived',
      headerName: t('dashboard.importReceipt.import'),
    },
    {
      field: 'totalStoring',
      headerName: t('dashboard.importReceipt.inStock'),
    },
    {
      field: 'totalCompleted',
      headerName: t('dashboard.importReceipt.finishStock'),
    },
    {
      field: 'totalEbs',
      headerName: t('dashboard.importReceipt.ebsImport'),
    },
  ]
  return (
    <Card sx={{ p: 2, height: 170 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.importReceipt.title')}
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
        rows={isEmpty(purchasedOrderImports) ? [] : [purchasedOrderImports]}
        columns={columns}
      />
    </Card>
  )
}

export default ImportReceipt
