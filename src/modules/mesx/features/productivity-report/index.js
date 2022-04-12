import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { ROUTE } from '~/modules/mesx/routes/config'

import ProductivityChart from './chart/detail-productivity'
import OEEChart from './chart/oee'
import ProductivityFilter from './filter-form'
import ProductivityTable from './table/detail-productivity'
import OEETable from './table/oee'
const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PRODUCTIVITY_REPORT.PATH,
    title: ROUTE.PRODUCTIVITY_REPORT.TITLE,
  },
]

function ProductivityReport() {
  const { t } = useTranslation(['mesx'])
  const renderHeaderRight = () => {
    // @TODO: <linh.taquang> handle export
    return (
      <Button variant="outlined" disabled icon="download">
        {t('productivityReport.export')}
      </Button>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('productivityReport.title')}
        renderHeaderRight={renderHeaderRight}
      >
        <ProductivityFilter />
        <Tabs
          list={[
            t('productivityReport.productivityDetail'),
            t('productivityReport.oee'),
          ]}
          sx={{ mt: 3 }}
        >
          {/* Tab 1 */}
          <Box>
            <ProductivityChart />
            <Box mt={3} />
            <ProductivityTable />
          </Box>

          {/* Tab 2 */}
          <Box>
            <OEEChart />
            <Box mt={3} />
            <OEETable />
          </Box>
        </Tabs>
      </Page>
    </>
  )
}

export default ProductivityReport
