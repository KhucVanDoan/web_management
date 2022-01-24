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
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchItemUnits,
  deleteItemUnit,
} from '~/modules/mesx/redux/actions/item-unit-setting.action'
import { formatDateTimeUtc, onChangeTextField } from '~/utils'

import ItemUnitForm from './item-unit-form'
import useStyles from './style'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: '/database/item-unit-setting',
    title: 'itemUnitSetting',
  },
]
class ItemUnitSetting extends Component {
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
        title: t('itemUnitSetting.createTitle'),
        submitLabel: t('common.createModal'),
        cancelLabel: t('common.cancel'),
      },
      UPDATE: {
        title: t('itemUnitSetting.updateTitle'),
        submitLabel: t('common.save'),
        cancelLabel: t('common.cancel'),
      },
      DETAIL: {
        title: t('itemUnitSetting.viewTitle'),
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
        headerName: t('itemUnitSetting.unitCode'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'name',
        headerName: t('itemUnitSetting.unitName'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'description',
        headerName: t('itemUnitSetting.unitNote'),
        width: 400,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: t('itemUnitSetting.createDate'),
        width: 200,
        sortable: true,
        filterable: false,
        type: 'date',
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return formatDateTimeUtc(createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('itemUnitSetting.updateDate'),
        width: 200,
        sortable: true,
        filterable: false,
        type: 'date',
        renderCell: (params) => {
          const updateAt = params.row.updatedAt
          return formatDateTimeUtc(updateAt)
        },
      },
      {
        field: 'action',
        headerName: t('itemUnitSetting.action'),
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
    this.props.searchItemUnits(params)
  }

  handleSearchItemUnits = () => {
    this.refreshData()
  }

  handleSearchItemUnitsByEnter = (e) => {
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
    this.props.deleteItemUnit(this.state.id, () => {
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
      this.props.searchItemUnits({ keyword: this.state.keyword.trim() })
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
    const { classes, itemUnitSetting, t } = this.props
    const modalContent = this.MODAL_MAP_CONTENT[modalMode]
    return (
      <>
        <div>
          <h2>{t('itemUnitSetting.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('itemUnitSetting.searchPlaceholder')}
            variant="outlined"
            size="small"
            name="keyword"
            onKeyDown={this.handleSearchItemUnitsByEnter}
            onChange={(event) => onChangeTextField(this, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={this.handleSearchItemUnits}
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
          rows={itemUnitSetting.itemUnitList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={itemUnitSetting.total}
        />
        <Loading open={itemUnitSetting?.isLoading} />
        <ItemUnitForm
          modalMode={modalMode}
          id={id}
          title={modalContent.title}
          isOpenModal={isOpenModal}
          submitLabel={modalContent.submitLabel}
          handleCloseModal={this.handleCloseModal}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('itemUnitSetting.deleteTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCloseModalDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('itemUnitSetting.confirmDelete')}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  itemUnitSetting: state.itemUnitSetting,
})

const mapDispatchToProps = {
  searchItemUnits,
  deleteItemUnit,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(ItemUnitSetting)),
  ),
  breadcrumbs,
)
