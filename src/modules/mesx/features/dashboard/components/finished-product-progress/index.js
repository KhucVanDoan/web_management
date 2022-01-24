import { Component } from 'react'

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Line,
  ResponsiveContainer,
  Bar,
  Tooltip,
  Legend,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import {
  getDashboardFinishedItemProgress,
  getDashboardFinishedItemByMo,
} from '~/modules/mesx/redux/actions/dashboard-store.action'
import { bigNumberFormater } from '~/utils/number'

import useStyles from './style'

function CustomizedLabel(data) {
  const { x, y, stroke, value } = data

  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fill={stroke}
      fontSize={10}
      textAnchor="middle"
    ></text>
  )
}

class FinishedProductProgressReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moId: 0,
      itemId: 0,
      items: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { moId, itemId } = this.state
    const payload = {}
    if (moId) payload.moId = moId
    if (itemId) payload.itemId = itemId
    this.props.getDashboardFinishedItemProgress(payload)
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

  async getItemByMoId(moId) {
    if (!moId) {
      this.setState({
        items: [],
      })
    } else {
      this.props.getDashboardFinishedItemByMo({ moId: moId }, (items) =>
        this.setState({ items: items }),
      )
    }
  }

  handleChangeSelect = (event, key) => {
    if (key === 'moId') {
      this.getItemByMoId(event.target.value)
    }
    this.setState(
      {
        [key]: event.target.value,
      },
      () => this.getData(),
    )
  }

  render() {
    const { t, classes, mos, data } = this.props
    const { moId, items, itemId } = this.state
    return (
      <>
        <Box xs={12} lg={12} md={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={6} lg={6} md={6}>
                  <Box display="flex" alignItems="center" flex={1}>
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('dashboard.selectMo')}
                      </label>
                    </Box>
                    <Box width={0.7} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="moId"
                          labelId="demo-customized-select-label"
                          id="moId"
                          variant="outlined"
                          value={moId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'moId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat(mos)
                            .map((item) => (
                              <MenuItem value={item.id}>
                                {t(item.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('dashboard.finishedItemName')}
                      </label>
                    </Box>
                    <Box width={0.7} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="itemId"
                          labelId="demo-customized-select-label"
                          id="itemId"
                          variant="outlined"
                          value={itemId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'itemId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat(items)
                            .map((item) => (
                              <MenuItem value={item?.item?.itemId}>
                                {t(item?.item?.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Divider />
              </Grid>
              <Typography
                variant="h6"
                className={classes.reportTitle}
                color="primary"
              >
                {t('dashboard.finishedItemProgress')}
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
                    stackId="quantity"
                    fill="#EC7C30"
                    name={t('dashboard.producedItem')}
                  />
                  <Bar
                    dataKey="todoQuantity"
                    barSize={20}
                    fill="#A5A5A5"
                    stackId="quantity"
                    name={t('dashboard.todoFinieshedProduct')}
                  />
                  <Line
                    type="monotone"
                    dataKey="planQuantity"
                    width={20}
                    stroke="#ff7300"
                    label={<CustomizedLabel />}
                    name={t('dashboard.plan')}
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

const mapStateToProps = (state) => ({
  mos: state.dashboard.inProgressMos,
  data: state.dashboard.finishedItemProgress,
})

const mapDispatchToProps = {
  getDashboardFinishedItemProgress,
  getDashboardFinishedItemByMo,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(FinishedProductProgressReport)),
)
