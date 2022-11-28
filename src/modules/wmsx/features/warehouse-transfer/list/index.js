import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  TRANSFER_STATUS,
  TRANSFER_STATUS_OPTIONS,
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
  const { canAccess } = useApp()
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
        field: 'destinationWarehouseId',
        headerName: t('warehouseTransfer.warehouseImport'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.destinationWarehouse?.name
        },
      },
      {
        field: 'sourceWarehouseId',
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
              options={TRANSFER_STATUS_OPTIONS}
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
          const isEdit = status === TRANSFER_STATUS.PENDING
          const isConfirmed = status === TRANSFER_STATUS.PENDING
          const isRejected = status === TRANSFER_STATUS.REJECTED
          const isDelete =
            status === TRANSFER_STATUS.PENDING ||
            status === TRANSFER_STATUS.REJECTED

          const hasTransaction =
            status === TRANSFER_STATUS.COMPLETED ||
            status === TRANSFER_STATUS.EXPORTED
          return (
            <div>
              <Guard code={FUNCTION_CODE.WAREHOUSE_DETAIL_WAREHOUSE_TRANSFER}>
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
              </Guard>

              {(isEdit || isRejected) && (
                <Guard code={FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE_TRANSFER}>
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
                </Guard>
              )}
              {isDelete && (
                <Guard code={FUNCTION_CODE.WAREHOUSE_DELETE_WAREHOUSE_TRANSFER}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
              )}
              {isConfirmed && (
                <Guard
                  code={FUNCTION_CODE.WAREHOUSE_CONFIRM_WAREHOUSE_TRANSFER}
                >
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                </Guard>
              )}
              {isEdit && (
                <Guard code={FUNCTION_CODE.WAREHOUSE_REJECT_WAREHOUSE_TRANSFER}>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
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
      filter: convertFilterParams(
        {
          ...filters,
          destinationWarehouseId: filters?.destinationWarehouseId?.id,
          sourceWarehouseId: filters?.sourceWarehouseId?.id,
          createdByUserId: filters?.createdByUserId?.id,
        },
        [
          ...columns,
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'createdByUserId' },
        ],
      ),
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
        <ImportExport
          {...(canAccess(FUNCTION_CODE.WAREHOUSE_IMPORT_WAREHOUSE_TRANSFER)
            ? {
                onExport: () => {},
              }
            : {})}
          {...(canAccess(
            FUNCTION_CODE.WAREHOUSE_CONFIRM_IMPORT_WAREHOUSE_TRANSFER,
          )
            ? {
                onImport: () => {},
              }
            : {})}
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.WAREHOUSE_CREATE_WAREHOUSE_TRANSFER}>
          <Button
            onClick={() => history.push(ROUTE.WAREHOUSE_TRANSFER.CREATE.PATH)}
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
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
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        // bulkActions={{
        //   actions: [
        //     BULK_ACTION.APPROVE,
        //     BULK_ACTION.REJECT,
        //     BULK_ACTION.DELETE,
        //   ],
        //   apiUrl: API_URL.WAREHOUSE_TRANSFER,
        //   onSuccess: () => {
        //     if (page === 1) {
        //       refreshData()
        //     } else {
        //       setPage(1)
        //     }
        //     setSelectedRows([])
        //   },
        // }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('warehouseTransfer.deleteTitlePopup')}
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
