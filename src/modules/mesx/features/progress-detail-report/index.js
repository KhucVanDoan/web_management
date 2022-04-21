import React from 'react'

import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mesx/routes/config'

import ProgressDetailReportChart from './chart'
import ProgressDetailReport from './filter-form'
import ProgressTable from './table'

const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PROGRESS_DETAIL_REPORT.PATH,
    title: ROUTE.PROGRESS_DETAIL_REPORT.TITLE,
  },
]

function ProgessDetailReport() {
  const { t } = useTranslation(['mesx'])
  const renderHeaderRight = () => {
    // @TODO: <doan.khucvan> handle export
    return (
      <Button variant="outlined" disabled icon="download">
        {t('ProgessDetailReport.export')}
      </Button>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('ProgessDetailReport.title')}
        renderHeaderRight={renderHeaderRight}
      >
        <ProgressDetailReport />
        <Box>
          <ProgressDetailReportChart />
          <Box mt={3}></Box>
          <ProgressTable />
        </Box>
      </Page>
    </>
  )
}

export default ProgessDetailReport
