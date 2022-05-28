import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useInventoryDeadlineWarning from '~/modules/wmsx/redux/hooks/useInventoryDeadlineWarning'
import {
  exportInventoryDeadlineWarningApi,
  getInventoryDeadlineWarningTemplateApi,
  importInventoryDeadlineWarningApi,
} from '~/modules/wmsx/redux/sagas/inventory-deadline-warning/import-export-inventory-deadline-warning'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_DEADLINE_WARNING.PATH,
    title: ROUTE.INVENTORY_DEADLINE_WARNING.TITLE,
  },
]
function InventoryDeadlineWarning() {
  const { t } = useTranslation(['wmsx'])
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    itemCode: '',
    itemName: '',
    itemTypeName: '',
    warehouseName: '',
    warehouseSectorName: '',
    warehouseShelfName: '',
    warehouseShelfFloorName: '',
    itemGroupName: '',
    itemUnitName: '',
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { inventoryDeadlineWarningList, total, isLoading },
    actions,
  } = useInventoryDeadlineWarning()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   fixed: true,
    // },
    {
      field: 'itemCode',
      headerName: t('inventoryDeadlineWarning.itemCode'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t('inventoryDeadlineWarning.itemName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemTypeName',
      headerName: t('inventoryDeadlineWarning.itemType'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseCode',
      headerName: t('inventoryDeadlineWarning.warehouseCode'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseName',
      headerName: t('inventoryDeadlineWarning.warehouseName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseTypes',
      headerName: t('inventoryDeadlineWarning.warehouseType'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const warehouseTypes = params?.row?.warehouseTypes
        return warehouseTypes?.map((item) => item.name)?.join('; ')
      },
    },
    {
      field: 'warehouseSectorName',
      headerName: t('general.warehouseSectorName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseShelfName',
      headerName: t('general.warehouseShelfName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseShelfFloorName',
      headerName: t('general.warehousePalletName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemGroupName',
      headerName: t('inventoryDeadlineWarning.itemGroup'),
      width: 150,
      sortable: true,
    },
    {
      field: 'expireDate',
      headerName: t('inventoryDeadlineWarning.expiry'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { expireDate } = params?.row
        return convertUtcDateToLocalTz(expireDate)
      },
    },
    {
      field: 'quantity',
      headerName: t('inventoryDeadlineWarning.expiryAmount'),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemUnitName',
      headerName: t('inventoryDeadlineWarning.unit'),
      width: 150,
      sortable: true,
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
      isExpireDay: 1,
    }
    actions.searchInventoryDeadlineWarning(params)
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('menu.importExportData')}
        onImport={(params) => {
          importInventoryDeadlineWarningApi(params)
        }}
        onExport={() => {
          exportInventoryDeadlineWarningApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
            keyword: keyword.trim(),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
            sort: convertSortParams(sort),
          })
        }}
        onDownloadTemplate={getInventoryDeadlineWarningTemplateApi}
        onRefresh={refreshData}
        disabled
      />
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.inventoryDeadlineWarning')}
        onSearch={setKeyword}
        placeholder={t('inventoryDeadlineWarning.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          // @TODO: <yen.nguyenhai> need BE return a unique key for each record, it affects to checkbox selection
          uniqKey=""
          title={t('inventoryDeadlineWarning.title')}
          rows={inventoryDeadlineWarningList}
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
          filters={{
            form: <FilterForm />,
            defaultValue: DEFAULT_FILTERS,
            values: filters,
            onApply: setFilters,
          }}
          sort={sort}
        />
      </Page>
    </>
  )
}

export default InventoryDeadlineWarning
