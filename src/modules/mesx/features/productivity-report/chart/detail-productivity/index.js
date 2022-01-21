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
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import useStyles from './style'

class ProductivityChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

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
              <Typography
                variant="h6"
                className={classes.reportTitle}
                color="primary"
              >
                {t('productivityReport.productivityDetail')}
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width={800}
                  height={500}
                  data={data}
                  margin={{
                    top: 20,
                    right: 80,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis
                    dataKey="executionDay"
                    label={{
                      position: 'insideBottomRight',
                      offset: 0,
                    }}
                    scale="band"
                  />
                  <YAxis
                    unit="%"
                    label={{
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    name={t('productivityReport.planItemExecutionTime')}
                    dataKey="planExecutionTime"
                    barSize={20}
                    fill="#413ea0"
                  />
                  <Bar
                    name={t('productivityReport.actualItemExecutionTime')}
                    dataKey="actualExecutionTime"
                    barSize={20}
                    fill="#ff7f50"
                  />
                  <Bar
                    name={t('productivityReport.planProductivity')}
                    dataKey="planProductivity"
                    barSize={20}
                    fill="#707b7c"
                  />
                  <Bar
                    name={t('productivityReport.actualProductivity')}
                    dataKey="actualProductivity"
                    barSize={20}
                    fill="#dfff00"
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativePlanProductivity"
                    stroke="#6495ed"
                    name={t('productivityReport.cummulativePlanProductivity')}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeActualProductivity"
                    stroke="#32cd32"
                    name={t('productivityReport.cummulativeActualProductivity')}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ProductivityChart)),
)
