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
import ItemTypeForm from './item-type-form'
import {
  searchItemTypes,
  deleteItemType,
} from 'modules/mesx/redux/actions/item-type-setting.action'
import { formatDateTimeUtc, onChangeTextField } from 'utils'

import DataTable from 'components/DataTable'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: '/database/item-type-setting',
    title: 'itemTypeSetting',
  },
]
class ItemTypeSetting extends Component {
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
        title: t('itemTypeSetting.createTitle'),
        submitLabel: t('common.create'),
        cancelLabel: t('common.cancel'),
      },
      UPDATE: {
        title: t('itemTypeSetting.updateTitle'),
        submitLabel: t('common.save'),
        cancelLabel: t('common.cancel'),
      },
      DETAIL: {
        title: t('itemTypeSetting.viewTitle'),
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
        headerName: t('itemTypeSetting.typeCode'),
        width: 200,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('itemTypeSetting.typeName'),
        width: 200,
        filterable: true,
      },
      {
        field: 'description',
        headerName: t('itemTypeSetting.typeNote'),
        width: 400,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: t('itemTypeSetting.createDate'),
        width: 200,
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return formatDateTimeUtc(createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('itemTypeSetting.updateDate'),
        width: 200,
        renderCell: (params) => {
          const updatedAt = params.row.updatedAt
          return formatDateTimeUtc(updatedAt)
        },
      },
      {
        field: 'action',
        headerName: t('itemTypeSetting.action'),
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
    this.props.searchItemTypes(params)
  }

  handleSearchItemTypes = () => {
    this.refreshData()
  }

  handleSearchItemTypesByEnter = (e) => {
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
    this.props.deleteItemType(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
  }

  onCloseModalDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
  }

  handleCloseModal = (refresh = false) => {
    this.setState({ isOpenModal: false, id: null })
    refresh &&
      this.props.searchItemTypes({ keyword: this.state.keyword.trim() })
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
      page,
      pageSize,
    } = this.state
    const { classes, itemTypeSetting, t } = this.props

    const modalContent = this.MODAL_MAP_CONTENT[modalMode]

    return (
      <>
        <div>
          <h2>{t('itemTypeSetting.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('itemTypeSetting.searchPlaceholder')}
            variant="outlined"
            size="small"
            name="keyword"
            onKeyDown={this.handleSearchItemTypesByEnter}
            onChange={(event) => onChangeTextField(this, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.handleSearchItemTypes}
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
          rows={itemTypeSetting.itemTypeList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={itemTypeSetting.total}
        />
        <Loading open={itemTypeSetting?.isLoading} />
        <ItemTypeForm
          modalMode={modalMode}
          id={id}
          title={modalContent.title}
          isOpenModal={isOpenModal}
          submitLabel={modalContent.submitLabel}
          handleCloseModal={this.handleCloseModal}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('itemTypeSetting.deleteTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCloseModalDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('itemTypeSetting.confirmDelete')}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  itemTypeSetting: state.itemTypeSetting,
})

const mapDispatchToProps = {
  searchItemTypes,
  deleteItemType,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(ItemTypeSetting)),
  ),
  breadcrumbs,
)
