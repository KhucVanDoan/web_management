import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { RECEIPT_MANAGEMENT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { exportWarehouseImportApi } from '~/modules/wmsx/redux/sagas/warehouse-import/import-export-warehouse-import'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import ReceiptManagementFilter from './filter-quick-form'

const breadcrumbs = [
  {
    route: ROUTE.RECEIPT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.LIST.TITLE,
  },
]
function ReceiptManagement() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { receiptList, total, isLoading },
    actions,
  } = useReceiptManagement()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_QUICK_FILTERS = {
    receiptNo: '',
    receiptCode: '',
    contractNo: '',
    createdAt: '',
  }

  const DEFAULT_FILTERS = {
    code: '',
    createdByUser: '',
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
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      fixed: true,
    },
    {
      field: 'receiptCode',
      headerName: t('receiptManagement.receiptCode'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'receiptNo',
      headerName: t('receiptManagement.receiptNo'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'contractNo',
      headerName: t('receiptManagement.contractNo'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('general.status'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={RECEIPT_MANAGEMENT_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('receiptManagement.createdAt'),
      filterFormat: 'date',
      width: 120,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateToLocalTz(createdAt)
      },
    },

    {
      field: 'action',
      headerName: t('movements.action'),
      width: 120,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
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
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchReceipt(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {
            exportWarehouseImportApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }}
          onRefresh={refreshData}
          disabled
        />
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.receiptManagement')}
      onSearch={setKeyword}
      placeholder={t('receiptManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <ReceiptManagementFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        rows={receiptList}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default ReceiptManagement