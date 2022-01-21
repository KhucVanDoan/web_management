/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import {
  DATE_FORMAT_2,
  PLAN_STATUS_MAP,
  PLAN_STATUS_OPTIONS,
  PRODUCING_STEP_OPTIONS,
  PRODUCING_STEP_STATUS_MAP,
  SALE_ORDER_STATUS,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import clsx from 'clsx'
import Loading from 'components/Loading'
import withBreadcrumbs from 'components/Breadcrumbs'
import useStyles from './style'
import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'

import { Search } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead
import {
  searchPlans,
  getPlanDetailsById,
} from 'modules/mesx/redux/actions/plan.action'
import { searchSaleOrders } from 'modules/mesx/redux/actions/sale-order.action'
import { exportPlanReport } from 'modules/mesx/redux/actions/plan-report.action'
import { formatDateTimeUtc, onChangeDate } from 'utils'
import TableCollapse from 'components/TableCollapse'
import { searchMO } from 'modules/mesx/redux/actions/mo.action'
import { Autocomplete } from '@mui/material'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PLAN.LIST.PATH,
    title: ROUTE.PLAN.LIST.TITLE,
  },
]

class PlanReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bomTree: [],
      proDate: '',
      id: null,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,
      soId: null,
      moName: null,
    }

    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('definePlan.id'),
        align: 'center',
        width: 100,
        sortable: false,
      },
      {
        field: 'code',
        headerName: t('definePlan.code'),
        align: 'center',
        filterable: true,
        sortable: true,
      },
      {
        field: 'moCode',
        headerName: t('planReport.moCode'),
        sortable: true,
        filterable: true,
        align: 'center',
        paddingRight: 20,
        renderCell: (params) => {
          const { mo } = params.row
          return mo?.code
        },
      },
      {
        field: 'moName',
        headerName: t('planReport.moName'),
        sortable: true,
        filterable: true,
        align: 'center',
        paddingRight: 20,
      },
      {
        field: 'soName',
        headerName: t('planReport.saleOrder'),
        width: 200,
        align: 'center',
        filterable: true,
        sortable: true,
      },
      {
        field: 'plan',
        headerName: t('planReport.planDefine'),
        width: 200,
        align: 'center',
        type: 'date',
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('planReport.status'),
        align: 'center',
        sortable: true,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: PLAN_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(PLAN_STATUS_MAP[status])
        },
      },
      {
        field: 'progress',
        headerName: t('definePlan.progress'),
        align: 'center',
        sortable: false,
        filterable: false,
      },
    ]
    this.producingStepColumns = [
      {
        field: 'name',
        headerName: t('definePlan.producingStepName'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep.name
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'actualQuantity',
        headerName: t('definePlan.actualQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'rootPlanDate',
        headerName: t('planReport.planDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planDate, endDate } = params.row
          return (
            formatDateTimeUtc(planDate, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(endDate, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { startAt } = params.row
          return formatDateTimeUtc(startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { endAt } = params.row
          return formatDateTimeUtc(endAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'status',
        headerName: t('definePlan.status'),
        align: 'center',
        sortable: true,
        type: 'categorical',
        filterable: true,
        renderCell: (params) => {
          const { status } = params.row
          return status
        },
      },
      {
        field: 'progress',
        headerName: t('definePlan.progress'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { progress } = params.row
          return progress
        },
      },
    ]

    this.additionColums = [
      {
        field: 'itemName',
        headerName: t('definePlan.itemName'),
        width: 150,
        align: 'left',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'bomName',
        headerName: t('definePlan.bomName'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { bom } = params.row
          return bom?.name
        },
      },
      {
        field: 'routingCode',
        headerName: t('definePlan.routingCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { routing } = params.row
          return routing?.code
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.quantity
        },
      },
      {
        field: 'planQuantity',
        headerName: t('definePlan.planQuantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.actualQuantity
        },
      },
      {
        field: 'unit',
        headerName: t('definePlan.unit'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnit
        },
      },
      {
        field: 'rootPlanDate',
        headerName: t('planReport.planDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          if (planBom) {
            return (
              formatDateTimeUtc(planBom?.planFrom, DATE_FORMAT_2) +
              ' - ' +
              formatDateTimeUtc(planBom?.planTo, DATE_FORMAT_2)
            )
          }
        },
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.endAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'status',
        headerName: t('definePlan.status'),
        align: 'center',
        sortable: true,
        type: 'categorical',
        filterable: true,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom.status
        },
      },
      {
        field: 'progress',
        headerName: t('definePlan.progress'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.progress
        },
      },
    ]
    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
    this.props.searchMO({ isGetAll: 1 })
    this.props.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    this.props.exportPlanReport()
  }

  /**
   * Refresh data
   */
  refreshData = () => {
    const { moName, soId, page, pageSize, filters, sort, proDate } = this.state

    const filterData = filters?.map((plan) => ({
      column: plan.field,
      text: plan?.value?.trim(),
    }))

    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

    if (moName) {
      filterData.push({
        column: 'moName',
        text: moName,
      })
    }

    if (proDate) {
      filterData.push({
        column: 'planFrom',
        text: `${new Date(proDate).toISOString()}`,
      })
    }

    if (soId) {
      filterData.push({
        column: 'soId',
        text: soId,
      })
    }

    const params = {
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
    }

    this.props.searchPlans(params, (res) => {
      this.setState({
        bomTree: this.props.definePlan?.planList,
      })
    })
  }

  /**
   * Handle key down event
   * @param {*} e
   */
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.refreshData()
    }
  }

  /**
   *
   * @param {int} pageSize
   */
  onPageSizeChange = ({ pageSize }) => {
    this.setState({ pageSize }, this.refreshData)
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = ({ page }) => {
    this.setState({ page }, this.refreshData)
  }

  /**
   * Handle change filter
   * @param {array} filters
   */
  onChangeFilter = (filters) => {
    this.setState({ filters }, this.refreshData)
  }

  /**
   * Handle change sort
   * @param {object} sort
   */
  onChangeSort = (sort) => {
    this.setState({ sort }, this.refreshData)
  }

  onChangeItem = (key, value) => {
    if (value) this.setState({ [key]: value })
    else this.setState({ [key]: '' })
  }

  /**
   * Handle get data
   * @param {object} id
   */
  handleGetData = (id) => {
    this.props.getPlanDetailsById(id, (res) => {
      const { bomTree } = this.state
      const { definePlan } = this.props
      bomTree.map((bom) => {
        if (bom?.id === id) {
          bom['subBom'] = definePlan.planDetails?.planBoms
        }
      })
      this.setState(bomTree)
    })
  }
  /**
   * Handle export file
   */
  handleExportFile = () => {
    const url = this.props.planReport.file
    const str = url.substring(url.indexOf(';') + 1)
    return `data:text/csv;base64,${str}`
  }
  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const { bomTree, page, pageSize, proDate } = this.state
    const { classes, definePlan, t, moList, saleOrderList } = this.props

    return (
      <>
        <div>
          <h2>{t('planReport.title')}</h2>
        </div>
        <Box display="flex" justifyContent="center">
          <Grid container>
            <Grid item xs={12} lg={5} md={5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('planReport.moName')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      options={moList}
                      getOptionLabel={(option) => option?.name}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id
                      }
                      renderOption={(option, { selected }) => {
                        return <React.Fragment>{option?.name}</React.Fragment>
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      onChange={(event, value) =>
                        this.onChangeItem('moName', value?.name)
                      }
                      openOnFocus
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={5} md={5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('planReport.labledateSX')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth>
                    {/* <DatePicker
                      name="productionDate"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      margin="dense"
                      size="small"
                      value={proDate || null}
                      fullWidth
                      onChange={(date) => onChangeDate(this, 'proDate', date)}
                      clearable="true"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              size="small"
                              disabled={!proDate}
                              onClick={(event) => {
                                onChangeDate(this, 'proDate', null)
                                event.stopPropagation()
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mr={1}
                flex={1}
                height={1}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.refreshData}
                  startIcon={<Search />}
                >
                  {t('common.search')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center">
          <Grid container>
            <Grid item xs={12} lg={5} md={5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('planReport.saleOrder')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      options={saleOrderList}
                      getOptionLabel={(option) => option?.name}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id
                      }
                      renderOption={(option, { selected }) => {
                        return <React.Fragment>{option?.name}</React.Fragment>
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      onChange={(event, value) =>
                        this.onChangeItem('soId', value?.id)
                      }
                      openOnFocus
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.exportBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <a
              href={this.handleExportFile()}
              download={'PlanReport.csv'}
              className={classes.exportLink}
            >
              {t('qualityReport.export')}
            </a>
          </Button>
        </div>
        <TableCollapse
          rows={bomTree}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          handleGetData={this.handleGetData}
          additionColums={this.additionColums}
          producingStepColumns={this.producingStepColumns}
          isRoot={true}
          type={'list'}
          isView={true}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={definePlan?.total}
        />
        <Loading open={definePlan?.isLoading} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  definePlan: state.definePlan,
  moList: state.Mo.moList,
  saleOrderList: state.saleOrder.saleOrderList,
  planReport: state.planReport,
})

const mapDispatchToProps = {
  searchPlans,
  getPlanDetailsById,
  searchMO,
  searchSaleOrders,
  exportPlanReport,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(PlanReport)),
  ),
  breadcrumbs,
)
