import React, { Component } from 'react'

import { Search } from '@mui/icons-material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import {
  FormHelperText,
  Tab,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Autocomplete,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import { MO_STATUS } from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import { getItems } from '~/modules/mesx/redux/actions/common.action'
import {
  searchProducingSteps,
  getProducingStepDetailsById,
} from '~/modules/mesx/redux/actions/index.action'
import {
  searchMO,
  getMODetailsById,
} from '~/modules/mesx/redux/actions/mo.action'
import { getDataProductivityReport } from '~/modules/mesx/redux/actions/productivity-report.action'
import {
  searchWorkCenter,
  getWorkCenterDetailsById,
} from '~/modules/mesx/redux/actions/work-center.action'
import { ROUTE } from '~/modules/mesx/routes/config'

import ProductivityChart from './chart/detail-productivity'
import OEEChart from './chart/oee'
import useStyles from './style'
import ProductivityTable from './table/detail-productivity'
import OEETable from './table/oee'
const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PRODUCTIVITY_REPORT.PATH,
    title: ROUTE.PRODUCTIVITY_REPORT.TITLE,
  },
]

class ProductivityReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      workCenterId: null,
      moId: null,
      itemId: null,
      producingStepId: null,
      pageSize: 20,
      page: 1,
      isSubmitForm: true,
      filters: [],
      sort: null,
      file: '',
      moDetail: {},
      data: [],
      isSubmitFilter: false,
      tabValue: '1',
    }
    this.validator = new SimpleReactValidator()
  }

  componentDidMount() {
    this.refreshData()
  }
  /**
   * Refresh init data
   */
  refreshData = () => {
    const filterData = [
      {
        column: 'status',
        text: MO_STATUS.IN_PROGRESS.toString(),
      },
    ]
    const params = {
      isGetAll: 1,
      filter: JSON.stringify(filterData),
    }
    this.props.searchMO(params)
    this.props.getItems()
    this.props.searchProducingSteps({ isGetAll: 1 })
    this.props.searchWorkCenter({ isGetAll: 1 })
  }
  handleFilter = () => {
    this.setState({ isSubmitFilter: true })
    if (this.validator.allValid()) {
      const { moId, itemId, producingStepId, workCenterId } = this.state
      const params = {
        manufacturingOrderId: +moId,
        itemId: itemId,
        producingStepId: producingStepId,
        workCenterId: workCenterId,
      }
      this.props.getDataProductivityReport(params, (res) => {
        this.setState({
          prData: this.props.productivityReport.data,
        })
      })
    }
  }
  getItemObject = (id) => {
    const { itemList } = this.props
    return itemList?.find((item) => item?.id === id)
  }
  getProducingStepObject = (id) => {
    const producingStepList = this.props.producingStep.list
    return producingStepList?.find((item) => item?.id === id)
  }
  getWorkCenterObject = (id) => {
    const workCenterList = this.props.workCenter.wcList
    return workCenterList?.find((item) => item?.id === id)
  }
  onChangeItem = (key, value) => {
    this.setState({ [key]: value })
    this.setState({ producingStepId: null })
  }
  onChangeItemWc = (key, value) => {
    this.setState({ [key]: value })
  }
  onChangeItemMo = (key, value) => {
    this.setState({ [key]: value }, this.resetFilter)
  }
  onChangeItemPs = (key, value) => {
    this.setState({ [key]: value })
    this.setState({ workCenterId: null })
  }
  resetFilter = () => {
    this.setState({
      itemId: null,
      producingStepId: null,
      workCenterId: null,
    })
  }
  handleChangeTabValue = (event, value) => {
    this.setState({
      tabValue: value,
    })
  }
  render() {
    const { t, classes, mo, itemList, workCenter, producingStep } = this.props
    const {
      moId,
      workCenterId,
      itemId,
      producingStepId,
      prData,
      isSubmitFilter,
      tabValue,
    } = this.state

    const psList = producingStep?.list
    const moList = mo?.moList
    const workCenterList = workCenter?.wcList
    const moDetail = moList?.find((x) => x.id === moId)

    const itemListFilter = itemList?.filter((i) =>
      moDetail?.manufacturingOrderDetails?.map((x) => x.itemId).includes(i.id),
    )
    const workOrderList = moDetail?.manufacturingOrderDetails
      ?.filter((x) => x.itemId === itemId)
      ?.map((i) => i?.workOrders)

    let wcId = []
    const producingStepIds = workOrderList?.shift()?.map((wo) => {
      wo?.workCenters.forEach((w) => {
        wcId.push(w?.id)
      })
      return wo?.producingStepId
    })
    const producingStepFilterList = psList?.filter((ps) =>
      producingStepIds?.includes(ps.id),
    )
    const wcListFilter = workCenterList?.filter((i) => wcId?.includes(i.id))
    const data = prData?.map((data) => ({
      actualExecutionTime: parseFloat(data.actualExecutionTime)?.toFixed(2),
      actualProductivity: parseFloat(data.actualProductivity)?.toFixed(2),
      cumulativeActualProductivity: parseFloat(
        data.cumulativeActualProductivity,
      )?.toFixed(2),
      cumulativePlanProductivity: parseFloat(
        data.cumulativePlanProductivity,
      )?.toFixed(2),
      executionDay: new Date(data.executionDay).toLocaleDateString(),
      planExecutionTime: parseFloat(data.actualExecutionTime)?.toFixed(2),
      planProductivity: parseFloat(data.actualExecutionTime)?.toFixed(2),
    }))

    return (
      <>
        <div>
          <h2>{t('productivityReport.title')}</h2>
        </div>
        <Box display="flex" justifyContent="center">
          <Grid container>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
                mr={2}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('productivityReport.moCode')}
                    <span className={classes.required}> *</span>
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
                      name="moId"
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
                        this.onChangeItemMo('moId', value?.id)
                      }
                      openOnFocus
                    />
                    {/* add rule to validate */}
                    {this.validator.message('moId', moId, `required`)}
                    {/* check isValid to show messages */}
                    {isSubmitFilter &&
                      !this.validator.check(moId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
                mt={2}
                mr={2}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('productivityReport.workCenter')}
                    <span className={classes.required}> *</span>
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
                      name="workCenterId"
                      size="small"
                      variant="outlined"
                      value={this.getWorkCenterObject(workCenterId) || null}
                      options={wcListFilter}
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
                        this.onChangeItemWc('workCenterId', value?.id)
                      }
                      openOnFocus
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'workCenterId',
                      workCenterId,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitFilter &&
                      !this.validator.check(workCenterId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
                mr={2}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('productivityReport.itemName')}
                    <span className={classes.required}> *</span>
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
                      name="itemId"
                      size="small"
                      variant="outlined"
                      options={itemListFilter}
                      value={this.getItemObject(itemId) || null}
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
                        this.onChangeItem('itemId', value?.id)
                      }
                      openOnFocus
                    />
                    {/* add rule to validate */}
                    {this.validator.message('itemId', itemId, `required`)}
                    {/* check isValid to show messages */}
                    {isSubmitFilter &&
                      !this.validator.check(itemId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('productivityReport.producingSteps')}
                    <span className={classes.required}> *</span>
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
                      name="producingStepId"
                      size="small"
                      variant="outlined"
                      options={producingStepFilterList}
                      value={
                        this.getProducingStepObject(producingStepId) || null
                      }
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
                        this.onChangeItemPs('producingStepId', value?.id)
                      }
                      openOnFocus
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'producingStepId',
                      producingStepId,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitFilter &&
                      !this.validator.check(producingStepId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-end"
                mr={1}
                flex={1}
                height={1}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleFilter}
                  startIcon={<Search />}
                >
                  {t('common.search')}
                </Button>
              </Box>
            </Grid>

            <TabContext value={tabValue}>
              <Box
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                style={{ marginLeft: '25px' }}
              >
                <TabList onChange={this.handleChangeTabValue}>
                  <Tab
                    label={t('productivityReport.productivityDetail')}
                    value="1"
                  />
                  <Tab label={t('productivityReport.oee')} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" className={classes.tabPanel}>
                <Grid container>
                  <Grid item xs={12} lg={12} md={12}>
                    <ProductivityChart data={data} />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Box width="100%">
                    <ProductivityTable data={data} />
                  </Box>
                </Grid>
              </TabPanel>
              <TabPanel value="2" className={classes.tabPanel}>
                <Grid container>
                  <Grid item xs={12} lg={12} md={12}>
                    <OEEChart data={data} />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Box width="100%">
                    <OEETable data={data} />
                  </Box>
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  itemTypes: state.appStore.itemTypes,
  mo: state.Mo,
  itemList: state.commonManagement.itemList,
  workCenter: state.workCenter,
  producingStep: state.producingStep,
  productivityReport: state.productivityReport,
})

const mapDispatchToProps = {
  searchMO,
  getItems,
  searchWorkCenter,
  searchProducingSteps,
  getMODetailsById,
  getProducingStepDetailsById,
  getWorkCenterDetailsById,
  getDataProductivityReport,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(ProductivityReport)),
  ),
  breadcrumbs,
)
