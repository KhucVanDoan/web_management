import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import useInventoryWarning from '~/modules/wmsx/redux/hooks/useInventoryWarning'
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

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchInventoryWarning(params)
  }

  const renderHeaderRight = () => {
    return <></>
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
          title={t('inventoryWarning.title')}
          rows={inventoryWarningList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={setFilters}
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
    </>
  )
}

export default InventoryWarning
