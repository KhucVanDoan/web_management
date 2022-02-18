import React, { Component } from 'react'

import { Search } from '@mui/icons-material'
import { Box, FormControl, Grid, Autocomplete } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import {
  QUALITY_REPORT_SCREEN_TYPE,
  SALE_ORDER_STATUS,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import { searchMO } from '~/modules/mesx/redux/actions/mo.action'
import {
  getQualityReports,
  exportQualityReports,
} from '~/modules/mesx/redux/actions/quality-report.action'
import { searchSaleOrders } from '~/modules/mesx/redux/actions/sale-order'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField } from '~/utils'

import useStyles from './style'

class QualityReports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      moName: null,
      soId: null,
      dateTime: null,
      itemName: null,
      subItemCode: null,
      proDate: new Date(),
      from: null,
      to: null,
      pageSize: 20,
      page: 1,
      screenType: null,
      isSubmitForm: true,
      filters: [],
      sort: null,
      file: '',
    }

    const { t } = props

    this.columns = [
      {
        field: 'id',
        headerName: t('qualityReport.orderIdColumn'),
        width: 80,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'moName',
        headerName: t('qualityReport.moName'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.mo?.name
        },
      },
      {
        field: 'soName',
        headerName: t('qualityReport.saleOrder'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          const soId = row?.mo?.soId
          return this.props.saleOrderList.find((i) => i.id === soId)?.name
        },
      },
      {
        field: 'itemName',
        headerName: t('qualityReport.productName'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.item?.name
        },
      },
      {
        field: 'routingName',
        headerName: t('qualityReport.routingName'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.routing?.name
        },
      },
      {
        field: 'producingStepName',
        headerName: t('qualityReport.nameCD'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.producingStep?.name
        },
      },
      {
        field: 'quantity',
        headerName: t('qualityReport.quantityPlan'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.quantity ? row?.quantity : '0.00'
        },
      },
      {
        field: 'actualQuantity',
        headerName: t('qualityReport.quantitySX'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.actualQuantity ? row?.actualQuantity : '0.00'
        },
      },
      {
        field: 'confirmedQuantity',
        headerName: t('qualityReport.quantityNeed'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.confirmedQuantity ? row?.confirmedQuantity : '0.00'
        },
      },
      {
        field: 'qcPassQuantity',
        headerName: t('qualityReport.quantityDone'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.qcPassQuantity ? row?.qcPassQuantity : '0.00'
        },
      },
      {
        field: 'errorQuantity',
        headerName: t('qualityReport.quantityErr'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.errorQuantity ? row?.errorQuantity : '0.00'
        },
      },
      {
        field: 'qcRejectQuantity',
        headerName: t('qualityReport.quantityErrs'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.qcRejectQuantity ? row?.qcRejectQuantity : '0.00'
        },
      },
      {
        field: 'why',
        headerName: t('qualityReport.why'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
      },
    ]
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const params = {
      isGetFile: 1,
      isGetAll: 1,
    }
    this.props.exportQualityReports(params)
    this.props.searchMO({ isGetAll: 1 })
    this.props.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })

    const path = this.props.match.path
    const screenType =
      path?.replace('/:id', '') === ROUTE.QUALITY_REPORTS.PATH
        ? QUALITY_REPORT_SCREEN_TYPE.QUALITY_REPORT_DETAIL
        : QUALITY_REPORT_SCREEN_TYPE.QUALITY_REPORT_LIST
    this.setState(
      {
        screenType: screenType,
        isOpenModal:
          screenType === QUALITY_REPORT_SCREEN_TYPE.QUALITY_REPORT_DETAIL,
        id:
          screenType === QUALITY_REPORT_SCREEN_TYPE.QUALITY_REPORT_DETAIL
            ? this.props.match.params?.id
            : null,
      },
      this.refreshData,
    )
  }
  /**
   * Refresh data
   */
  refreshData = () => {
    const { keyword, page, pageSize, moName, soId, itemName, filters, sort } =
      this.state

    const filterData = filters?.map((item) => ({
      column: item.field,
      text: '' + item?.value?.trim(),
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

    if (itemName) {
      filterData.push({
        column: 'itemName',
        text: itemName?.trim(),
      })
    }

    if (soId) {
      filterData.push({
        column: 'soId',
        text: soId,
      })
    }

    const params = {
      search: keyword?.trim(),
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
    }
    this.props.getQualityReports(params)
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
   * Get breadcrumbs
   * @returns {object[]}
   */
  getBreadcrumbs = () => {
    const { screenType } = this.state
    switch (screenType) {
      default:
        return [
          {
            title: 'setting',
          },
          {
            route: '/quality-report',
            title: 'qualityReport',
          },
        ]
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
   * Handle export file
   * @param {int} isGetFile
   */
  handleExportFile = () => {
    const url = this.props.qualityReport.file
    const str = url.substring(url.indexOf(';') + 1)
    return `data:text/csv;base64,${str}`
  }

  /**
   * Handle change sort
   * @param {object} sort
   */
  onChangeSort = (sort) => {
    this.setState({ sort }, this.refreshData)
  }
  onChangeItem = (key, value) => {
    this.setState({ [key]: value })
  }
  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const { page, pageSize, screenType, itemName } = this.state
    const { classes, t, qualityReport, moList, saleOrderList } = this.props
    return (
      <>
        <Breadcrumbs breadcrumbs={this.getBreadcrumbs()} />
        <div>
          <h2>{t('qualityReport.title')}</h2>
        </div>
        <Box display="flex" justifyContent="center" mb={2}>
          <Grid container>
            <Grid item xs={12} lg={5} md={5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('qualityReport.moName')}
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
                height={40}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('qualityReport.productName')}
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

        <Box display="flex" justifyContent="center" mb={2}>
          <Grid container>
            <Grid item xs={12} lg={5} md={5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={40}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('qualityReport.saleOrder')}
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
              download={'qualityReport.csv'}
              className={classes.exportLink}
            >
              {t('qualityReport.export')}
            </a>
          </Button>
        </div>
        {screenType === QUALITY_REPORT_SCREEN_TYPE.QUALITY_REPORT_LIST && (
          <DataTable
            rows={qualityReport.transactions}
            columns={this.columns}
            pageSize={pageSize}
            page={page}
            onPageChange={this.onPageChange}
            onPageSizeChange={this.onPageSizeChange}
            onChangeFilter={this.onChangeFilter}
            onChangeSort={this.onChangeSort}
            total={qualityReport.total}
          />
        )}

        <Loading open={qualityReport?.isLoading} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  qualityReport: state.qualityReport,
  commonManagement: state.commonManagement,
  moList: state.Mo.moList,
  saleOrderList: state.saleOrder.saleOrderList,
})

const mapDispatchToProps = {
  getQualityReports,
  searchMO,
  searchSaleOrders,
  exportQualityReports,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(QualityReports)),
)
