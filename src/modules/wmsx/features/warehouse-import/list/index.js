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
  WAREHOUSE_IMPORT_STATUS_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseImport from '~/modules/wmsx/redux/hooks/useWarehouseImport'
import { exportWarehouseImportApi } from '~/modules/wmsx/redux/sagas/warehouse-import/import-export-warehouse-import'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import WarehouseImportFilter from './filter-quick-form'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
  },
]
function WarehouseImport() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { movements, total, isLoading },
    actions,
  } = useWarehouseImport()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_QUICK_FILTERS = {
    createdAt: '',
    createdByUser: '',
    warehouseId: '',
    movementType: [
      MOVEMENT_TYPE.PO_IMPORT,
      MOVEMENT_TYPE.PRO_IMPORT,
      MOVEMENT_TYPE.SO_IMPORT,
    ],
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
        return `${t(WAREHOUSE_IMPORT_STATUS_MAP[params.row?.movementType])}`
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
        return params?.row?.user?.fullName
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
                  ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH.replace(':id', `${id}`),
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
      filter: convertFilterParams({ ...filters, ...quickFilters }, columns),
      sort: convertSortParams(sort),
    }
    actions.getWarehouseImportMovements(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters, quickFilters])

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
      title={t('menu.warehouseImport')}
      onSearch={setKeyword}
      placeholder={t('warehouseImport.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <WarehouseImportFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        title={t('movements.title')}
        rows={movements}
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
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default WarehouseImport
