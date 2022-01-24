import React, { Component } from 'react'

import {
  AddCircle,
  Delete,
  Edit,
  Visibility,
  CheckBox,
} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  MODAL_MODE,
  DATE_FORMAT_2,
  MO_STATUS_MAP,
  MO_STATUS_OPTIONS,
  MO_STATUS_TO_CONFIRM,
  MO_STATUS_TO_EDIT,
  MO_STATUS_TO_DELETE,
  MO_STATUS_PLAN,
} from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import {
  searchMO,
  deleteMO,
  confirmMOById,
} from '~/modules/mesx/redux/actions/mo.action'
import { searchPlans } from '~/modules/mesx/redux/actions/plan.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, formatDateTimeUtc, redirectRouter } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: '/mo',
    title: 'moDefine',
  },
]

class Mo extends Component {
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
        headerName: t('Mo.moCode'),
        width: 150,
        filterable: true,
      },
      {
        field: 'name',
        headerName: t('Mo.moName'),
        width: 150,
        filterable: true,
      },
      {
        field: 'factoryName',
        headerName: t('Mo.moFactory'),
        width: 150,
        filterable: true,
        renderCell: (params) => {
          const { factory } = params.row
          return factory?.name
        },
      },
      {
        field: 'saleOrderName',
        headerName: t('Mo.soName'),
        width: 150,
        filterable: true,
        renderCell: (params) => {
          const { saleOrder } = params.row
          return saleOrder?.name
        },
      },
      {
        field: 'plan',
        headerName: t('Mo.moPlan'),
        width: 200,
        type: 'date',
        filterable: true,
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('Mo.status'),
        width: 200,
        align: 'center',
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: MO_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id?.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(MO_STATUS_MAP[status])
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
          const { status, id } = params.row
          const canEdit = MO_STATUS_TO_EDIT.includes(status)
          const canConfirm = MO_STATUS_TO_CONFIRM.includes(status)
          const canDelete = MO_STATUS_TO_DELETE.includes(status)
          const hasPlan = MO_STATUS_PLAN.includes(status)
          const { planList } = this.props
          const moHasPlan = planList
            .filter((i) => i.moId === id)
            .map((m) => m.id)
          const goDetail = hasPlan && moHasPlan.length === 1
          const goList = hasPlan && moHasPlan.length > 1
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
              {goDetail && (
                <Link onClick={() => this.onClickViewDetailsPlan(moHasPlan[0])}>
                  {t('Mo.planList')}
                </Link>
              )}
              {goList && (
                <Link to={ROUTE.PLAN.LIST.PATH}>{t('Mo.planList')}</Link>
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
    this.props.searchMO(params)
    this.props.searchPlans({ page, limit: pageSize })
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
    redirectRouter(ROUTE.MO.CREATE.PATH)
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
    redirectRouter(ROUTE.MO.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.MO.EDIT.PATH, { id: id })
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
    this.props.confirmMOById(this.state.id, this.refreshData)
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
    redirectRouter(ROUTE.MO.DETAIL.PATH, { id: id })
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
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteMO(this.state.id, () => {
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

  onClickViewDetailsPlan = (id) => {
    redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id })
  }
  render() {
    const { isOpenDeleteModal, pageSize, page, isOpenConfirmModal } = this.state
    const { classes, Mo, t } = this.props

    return (
      <>
        <div>
          <h2>{t('Mo.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('Mo.searchPlaceholder')}
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
            {t('Mo.import')}
          </Button>
        </div>
        <DataTable
          rows={Mo.moList}
          columns={this.columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={Mo.total}
        />
        <Loading open={Mo?.isLoading} />
        <Modal
          isOpen={isOpenDeleteModal}
          title={t('Mo.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('Mo.deleteConfirm')}
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
  Mo: state.Mo,
  planList: state.definePlan.planList,
})

const mapDispatchToProps = {
  searchMO,
  searchPlans,
  deleteMO,
  confirmMOById,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Mo)),
  ),
  breadcrumbs,
)
