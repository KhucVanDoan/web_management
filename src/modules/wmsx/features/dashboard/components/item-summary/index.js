import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { useDashboardTotalItemSummaryReport } from '~/modules/wmsx/redux/hooks/useDashboard'

function ItemSummary(props) {
  const { t } = useTranslation(['wmsx'])
  const { fromDate, toDate } = props

  const { data: totalItemSummaryReport, actions } =
    useDashboardTotalItemSummaryReport()

  useEffect(() => {
    actions.getTotalItemSummaryReport({
      from: fromDate?.toISOString(),
      to: toDate?.toISOString(),
    })
  }, [fromDate, toDate])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.importReceipt.title')}
          value={totalItemSummaryReport?.totalPurchasedOrderImport}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.exportReceipt.title')}
          value={totalItemSummaryReport?.totalSaleOrderExport}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="cart"
          label={t('dashboard.exportProposal.title')}
          value={totalItemSummaryReport?.totalWarehouseExportProposal}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="bag"
          label={t('dashboard.stockItemReport.warehouseTransfer')}
          value={totalItemSummaryReport?.totalWarehouseTransfer}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
