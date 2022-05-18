import { useEffect } from 'react'

import { Typography, Box } from '@mui/material'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import Page from '~/components/Page'
import useInventoryStatistics from '~/modules/wmsx/redux/hooks/useInventoryStatistics'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_STATISTICS.PATH,
    title: ROUTE.INVENTORY_STATISTICS.TITLE,
  },
]
function InventoryStatistics() {
  const { t } = useTranslation(['wmsx'])

  const DEFAULT_FILTERS = {
    itemName: '',
    warehouseName: '',
    warehouseSectorName: '',
    warehouseShelfName: '',
    warehouseShelfFloorName: '',
    lotNumber: '',
    package: '',
    reportDate: new Date(),
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

  const {
    data: { inventoryStatisticList, total, isLoading, totalStock, totalCost },
    actions,
  } = useInventoryStatistics()

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
      headerName: t('inventoryStatistics.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t('inventoryStatistics.name'),
      width: 150,
      fixed: true,
      sortable: true,
      renderCell: (params) => {
        const row = params?.row
        const warning = params?.row?.checkInventory
        return (
          <div>
            {warning && <div style={{ color: 'red' }}>{row?.itemName}</div>}
            {!warning && <>{row?.itemName}</>}
          </div>
        )
      },
    },
    {
      field: 'itemTypeName',
      headerName: t('inventoryStatistics.type'),
      width: 150,
      sortable: true,
    },
    {
      field: 'warehouseName',
      headerName: t('inventoryStatistics.warehouseName'),
      width: 150,
      sortable: true,
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
      field: 'warehouseType',
      headerName: t('inventoryStatistics.warehouseType'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const warehouseTypes = params?.row?.warehouseTypes
        return warehouseTypes?.map((item) => item.name)?.join('; ')
      },
    },
    {
      field: 'itemGroupName',
      headerName: t('inventoryStatistics.itemGroup'),
      width: 150,
      sortable: true,
    },
    {
      field: 'stock',
      headerName: t('inventoryStatistics.inventoryNumbers'),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemUnitName',
      headerName: t('inventoryStatistics.unitType'),
      width: 150,
      sortable: true,
    },
    {
      field: 'lotNumber',
      headerName: t('inventoryStatistics.lotNumber'),
      width: 150,
      sortable: true,
    },
    {
      field: 'package',
      headerName: t('inventoryStatistics.packageCode'),
      width: 150,
      sortable: true,

      renderCell: (params) => {
        const packages = params?.row?.packages
        return packages?.map((pk) => pk?.code || '')?.join('; ')
      },
    },
    {
      field: 'cost',
      headerName: t('inventoryStatistics.inventoryCost'),
      width: 150,
      sortable: true,
      align: 'right',
      renderCell: (params) => {
        const cost = params?.row?.cost
        return parseFloat(cost).toFixed(2)
      },
    },
    {
      field: 'warningInventory',
      headerName: t('inventoryStatistics.warningInventory'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return params?.row?.checkWarning ? <Icon name="tick" /> : ''
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters])

  const refreshData = () => {
    const params = {
      page,
      reportDate: filters?.reportDate,
      limit: pageSize,
      filter: convertFilterParams(omit(filters, ['reportDate']), columns),
      sort: convertSortParams(sort),
    }
    actions.searchInventoryStatistics(params)
  }

  const renderHeaderRight = () => {
    return <></>
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.inventoryStatistics')}
        placeholder={t('inventoryStatistics.searchPlaceholder')}
        loading={isLoading}
        renderHeaderRight={renderHeaderRight}
      >
        <Box sx={{ mb: 1, textAlign: 'left' }}>
          <table>
            <tbody>
              <tr>
                <th>
                  <Typography variant="h5">
                    {t('inventoryStatistics.totalStock')}:
                  </Typography>
                </th>
                <td>
                  <Typography variant="h4">{totalStock?.toFixed(2)}</Typography>
                </td>
              </tr>
              <tr>
                <th>
                  <Typography variant="h5">
                    {t('inventoryStatistics.totalCost')}:
                  </Typography>
                </th>
                <td>
                  <Typography variant="h4">
                    <NumberFormatText value={totalCost} />
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>

        <DataTable
          title={t('inventoryStatistics.tableTitle')}
          rows={inventoryStatisticList}
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

export default InventoryStatistics