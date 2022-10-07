import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DataTable from '~/components/DataTable'
const ImportReceipt = () => {
  const { t } = useTranslation(['wmsx'])

  const columns = [
    {
      field: 'total',
      headerName: t('dashboard.importReceipt.total'),
    },
    {
      field: 'import',
      headerName: t('dashboard.importReceipt.import'),
    },
    {
      field: 'stocking',
      headerName: t('dashboard.importReceipt.inStock'),
    },
    {
      field: 'finished',
      headerName: t('dashboard.importReceipt.finishStock'),
    },
    {
      field: 'ebsImport',
      headerName: t('dashboard.importReceipt.ebsImport'),
    },
  ]
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.importReceipt.title')}
        </Typography>
        <Autocomplete disableClearable sx={{ width: '30%' }} />
      </Box>
      <DataTable
        hideFooter
        hideSetting
        rows={[
          {
            total: 100,
            import: 20,
            stocking: 20,
            finished: 20,
            ebsImport: 20,
          },
        ]}
        columns={columns}
      />
    </Card>
  )
}

export default ImportReceipt
