import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { useDashboardItemSummary } from '~/modules/mmsx/redux/hooks/useDashboard'
import { convertNumberWithSISymbol } from '~/utils'

function ItemSummary() {
  const { t } = useTranslation(['mmsx'])
  const { data: itemSummaryReport, actions: actionsItemSummary } =
    useDashboardItemSummary()

  useEffect(() => {
    actionsItemSummary.getSummary()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.totalJob')}
          value={convertNumberWithSISymbol(itemSummaryReport[0]?.count)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.finishedJob')}
          value={convertNumberWithSISymbol(itemSummaryReport[1]?.count)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="bag"
          label={t('dashboard.unfinishedJob')}
          value={convertNumberWithSISymbol(itemSummaryReport[2]?.count)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="overdue"
          label={t('dashboard.overdue')}
          value={convertNumberWithSISymbol(itemSummaryReport[3]?.count)}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
