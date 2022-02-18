/* eslint-disable no-param-reassign */

import React, { Component } from 'react'

import { Search } from '@mui/icons-material'
import { Box, FormControl, Grid, TextField, Autocomplete } from '@mui/material'
import Button from '@mui/material/Button'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import {
  DATE_FORMAT_2,
  PLAN_STATUS_MAP,
  PLAN_STATUS_OPTIONS,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import TableCollapse from '~/components/TableCollapse'
import {
  searchMO,
  getMODetailsById,
  getBOMProducingStepStructureById,
} from '~/modules/mesx/redux/actions/mo.action'
import {
  searchPlans,
  getPlanDetailsById,
} from '~/modules/mesx/redux/actions/plan'
import { exportPlanReport } from '~/modules/mesx/redux/actions/plan-report.action'
import { searchSaleOrders } from '~/modules/mesx/redux/actions/sale-order'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc, onChangeTextField } from '~/utils'

import useStyles from './style'

// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead
const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.MATERIAL_REPORT.PATH,
    title: ROUTE.MATERIAL_REPORT.TITLE,
  },
]

class MaterialReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bomTree: [],
      moId: '',
      proDate: '',
      itemName: '',
      id: null,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,
      soId: null,
    }

    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('materialReport.id'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'moCode',
        headerName: t('materialReport.code'),
        align: 'center',
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          const { code } = params.row
          return code
        },
      },
      {
        field: 'moName',
        headerName: t('materialReport.name'),
        sortable: true,
        filterable: true,
        align: 'center',
        paddingRight: 20,
        renderCell: (params) => {
          const { name } = params.row
          return name
        },
      },
      {
        field: 'soId',
        headerName: t('materialReport.saleOrder'),
        sortable: true,
        filterable: true,
        align: 'center',
        paddingRight: 20,
        renderCell: (params) => {
          const { saleOrder } = params.row
          return saleOrder?.name
        },
      },
      {
        field: 'moFrom',
        headerName: t('materialReport.planDate'),
        align: 'center',
        type: 'date',
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row?.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row?.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('materialReport.status'),
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
    ]
    this.producingStepColumns = [
      {
        field: 'code',
        headerName: t('materialReport.producingStepCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep?.code
        },
      },
      {
        field: 'name',
        headerName: t('materialReport.producingStepName'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep?.name
        },
      },
      {
        field: 'planQuantity',
        headerName: t('materialReport.planQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'producedQuantity',
        headerName: t('materialReport.producedQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'status',
        headerName: t('materialReport.fixErrorQuantity'),
        align: 'center',
        renderCell: (params) => {
          return 0
        },
      },
      {
        field: 'scapQuantity',
        headerName: t('materialReport.scrapQuantity'),
        align: 'center',
      },
    ]

    this.materialColumns = [
      {
        field: 'code',
        headerName: t('materialReport.materialCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.code
        },
      },
      {
        field: 'name',
        headerName: t('materialReport.materialName'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'itemType',
        headerName: t('materialReport.itemType'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemTypes } = this.props
          const { item } = params.row
          return itemTypes.find((i) => i.id === item.itemTypeId)?.name
        },
      },
      {
        field: 'planQuantity',
        headerName: t('materialReport.planQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'producedQuantity',
        headerName: t('materialReport.producedQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'fixErrorQuantity',
        headerName: t('materialReport.fixErrorQuantity'),
        align: 'center',
        renderCell: (params) => {
          return 0
        },
      },
      {
        field: 'scapQuantity',
        headerName: t('materialReport.scrapQuantity'),
        align: 'center',
      },
      {
        field: 'unit',
        headerName: t('materialReport.unit'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnit
        },
      },
    ]

    this.additionColums = [
      {
        field: 'itemCode',
        headerName: t('materialReport.itemCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.code
        },
      },
      {
        field: 'itemName',
        headerName: t('materialReport.itemName'),
        width: 150,
        align: 'left',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'itemType',
        headerName: t('materialReport.itemType'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemTypes } = this.props
          const { item } = params.row
          return itemTypes.find((i) => i.id === item.itemTypeId)?.name
        },
      },
      {
        field: 'planQuantity',
        headerName: t('materialReport.planQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'producedQuantity',
        headerName: t('materialReport.producedQuantity'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'unit',
        headerName: t('materialReport.unit'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnit
        },
      },
      {
        field: 'rootPlanDate',
        headerName: t('materialReport.planDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planFrom, planTo } = params.row
          return (
            formatDateTimeUtc(planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('materialReport.status'),
        align: 'center',
        // renderCell: (params) => {
        //   const { planBom } = params.row;
        //   return planBom.status;
        // },
      },
    ]
    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
    this.props.searchSaleOrders({ isGetAll: 1 })
    this.props.exportPlanReport()
  }

  /**
   * Refresh data
   */
  refreshData = () => {
    const { moId, page, pageSize, filters, sort, proDate, soId, itemName } =
      this.state

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

    if (moId) {
      filterData.push({
        column: 'moId',
        text: moId,
      })
    }

    if (itemName) {
      filterData.push({
        column: 'itemName',
        text: itemName,
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
      isGetAll: 1,
    }

    this.props.searchMO(params, (res) => {
      this.setState({
        bomTree: this.props.moList,
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
    this.props.getBOMProducingStepStructureById(id, (res) => {
      const { bomTree } = this.state
      bomTree.map((bom) => {
        if (bom?.id === id) {
          bom['subBoms'] = res
        }
      })
      this.setState(bomTree)
    })
  }
  /**
   * Handle export file
   */
  handleExportFile = () => {
    // const url = this.props.materialReport?.file;
    // const str = url.substring(url.indexOf(';') + 1);
    // return `data:text/csv;base64,${str}`;
  }
  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const { bomTree, page, pageSize, itemName } = this.state
    const { classes, t, moList, saleOrderList } = this.props

    return (
      <>
        <div>
          <h2>{t('materialReport.title')}</h2>
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
                    {t('materialReport.code')}
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
                      getOptionLabel={(option) => option?.code}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id
                      }
                      renderOption={(option, { selected }) => {
                        return <React.Fragment>{option?.code}</React.Fragment>
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      onChange={(event, value) =>
                        this.onChangeItem('moId', value?.id)
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
                    {t('materialReport.productName')}
                  </label>
                </Box>
                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl className={classes.textField}>
                    <TextField
                      name="itemName"
                      id="itemName"
                      value={itemName}
                      margin="dense"
                      variant="outlined"
                      size="small"
                      onChange={(event) => onChangeTextField(this, event)}
                    />
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
                    {t('materialReport.saleOrder')}
                  </label>
                </Box>
                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl className={classes.textField}>
                    <Autocomplete
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      options={saleOrderList}
                      getOptionLabel={(option) => option?.code}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id
                      }
                      renderOption={(option, { selected }) => {
                        return <React.Fragment>{option?.code}</React.Fragment>
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
                    {t('materialReport.labledateSX')}
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
              {t('materialReport.export')}
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
          materialColumns={this.materialColumns}
          isRoot={true}
          type={'list'}
          isView={true}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={moList?.total}
          materialReport={true}
        />
        <Loading open={moList?.isLoading} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  materialReport: state.materialReport,
  saleOrderList: state.saleOrder.saleOrderList,
  moList: state.Mo.moList,
  moDetails: state.Mo.moDetails,
  itemTypes: state.appStore.itemTypes,
})

const mapDispatchToProps = {
  searchPlans,
  getPlanDetailsById,
  exportPlanReport,
  searchSaleOrders,
  searchMO,
  getMODetailsById,
  getBOMProducingStepStructureById,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(MaterialReport)),
  ),
  breadcrumbs,
)
