import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import ActionGroup from '~/modules/qmsx/features/dashboard/error-report/action-group'
import CauseGroup from '~/modules/qmsx/features/dashboard/error-report/cause-group'
import ErrorGroup from '~/modules/qmsx/features/dashboard/error-report/error-group'
import ErrorReportStatus from '~/modules/qmsx/features/dashboard/error-report/error-report-status'
import InputQuality from '~/modules/qmsx/features/dashboard/quality-control/input-quality'
import OutputQuality from '~/modules/qmsx/features/dashboard/quality-control/output-quality'
import ProductionInputQualityMaterial from '~/modules/qmsx/features/dashboard/quality-control/production-input-quality-material'
import ProductionInputQualityProductPrevious from '~/modules/qmsx/features/dashboard/quality-control/production-input-quality-product-previous'
import ProductionOutputQuality from '~/modules/qmsx/features/dashboard/quality-control/production-output-quality'
import QcProgress from '~/modules/qmsx/features/dashboard/quality-control/qc-progress'
import DashboardSummary from '~/modules/qmsx/features/dashboard/summary'
import { useDashboardMo } from '~/modules/qmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]

const [title, qualityControl, errorReport] = [
  'title',
  'qualityControl',
  'errorReport',
]

function Dashboard() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard'

  const { actions } = useDashboardMo()

  useEffect(() => {
    actions.getInProgressMoListDashboard()
  }, [])

  const tabs = [
    {
      label: t(`${transKey}.${qualityControl}.title`),
      value: qualityControl,
    },
    {
      label: t(`${transKey}.${errorReport}.title`),
      value: errorReport,
    },
  ]

  return (
    <Page title={t(`${transKey}.${title}`)} breadcrumbs={breadcrumbs} freeSolo>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardSummary />
        </Grid>
        <Grid item xs={12}>
          <Tabs list={tabs}>
            {/* Quality Control tab */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} md={6}>
                <InputQuality />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <OutputQuality />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <ProductionInputQualityProductPrevious />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <ProductionInputQualityMaterial />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <ProductionOutputQuality />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <QcProgress />
              </Grid>
            </Grid>
            {/* Error Report tab */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} md={6}>
                <ErrorGroup />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <CauseGroup />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <ActionGroup />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <ErrorReportStatus />
              </Grid>
            </Grid>
          </Tabs>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Dashboard
