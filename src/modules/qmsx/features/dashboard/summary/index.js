import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { useDashboardSummary } from '~/modules/qmsx/redux/hooks/useDashboard'

function DashboardSummary() {
  const { t } = useTranslation('qmsx')
  const { data: summary, actions } = useDashboardSummary()

  useEffect(() => {
    actions.getSummaryDashboard()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={4}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.input')}
          value={summary?.totalInputQcPlanQuantity ?? 0}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Summary
          icon="rhombus"
          label={t('dashboard.producingStep')}
          value={summary?.totalProduceQcPlanQuantity ?? 0}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Summary
          icon="cart"
          label={t('dashboard.output')}
          value={summary?.totalOutputQcPlanQuantity ?? 0}
        />
      </Grid>
    </Grid>
  )
}

export default DashboardSummary
