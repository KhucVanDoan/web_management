import React, { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS_OPTIONS,
  WAREHOUSE_EXPORT_STATUS_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseExport from '~/modules/wmsx/redux/hooks/useWarehouseExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter'
const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
  },
]
function WarehouseExport() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { warehouseExportList, total, isLoading },
    actions,
  } = useWarehouseExport()

  const DEFAULT_FILTERS = {
    code: '',
    createdByUser: '',
    createdAt: '',
    warehouseName: '',
    status: '',
    orderType: '',
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = [
    {
      field: 'code',
      headerName: t('movements.code'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'orderCode',
      headerName: t('movements.importExport.orderCode'),
      width: 120,
      sortable: false,
      fixed: true,
    },
    {
      field: 'orderName',
      headerName: t('movements.importExport.orderName'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const { order } = params?.row
        return order?.name || ''
      },
    },
    {
      field: 'orderType',
      headerName: t('movements.importExport.orderType'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return `${t(WAREHOUSE_EXPORT_STATUS_MAP[params.row?.orderType])}`
      },
    },
    {
      field: 'warehouseName',
      headerName: t('movements.importExport.warehouseName'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.warehouse?.name
      },
    },
    {
      field: 'createdAt',
      headerName: t('movements.importExport.executeDate'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'createdByUser',
      headerName: t('movements.createdByUser'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.user?.username
      },
    },
    {
      field: 'movementStatus',
      headerName: t('movements.movementStatus'),
      width: 120,
      sortable: true,
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
      field: 'action',
      headerName: t('movements.action'),
      width: 120,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH.replace(':id', `${id}`),
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
      page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, movementType: [1, 3, 5] },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseExport(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExport')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseExport.tableTitle')}
        rows={warehouseExportList}
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
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default WarehouseExport
