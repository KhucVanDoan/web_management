import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { DATE_FORMAT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import { PLAN_STATUS_MAP, SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import usePlanReport from '~/modules/mesx/redux/hooks/usePlanReport'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.PLAN_REPORT.PATH,
    title: ROUTE.PLAN_REPORT.TITLE,
  },
]

function PlanReport() {
  const { t } = useTranslation(['mesx'])
  const [bomTree, setBomTree] = useState([])

  const DEFAULT_FILTERS = {
    moName: '',
    saleOrderIds: '',
    plan: '',
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
    data: { isLoading, total, planList },
    actions: actionPlan,
  } = useDefinePlan()

  const { actions: actionMo } = useMo()
  const { actions: actionSaleOrder } = useSaleOrder()
  const { actions: actionPlanReport } = usePlanReport()

  const columns = [
    {
      field: 'id',
      headerName: t('definePlan.id'),
      width: 100,
      sortable: false,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('definePlan.code'),
      sortable: true,
      fixed: true,
    },
    {
      field: 'moCode',
      headerName: t('planReport.moCode'),
      sortable: true,
      renderCell: (params) => {
        const { mo } = params.row
        return mo?.code
      },
    },
    {
      field: 'moName',
      headerName: t('planReport.moName'),
      sortable: true,
    },
    {
      field: 'soName',
      headerName: t('planReport.saleOrder'),
      width: 200,
      sortable: true,
    },
    {
      field: 'plan',
      headerName: t('planReport.planDefine'),
      width: 200,
      align: 'center',
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return (
          formatDateTimeUtc(params.row.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(params.row.planTo, DATE_FORMAT)
        )
      },
    },
    {
      field: 'status',
      headerName: t('planReport.status'),
      align: 'center',
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(PLAN_STATUS_MAP[status])
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
    },
  ]
  const producingStepColumns = [
    {
      field: 'name',
      headerName: t('definePlan.producingStepName'),
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const { name } = params.row
        return name
      },
    },
    {
      field: 'quantity',
      headerName: t('definePlan.quantity'),
      width: 200,
      align: 'center',
      sortable: false,
    },
    {
      field: 'actualQuantity',
      headerName: t('definePlan.actualQuantity'),
      width: 200,
      align: 'center',
      sortable: false,
    },
    {
      field: 'rootPlanDate',
      headerName: t('planReport.planDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planDate, endDate } = params.row
        return (
          formatDateTimeUtc(planDate, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(endDate, DATE_FORMAT)
        )
      },
    },
    {
      field: 'executeDate',
      headerName: t('definePlan.executeDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { startAt } = params.row
        return formatDateTimeUtc(startAt, DATE_FORMAT)
      },
    },
    {
      field: 'endDate',
      headerName: t('definePlan.endDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { endAt } = params.row
        return formatDateTimeUtc(endAt, DATE_FORMAT)
      },
    },
    {
      field: 'status',
      headerName: t('definePlan.status'),
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(PLAN_STATUS_MAP[status])
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { progress } = params.row
        return progress
      },
    },
  ]

  const additionColums = [
    {
      field: 'itemName',
      headerName: t('definePlan.itemName'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.name
      },
    },
    {
      field: 'bomName',
      headerName: t('definePlan.bomName'),
      sortable: false,
      renderCell: (params) => {
        const { bom } = params.row
        return bom?.name
      },
    },
    {
      field: 'routingCode',
      headerName: t('definePlan.routingCode'),
      sortable: false,
      renderCell: (params) => {
        const { routing } = params.row
        return routing?.code
      },
    },
    {
      field: 'planingQuantity',
      headerName: t('definePlan.quantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('definePlan.planQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'unit',
      headerName: t('definePlan.unit'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemUnitName
      },
    },
    {
      field: 'rootPlanDate',
      headerName: t('planReport.planDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        if (planBom) {
          return (
            formatDateTimeUtc(planBom?.planFrom, DATE_FORMAT) +
            ' - ' +
            formatDateTimeUtc(planBom?.planTo, DATE_FORMAT)
          )
        }
      },
    },
    {
      field: 'executeDate',
      headerName: t('definePlan.executeDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return formatDateTimeUtc(planBom?.startAt, DATE_FORMAT)
      },
    },
    {
      field: 'endDate',
      headerName: t('definePlan.endDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return formatDateTimeUtc(planBom?.endAt, DATE_FORMAT)
      },
    },
    {
      field: 'status',
      headerName: t('definePlan.status'),
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(PLAN_STATUS_MAP[status])
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.progress
      },
    },
  ]

  useEffect(() => {
    refreshData()
    actionMo.searchMO({ isGetAll: 1 })
    actionSaleOrder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    actionPlanReport.exportPlanReport()
  }, [pageSize, page, sort, filters, keyword])

  useEffect(() => {
    setBomTree(planList)
  }, [planList])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actionPlan.searchPlans(params)
  }

  const handleGetData = (id) => {
    actionPlan.getPlanDetailsById(id, (data) => {
      const newBomTree = bomTree.map((bom) => {
        if (bom?.id === id) {
          const newBom = { ...bom }
          if (!bom.subBom) {
            newBom['subBom'] = data?.planBoms
          }
          return newBom
        } else {
          return bom
        }
      })
      setBomTree(newBomTree)
    })
  }

  // @TODO: <linh.taquang> handleExport plan report
  // const handleExportFile = () => {
  //   const url = file
  //   const str = url.substring(url.indexOf(';') + 1)
  //   return `data:text/csv;base64,${str}`
  // }
  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: <linh.tauquang> handle export */}
        <Button variant="outlined" disabled icon="download">
          {t('qualityReport.export')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.planReport')}
        onSearch={setKeyword}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <TableCollapse
          title={t('menu.planReport')}
          rows={bomTree}
          pageSize={pageSize}
          page={page}
          columns={columns}
          handleGetData={handleGetData}
          additionColums={additionColums}
          producingStepColumns={producingStepColumns}
          isRoot={true}
          type={'list'}
          isView={true}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          onFilterChange={setFilters}
          sort={sort}
          total={total}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
        />
      </Page>
    </>
  )
}

export default PlanReport
