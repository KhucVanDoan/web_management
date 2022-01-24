import React, { Component } from 'react'

import {
  AddCircle,
  CheckBox,
  Delete,
  Edit,
  Visibility,
} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import Modal from '~/UNSAFE_components/shared/modal'
import { MODAL_MODE } from '~/common/constants'
import {
  PRODUCING_STEP_OPTIONS,
  PRODUCING_STEP_STATUS_MAP,
  PRODUCING_STEP_STATUS_TO_CONFIRM,
  PRODUCING_STEP_STATUS_TO_EDIT,
  PRODUCING_STEP_STATUS_TO_DELETE,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchProducingSteps,
  deleteProducingStep,
  updateProducingStep,
  getProducingStepDetailsById,
  confirmProducingStep,
} from '~/modules/mesx/redux/actions/index.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'ProducingStep',
  },
  {
    route: '/producing-step',
    title: 'producingStep',
  },
]

class ProducingStep extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.state = {
      id: null,
      modalMode: MODAL_MODE.CREATE,
      isOpenConfirmDeleteModal: false,
      isOpenConfirmModal: false,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,
    }
    this.MODAL_MAP_CONTENT = {
      CREATE: {
        title: t('producingStep.createTitle'),
        submitLabel: t('common.create'),
        cancelLabel: t('common.cancel'),
      },
      UPDATE: {
        title: t('producingStep.updateTitle'),
        submitLabel: t('common.save'),
        cancelLabel: t('common.cancel'),
      },
      DETAIL: {
        title: t('producingStep.viewTitle'),
        cancelLabel: t('common.cancel'),
      },
    }
    this.columns = [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        sortable: false,
      },
      {
        field: 'code',
        headerName: t('producingStep.code'),
        width: 200,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('producingStep.name'),
        width: 200,
        filterable: true,
      },
      {
        field: 'status',
        headerName: t('producingStep.status'),
        width: 150,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: PRODUCING_STEP_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(PRODUCING_STEP_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('producingStep.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, id } = params.row
          const canConfirm = PRODUCING_STEP_STATUS_TO_CONFIRM.includes(status)
          const canEdit = PRODUCING_STEP_STATUS_TO_EDIT.includes(status)
          const canDelete = PRODUCING_STEP_STATUS_TO_DELETE.includes(status)
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.handleViewDetails(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {canEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.handleEdit(params.row.id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {canDelete && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(params.row.id)}
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

  componentDidMount() {
    this.refreshData()
  }

  handleSearchItemGroups = () => {
    this.refreshData()
  }

  handleSearchItemGroupsByEnter = (e) => {
    if (e.key === 'Enter') {
      this.refreshData()
    }
  }

  handleCreate = () => {
    redirectRouter(ROUTE.PRODUCING_STEP.CREATE.PATH)
  }

  handleEdit = (id) => {
    redirectRouter(ROUTE.PRODUCING_STEP.EDIT.PATH, { id: id })
  }

  handleViewDetails = (id) => {
    redirectRouter(ROUTE.PRODUCING_STEP.DETAIL.PATH, { id: id })
  }

  onClickDelete = (id) => {
    this.setState({ id, isOpenConfirmDeleteModal: true })
  }
  onClickConfirmed = (id) => {
    this.setState({ id, isOpenConfirmModal: true })
  }
  /**
   * Submit confirm producing step
   */
  submitConfirm = () => {
    this.props.confirmProducingStep(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }

  onSubmitDelete = () => {
    this.props.deleteProducingStep(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
  }

  onCloseModalDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
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
    this.props.searchProducingSteps(params)
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

  render() {
    const {
      modalMode,
      isOpenConfirmDeleteModal,
      pageSize,
      page,
      isOpenConfirmModal,
    } = this.state
    const { classes, producingStep, t } = this.props

    return (
      <>
        <div>
          <h2>{t('producingStep.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('producingStep.searchPlaceholder')}
            variant="outlined"
            size="small"
            name="keyword"
            onKeyDown={this.handleSearchItemGroupsByEnter}
            onChange={(event) => onChangeTextField(this, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.handleSearchItemGroups}
                    size="large"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.createBox}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCreate}
            startIcon={<AddCircle />}
          >
            {t('common.create')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={this.handleImport}
          >
            {t('defineBOQ.import')}
          </Button>
        </div>
        <DataTable
          rows={producingStep.list}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={producingStep.total}
        />
        <Loading open={producingStep?.isLoading} />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('producingStep.deleteTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCloseModalDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('producingStep.confirmDelete')}
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
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  producingStep: state.producingStep,
})

const mapDispatchToProps = {
  searchProducingSteps,
  deleteProducingStep,
  updateProducingStep,
  getProducingStepDetailsById,
  confirmProducingStep,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(ProducingStep)),
  ),
  breadcrumbs,
)
