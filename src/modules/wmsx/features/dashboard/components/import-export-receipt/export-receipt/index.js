import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
const ExportReceipt = () => {
  const { t } = useTranslation(['wmsx'])

  const columns = [
    {
      field: 'total',
      headerName: t('dashboard.exportReceipt.total'),
    },
    {
      field: 'pickingItem',
      headerName: t('dashboard.exportReceipt.pickingItem'),
    },
    {
      field: 'pendingExport',
      headerName: t('dashboard.exportReceipt.pendingExport'),
    },
    {
      field: 'exported',
      headerName: t('dashboard.exportReceipt.exported'),
    },
    {
      field: 'ebsExport',
      headerName: t('dashboard.exportReceipt.ebsExport'),
    },
  ]
  return (
    <Card sx={{ p: 2, mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.exportReceipt.title')}
        </Typography>
        <Autocomplete disableClearable sx={{ width: '30%' }} />
      </Box>
      <DataTable
        hideFooter
        hideSetting
        rows={[
          {
            total: 100,
            pickingItem: 20,
            pendingExport: 20,
            exported: 20,
            ebsExport: 20,
          },
        ]}
        columns={columns}
      />
    </Card>
  )
}

export default ExportReceipt
