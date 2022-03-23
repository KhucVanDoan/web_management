import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useQualityReport from '~/modules/mesx/redux/hooks/useQualityReport'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
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
  moId: '',
  soId: '',
  itemName: '',
}
const QualityReports = () => {
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(null)
  const { t } = useTranslation(['mesx'])
  const [moId, setMoId] = useState(null)
  const [itemMoList, setItemMoList] = useState([])
  const [soId, setSoId] = useState(null)
  const {
    data: { isLoading, transactions, total },
    actions,
  } = useQualityReport()

  const {
    data: { moList },
    actions: moActions,
  } = useMo()

  const {
    data: { saleOrderList },
    actions: actionSaleOrder,
  } = useSaleOrder()

  const {
    data: { itemList },
    actions: commonManagementActions,
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
    actionSaleOrder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    moActions.searchMO({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    moActions.getMoItemsById(moId, (res) => {
      const itemIds = []
      res?.moDetail.forEach((i) => {
        i?.moPlanBom?.forEach((item) => {
          if (
            !itemIds.includes(item?.itemId) &&
            itemList.find((i) => i.id === item?.itemId)?.itemType.code === '01'
          )
            itemIds.push(item?.itemId)
        })
      })
      const items = itemList.filter((i) => itemIds.includes(i?.id))
      setItemMoList(items)
      const SoId = moList.find((mo) => mo?.id === moId)?.saleOrderId
      setSoId(SoId)
    })
  }, [moId])
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
    commonManagementActions.getItems({ isGetAll: 1 })
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
          form: (
            <FilterForm
              moList={moList}
              saleOrderList={saleOrderList}
              setMoId={setMoId}
              soId={soId}
              itemMoList={itemMoList}
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
