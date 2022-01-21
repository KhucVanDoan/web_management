import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import withStyles from '@mui/styles/withStyles'
import Modal from 'UNSAFE_components/shared/modal'
import DataTable from 'components/DataTable'

import useStyles from './style'
import {
  confirmBOQById,
  deleteBOQ,
  searchBOQ,
} from 'modules/mesx/redux/actions/define-boq.action'
import { searchPlans } from 'modules/mesx/redux/actions/plan.action'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import { Link } from 'react-router-dom'
import {
  convertObjectToArrayFilter,
  formatDateTimeUtc,
  redirectRouter,
} from 'utils'
import {
  BOQ_STATUS_MAP,
  BOQ_STATUS_OPTIONS,
  BOQ_STATUS_TO_EDIT,
  BOQ_STATUS_TO_CONFIRM,
  BOQ_STATUS_TO_DELETE,
  BOQ_STATUS_PLAN,
  DATE_FORMAT_2,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import Page from 'components/Page'
import { Box } from '@mui/material'
import Button from 'components/Button'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: '/boq-management/boq-define',
    title: 'boqDefine',
  },
]

const DefineBOQ = (props) => {
  const { defineBOQ, t, planList } = props
  const [id, setId] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      sortable: false,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('defineBOQ.boqCode'),
      width: 150,
      filterable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineBOQ.boqName'),
      width: 150,
      filterable: true,
    },
    {
      field: 'pmName',
      headerName: t('defineBOQ.boqPm'),
      width: 80,
      filterable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.pm?.fullName
      },
    },
    {
      field: 'planFrom',
      headerName: t('defineBOQ.boqPlan'),
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
      headerName: t('defineBOQ.status'),
      width: 200,
      type: 'categorical',
      filterable: true,
      filterOptions: {
        options: BOQ_STATUS_OPTIONS,
        getOptionValue: (option) => option?.id?.toString(),
        getOptionLabel: (option) => t(option?.text),
      },
      renderCell: (params) => {
        const { status } = params.row
        return t(BOQ_STATUS_MAP[status])
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
        const canEdit = BOQ_STATUS_TO_EDIT.includes(status)
        const canConfirm = BOQ_STATUS_TO_CONFIRM.includes(status)
        const canDelete = BOQ_STATUS_TO_DELETE.includes(status)
        const hasPlan = BOQ_STATUS_PLAN.includes(status)
        const boqHasPlan = planList
          .filter((i) => i.boqId === id)
          .map((m) => m.id)
        const goDetail = hasPlan && boqHasPlan.length === 1
        const goList = hasPlan && boqHasPlan.length > 1
        return (
          <Box sx={{ whiteSpace: 'nowrap' }}>
            <IconButton
              type="button"
              onClick={() =>
                redirectRouter(ROUTE.DEFINE_BOQ.DETAIL.PATH, { id: id })
              }
              size="large"
            >
              <Visibility />
            </IconButton>
            {canEdit && (
              <IconButton
                type="button"
                onClick={() =>
                  redirectRouter(ROUTE.DEFINE_BOQ.EDIT.PATH, { id: id })
                }
                size="large"
              >
                <Edit />
              </IconButton>
            )}
            {canDelete && (
              <IconButton
                type="button"
                onClick={() => {
                  setId(id)
                  setIsOpenDeleteModal(true)
                }}
                size="large"
              >
                <Delete />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                type="button"
                onClick={() => {
                  setId(id)
                  setIsOpenConfirmModal(true)
                }}
                size="large"
              >
                <CheckBox style={{ color: 'green' }} />
              </IconButton>
            )}
            {goDetail && (
              <Link
                onClick={() => {
                  redirectRouter(ROUTE.PLAN.DETAILS.PATH, {
                    id: boqHasPlan[0],
                  })
                }}
              >
                {t('defineBOQ.planList')}
              </Link>
            )}
            {goList && (
              <Link to={ROUTE.PLAN.LIST.PATH}>{t('defineBOQ.planList')}</Link>
            )}
          </Box>
        )
      },
    },
  ]

  const refreshData = (keyword = '') => {
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
      filter: JSON.stringify(convertObjectToArrayFilter(filters, columns)),
      sort: JSON.stringify(sortData),
    }
    props.searchBOQ(params)
    props.searchPlans({ page, limit: pageSize })
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  const submitConfirm = () => {
    props.confirmBOQById(id, () => {
      refreshData()
      setIsOpenConfirmModal(false)
      setId(null)
    })
  }

  const onSubmitDelete = () => {
    props.deleteBOQ(id, () => {
      setIsOpenDeleteModal(false)
      refreshData()
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          // onClick={this.handleImport}
          variant="outlined"
          disabled
        >
          {t('defineBOQ.import')}
        </Button>
        <Button
          onClick={() => redirectRouter(ROUTE.DEFINE_BOQ.CREATE.PATH)}
          icon="add"
          sx={{ ml: '16px' }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineBOQ.title')}
      renderHeaderRight={renderHeaderRight}
      onSearch={refreshData}
      placeholder={t('defineBOQ.searchPlaceholder')}
      loading={defineBOQ?.isLoading}
    >
      <DataTable
        rows={defineBOQ.boqList}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={({ page }) => setPage(page)}
        onPageSizeChange={({ pageSize }) => setPageSize(pageSize)}
        onChangeSort={(sort) => setSort(sort)}
        total={defineBOQ.total}
        title="Danh sách"
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Modal
        isOpen={isOpenDeleteModal}
        title={t('defineBOQ.deleteModalTitle')}
        size="sm"
        onSubmit={onSubmitDelete}
        onClose={() => setIsOpenDeleteModal(false)}
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
        onSubmit={submitConfirm}
        onClose={() => setIsOpenConfirmModal(false)}
        submitLabel={t('common.yes')}
        closeLabel={t('common.no')}
        hideCancel
      >
        {t('common.confirmMessage.confirm')}
      </Modal>
    </Page>
  )
}
const mapStateToProps = (state) => ({
  defineBOQ: state.defineBOQ,
  planList: state.definePlan.planList,
})

const mapDispatchToProps = {
  confirmBOQById,
  deleteBOQ,
  searchBOQ,
  searchPlans,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(DefineBOQ)),
)
