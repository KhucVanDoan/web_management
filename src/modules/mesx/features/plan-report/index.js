import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import { PLAN_PROGRESS_MAP } from '~/modules/mesx/constants'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import usePlanReport from '~/modules/mesx/redux/hooks/usePlanReport'
import { exportPlanReportApi } from '~/modules/mesx/redux/sagas/plan-report/import-export-plan-report'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
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

  const { actions: actionPlanReport } = usePlanReport()
  const [columnsSettings, setColumnsSettings] = useState([])

  const columns = [
    {
      field: 'id',
      headerName: t('definePlan.id'),
      width: 100,
      sortable: false,
      visible: 'always',
    },
    {
      field: 'code',
      headerName: t('definePlan.code'),
      sortable: true,
      visible: 'always',
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
          convertUtcDateToLocalTz(params.row.planFrom) +
          ' - ' +
          convertUtcDateToLocalTz(params.row.planTo)
        )
      },
    },
    {
      field: 'status',
      headerName: t('planReport.status'),
      align: 'center',
      sortable: true,
      visible: 'always',
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.status
        // return t(PLAN_STATUS_MAP[status]) // TODO BE return enum
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { progress } = params.row
        return t(PLAN_PROGRESS_MAP[progress])
      },
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
          convertUtcDateToLocalTz(planDate) +
          ' - ' +
          convertUtcDateToLocalTz(endDate)
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
        const { executeDate } = params.row
        return convertUtcDateToLocalTz(executeDate)
      },
    },
    {
      field: 'endDate',
      headerName: t('definePlan.endDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { endDate } = params.row
        return convertUtcDateToLocalTz(endDate)
      },
    },
    {
      field: 'status',
      headerName: t('definePlan.status'),
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return status
        // return t(PLAN_STATUS_MAP[status]) TODO BE change status to enum
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { status } = params.row
        return status
        // return t(PLAN_PROGRESS_MAP[planBom?.progres])
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
      field: 'planningQuantity',
      headerName: t('definePlan.quantity'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.planningQuantity
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('definePlan.actualQuantity'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.actualQuantity
      },
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
            convertUtcDateToLocalTz(planBom?.planFrom) +
            ' - ' +
            convertUtcDateToLocalTz(planBom?.planTo)
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
        return convertUtcDateToLocalTz(planBom?.executeDate)
      },
    },
    {
      field: 'endDate',
      headerName: t('definePlan.endDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return convertUtcDateToLocalTz(planBom?.endDate)
      },
    },
    {
      field: 'status',
      headerName: t('definePlan.status'),
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.status
        // return t(PLAN_STATUS_MAP[status])
      },
    },
    {
      field: 'progress',
      headerName: t('definePlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return t(PLAN_PROGRESS_MAP[planBom?.progres])
      },
    },
  ]

  useEffect(() => {
    refreshData()
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
      filter: convertFilterParams(
        {
          ...filters,
          moName: filters?.moName?.name,
          saleOrderIds: filters?.saleOrderIds?.id,
        },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
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

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('planReport.export')}
        onExport={(params) => {
          exportPlanReportApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(params?.map((x) => ({ id: x?.id }))),
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
          onSettingChange={setColumnsSettings}
          sort={sort}
          total={total}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: setFilters,
          }}
        />
      </Page>
    </>
  )
}

export default PlanReport
