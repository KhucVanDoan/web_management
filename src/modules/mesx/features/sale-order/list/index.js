import React, { useMemo, useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  ORDER_STATUS,
  SALE_ORDER_STATUS_MAP,
  ROWS_PER_PAGE_OPTIONS,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import FilterForm from './filter'
import { filterSchema } from './filter/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.SALE_ORDER.LIST.PATH,
    title: ROUTE.SALE_ORDER.LIST.TITLE,
  },
]

function SaleOrder() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading, saleOrderList, total },
    actions,
  } = useSaleOrder()

  const DEFAULT_FILTER = {
    code: '',
    name: '',
    status: '',
    createdAt: '',
  }

  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTER)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [id, setId] = useState()

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: t('saleOrder.orderNumber'),
    //   width: 50,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('saleOrder.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('saleOrder.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('saleOrder.description'),
      width: 150,
      fixed: true,
    },
    {
      field: 'status',
      headerName: t('saleOrder.status'),
      width: 150,
      sortable: true,

      renderCell: (params) => {
        const { status } = params.row
        return t(SALE_ORDER_STATUS_MAP[status])
      },
    },
    {
      field: 'createdAt',
      headerName: t('saleOrder.createdAt'),
      width: 150,
      sortable: true,
      type: 'date',
      renderCell: (params) => {
        const { createdAt } = params.row
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('saleOrder.deadline'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { deadline } = params.row
        return formatDateTimeUtc(deadline)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        return (
          <>
            <IconButton onClick={() => onClickViewDetails(id)}>
              <Icon name="show" />
            </IconButton>
            <IconButton onClick={() => onClickEdit(id)}>
              <Icon name="edit" />
            </IconButton>

            {isDelete && (
              <IconButton onClick={() => onClickDelete(id)}>
                <Icon name="delete" />
              </IconButton>
            )}

            {isConfirmed && (
              <IconButton onClick={() => onClickConfirmed(params.row.id)}>
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ])

  const onClickViewDetails = (id) => {
    history.push(ROUTE.SALE_ORDER.DETAILS.PATH.replace(':id', `${id}`))
  }

  const onClickEdit = (id) => {
    history.push(ROUTE.SALE_ORDER.EDIT.PATH.replace(':id', `${id}`))
  }

  const onClickDelete = (id) => {
    setDeleteModal(true)
    setId(id)
  }

  const onSubmitDelete = () => {
    actions.deleteSaleOrder(
      id,
      () => {
        setDeleteModal(false)
      },
      () => {
        setDeleteModal(false)
      },
    )
  }

  const onClickConfirmed = (id) => {
    setConfirmModal(true)
    setId(id)
  }

  const submitConfirm = () => {
    actions.confirmSaleOrderById(
      id,
      () => {
        setConfirmModal(false)
      },
      () => {
        setConfirmModal(false)
      },
    )
  }

  useEffect(() => {
    refreshData()
  }, [sort, keyword, filters, page, pageSize])

  const refreshData = () => {
    const sortData =
      sort && sort?.orderBy && sort?.order
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchSaleOrders(params)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: <linh.taquang> handle import export */}
        <Button variant="outlined" disabled icon="download" sx={{ ml: 4 / 3 }}>
          {t('saleOrder.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.SALE_ORDER.CREATE.PATH)}
          startIcon={<Icon name="add" />}
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('saleOrder.title')}
        onSearch={setKeyword}
        placeholder={t('saleOrder.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('saleOrder.title')}
          rows={saleOrderList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onChangeSort={setSort}
          total={total}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            validationSchema: filterSchema(t),
            onApply: setFilters,
          }}
          sort={sort}
          checkboxSelection
        />
        <Dialog
          open={deleteModal}
          title={t('saleOrder.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('saleOrder.confirmDelete')}
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('saleOrder.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={submitConfirm}
          submitLabel={t('common.yes')}
          noBorderBottom
        >
          {t('saleOrder.confirmBody')}
        </Dialog>
      </Page>
    </>
  )
}

export default SaleOrder
