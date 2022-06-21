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
  IMPORT_MANUFACTURNG_ORDER_STATUS_OPTIONS,
  ORDER_STATUS,
  ORDER_TYPE,
  TRANSACTION_TYPE_ENUM,
} from '~/modules/wmsx/constants'
import useImportManufacturingOrder from '~/modules/wmsx/redux/hooks/useImportManufacturingOrder'
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
    route: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
    title: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
  },
]
function ImportManufacturingOrder() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { importManufacturingOrderList, total, isLoading },
    actions,
  } = useImportManufacturingOrder()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmedModal: false,
    isOpenRejectedModal: false,
  })

  const DEFAULT_FILTERS = {
    name: '',
    type: [TRANSACTION_TYPE_ENUM.IMPORT, TRANSACTION_TYPE_ENUM.EXPORT],
    code: '',
    status: '',
  }

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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = [
    {
      field: 'code',
      headerName: t('importManufacturingOrder.codeList'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('importManufacturingOrder.nameList'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'type',
      headerName: t('importManufacturingOrder.typeList'),
      width: 150,
      renderCell: (params) => {
        const { type } = params?.row
        const typeData = ORDER_TYPE.find((item) => item.id === type)
        return t(typeData?.name)
      },
    },
    {
      field: 'description',
      headerName: t('importManufacturingOrder.description'),
      width: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('importManufacturingOrder.status'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={IMPORT_MANUFACTURNG_ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('importManufacturingOrder.createdAt'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params?.row?.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('importManufacturingOrder.deadline'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const deadline = params?.row?.deadline
        return convertUtcDateTimeToLocalTz(deadline)
      },
    },
    {
      field: 'action',
      headerName: t('importManufacturingOrder.action'),
      width: 180,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params.row
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
              onClick={() =>
                history.push(
                  ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {(isEdit || isRejected) && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.PATH.replace(
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
            {isEdit && (
              <IconButton onClick={() => handleOpenRejectModal(params.row)}>
                <Icon name="remove" />
              </IconButton>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() =>
                  history.push(
                    `${ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
                  )
                }
              >
                {t('importManufacturingOrder.transactionList')}
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
    actions.searchImportManufacturingOrders(params)
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
    actions.deleteImportManufacturingOrder(modal?.tempItem?.id, () => {
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
    actions.confirmImportManufacturingOrderById(modal?.tempItem?.id, () => {
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
    actions.rejectImportManufacturingOrderById(modal?.tempItem?.id, () => {
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
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() =>
            history.push(ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.PATH)
          }
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
      title={t('menu.importManufacturingOrder')}
      onSearch={setKeyword}
      placeholder={t('importManufacturingOrder.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('importManufacturingOrder.title')}
        rows={importManufacturingOrderList}
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
        open={modal.isOpenDeleteModal}
        title={t('importManufacturingOrder.deleteModalTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('importManufacturingOrder.deleteConfirm')}
        <LV
          label={t('importManufacturingOrder.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('importManufacturingOrder.name')}
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
          label={t('importManufacturingOrder.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('importManufacturingOrder.name')}
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
          label={t('importManufacturingOrder.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('importManufacturingOrder.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ImportManufacturingOrder
