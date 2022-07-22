import { Checkbox, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useJob from '~/modules/mmsx/redux/hooks/useJob'

function ItemSettingTable() {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { jobDetail },
  } = useJob()
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
      field: 'title',
      headerName: t('job.detail.titleCate'),
      width: 150,
    },
    {
      field: 'description',
      headerName: t('job.detail.descriptionCate'),
      width: 150,
    },
    {
      field: 'required',
      headerName: t('job.detail.requiredCate'),
      width: 150,
      renderCell: (params) => {
        const { obligatory } = params.row
        return <Checkbox checked={obligatory === 1} disabled />
      },
    },
  ]
  return (
    <>
      <Typography variant="h4" mt={1} mb={2}>
        {t('job.detail.titleList')}
      </Typography>
      <DataTable
        columns={columns}
        rows={jobDetail?.installationTemplate?.details || []}
        hideFooter
        hideSetting
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
