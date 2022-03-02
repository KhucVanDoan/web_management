import React, { useEffect, useState } from 'react'

import {
  Delete,
  Edit,
  Visibility,
  CheckBox,
} from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  DATE_FORMAT_2,
  MO_STATUS_MAP,
  MO_STATUS_OPTIONS,
  MO_STATUS_TO_CONFIRM,
  MO_STATUS_TO_EDIT,
  MO_STATUS_TO_DELETE,
  MO_STATUS_PLAN,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  redirectRouter,
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams
} from '~/utils'

import FilterForm from './filter-form';

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MO.LIST.PATH,
    title: ROUTE.MO.LIST.TITLE,
  },
]

const Mo = (props) => {
  const { t } = useTranslation(['mesx'])
  const [id, setId] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [keyword] = useState('')
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState(null)
  const {
    data: { isLoading, moList, total },
    actions
  } = useMo()
  const {
    data: { planList },
    actions: planActions
  } = useDefinePlan()

  const columns = [
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

      filterable: true,
      filterOptions: {
        options: MO_STATUS_OPTIONS,
        getOptionValue: (option) => option?.id?.toString(),
        getOptionLabel: (option) => t(option?.text),
      },
      renderCell: (params) => {
        const { status } = params.row
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
        const moHasPlan = planList
          .filter((i) => i.moId === id)
          .map((m) => m.id)
        const goDetail = hasPlan && moHasPlan.length === 1
        const goList = hasPlan && moHasPlan.length > 1
        return (
          <div>
            <IconButton
              type="button"
              onClick={() => onClickViewDetails(id)}
              size="large"
            >
              <Visibility />
            </IconButton>
            {canEdit && (
              <IconButton
                type="button"
                onClick={() => onClickEdit(id)}
                size="large"
              >
                <Edit />
              </IconButton>
            )}
            {canDelete && (
              <IconButton
                type="button"
                onClick={() => onClickDelete(id)}
                size="large"
              >
                <Delete />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                type="button"
                onClick={() => onClickConfirmed(id)}
                size="large"
              >
                <CheckBox style={{ color: 'green' }} />
              </IconButton>
            )}
            {goDetail && (
              <Link onClick={() => onClickViewDetailsPlan(moHasPlan[0])}>
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

  /**
   * componentDidMount
   */
  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, sort, filters])

  /**
   * Refresh data
   */
  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort, columns),
    }
    actions.searchMO(params)
    planActions.searchPlans({ page, limit: pageSize })
  }

  /**
   *
   */
  const handleCreate = () => {
    redirectRouter(ROUTE.MO.CREATE.PATH)
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  const onClickViewDetails = (id) => {
    redirectRouter(ROUTE.MO.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  const onClickEdit = (id) => {
    redirectRouter(ROUTE.MO.EDIT.PATH, { id: id })
  }

  /**
   *
   * @param {int} id
   */
  const onClickDelete = (id) => {
    setId(id)
    setIsOpenDeleteModal(true)
  }

  /**
   *
   * @param {int} id
   */
  const onClickConfirmed = (id) => {
    setId(id)
    setIsOpenConfirmModal(true)
  }

  /**
   * Submit confirm purchased order
   */
  const submitConfirm = () => {
    actions.confirmMOById(id, refreshData)
    setIsOpenConfirmModal(false)
    setId(null)
  }

  /**
   * Close confirm modal and back to list
   */
  const onCloseConfirmModal = () => {
    setIsOpenConfirmModal(false)
  }

  /**
   *
   * @param {int} pageSize
   */
  const onPageSizeChange = ({ pageSize }) => {
    setPageSize(pageSize)
  }

  /**
   *
   * @param {int} page
   */
  const onPageChange = ({ page }) => {
    setPage(page)
  }

  /**
   * Handle change filter
   * @param {array} filters
   */
  const onChangeFilter = (filters) => {
    setFilters(filters)
  }

  /**
   * Handle change sort
   * @param {object} sort
   */
  const onChangeSort = (sort) => {
    setSort(sort)
  }

  /**
   * onSubmitDelete
   */
  const onSubmitDelete = () => {
    actions.deleteMO(id, () => {
      setIsOpenDeleteModal(false)
      refreshData()
    })
  }

  /**
   * onCancelDelete
   */
  const onCancelDelete = () => {
    setIsOpenDeleteModal(false)
  }

  const onClickViewDetailsPlan = (id) => {
    redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined">{t('Mo.export')}</Button>
        <Button onClick={handleCreate} icon="add" sx={{ ml: 4 / 3 }}>
          {t('Mo.createButton')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('Mo.title')}
        onSearch={refreshData}
        placeholder={t('Mo.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={moList}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onChangeSort={onChangeSort}
          total={total}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: onChangeFilter,
          }}
        />
      </Page>
      <Modal
        isOpen={isOpenDeleteModal}
        title={t('Mo.deleteModalTitle')}
        size="sm"
        onSubmit={onSubmitDelete}
        onClose={onCancelDelete}
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
        onSubmit={submitConfirm}
        onClose={onCloseConfirmModal}
        submitLabel={t('common.yes')}
        closeLabel={t('common.no')}
        hideCancel
      >
        {t('common.confirmMessage.confirm')}
      </Modal>
    </>
  )
}

export default Mo
