import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  RETURN_ORDER_STATUS,
  LETTER_TYPE_MAP,
  RETURN_ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useReturnOrder from '~/modules/wmsx/redux/hooks/useReturnOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.RETURN_ORDER.LIST.PATH,
    title: ROUTE.RETURN_ORDER.LIST.TITLE,
  },
]
function ReturnOrder() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { returnOrderList, total, isLoading },
    actions,
  } = useReturnOrder()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
  } = useQueryState()

  const columns = [
    {
      field: 'code',
      headerName: t('returnOrder.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('returnOrder.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'type',
      headerName: t('returnOrder.letterType'),
      width: 150,
      renderCell: (params) => {
        return `${t(LETTER_TYPE_MAP[params.row?.returnType])}`
      },
    },
    {
      field: 'customer',
      headerName: t('returnOrder.customer'),
      width: 150,
      renderCell: (params) => {
        return (
          params.row.order?.customer?.name || params.row.order?.vendor?.name
        )
      },
    },
    {
      field: 'poso',
      headerName: t('returnOrder.poso'),
      width: 150,
      renderCell: (params) => {
        return params.row.orderDetail?.name
      },
    },
    {
      field: 'ieOrderCode',
      headerName: t('returnOrder.ieOrderCode'),
      width: 150,
      renderCell: (params) => {
        return params.row.order?.name
      },
    },
    {
      field: 'status',
      headerName: t('returnOrder.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={RETURN_ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdByUser',
      headerName: t('returnOrder.createdByUser'),
      width: 120,
      renderCell: (params) => {
        return params.row.createdByUser?.fullName
      },
    },
    {
      field: 'action',
      headerName: t('returnOrder.action'),
      width: 200,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const hasEditDeleteBtn =
          status === RETURN_ORDER_STATUS.PENDING ||
          status === RETURN_ORDER_STATUS.REJECTED
        const isConfirmed = status === RETURN_ORDER_STATUS.PENDING
        const hasTransaction =
          status === RETURN_ORDER_STATUS.COMPLETED ||
          status === RETURN_ORDER_STATUS.IN_PROGRESS
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.RETURN_ORDER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {hasEditDeleteBtn && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.RETURN_ORDER.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              </>
            )}
            {isConfirmed && (
              <IconButton onClick={() => onClickConfirmed(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() =>
                  history.push(
                    `${ROUTE.RETURN_ORDER.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
                  )
                }
              >
                {t('returnOrder.transactionList')}
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchReturnOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteReturnOrder(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmReturnOrderById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.RETURN_ORDER.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.returnOrder')}
      onSearch={setKeyword}
      placeholder={t('returnOrder.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('returnOrder.title')}
        rows={returnOrderList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('returnOrder.returnOrderDelete')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('returnOrder.confirmDelete')}
        <LV
          label={t('returnOrder.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('returnOrder.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('returnOrder.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('returnOrder.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ReturnOrder
