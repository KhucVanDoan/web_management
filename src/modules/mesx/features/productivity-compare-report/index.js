import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { exportProductivityCompareReportApi } from '~/modules/mesx/redux/sagas/productivity-compare-report/import-export-productivity-compare-report'
import { ROUTE } from '~/modules/mesx/routes/config'

import OeeCompare from './chart/oee'
import ChartCompare from './chart/productivity-compare'
import ProductivityCompareFilter from './form-filter'
import OeeTable from './table/oee'
import TableCompare from './table/productivity-compare'

const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PRODUCTIVITY_COMPARE_REPORT.LIST.PATH,
    title: ROUTE.PRODUCTIVITY_COMPARE_REPORT.LIST.TITLE,
  },
]
function ProductivityCompareReport() {
  const { t } = useTranslation(['mesx'])
  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('planReport.export')}
        onExport={(params) => {
          exportProductivityCompareReportApi({
            queryIds: JSON.stringify(params?.map((x) => ({ id: x?.id }))),
          })
        }}
        disabled
      />
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.productivityCompareReport')}
      renderHeaderRight={renderHeaderRight}
    >
      <ProductivityCompareFilter />
      <Box mt={2}>
        <Typography variant="h4" component="span">
          {t('productivityCompareReport.productivityWorkCenter')}
        </Typography>
        <ChartCompare />
        <Box mt={4}>
          <TableCompare />
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="h4" component="span">
          {t('productivityCompareReport.oeeWorkCenter')}
        </Typography>
        <OeeCompare />
        <Box mt={4}>
          <OeeTable />
        </Box>
      </Box>
    </Page>
  )
}

export default ProductivityCompareReport
