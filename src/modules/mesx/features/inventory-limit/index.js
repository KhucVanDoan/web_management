import React, { Component } from 'react'

import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
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
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchInventoryLimits,
  deleteInventoryLimit,
} from '~/modules/mesx/redux/actions/inventory-limit.action'
import { onChangeTextField } from '~/utils'

import ItemGroupForm from './inventory-limit-form'
import useStyles from './style'

// const breadcrumbs = [
//   {
//     title: 'setting',
//   },
//   {
//     route: '/inventory-limit',
//     title: 'inventoryLimit',
//   },
// ]
class InventoryLimit extends Component {
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
    }
    this.MODAL_MAP_CONTENT = {
      CREATE: {
        title: t('inventoryLimit.createTitle'),
        submitLabel: t('common.create'),
        cancelLabel: t('common.cancel'),
      },
      UPDATE: {
        title: t('inventoryLimit.updateTitle'),
        submitLabel: t('common.save'),
        cancelLabel: t('common.cancel'),
      },
      DETAIL: {
        title: t('inventoryLimit.viewTitle'),
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
        field: 'id',
        headerName: t('inventoryLimit.code'),
        width: 200,
      },
      {
        field: 'itemCode',
        headerName: t('inventoryLimit.itemCode'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'itemName',
        headerName: t('inventoryLimit.itemName'),
        width: 400,
        sortable: true,
        filterable: true,
      },
      {
        field: 'minInventoryLimit',
        headerName: t('inventoryLimit.inventoryLimitDown'),
        width: 200,
        sortable: true,
      },
      {
        field: 'inventoryLimit',
        headerName: t('inventoryLimit.inventoryLimit'),
        width: 200,
        sortable: true,
      },
      {
        field: 'maxInventoryLimit',
        headerName: t('inventoryLimit.inventoryLimitUp'),
        width: 200,
        sortable: true,
      },
      {
        field: 'action',
        headerName: t('inventoryLimit.action'),
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
                onClick={() => this.handleDetailOpenModal(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => this.handleEditOpenModal(params.row.id)}
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

  handleSearchItemGroups = () => {
    this.refreshData()
  }

  handleSearchItemGroupsByEnter = (e) => {
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
    this.props.deleteInventoryLimit(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
  }

  onCloseModalDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
  }

  handleCloseModal = (refresh = false) => {
    this.setState({ id: null, isOpenModal: false })
    refresh && this.refreshData()
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
    this.props.searchInventoryLimits(params)
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
      isOpenConfirmDeleteModal,
      id,
      pageSize,
      page,
    } = this.state
    const { classes, inventoryLimit, t } = this.props
    const modalContent = this.MODAL_MAP_CONTENT[modalMode]
    return (
      <>
        <div>
          <h2>{t('inventoryLimit.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('inventoryLimit.searchPlaceholder')}
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
            onClick={this.handleCreateOpenModal}
            startIcon={<AddCircle />}
          >
            {t('common.create')}
          </Button>
        </div>
        <DataTable
          rows={inventoryLimit?.inventoryLimitList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={inventoryLimit?.total}
        />
        <Loading open={inventoryLimit?.isLoading} />
        <ItemGroupForm
          modalMode={modalMode}
          id={id}
          title={modalContent.title}
          isOpenModal={isOpenModal}
          submitLabel={modalContent.submitLabel}
          handleCloseModal={this.handleCloseModal}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('inventoryLimit.deleteTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCloseModalDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('inventoryLimit.confirmDelete')}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  inventoryLimit: state.inventoryLimit,
})

const mapDispatchToProps = {
  searchInventoryLimits,
  deleteInventoryLimit,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(InventoryLimit)),
)
