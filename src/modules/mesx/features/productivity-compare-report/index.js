import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Page from '~/components/Page'
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
    // @TODO: <linh.taquang> handle export
    return (
      <Button variant="outlined" disabled icon="download">
        {t('productivityCompareReport.export')}
      </Button>
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
        <Typography variant="h3" color="primary">
          {t('productivityCompareReport.productivityWorkCenter')}
        </Typography>
        <ChartCompare />
        <TableCompare />
      </Box>
      <Box mt={2}>
        <Typography variant="h3" color="primary">
          {t('productivityCompareReport.oeeWorkCenter')}
        </Typography>
        <OeeCompare />
        <OeeTable />
      </Box>
    </Page>
  )
}

export default ProductivityCompareReport
