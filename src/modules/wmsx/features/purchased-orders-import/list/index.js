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
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import usePurchasedOrdersImport from '~/modules/wmsx/redux/hooks/usePurchasedOrdersImport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
    title: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
  },
]
function POList() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { poImportList, total, isLoading },
    actions,
  } = usePurchasedOrdersImport()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

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
      headerName: t('purchasedOrderImport.codeImp'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('purchasedOrderImport.nameImp'),
      width: 150,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('purchasedOrderImport.status'),
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('purchasedOrderImport.createdAt'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('purchasedOrderImport.deadline'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        const deliveredAt = params.row.deliveredAt
        return convertUtcDateTimeToLocalTz(deliveredAt)
      },
    },
    {
      field: 'action',
      headerName: t('inventoryCalendar.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params.row
        const isEdit =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isRejected =
          status === ORDER_STATUS.REJECTED || status === ORDER_STATUS.PENDING
        const hasTransaction =
          status === ORDER_STATUS.COMPLETED ||
          status === ORDER_STATUS.IN_PROGRESS
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.PURCHASED_ORDER_IMPORT.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.PURCHASED_ORDER_IMPORT.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton onClick={() => handleOpenConfirmModal(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {isRejected && (
              <IconButton onClick={() => handleOpenRejectModal(params.row)}>
                <Icon name="remove" />
              </IconButton>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                onClick={() =>
                  history.push(
                    `${ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
                  )
                }
                size="small"
                bold={false}
              >
                {t('purchasedOrderImport.transactionList')}
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
    actions.searchPOImports(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deletePOImport(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const handleOpenConfirmModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenConfirmedModal: true,
    })
  }

  const onSubmitConfirmModal = () => {
    actions.confirmPOImportById(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmedModal: false, tempItem: null })
  }

  const onCloseConfirmModal = () => {
    setModal({
      tempItem: null,
      isOpenConfirmedModal: false,
    })
  }

  const handleOpenRejectModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenRejectedModal: true,
    })
  }

  const onSubmitRejectModal = () => {
    actions.rejectPOImportById(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenRejectedModal: false, tempItem: null })
  }

  const onCloseRejectModal = () => {
    setModal({
      tempItem: null,
      isOpenRejectedModal: false,
    })
  }
  const renderHeaderRight = () => {
    return (
      <Button
        onClick={() => history.push(ROUTE.PURCHASED_ORDER_IMPORT.CREATE.PATH)}
        sx={{ ml: 4 / 3 }}
        icon="add"
      >
        {t('general:common.create')}
      </Button>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.purchasedOrderImport')}
      onSearch={setKeyword}
      placeholder={t('purchasedOrderImport.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        uniqKey=""
        title={t('purchasedOrderImport.title')}
        rows={poImportList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('purchasedOrderImport.deleteModalTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('purchasedOrderImport.delete')}
        <LV
          label={t('purchasedOrderImport.codeImp')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrderImport.nameImp')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmedModal}
        title={t('general:common.notify')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmModal}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('purchasedOrderImport.codeImp')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrderImport.nameImp')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenRejectedModal}
        title={t('general:common.reject')}
        onCancel={onCloseRejectModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejectModal}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('purchasedOrderImport.codeImp')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrderImport.nameImp')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default POList
