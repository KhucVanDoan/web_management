import React, { Component } from 'react'

import { Edit, RemoveCircle, Visibility } from '@mui/icons-material'
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
  ORDER_STATUS_OPTIONS,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  confirmRequestBuyMaterialById,
  deleteRequestBuyMaterial,
  searchRequestBuyMaterials,
} from '~/modules/mesx/redux/actions/request-by-materials.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: '/request-buy-material',
    title: 'requestBuyMaterial',
  },
]

class RequestBuyMaterial extends Component {
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
      selectedRows: [],
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
        headerName: t('requestBuyMaterial.requestCode'),
        width: 250,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('requestBuyMaterial.requestName'),
        width: 250,
        filterable: true,
      },
      {
        field: 'manufacturingOrderName',
        headerName: t('requestBuyMaterial.moName'),
        width: 250,
        filterable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.manufacturingOrder?.name
        },
      },
      {
        field: 'saleOrderCode',
        headerName: t('requestBuyMaterial.soCode'),
        width: 250,
        filterable: true,
        renderCell: (params) => {
          const { code } = params.row?.saleOrder
          return code
        },
      },
      {
        field: 'status',
        headerName: t('requestBuyMaterial.status'),
        width: 250,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: ORDER_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(ORDER_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('requestBuyMaterial.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { status } = params.row
          const isEdit = status === ORDER_STATUS.PENDING
          const isConfirmed = status === ORDER_STATUS.PENDING
          const isRejected = status === ORDER_STATUS.REJECTED
          const isDelete =
            status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED

          const hasTransaction =
            status === ORDER_STATUS.COMPLETED ||
            status === ORDER_STATUS.IN_PROGRESS

          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {isEdit && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(params.row.id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {isConfirmed && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickConfirmed(params.row.id)}
                  size="large"
                >
                  <CheckBox style={{ color: 'green' }} />
                </IconButton>
              )}

              {isRejected && (
                <IconButton type="button" disabled size="large">
                  <RemoveCircle style={{ color: 'red' }} />
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
    this.props.searchRequestBuyMaterials(params)
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
    redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.CREATE.PATH)
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
    redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH, { id: id })
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
    this.props.confirmRequestBuyMaterialById(this.state.id, this.refreshData)
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
    redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH, { id: id })
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteBOQ(this.state.id, () => {
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

  onClickViewDetailsPlan = (id) => {
    redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id })
  }
  render() {
    const { isOpenDeleteModal, pageSize, page, isOpenConfirmModal } = this.state
    const { classes, requestBuyMaterial, t } = this.props
    return (
      <>
        <div>
          <h2>{t('requestBuyMaterial.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('requestBuyMaterial.searchPlaceholder')}
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
        <div className={classes.exportBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={this.handleImport}
          >
            {t('definePlan.export')}
          </Button>
        </div>
        <DataTable
          rows={requestBuyMaterial.requestBuyMaterialList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={requestBuyMaterial?.total}
        />
        <Loading open={requestBuyMaterial?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('defineBOQ.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('defineBOQ.deleteConfirm')}
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
  requestBuyMaterial: state.requestBuyMaterial,
})

const mapDispatchToProps = {
  confirmRequestBuyMaterialById,
  deleteRequestBuyMaterial,
  searchRequestBuyMaterials,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(RequestBuyMaterial)),
  ),
  breadcrumbs,
)
