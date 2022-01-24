import React, { Component } from 'react'

import { Box, Divider, Grid } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import Page from '~/components/Page'
import { getDashboardInProgressMos } from '~/modules/mesx/redux/actions/dashboard-store.action'

import FinishedProductProgress from './components/finished-product-progress'
import ItemSummary from './components/item-summary'
import MoStatusReport from './components/mo-status'
import ProducingStepProgress from './components/producing-step-progress'
import QcProducingStepProgress from './components/qc-producing-step-progress'
import useStyles from './style'

const breadcrumbs = [
  {
    route: '/',
    title: 'dashboard',
  },
]
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getDashboardInProgressMos()
  }

  render() {
    const { t, classes } = this.props
    return (
      <Page title={t('dashboard.title')} onSearch={() => {}}>
        <Box container>
          <Grid container xs={12} className={classes.summarySection}>
            <ItemSummary />
          </Grid>
          <Divider />
        </Box>
        <Box container marginTop={'20px'}>
          <Grid container xs={12} className={classes.summarySection}>
            <Grid container className={classes.displayFlex} spacing={4}>
              <Grid item xs={12} lg={6} md={6}>
                <MoStatusReport />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <FinishedProductProgress />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box container marginTop={'20px'}>
          <Grid container xs={12} className={classes.summarySection}>
            <Grid container className={classes.displayFlex} spacing={4}>
              <Grid item xs={12} lg={6} md={6}>
                <ProducingStepProgress />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <QcProducingStepProgress />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  itemTypes: state.appStore.itemTypes,
})

const mapDispatchToProps = { getDashboardInProgressMos }

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(Dashboard)),
)
