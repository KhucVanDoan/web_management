import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { MODAL_MODE } from 'common/constants'
import Loading from 'components/Loading'
import withBreadcrumbs from 'components/Breadcrumbs'
import useStyles from './style'

import withStyles from '@mui/styles/withStyles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import Modal from 'UNSAFE_components/shared/modal'
import UserForm from './user-form'
import {
  deleteUser,
  searchUsers,
} from 'modules/mesx/redux/actions/user-management.action'
import { onChangeTextField } from 'utils'
import DataTable from 'components/DataTable'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: '/user-management',
    title: 'userManagement',
  },
]

class UserManagement extends Component {
  constructor(props) {
    super(props)
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
    }
    const { t } = props
    this.MODAL_MAP_CONTENT = {
      CREATE: {
        title: t('userManagement.createModalTitle'),
        submitLabel: t('userManagement.submitCreateModalLabel'),
        cancelLabel: t('userManagement.cancelCreateModalLabel'),
      },
      UPDATE: {
        title: t('userManagement.updateModalTitle'),
        submitLabel: t('userManagement.submitUpdateModalLabel'),
        cancelLabel: t('userManagement.cancelUpdateModalLabel'),
      },
      DETAIL: {
        title: t('userManagement.viewModalTitle'),
        cancelLabel: t('userManagement.cancelViewModalLabel'),
      },
    }

    this.columns = [
      {
        field: 'id',
        headerName: t('userManagement.orderIdColumn'),
        width: 80,
        sortable: false,
      },
      {
        field: 'username',
        headerName: t('userManagement.usernameColumn'),
        width: 200,
        filterable: true,
      },
      {
        field: 'fullName',
        headerName: t('userManagement.fullNameColumn'),
        width: 200,
        filterable: true,
      },
      {
        field: 'email',
        headerName: t('userManagement.emailColumn'),
        width: 250,
        sortable: false,
      },
      {
        field: 'departmentName',
        headerName: t('userManagement.departmentColumn'),
        width: 250,
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const deparmentNames = params.row?.departmentSettings
            ?.map((department) => department?.name)
            .join('; ')
          return deparmentNames
        },
      },
      {
        field: 'roleName',
        headerName: t('userManagement.roleColumn'),
        width: 120,
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const roleNames = params.row?.userRoleSettings
            ?.map((role) => role?.name)
            .join('; ')
          return roleNames
        },
      },
      {
        field: 'warehouseName',
        headerName: t('userManagement.warehouseColumn'),
        width: 250,
        sortable: false,
        filterable: true,
        renderCell: (params) => {
          const warehousesName = params.row.userWarehouses
            ?.map((warehouse) => warehouse?.name)
            ?.join('; ')
          return warehousesName
        },
      },
      {
        field: 'action',
        headerName: t('userManagement.actionColumn'),
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
              <IconButton
                type="button"
                onClick={() => this.onClickEdit(params.row.id)}
                size="large"
              >
                <Edit />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => this.onClickDelete(params.row.id)}
                size="large"
              >
                <Delete />
              </IconButton>
            </div>
          )
        },
      },
    ]
  }

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
    this.props.searchUsers(params)
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

  handleCreateOpenModal = () => {
    this.refreshData()
    this.setState({ isOpenModal: true, modalMode: MODAL_MODE.CREATE })
  }

  handleCloseModal = (refresh = false) => {
    this.setState({ isOpenModal: false, id: null })
    refresh && this.refreshData()
  }

  onClickViewDetails = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.DETAIL, isOpenModal: true })
  }

  onClickEdit = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.UPDATE, isOpenModal: true })
  }

  onClickDelete = (id) => {
    this.setState({ id, isOpenConfirmDeleteModal: true })
  }

  onSubmitDelete = () => {
    this.props.deleteUser(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
    this.setState({ id: null })
  }

  onCancelDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
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
      isOpenModal,
      modalMode,
      id,
      isOpenConfirmDeleteModal,
      page,
      pageSize,
    } = this.state
    const { classes, userManagement, t } = this.props

    const modalContent = this.MODAL_MAP_CONTENT[modalMode]

    return (
      <>
        <div>
          <h2>{t('userManagement.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('userManagement.searchPlaceHolder')}
            variant="outlined"
            size="small"
            onKeyDown={this.onKeyDown}
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
            name="keyword"
            onChange={(event) => onChangeTextField(this, event)}
          />
        </div>
        <div className={classes.createBox}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCreateOpenModal}
            startIcon={<AddCircle />}
          >
            {t('userManagement.createButton')}
          </Button>
        </div>
        <DataTable
          rows={userManagement.userList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={userManagement.total}
        />
        <Loading open={userManagement?.isLoading} />
        <UserForm
          modalMode={modalMode}
          id={id}
          title={modalContent.title}
          isOpenModal={isOpenModal}
          submitLabel={modalContent.submitLabel}
          cancelLabel={modalContent.cancelLabel}
          handleCloseModal={this.handleCloseModal}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('userManagement.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('userManagement.confirmDelete')}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  userManagement: state.userManagement,
  roles: state.appStore.roles,
  deparments: state.appStore.deparments,
})

const mapDispatchToProps = {
  searchUsers,
  deleteUser,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(UserManagement)),
  ),
  breadcrumbs,
)
