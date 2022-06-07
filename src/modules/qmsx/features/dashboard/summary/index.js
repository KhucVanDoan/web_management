import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { useDashboardSummary } from '~/modules/qmsx/redux/hooks/useDashboard'
import { convertNumberWithSISymbol } from '~/utils'

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
          value={convertNumberWithSISymbol(summary?.totalInputQcPlanQuantity)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Summary
          icon="rhombus"
          label={t('dashboard.producingStep')}
          value={convertNumberWithSISymbol(summary?.totalProduceQcPlanQuantity)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Summary
          icon="cart"
          label={t('dashboard.output')}
          value={convertNumberWithSISymbol(summary?.totalOutputQcPlanQuantity)}
        />
      </Grid>
    </Grid>
  )
}

export default DashboardSummary
