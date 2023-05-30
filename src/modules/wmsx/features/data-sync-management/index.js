import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useDataSyncManagement from '~/modules/wmsx/redux/hooks/useDataSyncManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import {
  DATA_SYNC_STATUS,
  DATA_SYNC_STATUS_OPTIONS,
  MOVEMENT_TYPE,
  OrderTypeEnum,
  TYPE_TRANSACTION_DATA_SYNC,
} from '../../constants'
import { detailDataSyncManagementApi } from '../../redux/sagas/data-sync-management/retry-data-sync-management'
import FilterForm from './filter'
import QuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: ROUTE.DATA_SYNC_MANAGEMENT.LIST.TITLE,
  },
]

const DataSyncManagement = () => {
  const {
    data: { dataSyncManagementList, isLoading, total },
    actions,
  } = useDataSyncManagement()
  const history = useHistory()
  const { t } = useTranslation(['wmsx'])
  const [selectedRows, setSelectedRows] = useState([])
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenRejectModal: false,
    isOpenRetryModal: false,
  })

  const DEFAULT_FILTERS = {
    resourceCode: '',
    signalCode: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    resourceCode: '',
    type: '',
    status: '',
    date: '',
  }

  const {
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
    quickFilters,
    setQuickFilters,
    filters,
    setFilters,
    keyword,
    setKeyword,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = [
    {
      field: '#',
      headerName: '#',
      align: 'center',
      width: 30,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'signalCode',
      headerName: t('dataSyncManagement.signalCode'),
      width: 250,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'resourceCode',
      headerName: t('dataSyncManagement.objectCode'),
      width: 200,
      visible: 'always',
    },
    {
      field: 'typeTransaction',
      headerName: t('dataSyncManagement.type'),
      width: 150,
    },
    {
      field: 'fromSystem',
      headerName: t('dataSyncManagement.fromSystem'),
      width: 120,
    },
    {
      field: 'toSystem',
      headerName: t('dataSyncManagement.toSystem'),
      width: 150,
    },
    {
      field: 'status',
      headerName: t('dataSyncManagement.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DATA_SYNC_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'sentDate',
      headerName: t('dataSyncManagement.sentDate'),
      filterFormat: 'date',
      width: 150,
    },
    {
      field: 'dateFrom',
      headerName: t('dataSyncManagement.receivedDate'),
      filterFormat: 'date',
      width: 150,
    },
    {
      field: 'action',
      headerName: t('dataSyncManagement.action'),
      width: 150,
      visible: 'always',
      sticky: 'right',

      renderCell: (params) => {
        const { status } = params?.row
        const isDisplay =
          status === DATA_SYNC_STATUS.ERROR_TRANSACTION ||
          status === DATA_SYNC_STATUS.ERROR_SYNC
        return (
          <div>
            <IconButton onClick={() => handleClickView(params)}>
              {/* history
                  .push
                  ROUTE.INVENTORY.DETAIL.PATH.replace(':id', `${id}`), */}

              <Icon name="show" />
            </IconButton>

            {isDisplay && (
              <>
                <Guard code={FUNCTION_CODE.DATASYNC_RETRY_JOB}>
                  <IconButton onClick={() => onClickRetry(params.row)}>
                    <Icon name="sync" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.DATASYNC_CANCEL_JOB}>
                  <IconButton onClick={() => onClickReject(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              </>
            )}
          </div>
        )
      },
    },
  ]

  const formattedData = dataSyncManagementList?.items?.map((item) => ({
    id: item?.id,
    signalCode: item?.id,
    resourceCode: item?.resourceCode,
    dateFrom: item?.dateNow ? convertUtcDateToLocalTz(item?.dateNow) : '',
    sentDate: item?.dateFrom ? convertUtcDateToLocalTz(item?.dateFrom) : '',
    fromSystem: item?.fromSystem,
    toSystem: item?.toSystem,
    typeTransaction: item?.typeTransaction,
    status: item?.status,
  }))

  const refreshData = () => {
    const params = {
      page,
      keyword: keyword.trim(),
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          resourceCode: filters?.resourceCode || quickFilters?.resourceCode,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchDataSyncManagement(params)
  }
  useEffect(() => {
    refreshData()
  }, [page, pageSize, keyword, filters, sort, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, keyword, filters, quickFilters])

  const onClickRetry = (tempItem) => {
    setModal({ tempItem, isOpenRetryModal: true })
  }
  const onClickReject = (tempItem) => {
    setModal({ tempItem, isOpenRejectModal: true })
  }

  const onCloseModal = () => {
    setModal({
      isOpenRetryModal: false,
      isOpenRejectModal: false,
      tempItem: null,
    })
  }
  const handleClickView = async (params) => {
    const response = await detailDataSyncManagementApi(params?.row?.id)
    switch (response?.data?.typeTransaction) {
      case TYPE_TRANSACTION_DATA_SYNC.PO_IMPORT:
        return history.push(
          ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH.replace(
            ':id',
            `${response?.data?.object?.id}`,
          ),
        )
      case TYPE_TRANSACTION_DATA_SYNC.SO_EXPORT:
        return history.push(
          ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH.replace(
            ':id',
            `${response?.data?.object?.id}`,
          ),
        )
      case TYPE_TRANSACTION_DATA_SYNC.TRANSACTION:
        switch (response?.data?.object?.orderType) {
          case OrderTypeEnum.PO:
            return history.push(
              ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH.replace(
                ':id',
                `${response?.data?.object?.data[0]?.warehouseMovementId}`,
              ),
            )
          case OrderTypeEnum.SO:
            if (response?.data?.object?.data[0]?.movementType !== 5) {
              return history.push(
                ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.PATH.replace(
                  ':id',
                  `${response?.data?.object?.orderId}`,
                ),
              )
            } else {
              return history.push(
                ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH.replace(
                  ':id',
                  `${response?.data?.object?.data[0]?.warehouseMovementId}`,
                ),
              )
            }
          case OrderTypeEnum.TRANSFER:
            if (
              response?.data?.object?.data[0]?.movementType ===
              MOVEMENT_TYPE.TRANSFER_EXPORT
            ) {
              return history.push(
                ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH.replace(
                  ':id',
                  `${response?.data?.object?.data[0]?.warehouseMovementId}`,
                ),
              )
            } else {
              return history.push(
                ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH.replace(
                  ':id',
                  `${response?.data?.object?.data[0]?.warehouseMovementId}`,
                ),
              )
            }
          default:
            break
        }
        break
      case TYPE_TRANSACTION_DATA_SYNC.WAREHOUSE_TRANSFER:
        return history.push(
          ROUTE.WAREHOUSE_TRANSFER.DETAIL.PATH.replace(
            ':id',
            `${response?.data?.object?.id}`,
          ),
        )
      default:
        break
    }
  }
  const onSubmitRetry = () => {
    actions.retryDataSyncManagement(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenRetryModal: false, tempItem: null })
  }

  const onSubmitReject = () => {
    actions.rejectDataSyncManagement(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenRejectModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {}

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.dataSyncManagement')}
      placeholder={t('dataSyncManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      loading={isLoading}
    >
      <QuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        uniqKey=""
        title={t('dataSyncManagement.title')}
        columns={columns}
        rows={formattedData}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={modal.isOpenRetryModal}
        title={t('dataSyncManagement.syncTitle')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRetry}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('dataSyncManagement.confirmSync')}
        <LV
          label={t('dataSyncManagement.signalCode')}
          value={modal?.tempItem?.signalCode}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('dataSyncManagement.objectCode')}
          value={modal?.tempItem?.resourceCode}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenRejectModal}
        title={t('dataSyncManagement.rejectTitle')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitReject}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('dataSyncManagement.confirmReject')}
        <LV
          label={t('dataSyncManagement.signalCode')}
          value={modal?.tempItem?.signalCode}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('dataSyncManagement.objectCode')}
          value={modal?.tempItem?.resourceCode}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DataSyncManagement
