import { Component } from 'react'
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
import {
  Line,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import { bigNumberFormater } from 'utils/number'
import { FilterList } from '@mui/icons-material'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import useStyles from './style'
import {
  getDashboardFinishedItemProgress,
  getDashboardFinishedItemByMo,
  getDashboardQCProducingStepProgress,
} from 'modules/mesx/redux/actions/dashboard-store.action'
import FilterModal from '../filter-modal/filter-modal'

function CustomizedLabel(data) {
  const { x, y, stroke, value } = data

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  )
}

class QcProducingStepProgressReport extends Component {
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
    const { moId, itemId, routingId, producingStepId } = this.state
    const payload = {}
    if (moId) payload.moId = moId
    if (itemId) payload.itemId = itemId
    if (routingId) payload.routingId = routingId
    if (producingStepId) payload.producingStepId = producingStepId

    this.props.getDashboardQCProducingStepProgress(payload)
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
                {t('dashboard.qcProducingStepProgress')}
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
                    fill="#EC7C30"
                    name={t('dashboard.producedQuantity')}
                    // label={{ position: 'top' }}
                  />
                  <Bar
                    dataKey="needToBeRepair"
                    barSize={20}
                    stackId="a"
                    fill="#70AD46"
                    name={t('dashboard.needToBeRepair')}
                    // label={{ position: 'top' }}
                  />
                  <Bar
                    dataKey="qcQuantity"
                    barSize={20}
                    fill="#FEC100"
                    stackId="a"
                    name={t('dashboard.qcQuantity')}
                    // label={{ position: 'top' }}
                  />
                  <Bar
                    dataKey="qcPassQuantity"
                    barSize={20}
                    fill="#A5A5A5"
                    name={t('dashboard.qcPassQuantity')}
                    // label={{ position: 'top' }}
                  />
                  <Bar
                    dataKey="qcRejectQuantity"
                    barSize={20}
                    fill="#4473C4"
                    stackId="a"
                    name={t('dashboard.errorQuantity')}
                    // label={{ position: 'top' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="planQuantity"
                    stroke="#6199D0"
                    name={t('dashboard.plan')}
                    // label={<CustomizedLabel />}
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
  data: state.dashboard.qcProducingStepProgress,
})

const mapDispatchToProps = {
  getDashboardFinishedItemProgress,
  getDashboardFinishedItemByMo,
  getDashboardQCProducingStepProgress,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(QcProducingStepProgressReport)),
)
