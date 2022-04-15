import React, { useMemo, useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  SALE_ORDER_STATUS_OPTIONS,
  ORDER_STATUS,
} from '~/modules/mesx/constants'
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
  const [tempItem, setTempItem] = useState()

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
        return (
          <Status
            options={SALE_ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('saleOrder.createdAt'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
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
            {isConfirmed && (
              <IconButton onClick={() => onClickEdit(id)}>
                <Icon name="edit" />
              </IconButton>
            )}

            {isDelete && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}

            {isConfirmed && (
              <IconButton onClick={() => onClickConfirmed(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, code: filters?.code?.name },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchSaleOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [sort, keyword, filters, page, pageSize])

  const onClickViewDetails = (id) => {
    history.push(ROUTE.SALE_ORDER.DETAILS.PATH.replace(':id', `${id}`))
  }

  const onClickEdit = (id) => {
    history.push(ROUTE.SALE_ORDER.EDIT.PATH.replace(':id', `${id}`))
  }

  const onClickDelete = (tempItem) => {
    setDeleteModal(true)
    setTempItem(tempItem)
  }

  const onSubmitDelete = () => {
    actions.deleteSaleOrder(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setConfirmModal(true)
    setTempItem(tempItem)
  }

  const submitConfirm = () => {
    actions.confirmSaleOrderById(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
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
        title={t('menu.saleOrderDefine')}
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
          onChangeFilter={setFilters}
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
          <LV
            label={t('saleOrder.code')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('saleOrder.name')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
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
          <LV
            label={t('saleOrder.code')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('saleOrder.name')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default SaleOrder
