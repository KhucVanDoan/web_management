import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useQualityReport from '~/modules/mesx/redux/hooks/useQualityReport'
import { exportQualityReportApi } from '~/modules/mesx/redux/sagas/quality-report/import-export-quality-report'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.QUALITY_REPORT.LIST.PATH,
    title: ROUTE.QUALITY_REPORT.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  moName: '',
  soName: '',
  itemName: '',
}
const QualityReports = () => {
  const { t } = useTranslation(['mesx'])
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
    data: { isLoading, transactions, total },
    actions,
  } = useQualityReport()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    // {
    //   field: 'id',
    //   headerName: t('qualityReport.orderIdColumn'),
    //   width: 80,
    //   sortable: false,
    //   align: 'center',
    // },
    {
      field: 'moName',
      headerName: t('qualityReport.moName'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return row?.manufacturingOrder?.name
      },
    },
    {
      field: 'soName',
      headerName: t('qualityReport.saleOrder'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return row?.saleOrder?.name
      },
    },
    {
      field: 'itemName',
      headerName: t('qualityReport.productName'),
      width: 200,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return row?.bom?.item?.name
      },
    },
    {
      field: 'routingName',
      headerName: t('qualityReport.routingName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.routing?.name
      },
    },
    {
      field: 'producingStepName',
      headerName: t('qualityReport.nameCD'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.producingStep?.name
      },
    },
    {
      field: 'quantity',
      headerName: t('qualityReport.quantityPlan'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { row } = params
        return row?.quantity ? row?.quantity : '0.00'
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('qualityReport.quantitySX'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { row } = params
        return row?.actualQuantity ? row?.actualQuantity : '0.00'
      },
    },
    {
      field: 'quantityNeedQC',
      headerName: t('qualityReport.quantityNeed'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { row } = params
        return row?.quantityNeedQC ? row?.quantityNeedQC : '0.00'
      },
    },
    {
      field: 'qcPassQuantity',
      headerName: t('qualityReport.quantityPass'),
      width: 100,
      align: 'right',

      renderCell: (params) => {
        const { row } = params
        return row?.qcPassQuantity ? row?.qcPassQuantity : '0.00'
      },
    },
    {
      field: 'errorQuantity',
      headerName: t('qualityReport.quantityErr'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { row } = params
        return row?.errorQuantity ? row?.errorQuantity : '0.00'
      },
    },
    {
      field: 'qcRejectQuantity',
      headerName: t('qualityReport.quantityErrs'),
      width: 100,
      align: 'right',
      sortable: false,
      renderCell: (params) => {
        const { row } = params
        return row?.qcRejectQuantity ? row?.qcRejectQuantity : '0.00'
      },
    },
    {
      field: 'why',
      headerName: t('qualityReport.why'),
      width: 100,
      align: 'center',
      sortable: false,
    },
  ]

  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, filters, sort])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const refreshData = () => {
    const params = {
      keyword: keyword?.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, moName: filters?.moName?.name },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getQualityReports(params)
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('qualityReport.export')}
        onExport={() => {
          exportQualityReportApi({
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
    <Page
      breadcrumbs={breadcrumbs}
      title={t('qualityReport.title')}
      onSearch={setKeyword}
      placeholder={t('qualityReport.searchPlacehoder')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <DataTable
        title={t('qualityReport.title')}
        rows={transactions}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
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
export default QualityReports
