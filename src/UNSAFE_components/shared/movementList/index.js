import { Search, Visibility } from '@mui/icons-material'
import { Box, FormControl, Grid, MenuItem, Select } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'
import { isAfter } from 'date-fns'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import MovementDetailsForm from '~/UNSAFE_components/shared/movement/movement-details-form'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  ROUTING_STATUS_MAP,
  MOVEMENT_STATUS,
  WAREHOUSE_ORDER_TYPES,
  MOVEMENT_TYPE,
  ORDER_TYPE_ENUM,
  ROUTING_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import { onChangeDate, onChangeSelect, formatDateTimeUtc } from '~/utils'

const { Component } = require('react')

const IMPORT_MOVEMENT_TYPE = [
  MOVEMENT_TYPE.PO_IMPORT,
  MOVEMENT_TYPE.PRO_IMPORT,
  MOVEMENT_TYPE.SO_IMPORT,
  MOVEMENT_TYPE.TRANSFER_IMPORT,
]

class WarehouseMovementList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      warehouseTypeId: null,
      saleOrderTypeId: null,
      from: null,
      to: null,
      pageSize: 20,
      page: 1,
      screenType: null,
      isSubmitForm: true,
      filters: [],
      sort: null,
    }

    const { t, warehouseTypes } = props

    this.columns = [
      {
        field: 'idNumber',
        headerName: t('movements.orderNumber'),
        width: 80,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        renderCell: (params) => {
          const { row } = params
          return row?.id
        },
      },
      {
        field: 'id',
        headerName: t('movements.code'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.id
        },
      },
      {
        field: 'warehouseTypeId',
        headerName: t('movements.warehouseType'),
        width: 300,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,

        filterOptions: {
          options: warehouseTypes,
          getOptionValue: (option) => option?.id,
          getOptionLabel: (option) => t(option?.name),
        },
        renderCell: (params) => {
          const { warehouse } = params.row
          const { warehouseTypes } = warehouse
          return warehouseTypes?.map((item) => item?.name || '')?.join('; ')
        },
      },
      {
        field: 'orderCode',
        headerName: t('movements.importExport.letterCode'),
        width: 200,
        sortable: true,
        align: 'center',
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.order?.code
        },
      },
      {
        field: 'orderStatus',
        headerName: t('movements.orderStatus'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: true,

        filterOptions: {
          options: ROUTING_STATUS_OPTIONS?.filter(
            (item) => item.id === 2 || item.id === 4,
          ),
          getOptionValue: (option) => option?.id,
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { row } = params
          const { t } = this.props
          return row?.order?.status === 0 || row?.order?.status > 0
            ? t(ROUTING_STATUS_MAP[row?.order?.status])
            : ''
        },
      },
      {
        field: 'createdAt',
        headerName: t('movements.approveDate'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        type: 'date',
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return formatDateTimeUtc(createdAt)
        },
      },
      {
        field: 'createdByUser',
        headerName: t('movements.createdByUser'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const { user } = params.row
          if (!user) return ''
          return user?.fullName || user.username
        },
      },
      {
        field: 'status',
        headerName: t('movements.movementStatus'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: true,

        filterOptions: {
          options: ROUTING_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id,
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(MOVEMENT_STATUS.find((item) => item?.id === +status)?.text)
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
            </div>
          )
        },
      },
    ]
    this.validator = new SimpleReactValidator()
  }

  componentDidMount() {
    this.refreshData()
  }

  /**
   * handleCloseModal
   */
  handleCloseModal = () => {
    this.setState({ isOpenModal: false, id: null })
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  onClickViewDetails = (id) => {
    this.setState({ id, isOpenModal: true })
  }

  getTitle = () => {
    return
  }

  /**
   * Refresh data
   */
  refreshData = () => {
    const { warehouseTypeId, from, to, saleOrderTypeId } = this.state

    const { page, pageSize, filters, sort } = this.state
    const filterData = filters?.map((item) => ({
      column: item.field,
      text: item.value,
    }))
    const filter = [
      { column: 'movementType', text: IMPORT_MOVEMENT_TYPE.join(',') },
      ...filterData,
    ]
    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []
    if (warehouseTypeId) {
      filter.push({
        column: 'warehouseTypeId',
        text: warehouseTypeId,
      })
    }
    if (from && to) {
      filter.push({
        column: 'createdAt',
        text: `${new Date(from).toISOString()}|${new Date(to).toISOString()}`,
      })
    }
    if (saleOrderTypeId) {
      const movementTypeFiler = this.getMovementTypeFiler(saleOrderTypeId)

      filter.push({
        column: 'movementType',
        text: movementTypeFiler,
      })
    } else {
      filter.push({
        column: 'movementType',
        text: IMPORT_MOVEMENT_TYPE.join(','),
      })
    }
    const params = {
      page,
      limit: pageSize,
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sortData),
    }
    this.props.getWarehouseImportMovements(params)
  }

  getMovementTypeFiler = (saleOrderTypeId) => {
    switch (saleOrderTypeId) {
      case ORDER_TYPE_ENUM.PO: {
        return MOVEMENT_TYPE.PO_IMPORT.toString()
      }
      case ORDER_TYPE_ENUM.PRO: {
        return MOVEMENT_TYPE.PRO_IMPORT.toString()
      }
      case ORDER_TYPE_ENUM.SO: {
        return MOVEMENT_TYPE.SO_IMPORT.toString()
      }
      default: {
        return MOVEMENT_TYPE.TRANSFER_IMPORT.toString()
      }
    }
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

  disableSubmit = () => {
    const { from, to } = this.state
    if (from && to && isAfter(from, to)) return true

    return false
  }
  /**
   * Handle change sort
   * @param {object} sort
   */
  onChangeSort = (sort) => {
    this.setState({ sort }, this.refreshData)
  }
  render() {
    const { t, classes, warehouseTypes, warehouseMovements } = this.props
    const {
      isOpenModal,
      id,
      screenType,
      isSubmitForm,
      from,
      to,
      warehouseTypeId,
      saleOrderTypeId,
      pageSize,
      page,
    } = this.state
    const disableSubmit = this.disableSubmit()
    return (
      <div>
        <div>
          <h2>{this.getTitle()}</h2>
        </div>
        <Box display="flex" justifyContent="center" m={5}>
          <Grid container>
            {/** code */}
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('movements.movementDateRange')}
                  </label>
                </Box>

                <Box width={0.7} mr={1}>
                  <DateRangePicker
                    validator={this.validator}
                    isSubmitForm={isSubmitForm}
                    from={from}
                    to={to}
                    isRequiredFrom={false}
                    isRequiredTo={false}
                    onChangeFrom={(date) => onChangeDate(this, 'from', date)}
                    onChangeTo={(date) => onChangeDate(this, 'to', date)}
                  />
                </Box>
              </Box>
            </Grid>
            {/** name */}
            <Grid item xs={12} lg={3} md={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={1}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('movements.warehouseType')}
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
                    <Select
                      name="warehouseTypeId"
                      labelId="demo-customized-select-label"
                      id="warehouseTypeId"
                      variant="outlined"
                      value={warehouseTypeId}
                      className={clsx(classes.widthBoxSelect)}
                      onChange={(event) => onChangeSelect(this, event)}
                    >
                      {warehouseTypes.map((item) => (
                        <MenuItem value={item.id}>
                          {t(item.name?.substring(0, 50))}
                        </MenuItem>
                      ))}
                    </Select>
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
                height={1}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('common.saleOrderType')}
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
                    <Select
                      name="saleOrderTypeId"
                      labelId="demo-customized-select-label"
                      id="saleOrderTypeId"
                      variant="outlined"
                      value={saleOrderTypeId}
                      className={clsx(classes.widthBoxSelect)}
                      onChange={(event) => onChangeSelect(this, event)}
                    >
                      {WAREHOUSE_ORDER_TYPES.map((item) => (
                        <MenuItem value={item.id}>{t(item.name)}</MenuItem>
                      ))}
                    </Select>
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
                  disabled={disableSubmit}
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
        <DataTable
          rows={warehouseMovements.movements}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={warehouseMovements.total}
        />
        <MovementDetailsForm
          id={id}
          isOpenModal={isOpenModal}
          handleCloseModal={this.handleCloseModal}
          screenType={screenType}
        />
        <Loading open={warehouseMovements?.isLoading} />
      </div>
    )
  }
}
export default WarehouseMovementList
