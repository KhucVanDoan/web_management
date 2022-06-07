import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import {
  useDashboardItemSummaryReport,
  useDashboardOtherItemSummaryReport,
  useDashboardTotalItemSummaryReport,
} from '~/modules/wmsx/redux/hooks/useDashboard'
import { convertNumberWithSISymbol } from '~/utils'

function ItemSummary() {
  const { t } = useTranslation(['wmsx'])
  const { data: itemSummaryReport, actions: actionsItemSummary } =
    useDashboardItemSummaryReport()

  const { data: otherItemSummaryReport, actions: actionsOtherItemSummary } =
    useDashboardOtherItemSummaryReport()

  const { data: totalItemSummaryReport, actions: actionsTotalItemSummary } =
    useDashboardTotalItemSummaryReport()

  useEffect(() => {
    actionsItemSummary.getItemSummaryReport()
    actionsOtherItemSummary.getOrtherItemSummaryReport()
    actionsTotalItemSummary.getTotalItemSummaryReport()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.itemReport.total')}
          value={convertNumberWithSISymbol(totalItemSummaryReport?.total)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.itemReport.other')}
          value={convertNumberWithSISymbol(otherItemSummaryReport?.total)}
        />
      </Grid>
      {itemSummaryReport?.map((itemType, i) => (
        <Grid key={itemType?.id} item xs={6} md={6} lg={3}>
          <Summary
            icon={i === 0 ? 'cart' : 'bag'}
            label={t(itemType.name)}
            value={convertNumberWithSISymbol(itemType?.itemCount)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemSummary
