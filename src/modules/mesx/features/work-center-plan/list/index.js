import React, { Component } from 'react'

import { Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  WORK_CENTER_PLAN_STATUS_TO_EDIT,
  WORK_CENTER_PLAN_STATUS_TO_CONFIRM,
  WORK_CENTER_PLAN_STATUS_TO_DELETE,
  WORK_CENTER_PLAN_STATUS_MAP,
  WORK_CENTER_PLAN_STATUS_TO_VIEW,
  MODAL_MODE,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchWorkCenterPlan,
  deleteWorkCenterPlan,
  confirmWorkCenterPlan,
} from '~/modules/mesx/redux/actions/work-center-plan.action'
import { onChangeTextField } from '~/utils'

import useStyles from './style'

class WorkCenterPlanList extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      workCenterId: '',
      isOpenConfirmModal: false,
      isOpenDeleteModal: false,
      keyword: '',
    }
    this.validator = new SimpleReactValidator()
    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('workCenterPlan.id'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'planCode',
        headerName: t('workCenterPlan.planCode'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { workCenter } = params.row
          return workCenter.id
        },
      },
      {
        field: 'woCode',
        headerName: t('workCenterPlan.woCode'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: () => {
          return this.props.workCenterPlan.wcpList?.workOrder?.code
        },
      },
      {
        field: 'code',
        headerName: t('workCenterPlan.code'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { workCenter } = params.row
          return workCenter.code
        },
      },
      {
        field: 'name',
        headerName: t('workCenterPlan.name'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { workCenter } = params.row
          return workCenter.name
        },
      },
      {
        field: 'status',
        headerName: t('workCenterPlan.status'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(WORK_CENTER_PLAN_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('workCenterPlan.action'),
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, id, workCenter } = params.row
          const workCenterId = workCenter?.id
          const canEdit = WORK_CENTER_PLAN_STATUS_TO_EDIT.includes(status)
          const canConfirm = WORK_CENTER_PLAN_STATUS_TO_CONFIRM.includes(status)
          const canDelete = WORK_CENTER_PLAN_STATUS_TO_DELETE.includes(status)
          const canView = WORK_CENTER_PLAN_STATUS_TO_VIEW.includes(status)
          return (
            <div>
              {canView && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickViewDetails(id, workCenterId)}
                  size="large"
                >
                  <Visibility />
                </IconButton>
              )}
              {canEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(id, workCenterId)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {canDelete && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(workCenterId)}
                  size="large"
                >
                  <Delete />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickConfirmed(id)}
                  size="large"
                >
                  <CheckBox style={{ color: 'green' }} />
                </IconButton>
              )}
            </div>
          )
        },
      },
    ]
  }
  onClickDelete = (workCenterId) => {
    this.setState({ workCenterId, isOpenDeleteModal: true })
  }
  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    const { workCenterId } = this.state
    const { workCenterPlan } = this.props
    this.props.deleteWorkCenterPlan(
      { id: workCenterPlan.wcpList?.workOrder?.id, wcId: workCenterId },
      () => {
        this.setState({ isOpenDeleteModal: false })
        this.refreshData()
      },
    )
  }

  onClickConfirmed = (id) => {
    this.setState({ id, isOpenConfirmModal: true })
  }
  onClickViewDetails = (id, workCenterId) => {
    this.props.handleCloseModalList()
    this.props.handleOpenWorkCenterPlanFormModal(
      MODAL_MODE.DETAIL,
      id,
      workCenterId,
    )
  }

  onClickEdit = (id, workCenterId) => {
    this.props.handleCloseModalList()
    this.props.handleOpenWorkCenterPlanFormModal(
      MODAL_MODE.UPDATE,
      id,
      workCenterId,
    )
  }

  componentDidMount() {
    this.refreshData()
  }

  handleOpenCreateFormModal = () => {
    this.props.handleCloseModalList()
    this.props.handleOpenWorkCenterPlanFormModal()
  }

  handleSearchByEnter = (e) => {
    if (e.key === 'Enter') {
      this.refreshData()
    }
  }

  handleSearch = () => {
    this.refreshData()
  }

  refreshData = () => {
    const { id } = this.props
    const { keyword } = this.state
    const params = {
      keyword: keyword.trim(),
    }
    this.props.searchWorkCenterPlan({ id, params })
  }
  onCloseModal = () => {
    // callback action from parent
    this.props.handleCloseModalList()
  }

  /**
   * Submit confirm purchased order
   */
  submitConfirm = () => {
    this.props.confirmWorkCenterPlan(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false })
  }
  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }
  /**
   * onCancelDelete
   */
  onCancelDelete = () => {
    this.setState({ isOpenDeleteModal: false })
  }

  render() {
    const { isOpenConfirmModal, isOpenDeleteModal } = this.state
    const { isOpenModal, t, classes, workCenterPlan } = this.props
    return (
      <Modal
        title={t('workCenterPlan.title')}
        size={'lg'}
        isOpen={isOpenModal}
        onClose={this.onCloseModal}
        hideCancel
        hideSubmit
        hideClose
      >
        <div style={{ textAlign: 'center' }}>
          <h2>{t('workCenterPlan.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('workCenterPlan.searchPlaceHolder')}
            variant="outlined"
            size="small"
            name="keyword"
            onKeyDown={this.handleSearchByEnter}
            onChange={(event) => onChangeTextField(this, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.handleSearch}
                    size="large"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Loading open={workCenterPlan?.isLoading} />
        <DataTable
          rows={workCenterPlan?.wcpList?.workOrderScheduleDetails}
          columns={this.columns}
          minWidth={500}
        />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('workCenterPlan.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('workCenterPlan.deleteConfirm')}
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
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  workCenterPlan: state.workCenterPlan,
})

const mapDispatchToProps = {
  searchWorkCenterPlan,
  deleteWorkCenterPlan,
  confirmWorkCenterPlan,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(WorkCenterPlanList)),
)
