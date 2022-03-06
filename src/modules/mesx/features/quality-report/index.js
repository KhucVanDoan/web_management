import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useQualityReport from '~/modules/mesx/redux/hooks/useQualityReport'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import { searchMO } from '../../redux/actions/mo.action'
import useSaleOrder from '../../redux/hooks/useSaleOrder'
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
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(null)
  const { t } = useTranslation(['mesx'])

  const dispatch = useDispatch() //@TODO: <doan.khucvan> wait hook useMo
  const moList = useSelector((state) => state.Mo.moList)

  const {
    data: { isLoading, transactions, total },
    actions,
  } = useQualityReport()

  const {
    data: { saleOrderList },
    actions: saleOder,
  } = useSaleOrder()

  const {
    data: { itemList },
    actions: item,
  } = useCommonManagement()

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
      width: 200,
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
      width: 150,
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
      width: 200,
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
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.quantity ? row?.quantity : '0.00'
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('qualityReport.quantitySX'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.actualQuantity ? row?.actualQuantity : '0.00'
      },
    },
    {
      field: 'confirmedQuantity',
      headerName: t('qualityReport.quantityNeed'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.confirmedQuantity ? row?.confirmedQuantity : '0.00'
      },
    },
    {
      field: 'qcPassQuantity',
      headerName: t('qualityReport.quantityDone'),
      width: 100,
      align: 'center',

      renderCell: (params) => {
        const { row } = params
        return row?.qcPassQuantity ? row?.qcPassQuantity : '0.00'
      },
    },
    {
      field: 'errorQuantity',
      headerName: t('qualityReport.quantityErr'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        return row?.errorQuantity ? row?.errorQuantity : '0.00'
      },
    },
    {
      field: 'qcRejectQuantity',
      headerName: t('qualityReport.quantityErrs'),
      width: 100,
      align: 'center',
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.getQualityReports(params)
    item.getItems({ isGetAll: 1 })
    saleOder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    dispatch(searchMO({ isGetAll: 1 }))
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
          form: (
            <FilterForm
              moList={moList}
              saleOrderList={saleOrderList}
              itemList={itemList}
            />
          ),
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}
export default QualityReports
