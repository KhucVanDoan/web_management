import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import withStyles from '@mui/styles/withStyles'
import TextField from '@mui/material/TextField'
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import withBreadcrumbs from 'components/Breadcrumbs'
import Loading from 'components/Loading'
import Modal from 'UNSAFE_components/shared/modal'
import {
  confirmRoutingById,
  deleteRouting,
  searchRoutings,
} from 'modules/mesx/redux/actions/routing.action'
import {
  MODAL_MODE,
  ROUTING_STATUS,
  ROUTING_STATUS_MAP,
  ROUTING_STATUS_OPTIONS,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'

import useStyles from './style'
import { onChangeTextField, redirectRouter } from 'utils'
import CheckBox from '@mui/icons-material/CheckBox'
import DataTable from 'components/DataTable'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ROUTING.PATH,
    title: ROUTE.ROUTING.TITLE,
  },
]

class Routing extends Component {
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
        headerName: t('routing.orderNumber'),
        width: 80,
        sortable: false,
      },
      {
        field: 'code',
        headerName: t('routing.code'),
        width: 200,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('routing.name'),
        width: 200,
        filterable: true,
      },
      {
        field: 'status',
        headerName: t('routing.status'),
        width: 200,
        sortable: false,
        filterable: true,
        type: 'categorical',
        filterOptions: {
          options: ROUTING_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(ROUTING_STATUS_MAP[status])
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
          const { status, id } = params.row
          const isEdit = status === ROUTING_STATUS.CREATED
          const isConfirmed = status === ROUTING_STATUS.CREATED
          const isDelete = status === ROUTING_STATUS.CREATED

          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {isEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}

              {isDelete && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(id)}
                  size="large"
                >
                  <Delete />
                </IconButton>
              )}

              {isConfirmed && (
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
    this.props.searchRoutings(params)
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
    redirectRouter(ROUTE.ROUTING_CREATE.PATH)
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
    redirectRouter(ROUTE.ROUTING_DETAILS.PATH, { id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.ROUTING_EDIT.PATH, { id })
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
    this.props.confirmRoutingById(this.state.id, this.refreshData)
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
    this.props.deleteRouting(this.state.id, () => {
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

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const { isOpenDeleteModal, pageSize, page, isOpenConfirmModal } = this.state
    const { classes, routing, t } = this.props

    return (
      <>
        <div>
          <h2>{t('routing.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('routing.searchPlaceholder')}
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
        </div>
        <DataTable
          rows={routing.routingList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={routing.total}
          minWidth={1200}
        />
        <Loading open={routing?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('routing.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('routing.deleteConfirm')}
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
  routing: state.routing,
  companies: state.appStore.companies,
  factories: state.appStore.factories,
  routingTypes: state.appStore.routingTypes,
})

const mapDispatchToProps = {
  searchRoutings,
  deleteRouting,
  confirmRoutingById,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(Routing)),
  ),
  breadcrumbs,
)
