import React, { Component } from 'react'

import { Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search'
import {
  FormControl,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  WORK_ORDER_STATUS_OPTIONS,
  MODAL_MODE,
  QR_CODE_TYPE,
  NUMBER_FIELD_REQUIRED_SIZE,
  DATE_FORMAT_2,
} from '~/common/constants'
import { WORK_ORDER_STATUS, WORK_ORDER_STATUS_MAP } from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  confirmWorkOrderById,
  deleteWorkOrder,
  searchWorkOrders,
  printQRWorkOrder,
} from '~/modules/mesx/redux/actions/work-order.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc, onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: '/work-order',
    title: 'workOrder',
  },
]
class WorkOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      modalMode: MODAL_MODE.CREATE,
      isOpenDeleteModal: false,
      isOpenPrintQRModal: false,
      pageSize: 20,
      page: 1,
      keyword: '',
      filters: [],
      sort: null,

      selectedRows: [],
      isSubmitPrintQR: false,
    }

    const { t, itemUnits } = props

    this.columns = [
      {
        field: 'id',
        headerName: t('workOrder.orderIdColumn'),
        width: 80,
        sortable: false,
        headerAlign: 'center',
      },
      {
        field: 'code',
        headerName: t('workOrder.codeCV'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
      },
      {
        field: 'moPlanCode',
        headerName: t('workOrder.codeKH'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { moPlan } = params.row
          return moPlan?.code
        },
      },
      {
        field: 'moName',
        headerName: t('workOrder.moName'),
        width: 200,
        sortable: true,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.mo?.name
        },
      },
      {
        field: 'moDetailItemCode',
        headerName: t('workOrder.codeTP'),
        width: 300,
        sortable: true,
        filterable: true,
        headerAlign: 'center',
        renderCell: (params) => {
          const { row } = params
          return row?.moDetail?.itemCode
        },
      },

      {
        field: 'moDetailItemName',
        headerName: t('workOrder.nameTP'),
        width: 200,
        headerAlign: 'center',
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.moDetail?.itemName
        },
      },
      {
        field: 'bomItemName',
        headerName: t('workOrder.nameBTP'),
        width: 200,
        sortable: true,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          if (row?.bom?.itemName !== row?.moDetail.itemName) {
            return row?.bom?.itemName
          }
        },
      },
      {
        field: 'bomName',
        headerName: t('defineBOM.bomName'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.bom?.name
        },
      },
      {
        field: 'producingStepName',
        headerName: t('workOrder.nameCD'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.producingStep?.name
        },
      },
      {
        field: 'plan',
        headerName: t('workOrder.plan'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
        type: 'date',
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'workCenter',
        headerName: t('workOrder.workshop'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
        renderCell: (params) => {
          const workCenterName = params.row.workCenters
            ?.map((workCenter) => workCenter?.name)
            ?.join('; ')
          return workCenterName
        },
      },
      {
        field: 'quantity',
        headerName: t('workOrder.quantityPlan'),
        width: 200,
        headerAlign: 'center',
        filterable: true,
      },
      {
        field: 'actualQuantity',
        headerName: t('workOrder.quantityPro'),
        width: 200,
        headerAlign: 'center',
        filterable: false,
      },
      {
        field: 'itemUnitId',
        headerName: t('workOrder.calunit'),
        width: 200,
        headerAlign: 'center',
        filterable: false,
        renderCell: (params) => {
          const { row } = params
          return itemUnits?.find(
            (item) => item.id === row?.moDetail?.itemUnitId,
          )?.name
        },
      },
      {
        field: 'status',
        headerName: t('workOrder.status'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: WORK_ORDER_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.name),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(WORK_ORDER_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'left',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status } = params.row
          const isEdit =
            status === WORK_ORDER_STATUS.CREATED ||
            status === WORK_ORDER_STATUS.CONFIRMED
          const isConfirmed = status === WORK_ORDER_STATUS.CREATED
          const isDelete = status === WORK_ORDER_STATUS.CREATED
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {isEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(params.row.id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}

              {isDelete && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(params.row.id)}
                  size="large"
                >
                  <Delete />
                </IconButton>
              )}

              {isConfirmed && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickConfirmed(params.row.id)}
                  size="large"
                >
                  <CheckBox style={{ color: 'green' }} />
                </IconButton>
              )}
            </div>
          )
        },
      },
      {
        field: 'detailSchedule',
        headerName: t('workOrder.detailSchedule'),
        width: 150,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, id, hasSchedule } = params.row
          const canEdit = status === WORK_ORDER_STATUS.CONFIRMED
          return canEdit ? (
            <Link onClick={() => this.onClickEditDetailSchedule(id)}>
              {t('workOrder.detailSchedule')}
            </Link>
          ) : null
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
  }

  /**
   * Refresh data
   */
  refreshData = () => {
    const { keyword, page, pageSize, filters, sort } = this.state

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

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
    }
    this.props.searchWorkOrders(params)
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
   */
  handleCreate = () => {
    redirectRouter(ROUTE.WORK_ORDER_CREATE.PATH)
  }

  /**
   *
   * @param {boolean} refresh
   */
  handleCloseModal = (refresh = false) => {
    this.setState({ isOpenModal: false, id: null })
    refresh && this.refreshData()
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  onClickViewDetails = (id) => {
    redirectRouter(ROUTE.WORK_ORDER_DETAIL.PATH, { id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.WORK_ORDER_EDIT.PATH, { id })
  }

  /**
   *
   * @param {int} id
   */
  onClickDelete = (id) => {
    this.setState({ id, isOpenDeleteModal: true })
  }

  /**
   *
   * @param {int} id
   */
  onClickConfirmed = (id) => {
    redirectRouter(ROUTE.WORK_ORDER_DETAIL.PATH, { id })
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteWorkOrder(this.state.id, () => {
      this.setState({ isOpenDeleteModal: false })
      this.refreshData()
    })
  }

  /**
   * onCancelDelete
   */
  onCancelDelete = () => {
    this.setState({ isOpenDeleteModal: false })
  }

  /**
   * Submit confirm work-order
   */
  submitConfirm = () => {
    this.props.confirmWorkOrderById(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }

  /**
   *
   * @param {int} id
   */
  onClickConfirmed = (id) => {
    this.setState({ id, isOpenConfirmModal: true })
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

  /**
   *
   * @param {array} selectedRows
   */
  onChangeSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows: selectedRows.map((item) => ({ ...item, amount: 1 })),
    })
  }

  /**
   * handleOpenPrintQRModal
   */
  handleOpenPrintQRModal = () => {
    this.setState({ isOpenPrintQRModal: true })
  }

  /**
   * handleClosePrintQRModal
   */
  handleClosePrintQRModal = () => {
    this.setState({ isOpenPrintQRModal: false })
  }

  /**
   * handleSubmitPrintQR
   */
  handleSubmitPrintQR = () => {
    this.setState({ isSubmitPrintQR: true })
    if (this.validator.allValid()) {
      const { selectedRows } = this.state
      const params = {
        items: selectedRows.map((item) => ({
          id: item.id,
          quantity: item.amount,
        })),
        type: QR_CODE_TYPE.ITEM,
      }
      this.props.printQRWorkOrder(params, () => {
        this.setState(
          { isOpenPrintQRModal: false, isSubmitPrintQR: false },
          this.clearQRAmounts,
        )
      })
    }
  }

  /**
   * Clear selected row amount
   */
  clearQRAmounts = () => {
    const { selectedRows } = this.state
    this.setState({
      selectedRows: selectedRows.map((item) => ({ ...item, amount: 1 })),
    })
  }
  onClickViewDetailSchedule = (id) => {
    redirectRouter(ROUTE.DETAIL_SCHEDULE.DETAIL.PATH, { id: id })
  }
  onClickEditDetailSchedule = (id) => {
    redirectRouter(ROUTE.DETAIL_SCHEDULE.EDIT.PATH, { id: id })
  }
  /**
   *
   * @param {int} index
   * @param {int} value
   */
  onChangeItemAmount = (index, value) => {
    const items = this.state.selectedRows.slice()
    const itemToChange = items[index]
    itemToChange.amount = value
    this.setState({ selectedRows: items })
  }

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const {
      isOpenDeleteModal,
      page,
      pageSize,
      isOpenConfirmModal,
      isOpenPrintQRModal,
      selectedRows,
      isSubmitPrintQR,
    } = this.state
    const { classes, workOrder, t } = this.props

    return (
      <>
        <div>
          <h2>{t('workOrder.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('workOrder.searchPlaceholder')}
            variant="outlined"
            size="small"
            onKeyDown={this.onKeyDown}
            name="keyword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.refreshData}
                    size="large"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => onChangeTextField(this, event)}
          />
        </div>
        <div className={classes.exportBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleOpenPrintQRModal}
            disabled={selectedRows.length === 0}
          >
            {t('defineItem.printQRButton')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={this.handleImport}
          >
            {t('workOrder.import')}
          </Button>
        </div>
        <DataTable
          rows={workOrder.workOrderList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSelectedRows={this.onChangeSelectedRows}
          onChangeSort={this.onChangeSort}
          total={workOrder.total}
          checkboxSelection
          selected={selectedRows}
        />
        <Loading open={workOrder?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('workOrder.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('workOrder.deleteConfirm')}
        </Modal>
        <Modal
          isOpen={isOpenConfirmModal}
          title={t('common.notify')}
          size="sm"
          onSubmit={this.submitConfirm}
          onClose={this.onCloseConfirmModal}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('common.confirmMessage.confirm')}
        </Modal>
        <Modal
          isOpen={isOpenPrintQRModal}
          title={t('defineItem.printQRModalTitle')}
          size="md"
          onSubmit={this.handleSubmitPrintQR}
          onClose={this.handleClosePrintQRModal}
          submitLabel={t('common.print')}
          closeLabel={t('common.no')}
          onCancel={this.clearQRAmounts}
          cancelLabel={t('common.cancel')}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>{t('defineItem.orderNumber')}</TableCell>
                  <TableCell>{t('defineItem.code')}</TableCell>
                  <TableCell>{t('defineItem.name')}</TableCell>
                  <TableCell>{t('defineItem.productAmount')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows.map((row, i) => {
                  return (
                    <TableRow hover key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row?.code}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <TextField
                            name="amount"
                            id="amount"
                            value={row?.amount}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            onChange={(event) =>
                              this.onChangeItemAmount(i, +event.target.value)
                            }
                            inputProps={{
                              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER
                                .MIN,
                            }}
                            type="number"
                          />
                          {/* add rule to validate */}
                          {this.validator.message(
                            `itemAmount${i}`,
                            row?.amount,
                            `required|numeric|integer|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num`,
                          )}
                          {/* check isValid to show messages */}
                          {isSubmitPrintQR &&
                            !this.validator.check(row?.amount, `required`) && (
                              <FormHelperText error>
                                {t('form.required')}
                              </FormHelperText>
                            )}
                          {/* check isValid to show messages */}
                          {isSubmitPrintQR &&
                            !this.validator.check(
                              row?.amount,
                              `numeric|integer|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num`,
                            ) && (
                              <FormHelperText error>
                                {t('form.minNumber', {
                                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER
                                    .MIN,
                                })}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  workOrder: state.workOrder,
  workOrderTypes: state.appStore.workOrderTypes,
  itemUnits: state.appStore.itemUnits,
})

const mapDispatchToProps = {
  searchWorkOrders,
  deleteWorkOrder,
  confirmWorkOrderById,
  printQRWorkOrder,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(WorkOrder)),
  ),
  breadcrumbs,
)
