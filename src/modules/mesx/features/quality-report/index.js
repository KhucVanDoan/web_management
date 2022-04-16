import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import useQualityReport from '~/modules/mesx/redux/hooks/useQualityReport'
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
      field: 'confirmedQuantity',
      headerName: t('qualityReport.quantityNeed'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { row } = params
        return row?.confirmedQuantity ? row?.confirmedQuantity : '0.00'
      },
    },
    {
      field: 'qcPassQuantity',
      headerName: t('qualityReport.quantityDone'),
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('qualityReport.title')}
      onSearch={setKeyword}
      placeholder={t('qualityReport.searchPlacehoder')}
      loading={isLoading}
    >
      <DataTable
        title={t('qualityReport.title')}
        rows={transactions}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
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
