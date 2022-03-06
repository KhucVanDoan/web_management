import { Component } from 'react'

import {
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Divider,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { PieChart, ResponsiveContainer, Pie, Cell, Legend } from 'recharts'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import { getDashboardMoStatus } from '~/modules/mesx/redux/actions/dashboard-store.action'

import useStyles from './style'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180

class MoStatusReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      to: new Date(),
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { from, to } = this.state
    this.props.getDashboardMoStatus({
      createdFrom: from.toISOString(),
      createdTo: to.toISOString(),
    })
  }

  formatData = (data) => {
    const { groupBy } = this.state
    const { t } = this.props
    return data.map((d) => {
      switch (groupBy) {
        case 1:
          return {
            ...d,
            tag: `${t('common.week')} ${d.tag}`,
          }
        case 2:
          return {
            ...d,
            tag: `${t('common.month')} ${d.tag}`,
          }
        default:
          return {
            ...d,
            tag: this.getDate(d.rangeDate),
          }
      }
    })
  }

  getDate = (date) => {
    const dt = moment(`${date}`, 'DD-MM-YYYY')
    return this.props.t(`common.dayOfWeeks${dt.isoWeekday()}`)
  }

  handleChangeGroupBy = (id) => {
    this.setState(
      {
        groupBy: id,
      },
      () => this.getData(),
    )
  }

  handleChangeSelect = (event) => {
    this.setState(
      {
        filterBy: event.target.value,
      },
      () => this.getData(),
    )
  }

  onChangeDate = (name, date) => {
    this.setState(
      {
        [name]: date,
      },
      this.getData,
    )
  }

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    // percent,
    // index,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={+x}
        y={+y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {value}
      </text>
    )
  }

  render() {
    const { t, classes, moStatus } = this.props
    const { from, to } = this.state
    const data = [
      { name: t('dashboard.toDoMo'), value: moStatus?.totalToDoMo },
      { name: t('dashboard.inTimeMo'), value: moStatus?.totalInProgressMo },
      { name: t('dashboard.lateMo'), value: moStatus?.totalLateMo },
      {
        name: t('dashboard.completedMo'),
        value: moStatus?.totalCompletedMo,
      },
    ]

    return (
      <>
        <Box xs={12} lg={12} md={12}>
          <Card className={classes.card}>
            <CardHeader
              action={
                <Grid
                  container
                  spacing={1}
                  alignItems="flex-start"
                  alignContent="flex-start"
                >
                  <Grid item xs={12} lg={12} md={12}>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('dashboard.MoCreatedAt')}
                        </label>
                      </Box>
                      <Box width={0.7} mr={1}>
                        <DateRangePicker
                          validator={this.validator}
                          isSubmitForm={true}
                          from={from}
                          to={to}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          onChangeFrom={(date) =>
                            this.onChangeDate('from', date)
                          }
                          onChangeTo={(date) => this.onChangeDate('to', date)}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Divider />
                </Grid>
              }
            />
            <CardContent className={classes.cardContent}>
              <Typography
                variant="h6"
                className={classes.reportTitle}
                color="primary"
              >
                {t('dashboard.MoStatus')}
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    paddingAngle={2}
                    fill="#8884d8"
                    label={this.renderCustomizedLabel}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  moStatus: state.dashboard.moStatus,
})

const mapDispatchToProps = {
  getDashboardMoStatus,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(MoStatusReport)),
)
