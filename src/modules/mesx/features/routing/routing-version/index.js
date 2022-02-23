import React, { Component } from 'react'

import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  DATE_FORMAT_2,
  MODAL_MODE,
  ROUTING_VERSION_STATUS,
  ROUTING_VERSION_STATUS_MAP,
  ROUTING_VERSION_STATUS_OPTIONS,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import { getRoutingDetailsById } from '~/modules/mesx/redux/actions/routing'
import {
  searchRoutingVersions,
  deleteRoutingVersion,
  confirmRoutingVersionById,
} from '~/modules/mesx/redux/actions/routing-version.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc, onChangeTextField, redirectRouter } from '~/utils'

import RoutingVersionForm from './routing-version-form'
import useStyles from './style'

const breadcrumbs = [
  {
    title: 'database',
  },
  // {
  //   route: ROUTE.ROUTING.PATH,
  //   title: ROUTE.ROUTING.TITLE,
  // },
  {
    route: ROUTE.ROUTING_VERSION.PATH,
    title: ROUTE.ROUTING_VERSION.TITLE,
  },
]
class RoutingVersionSetting extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    this.state = {
      id: null,
      isOpenModal: false,
      modalMode: MODAL_MODE.CREATE,
      isOpenConfirmDeleteModal: false,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,
      isOpenConfirmModal: false,
    }
    this.MODAL_MAP_CONTENT = {
      CREATE: {
        title: t('routingVersion.createTitle'),
        submitLabel: t('common.createModal'),
        cancelLabel: t('common.cancel'),
      },
      UPDATE: {
        title: t('routingVersion.updateTitle'),
        submitLabel: t('common.save'),
        cancelLabel: t('common.cancel'),
      },
      DETAIL: {
        title: t('routingVersion.viewTitle'),
        submitLabel: t('common.accept'),
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
        field: 'name',
        headerName: t('routingVersion.unitName'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'status',
        headerName: t('routing.status'),
        width: 200,
        sortable: false,
        filterable: true,

        filterOptions: {
          options: ROUTING_VERSION_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(ROUTING_VERSION_STATUS_MAP[status])
        },
      },
      {
        field: 'createdAt',
        headerName: t('routingVersion.createDate'),
        width: 200,
        sortable: true,
        filterable: false,
        type: 'date',
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return formatDateTimeUtc(createdAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('routingVersion.updateDate'),
        width: 200,
        sortable: true,
        filterable: false,
        type: 'date',
        renderCell: (params) => {
          const updateAt = params.row.updatedAt
          return formatDateTimeUtc(updateAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'action',
        headerName: t('routingVersion.action'),
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status, id } = params.row
          const isEdit = status === ROUTING_VERSION_STATUS.CREATED
          const isConfirmed = status === ROUTING_VERSION_STATUS.CREATED
          const isDelete = status === ROUTING_VERSION_STATUS.CREATED
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.handleDetailOpenModal(id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {isEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.handleEditOpenModal(id)}
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
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getRoutingDetailsById(id)
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

    filterData.push({
      column: 'routingId',
      text: '' + this.props.match.params.id,
    })

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
    this.props.searchRoutingVersions(params)
  }

  handleSearchRoutingVersions = () => {
    this.refreshData()
  }

  handleSearchRoutingVersionsByEnter = (e) => {
    if (e.key === 'Enter') {
      this.refreshData()
    }
  }

  handleCreateOpenModal = () => {
    this.setState({ modalMode: MODAL_MODE.CREATE, isOpenModal: true })
  }

  handleEditOpenModal = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.UPDATE, isOpenModal: true })
  }

  handleDetailOpenModal = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.DETAIL, isOpenModal: true })
  }

  onClickDelete = (id) => {
    this.setState({ id, isOpenConfirmDeleteModal: true })
  }

  onSubmitDelete = () => {
    this.props.deleteRoutingVersion(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
  }

  onCloseModalDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
  }

  handleCloseModal = (refresh = false) => {
    this.setState({ isOpenModal: false, id: null })
    refresh && this.refreshData()
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
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.ROUTING_DETAILS.PATH, {
      id: this.props.match.params.id,
    })
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
    this.props.confirmRoutingVersionById(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }
  render() {
    const {
      isOpenModal,
      modalMode,
      isOpenConfirmDeleteModal,
      id,
      pageSize,
      page,
      isOpenConfirmModal,
    } = this.state
    const { classes, routingVersion, t, routing } = this.props
    const modalContent = this.MODAL_MAP_CONTENT[modalMode]
    return (
      <>
        <div>
          <h2>{t('routingVersion.title')}</h2>
          <h3>
            {t('routingVersion.subTitle') + routing?.routingDetails?.name}
          </h3>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('routingVersion.searchPlaceholder')}
            variant="outlined"
            size="small"
            name="keyword"
            onKeyDown={this.handleSearchRoutingVersionsByEnter}
            onChange={(event) => onChangeTextField(this, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.handleSearchRoutingVersions}
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCreateOpenModal}
            startIcon={<AddCircle />}
          >
            {t('common.create')}
          </Button>
        </div>
        <DataTable
          rows={routingVersion.routingVersionList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={routingVersion.total}
          minWidth={1200}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box></Box>
          <Button variant="contained" onClick={this.backToList}>
            {t('common.close')}
          </Button>
        </Box>
        <Loading open={routingVersion?.isLoading} />
        <RoutingVersionForm
          modalMode={modalMode}
          id={id}
          title={modalContent.title}
          isOpenModal={isOpenModal}
          submitLabel={modalContent.submitLabel}
          handleCloseModal={this.handleCloseModal}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('routingVersion.deleteTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCloseModalDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('routingVersion.confirmDelete')}
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
  routingVersion: state.routingVersion,
  routing: state.routing,
})

const mapDispatchToProps = {
  searchRoutingVersions,
  deleteRoutingVersion,
  confirmRoutingVersionById,
  getRoutingDetailsById,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(withRouter(RoutingVersionSetting))),
  ),
  breadcrumbs,
)
