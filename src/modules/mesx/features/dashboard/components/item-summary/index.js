import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import { useDashboardSummary } from '~/modules/mesx/redux/hooks/useDashboard'
import { convertNumberWithSISymbol } from '~/utils'

function ItemSummary() {
  const { t } = useTranslation(['mesx'])
  const { data: summary, actions } = useDashboardSummary()

  useEffect(() => {
    actions.getDashboardSummary()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.inProgressMo')}
          value={convertNumberWithSISymbol(summary?.totalInProgressMo)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.inProgressFinieshedProduct')}
          value={convertNumberWithSISymbol(summary?.totalFinishItem)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="cart"
          label={t('dashboard.inProgressSemiFinishedProduct')}
          value={convertNumberWithSISymbol(summary?.totalSemiFinishItem)}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="bag"
          label={t('dashboard.inProgressRouting')}
          value={convertNumberWithSISymbol(
            summary?.totalInProgressProducingStep,
          )}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
