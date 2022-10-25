import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useDataSyncManagement from '~/modules/wmsx/redux/hooks/useDataSyncManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter'
import QuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: ROUTE.DATA_SYNC_MANAGEMENT.LIST.TITLE,
  },
]

const DataSyncManagement = () => {
  const history = useHistory()
  const {
    data: { dataSyncManagementList, isLoading, total },
    actions,
  } = useDataSyncManagement()
  const { t } = useTranslation(['wmsx'])
  const [selectedRows, setSelectedRows] = useState([])
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenRejectModal: false,
    isOpenRetryModal: false,
  })

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    objectCode: '',
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
      field: 'id',
      headerName: '#',
      width: 20,
    },
    {
      field: 'signalCode',
      headerName: t('dataSyncManagement.signalCode'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'objectCode',
      headerName: t('dataSyncManagement.objectCode'),
      width: 120,
      fixed: true,
    },
    {
      field: 'type',
      headerName: t('dataSyncManagement.type'),
      width: 120,
    },
    {
      field: 'fromSystem',
      headerName: t('dataSyncManagement.fromSystem'),
      width: 120,
    },
    {
      field: 'toSystem',
      headerName: t('dataSyncManagement.toSystem'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('dataSyncManagement.status'),
      width: 120,
      renderCell: (params) => {
        const { status } = params.row
        return <Status options={[]} value={status} variant="text" />
      },
    },
    {
      field: 'sentDate',
      headerName: t('dataSyncManagement.sentDate'),
      filterFormat: 'date',
      width: 120,
    },
    {
      field: 'receivedDate',
      headerName: t('dataSyncManagement.receivedDate'),
      filterFormat: 'date',
      width: 120,
    },
    {
      field: 'action',
      headerName: t('dataSyncManagement.action'),
      width: 100,
      fixed: true,
      renderCell: (params) => {
        // const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history
                  .push
                  // ROUTE.INVENTORY.DETAIL.PATH.replace(':id', `${id}`),
                  ()
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton onClick={() => onClickRetry(params.row)}>
              <Icon name="sync" />
            </IconButton>
            <IconButton onClick={() => onClickReject(params.row)}>
              <Icon name="remove" />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const formattedData = dataSyncManagementList?.map((item) => ({
    id: item?.id,
    signalCode: item?.signalCode,
    objectCode: item?.objectCode,
    receivedDate: item?.receivedDate
      ? convertUtcDateTimeToLocalTz(item?.receivedDate)
      : '',
    sentDate: item?.sentDate ? convertUtcDateTimeToLocalTz(item?.sentDate) : '',
    fromSystem: item?.fromSystem,
    toSystem: item?.toSystem,
    type: item?.type,
    status: item?.status,
  }))

  const refreshData = () => {
    const params = {
      page,
      keyword: keyword.trim(),
      limit: pageSize,
      filter: convertFilterParams({ ...filters, ...quickFilters }, columns),
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
        onSelectionChange={setSelectedRows}
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
      </Dialog>
    </Page>
  )
}

export default DataSyncManagement
