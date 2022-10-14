import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'

function ItemSummary() {
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.importReceipt.title')}
          value={100}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="rhombus"
          label={t('dashboard.exportReceipt.title')}
          value={100}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="cart"
          label={t('dashboard.itemReport.other')}
          value={100}
        />
      </Grid>
      <Grid item xs={6} md={6} lg={3}>
        <Summary
          icon="bag"
          label={t('dashboard.itemReport.other')}
          value={100}
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
