import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useInventoryWarning from '~/modules/wmsx/redux/hooks/useInventoryWarning'
import { exportInventoryWarningApi } from '~/modules/wmsx/redux/sagas/inventory-warning/import-export-inventory-warning'
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
    route: ROUTE.INVENTORY_WARNING.PATH,
    title: ROUTE.INVENTORY_WARNING.TITLE,
  },
]
function InventoryWarning() {
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
    data: { inventoryWarningList, total, isLoading },
    actions,
  } = useInventoryWarning()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   fixed: true,
    //   sortable: true,
    // },
    {
      field: 'itemCode',
      headerName: t('inventoryWarning.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t('inventoryWarning.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemTypeName',
      headerName: t('inventoryWarning.type'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseCode',
      headerName: t('inventoryWarning.warehouseCode'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseName',
      headerName: t('inventoryWarning.warehouseName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseTypes',
      headerName: t('inventoryWarning.warehouseType'),
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
      headerName: t('inventoryWarning.itemGroup'),
      width: 150,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('inventoryWarning.inputDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateToLocalTz(createdAt)
      },
    },
    {
      field: 'quantity',
      headerName: t('inventoryWarning.quantityInventory'),
      width: 150,
      align: 'right',
      sortable: true,
    },
    {
      field: 'itemUnitName',
      headerName: t('inventoryWarning.itemUnit'),
      width: 150,
      sortable: true,
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
      isExpireDay: 0,
    }
    actions.searchInventoryWarning(params)
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('menu.importExportData')}
        onExport={() => {
          exportInventoryWarningApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
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
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.inventoryWarning')}
        onSearch={setKeyword}
        placeholder={t('inventoryWarning.searchPlaceholder')}
        loading={isLoading}
        renderHeaderRight={renderHeaderRight}
      >
        <DataTable
          // @TODO: <yen.nguyenhai> need BE return a unique key for each record, it affects to checkbox selection
          uniqKey=""
          title={t('inventoryWarning.title')}
          rows={inventoryWarningList}
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

export default InventoryWarning
