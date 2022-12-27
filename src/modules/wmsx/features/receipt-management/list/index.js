import React, { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { RECEIPT_MANAGEMENT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
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
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('receiptManagement.receiptCode'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'receiptNumber',
      headerName: t('receiptManagement.receiptNo'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'contractNumber',
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
            <Guard code={FUNCTION_CODE.SALE_DETAIL_RECEIPT}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
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
          createdAt: filters?.createdAt || quickFilters?.createdAt,
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.receiptManagement')}
      onSearch={setKeyword}
      placeholder={t('receiptManagement.searchPlaceholder')}
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
