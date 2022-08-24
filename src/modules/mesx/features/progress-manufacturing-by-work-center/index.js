import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useProgressManufacturingByWorkCenter from '~/modules/mesx/redux/hooks/useProgressByWorkCenter'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import ProgressManufacturingByWorkCenterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'statistical',
  },
  {
    route: ROUTE.PROGRESS_MANUFACTURING_BY_WORK_CENTER.PATH,
    title: ROUTE.PROGRESS_MANUFACTURING_BY_WORK_CENTER.TITLE,
  },
]

function ProgressManufacturingByWorkCenter() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

  const {
    keyword,
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
  } = useQueryState()

  const {
    data: { progressByWorkCenterList, isLoading, total },
    actions,
  } = useProgressManufacturingByWorkCenter()

  const columns = [
    {
      field: 'workCenterCode',
      headerName: t('progressManufacturingByWorkCenter.workCenterCode'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.workCenter?.code
      },
    },
    {
      field: 'workCenterName',
      headerName: t('progressManufacturingByWorkCenter.workCenterName'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.workCenter?.name
      },
    },
    {
      field: 'masterPlan',
      headerName: t('progressManufacturingByWorkCenter.masterPlan'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.masterPlan?.name
      },
    },
    {
      field: 'mo',
      headerName: t('progressManufacturingByWorkCenter.mo'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.mo?.name
      },
    },
    {
      field: 'workCenterPlan',
      headerName: t('progressManufacturingByWorkCenter.workCenterPlan'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
        const workCenterId = params.row?.workCenter?.id
        return (
          <Button
            variant="text"
            onClick={() =>
              history.replace({
                pathname: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
                state: { id, workCenterId },
              })
            }
            bold={false}
            size="small"
          >
            {t('progressManufacturingByWorkCenter.workCenterPlan')}
          </Button>
        )
      },
    },
    {
      field: 'producingStep',
      headerName: t('progressManufacturingByWorkCenter.producingStep'),
      width: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('progressManufacturingByWorkCenter.status'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row?.mo
        return (
          <Status
            options={PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'planDate',
      headerName: t('progressManufacturingByWorkCenter.planDate'),
      width: 200,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return (
          convertUtcDateToLocalTz(params?.row?.mo?.planFrom) +
          ' - ' +
          convertUtcDateToLocalTz(params?.row?.mo?.planTo)
        )
      },
    },
    {
      field: 'startDate',
      headerName: t('progressManufacturingByWorkCenter.startDate'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { planFrom } = params.row?.mo
        return convertUtcDateToLocalTz(planFrom)
      },
    },
    {
      field: 'endDate',
      headerName: t('progressManufacturingByWorkCenter.endDate'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { planTo } = params.row?.mo
        return convertUtcDateToLocalTz(planTo)
      },
    },
    {
      field: 'planQuantity',
      headerName: t('progressManufacturingByWorkCenter.planQuantity'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.mo?.planQuantity
      },
    },
    {
      field: 'actualQuantity',
      headerName: t('progressManufacturingByWorkCenter.actualQuantity'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.mo?.actualQuantity
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          workCenterIds: filters?.workCenterIds?.id,
          masterPlanIds: filters?.masterPlanIds?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchProgressManufacturingByWorkCenter(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <Button variant="outlined" disabled icon="download">
        {t('progressManufacturingByWorkCenter.export')}
      </Button>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.progressManufacturingByWorkCenter')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <ProgressManufacturingByWorkCenterForm setFilters={setFilters} />
      <DataTable
        title={t('progressManufacturingByWorkCenter.tableTitle')}
        rows={progressByWorkCenterList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        // filters={{
        //   form: <ProgressManufacturingByWorkCenterForm />,
        //   values: filters,
        //   defaultValue: DEFAULT_FILTERS,
        //   onApply: setFilters,
        //   // validationSchema: filterSchema(t),
        // }}
        hideSetting
      />
    </Page>
  )
}

export default ProgressManufacturingByWorkCenter
