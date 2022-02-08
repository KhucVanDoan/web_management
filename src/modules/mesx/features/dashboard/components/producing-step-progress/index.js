import { Component } from 'react'

import { FilterList } from '@mui/icons-material'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Line,
  ResponsiveContainer,
  Bar,
  Legend,
  ComposedChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import { getDashboardProducingStepProgress } from '~/modules/mesx/redux/actions/dashboard-store.action'
import { bigNumberFormater } from '~/utils/number'

import FilterModal from '../filter-modal/filter-modal'
import useStyles from './style'

class ProducingStepProgressReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moId: 0,
      itemId: 0,
      isOpenModal: false,
      items: [],
      routingId: 0,
      producingStepId: 0,
      routing: {},
      producingSteps: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { moId, itemId, producingStepId, routingId } = this.state
    const payload = {}
    if (moId) payload.boqId = moId
    if (itemId) payload.itemId = itemId
    if (producingStepId) payload.producingStepId = producingStepId
    if (routingId) payload.routingId = routingId
    this.props.getDashboardProducingStepProgress(payload)
  }

  handleFilter = (data) => {
    this.setState(
      {
        ...data,
        isOpenModal: false,
      },
      this.getData,
    )
  }

  handleOpenModal = () => this.setState({ isOpenModal: true })
  onCloseModal = () => this.setState({ isOpenModal: false })

  render() {
    const { t, classes, data } = this.props
    const { isOpenModal } = this.state
    return (
      <>
        <Box xs={12} lg={12} md={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <Box>
                  <IconButton
                    aria-label="settings"
                    onClick={this.handleOpenModal}
                    size="large"
                  >
                    <FilterList />
                  </IconButton>
                </Box>
                <Divider />
              </Grid>
              <Typography
                variant="h6"
                className={classes.reportTitle}
                color="primary"
              >
                {t('dashboard.producingStepProgress')}
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" scale="band" />
                  <YAxis tickFormatter={bigNumberFormater} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="producedQuantity"
                    barSize={20}
                    fill="#413ea0"
                    stackId="quantity"
                    name={t('dashboard.producedQuantity')}
                    // label={{ position: 'top' }}
                  />
                  <Bar
                    dataKey="todoQuantity"
                    barSize={20}
                    fill="#A5A5A5"
                    stackId="quantity"
                    name={t('dashboard.toDoQuantity')}
                  />
                  <Line
                    type="monotone"
                    dataKey="planQuantity"
                    stroke="#ff7300"
                    name={t('dashboard.plan')}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        <FilterModal
          handleSubmit={this.handleFilter}
          onCloseModal={this.onCloseModal}
          isOpenModal={isOpenModal}
          {...this.state}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  mos: state.dashboard.inProgressMos,
  data: state.dashboard.producingStepProgress,
})

const mapDispatchToProps = {
  getDashboardProducingStepProgress,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ProducingStepProgressReport)),
)
