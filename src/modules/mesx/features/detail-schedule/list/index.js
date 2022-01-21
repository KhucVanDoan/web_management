import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import withStyles from '@mui/styles/withStyles'
import TextField from '@mui/material/TextField'
import Loading from 'components/Loading'
import Modal from 'UNSAFE_components/shared/modal'
import DataTable from 'components/DataTable'

import useStyles from './style'
import {
  searchDetailSchedule,
  updateDetailSchedule,
  approveDetailScheduleById,
  rejectDetailScheduleById,
  getDetailScheduleDetailsById,
  deleteDetailSchedule,
} from 'modules/mesx/redux/actions/detail-schedule.action'
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import withBreadcrumbs from 'components/Breadcrumbs'
import CheckBox from '@mui/icons-material/CheckBox'
import { Link } from 'react-router-dom'
import { formatDateTimeUtc, onChangeTextField, redirectRouter } from 'utils'
import {
  MODAL_MODE,
  DATE_FORMAT_2,
  DETAIL_SCHEDULE_STATUS_TO_EDIT,
  DETAIL_SCHEDULE_STATUS_TO_CONFIRM,
  DETAIL_SCHEDULE_STATUS_OPTIONS,
  DETAIL_SCHEDULE_STATUS_MAP,
  DETAIL_SCHEDULE_STATUS,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import WorkCenterPlanList from 'modules/mesx/features/work-center-plan/list'
import WorkCenterPlanForm from 'modules/mesx/features/work-center-plan/form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: '/detail-schedule',
    title: 'detailSchedule',
  },
]

class DetailSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      modalMode: MODAL_MODE.CREATE,
      isOpenDeleteModal: false,
      isOpenConfirmModal: false,
      pageSize: 20,
      page: 1,
      keyword: '',
      filters: [],
      sort: null,
      isOpenWorkCenterPlanListModal: false,
      isOpenWorkCenterPlanFormModal: false,
      workCenterPlanMode: MODAL_MODE.CREATE,
      workCenterPlanId: '',
      workOrderId: '',
    }

    const { t } = props

    this.columns = [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        sortable: false,
      },
      {
        field: 'code',
        headerName: t('detailSchedule.code'),
        width: 150,
        filterable: true,
      },
      {
        field: 'woCode',
        headerName: t('detailSchedule.woCode'),
        width: 150,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.workOrder?.code
        },
      },
      {
        field: 'workCenter',
        headerName: t('detailSchedule.workCenter'),
        width: 200,
        filterable: true,
        sortable: false,
        renderCell: (params) => {
          const workCenterName = params.row.workCenters
            ?.map((workCenter) => workCenter?.name)
            ?.join(' / ')
          return workCenterName
        },
      },
      {
        field: 'planQuantity',
        headerName: t('detailSchedule.planQuantity'),
        width: 80,
        filterable: true,
        sortable: false,
        renderCell: (params) => {
          return params?.row?.quantity
        },
      },
      {
        field: 'productionQuantity',
        headerName: t('detailSchedule.productionQuantity'),
        width: 80,
        filterable: true,
        sortable: false,
        renderCell: (params) => {
          return params?.row?.actualQuantity
        },
      },
      {
        field: 'unit',
        headerName: t('detailSchedule.unit'),
        width: 80,
        filterable: true,
      },
      {
        field: 'status',
        headerName: t('detailSchedule.status'),
        width: 150,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: DETAIL_SCHEDULE_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(DETAIL_SCHEDULE_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        disableClickEventBubbling: true,
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, id, workOrder } = params.row
          const canEdit = DETAIL_SCHEDULE_STATUS_TO_EDIT.includes(status)
          const canConfirm = DETAIL_SCHEDULE_STATUS_TO_CONFIRM.includes(status)

          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(workOrder?.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {canEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(workOrder?.id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickConfirmed(workOrder?.id)}
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
        field: 'workCenterPlan',
        headerName: t('detailSchedule.workCenterPlan'),
        width: 150,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, workOrder } = params.row
          const canGoToWorkCenterPlan =
            status === DETAIL_SCHEDULE_STATUS.CONFIRMED
          return (
            canGoToWorkCenterPlan && (
              <Link
                onClick={() =>
                  this.handleOpenWorkCenterPlanListModal(workOrder?.id)
                }
              >
                {t('detailSchedule.workCenterPlan')}
              </Link>
            )
          )
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
    this.props.searchDetailSchedule(params)
  }

  /*
   * handleOpenWorkCenterPlanModal
   */
  handleOpenWorkCenterPlanListModal = (id) => {
    this.setState({ isOpenWorkCenterPlanListModal: true, workOrderId: id })
  }

  /*
   *   handleCloseWorkCenterPlanModal = () => {
   */
  handleCloseWorkCenterPlanListModal = () => {
    this.setState({ isOpenWorkCenterPlanListModal: false })
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
    redirectRouter(ROUTE.DETAIL_SCHEDULE.CREATE.PATH)
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
    redirectRouter(ROUTE.DETAIL_SCHEDULE.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.DETAIL_SCHEDULE.EDIT.PATH, { id: id })
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
    this.setState({ id, isOpenConfirmModal: true })
  }

  /**
   * Submit confirm purchased order
   */
  submitConfirm = () => {
    this.props.approveDetailScheduleById(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteDetailSchedule(this.state.id, () => {
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
   *
   * @param {int} pageSize
   */
  onPageSizeChange = ({ pageSize }) => {
    this.setState({ pageSize })
    this.setState({ pageSize }, this.refreshData)
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = ({ page }) => {
    this.setState({ page })
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

  onClickViewDetailsPlan = (id) => {
    redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id })
  }

  /*
   * handleOpenWorkCenterPlanFormModal
   */
  handleOpenWorkCenterPlanFormModal = (mode, id, workCenterId) => {
    this.setState({
      isOpenWorkCenterPlanFormModal: true,
      workCenterPlanMode: mode,
      workOrderScheduleDetailsId: id,
      workCenterId: workCenterId,
    })
  }
  /*
   *   handleCloseWorkCenterPlanFormModal = () => {
   */
  handleCloseWorkCenterPlanFormModal = () => {
    this.setState({ isOpenWorkCenterPlanFormModal: false })
  }
  render() {
    const {
      workOrderId,
      isOpenDeleteModal,
      pageSize,
      page,
      isOpenConfirmModal,
      isOpenWorkCenterPlanListModal,
      isOpenWorkCenterPlanFormModal,
      workCenterPlanMode,
      workCenterId,
      workOrderScheduleDetailsId,
    } = this.state
    const { classes, detailSchedule, t } = this.props
    return (
      <>
        <div>
          <h2>{t('detailSchedule.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('detailSchedule.searchPlaceholder')}
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
        <DataTable
          rows={detailSchedule.detailScheduleList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={detailSchedule.total}
        />
        {/* <Loading open={detailSchedule?.isLoading} /> */}
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('detailSchedule.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('detailSchedule.deleteConfirm')}
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
        {isOpenWorkCenterPlanListModal && (
          <WorkCenterPlanList
            id={workOrderId}
            isOpenModal={isOpenWorkCenterPlanListModal}
            handleCloseModalList={this.handleCloseWorkCenterPlanListModal}
            handleOpenWorkCenterPlanFormModal={
              this.handleOpenWorkCenterPlanFormModal
            }
          />
        )}

        {isOpenWorkCenterPlanFormModal && (
          <WorkCenterPlanForm
            mode={workCenterPlanMode}
            isOpenModal={isOpenWorkCenterPlanFormModal}
            workCenterId={workCenterId}
            id={workOrderScheduleDetailsId}
            handleCloseModalForm={this.handleCloseWorkCenterPlanFormModal}
          />
        )}
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  detailSchedule: state.detailSchedule,
})

const mapDispatchToProps = {
  searchDetailSchedule,
  updateDetailSchedule,
  approveDetailScheduleById,
  rejectDetailScheduleById,
  getDetailScheduleDetailsById,
  deleteDetailSchedule,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(DetailSchedule)),
  ),
  breadcrumbs,
)
