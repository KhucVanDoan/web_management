import { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEFINE_BILL_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useRentWarehouseDashboard from '~/modules/wmsx/redux/hooks/useRentWarehouseDashboard'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.RENT_WAREHOUSE_DASHBOARD.LIST.PATH,
    title: ROUTE.RENT_WAREHOUSE_DASHBOARD.LIST.TITLE,
  },
]
function RentWarehouseDashboard() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    customerName: '',
    billCode: '',
    serviceName: '',
    billDate: '',
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

  const {
    data: { isLoading, list, total },
    actions,
  } = useRentWarehouseDashboard()

  const columns = [
    {
      field: 'customerName',
      headerName: t('rentWarehouseDashboard.customer'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'billCode',
      headerName: t('rentWarehouseDashboard.bill'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'price',
      headerName: t('rentWarehouseDashboard.total'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'serviceName',
      headerName: t('rentWarehouseDashboard.service'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { service } = params.row
        return service?.name
      },
    },
    {
      field: 'status',
      headerName: t('rentWarehouseDashboard.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row?.bill
        return (
          <Status
            options={DEFINE_BILL_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'billDate',
      headerName: t('rentWarehouseDashboard.billDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { billDate } = params.row?.bill
        return convertUtcDateToLocalTz(billDate)
      },
    },
    {
      field: 'action',
      headerName: t('rentWarehouseDashboard.action'),
      fixed: true,
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row.bill
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_BILL.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
              // @TODO: handle view define bill
              disabled
            >
              <Icon name="show" />
            </IconButton>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.getRentWarehouseDashboardList(params)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <Button variant="outlined" icon="download" disabled>
          {t('rentWarehouseDashboard.import')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.rentWarehouseDashboard')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('rentWarehouseDashboard.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('rentWarehouseDashboard.title')}
        rows={list}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
      />
    </Page>
  )
}

export default RentWarehouseDashboard
