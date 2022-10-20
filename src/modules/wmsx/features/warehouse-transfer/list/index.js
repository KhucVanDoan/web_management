import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS,
  ORDER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
    title: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
  },
]

const WarehouseTransfer = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { warehouseTransferList, isLoading, total },
    actions,
  } = useWarehouseTransfer()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('warehouseTransfer.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('warehouseTransfer.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'type',
        headerName: t('warehouseTransfer.type'),
        width: 150,
        renderCell: (params) => {
          return t(`${WAREHOUSE_TRANSFER_MAP[params?.row?.type]}`)
        },
      },
      {
        field: 'warehouseImport',
        headerName: t('warehouseTransfer.warehouseImport'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.destinationWarehouseId?.name
        },
      },
      {
        field: 'warehouseExport',
        headerName: t('warehouseTransfer.warehouseExport'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.sourceWarehouse?.name
        },
      },
      {
        field: 'receiptNoEbs',
        headerName: t('warehouseTransfer.receiptNoEbs'),
        width: 150,
        // renderCell: (params) => {
        //   return params?.row?.name
        // },
      },
      {
        field: 'status',
        headerName: t('warehouseTransfer.status'),
        width: 150,
        renderCell: (params) => {
          const { status } = params.row
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
        field: 'actions',
        headerName: t('warehouseTransfer.actions'),
        width: 250,
        align: 'center',
        fixed: true,
        renderCell: (params) => {
          const { id, status } = params?.row
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
                    ROUTE.WAREHOUSE_TRANSFER.DETAIL.PATH.replace(
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
                      ROUTE.WAREHOUSE_TRANSFER.EDIT.PATH.replace(
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
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {isConfirmed && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {isEdit && (
                <IconButton onClick={() => onClickRejected(params.row)}>
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
                      `${ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.PATH.replace(
                        ':parentId',
                        `${id}`,
                      )}`,
                    )
                  }
                >
                  {t('warehouseTransfer.transactions')}
                </Button>
              )}
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseTransfers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseTransfer(tempItem?.id, () => {
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
    actions.confirmWarehouseTransferById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }
  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }
  const submitReject = () => {
    actions.rejectWarehouseTransferById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.WAREHOUSE_TRANSFER.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseTransferOrder')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseTransfer.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseTransfer.list')}
        columns={columns}
        rows={warehouseTransferList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        bulkActions={{
          actions: [
            BULK_ACTION.APPROVE,
            BULK_ACTION.REJECT,
            BULK_ACTION.DELETE,
          ],
          apiUrl: API_URL.WAREHOUSE_TRANSFER,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('warehouseTransfer.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseTransfer.deleteConfirm')}
        <LV
          label={t('warehouseTransfer.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
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
          label={t('warehouseTransfer.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectModal}
        title={t('general:common.reject')}
        onCancel={() => setIsOpenRejectModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('warehouseTransfer.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default WarehouseTransfer
