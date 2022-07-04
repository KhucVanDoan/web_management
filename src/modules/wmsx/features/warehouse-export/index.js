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
import {
  MOVEMENT_TYPE,
  WAREHOUSE_MOVEMENT_STATUS_OPTIONS,
  WAREHOUSE_EXPORT_STATUS_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseExport from '~/modules/wmsx/redux/hooks/useWarehouseExport'
import { exportWarehouseExportApi } from '~/modules/wmsx/redux/sagas/warehouse-export/import-export-warehouse-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'
import WarehouseExportFilter from './filter-quick-form'
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
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    createdByUser: '',
    status: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    createdAt: '',
    warehouseId: '',
    movementType: [
      MOVEMENT_TYPE.PO_EXPORT,
      MOVEMENT_TYPE.PRO_EXPORT,
      MOVEMENT_TYPE.SO_EXPORT,
    ],
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
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = [
    {
      field: 'id',
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
        return `${t(WAREHOUSE_EXPORT_STATUS_MAP[params.row?.movementType])}`
      },
    },
    {
      field: 'warehouseName',
      headerName: t('movements.importExport.warehouseName'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.warehouse?.name
      },
    },
    {
      field: 'createdAt',
      headerName: t('movements.importExport.executeDate'),
      filterFormat: 'date',
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateToLocalTz(createdAt)
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
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={WAREHOUSE_MOVEMENT_STATUS_OPTIONS}
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
      fixed: true,
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
      filter: convertFilterParams({ ...filters, ...quickFilters }, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseExport(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters, quickFilters])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {
            exportWarehouseExportApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
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
      title={t('menu.warehouseExport')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <WarehouseExportFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        title={t('warehouseExport.tableTitle')}
        rows={warehouseExportList}
        pageSize={pageSize}
        page={page}
        columns={columns}
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
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default WarehouseExport
