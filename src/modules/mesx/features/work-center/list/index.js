import React, { Component } from 'react'

import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  MODAL_MODE,
  WORK_CENTER_STATUS_OPTIONS,
  WORK_CENTER_STATUS_MAP,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchWorkCenter,
  deleteWorkCenter,
  confirmWorkCenter,
} from '~/modules/mesx/redux/actions/work-center.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: 'database/work-center',
    title: 'workCenter',
  },
]

class WorkCenter extends Component {
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
        headerName: t('workCenter.code'),
        width: 150,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('workCenter.name'),
        width: 200,
        filterable: true,
      },
      {
        field: 'factoryName',
        headerName: t('workCenter.factoryName'),
        width: 200,
        sortable: true,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.factory?.name
        },
      },
      {
        field: 'status',
        headerName: t('workCenter.status'),
        width: 200,
        sortable: false,
        filterable: true,
        type: 'categorical',
        filterOptions: {
          options: WORK_CENTER_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id,
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(WORK_CENTER_STATUS_MAP[status])
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
          const { id } = params.row

          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(id)}
                size="large"
              >
                <Visibility />
              </IconButton>

              <IconButton
                type="button"
                onClick={() => this.onClickEdit(id)}
                size="large"
              >
                <Edit />
              </IconButton>

              <IconButton
                type="button"
                onClick={() => this.onClickDelete(id)}
                size="large"
              >
                <Delete />
              </IconButton>

              <IconButton
                type="button"
                onClick={() => this.onClickConfirmed(id)}
                size="large"
              >
                <CheckBox style={{ color: 'green' }} />
              </IconButton>
            </div>
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
    this.props.searchWorkCenter(params)
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
    redirectRouter(ROUTE.WORK_CENTER.CREATE.PATH)
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
    redirectRouter(ROUTE.WORK_CENTER.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.WORK_CENTER.EDIT.PATH, { id: id })
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
   * Submit confirm work center
   */
  submitConfirm = () => {
    this.props.confirmWorkCenter(this.state.id, this.refreshData)
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
    this.props.deleteWorkCenter(this.state.id, () => {
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
  render() {
    const { isOpenDeleteModal, isOpenConfirmModal, pageSize, page } = this.state
    const { classes, workCenter, t } = this.props
    return (
      <>
        <div>
          <h2>{t('workCenter.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('workCenter.searchPlaceholder')}
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
        <div className={classes.createBox}>
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
            {t('workCenter.import')}
          </Button>
        </div>
        <DataTable
          rows={workCenter.wcList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={workCenter.total}
        />
        <Loading open={workCenter?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('workCenter.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('workCenter.deleteConfirm')}
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
  workCenter: state.workCenter,
})

const mapDispatchToProps = {
  searchWorkCenter,
  deleteWorkCenter,
  confirmWorkCenter,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(WorkCenter)),
  ),
  breadcrumbs,
)
