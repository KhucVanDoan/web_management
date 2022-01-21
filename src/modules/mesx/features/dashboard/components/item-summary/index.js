import { Card, CardContent, Grid, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import useStyles from './style'
import clsx from 'clsx'
import { getDashboardSummary } from 'modules/mesx/redux/actions/dashboard-store.action'

class ItemSummary extends Component {
  componentDidMount() {
    this.props.getDashboardSummary()
  }

  render() {
    const { classes, summary, t } = this.props
    return (
      <Grid container className={classes.displayFlex} spacing={4}>
        <Grid item xs={6} md={3} lg={3}>
          <Card
            className={clsx({
              [classes.itemBox]: true,
              [classes[`itemSummaryCard0`]]: true,
            })}
          >
            <CardContent>
              <Typography variant="h5" className={classes.numberReport}>
                {summary?.totalInProgressMo}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {t('dashboard.inProgressMo')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Card
            className={clsx({
              [classes.itemBox]: true,
              [classes[`itemSummaryCard1`]]: true,
            })}
          >
            <CardContent>
              <Typography variant="h5" className={classes.numberReport}>
                {' '}
                {summary?.totalFinishItem}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {t('dashboard.inProgressFinieshedProduct')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Card
            className={clsx({
              [classes.itemBox]: true,
              [classes[`itemSummaryCard2`]]: true,
            })}
          >
            <CardContent>
              <Typography variant="h5" className={classes.numberReport}>
                {summary?.totalSemiFinishItem}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {t('dashboard.inProgressSemiFinishedProduct')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Card
            className={clsx({
              [classes.itemBox]: true,
              [classes[`itemSummaryCard3`]]: true,
            })}
          >
            <CardContent>
              <Typography variant="h5" className={classes.numberReport}>
                {summary?.totalInProgressProducingStep}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {t('dashboard.inProgressRouting')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  summary: state.dashboard.summary,
})

const mapDispatchToProps = {
  getDashboardSummary,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemSummary)),
)
