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
  confirmBOMById,
  deleteBOM,
  searchBOM,
} from 'modules/mesx/redux/actions/define-bom.action'
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import withBreadcrumbs from 'components/Breadcrumbs'
import CheckBox from '@mui/icons-material/CheckBox'
import { onChangeTextField, redirectRouter } from 'utils'
import {
  MODAL_MODE,
  BOM_STATUS_MAP,
  BOM_STATUS_OPTIONS,
  BOM_STATUS_TO_EDIT,
  BOM_STATUS_TO_CONFIRM,
  BOM_STATUS_TO_DELETE,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: '/database/bom-define',
    title: 'defineBOM',
  },
]

class DefineBOM extends Component {
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
        headerName: t('defineBOM.bomCode'),
        width: 150,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('defineBOM.bomName'),
        width: 150,
        filterable: true,
      },
      {
        field: 'itemCode',
        headerName: t('defineBOM.itemCode'),
        width: 150,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.item?.code
        },
      },
      {
        field: 'itemName',
        headerName: t('defineBOM.itemName'),
        width: 200,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.item?.name
        },
      },
      {
        field: 'status',
        headerName: t('defineBOM.status'),
        width: 150,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: BOM_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(BOM_STATUS_MAP[status])
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
          const { status, id } = params.row
          const canEdit = BOM_STATUS_TO_EDIT.includes(status)
          const canConfirm = BOM_STATUS_TO_CONFIRM.includes(status)
          const canDelete = BOM_STATUS_TO_DELETE.includes(status)
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {canEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {canDelete && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(id)}
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
    this.props.searchBOM(params)
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
    redirectRouter(ROUTE.DEFINE_BOM.CREATE.PATH)
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
    redirectRouter(ROUTE.DEFINE_BOM.DETAIL.PATH, { id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.DEFINE_BOM.EDIT.PATH, { id })
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
    this.props.confirmBOMById(this.state.id, this.refreshData)
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }

  /**
   *
   * @param {int} id
   */
  onClickRejected = (id) => {
    redirectRouter(ROUTE.DEFINE_BOM.DETAIL.PATH)
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteBOM(this.state.id, () => {
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
    const { isOpenDeleteModal, pageSize, page, isOpenConfirmModal } = this.state
    const { classes, bom, t } = this.props

    return (
      <>
        <div>
          <h2>{t('defineBOM.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('defineBOM.searchPlaceholder')}
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
            {t('defineBOM.import')}
          </Button>
        </div>
        <DataTable
          rows={bom.BOMList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={bom.total}
        />
        <Loading open={bom?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('defineBOM.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('defineBOM.deleteConfirm')}
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
  bom: state.bom,
})

const mapDispatchToProps = {
  confirmBOMById,
  deleteBOM,
  searchBOM,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(DefineBOM)),
  ),
  breadcrumbs,
)
