/* eslint-disable  */

import React, { Component } from 'react'

import { Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import IconButton from '@mui/material/IconButton'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import { MODAL_MODE, DATE_FORMAT_2 } from '~/common/constants'
import Button from '~/components/Button'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import {
  PLAN_STATUS_MAP,
  PLAN_STATUS_OPTIONS,
  PLAN_STATUS_TO_EDIT,
  PLAN_STATUS_TO_CONFIRM,
  PLAN_STATUS_TO_DELETE,
} from '~/modules/mesx/constants'
import {
  searchPlans,
  getPlanDetailsById,
  deletePlan,
  confirmPlanById,
} from '~/modules/mesx/redux/actions/plan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter, formatDateTimeUtc } from '~/utils'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PLAN.LIST.PATH,
    title: ROUTE.PLAN.LIST.TITLE,
  },
]

class DefinePlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bomTree: [],
      id: null,
      isOpenModal: false,
      modalMode: MODAL_MODE.CREATE,
      isOpenConfirmDeleteModal: false,
      isOpenConfirmModal: false,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,
    }

    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('definePlan.id'),
        align: 'center',
        width: 100,
        sortable: false,
        fixed: true,
      },
      {
        field: 'code',
        headerName: t('definePlan.code'),
        align: 'center',
        width: 100,
        filterable: true,
        sortable: true,
        fixed: true,
      },
      {
        field: 'moCode',
        headerName: t('definePlan.moCode'),
        sortable: true,
        filterable: true,
        align: 'center',
        width: 100,
        paddingRight: 20,
        renderCell: (params) => {
          const { mo } = params.row
          return mo?.code
        },
      },
      {
        field: 'moName',
        headerName: t('definePlan.moName'),
        sortable: true,
        align: 'center',
        width: 100,
        filterable: true,
        paddingRight: 20,
      },
      {
        field: 'soName',
        headerName: t('definePlan.saleOrder'),
        width: 150,
        align: 'center',
        filterable: true,
        sortable: true,
      },
      {
        field: 'plan',
        headerName: t('definePlan.planDate'),
        width: 200,
        align: 'center',
        type: 'date',
        filterable: true,
        sortable: true,
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
        headerName: t('definePlan.status'),
        align: 'center',
        width: 100,
        sortable: true,

        filterable: true,
        filterOptions: {
          options: PLAN_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          const { t } = this.props
          return t(PLAN_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('definePlan.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, status } = params.row
          const canEdit = PLAN_STATUS_TO_EDIT.includes(status)
          const canConfirm = PLAN_STATUS_TO_CONFIRM.includes(status)
          const canDelete = PLAN_STATUS_TO_DELETE.includes(status)
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

    this.producingStepColumns = [
      {
        field: 'name',
        headerName: t('definePlan.producingStepName'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep.name
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'actualQuantity',
        headerName: t('definePlan.actualQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'planDateOfList',
        headerName: t('definePlan.planDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { workOrders } = params.row
          return (
            formatDateTimeUtc(workOrders[0]?.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(workOrders[0]?.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { startAt } = params.row
          return formatDateTimeUtc(startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { endAt } = params.row
          return formatDateTimeUtc(endAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'status',
        headerName: t('definePlan.status'),
        align: 'center',
        sortable: true,

        filterable: true,
        renderCell: (params) => {
          const { status } = params.row
          return status
        },
      },
      {
        field: 'progress',
        headerName: t('definePlan.progress'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { progress } = params.row
          return progress
        },
      },
    ]

    this.additionColums = [
      {
        field: 'itemName',
        headerName: t('definePlan.itemName'),
        width: 150,
        align: 'left',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'bomName',
        headerName: t('definePlan.bomName'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { bom } = params.row
          return bom?.name
        },
      },
      {
        field: 'routingCode',
        headerName: t('definePlan.routingCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { routing } = params.row
          return routing?.code
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.quantity
        },
      },
      {
        field: 'planQuantity',
        headerName: t('definePlan.planQuantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.actualQuantity
        },
      },
      {
        field: 'unit',
        headerName: t('definePlan.unit'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnit
        },
      },
      {
        field: 'planDateOfList',
        headerName: t('definePlan.planDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return (
            formatDateTimeUtc(planBom.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(planBom.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.endAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'status',
        headerName: t('definePlan.status'),
        align: 'center',
        sortable: true,

        filterable: true,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.status
        },
      },
      {
        field: 'progress',
        headerName: t('definePlan.progress'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.progress
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
  refreshData = (keyword = '') => {
    const { page, pageSize, filters, sort } = this.state

    const filterData = filters?.map((plan) => ({
      column: plan.field,
      text: plan?.value?.trim(),
    }))

    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

    if (keyword !== '') {
      filterData.push({
        column: 'code',
        text: keyword?.trim(),
      })
    }

    const params = {
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
    }

    this.props.searchPlans(params, (res) => {
      this.setState({
        bomTree: this.props.definePlan?.planList,
      })
    })
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
   * handleCreateOpenModal
   */
  handleCreateOpenModal = () => {
    this.setState({ isOpenModal: true, modalMode: MODAL_MODE.CREATE })
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
   *
   */
  handleCreate = () => {
    redirectRouter(ROUTE.PLAN.CREATE.PATH)
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  onClickViewDetails = (id) => {
    redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    redirectRouter(ROUTE.PLAN.EDIT.PATH, { id: id })
  }

  /**
   *
   * @param {int} id
   */
  onClickDelete = (id) => {
    this.setState({ id, isOpenConfirmDeleteModal: true })
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
  onClickConfirmed = (id) => {
    this.setState({ id, isOpenConfirmModal: true })
  }

  /**
   * submitConfirm
   */
  submitConfirm = () => {
    this.props.confirmPlanById(
      { id: this.state.id, status: 2 },
      this.refreshData,
    )
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * submitConfirm
   */
  submitConfirm = () => {
    this.props.confirmPlanById(
      { id: this.state.id, status: 2 },
      this.refreshData,
    )
    this.setState({ isOpenConfirmModal: false, id: null })
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deletePlan(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
    this.setState({ id: null })
  }

  /**
   * onCancelDelete
   */
  onCancelDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
  }

  /**
   *
   * @param {int} pageSize
   */
  onPageSizeChange = (pageSize) => {
    this.setState({ pageSize }, this.refreshData)
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = (page) => {
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
   * Handle get data
   * @param {object} id
   */
  handleGetData = (id) => {
    this.props.getPlanDetailsById(id, (res) => {
      const { bomTree } = this.state
      const { definePlan } = this.props

      bomTree.map((bom) => {
        if (bom?.id === id) {
          bom['subBom'] = definePlan.planDetails?.planBoms
        }
      })
      this.setState({
        bomTree,
      })
    })
  }

  renderHeaderRight = () => {
    const { t } = this.props
    return (
      <>
        <Button variant="outlined">{t('definePlan.export')}</Button>
        <Button onClick={this.handleCreate} icon="add" sx={{ ml: 4 / 3 }}>
          {t('definePlan.createButton')}
        </Button>
      </>
    )
  }

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const {
      isOpenConfirmDeleteModal,
      bomTree,
      page,
      pageSize,
      isOpenConfirmModal,
    } = this.state
    const { classes, definePlan, t } = this.props
    this.validator.purgeFields()
    return (
      <Page
        breadcrumbs={breadcrumbs}
        title={t('definePlan.title')}
        onSearch={this.refreshData}
        placeholder={t('definePlan.searchPlaceholder')}
        renderHeaderRight={this.renderHeaderRight}
        loading={definePlan?.isLoading}
      >
        <TableCollapse
          rows={bomTree}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          handleGetData={this.handleGetData}
          additionColums={this.additionColums}
          producingStepColumns={this.producingStepColumns}
          isRoot={true}
          type={'list'}
          mode={'DETAIL'}
          isView={true}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={definePlan?.total}
          title="Danh sách"
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('definePlan.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('definePlan.deleteConfirm')}
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
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  definePlan: state.definePlan,
})

const mapDispatchToProps = {
  searchPlans,
  getPlanDetailsById,
  deletePlan,
  confirmPlanById,
}

export default withTranslation(['mesx'])(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(DefinePlan)),
)
