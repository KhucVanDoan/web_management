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
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
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

import useStyles from './style'

class OEEChart extends Component {
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
                {t('productivityReport.oee')}
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
                    name={t('productivityReport.actualOEE')}
                    dataKey="actualOEE"
                    barSize={20}
                    fill="#ff7f50"
                  />
                  <Line
                    type="monotone"
                    dataKey="planOEE"
                    stroke="#6495ed"
                    name={t('productivityReport.planOEE')}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeActualOEE"
                    stroke="#32cd32"
                    name={t('productivityReport.cumulativeActualOEE')}
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
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(OEEChart)),
)
