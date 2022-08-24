import { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useWorkCenterPlan from '~/modules/mesx/redux/hooks/useWorkCenterPlan'
import { exportWorkCenterPlanApi } from '~/modules/mesx/redux/sagas/work-center-plan/import-export-work-center-plan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filter'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.WORK_CENTER_PLAN.LIST.PATH,
    title: ROUTE.WORK_CENTER_PLAN.LIST.TITLE,
  },
]
const DEFAULT_FILTERS = {
  mpCode: '',
  moCode: '',
  woCode: '',
  itemName: '',
  producingStepName: '',
  wcName: '',
}
const WorkCenterPlanList = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

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
    data: { wcpList, isLoading },
    actions,
  } = useWorkCenterPlan()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'mpCode',
      headerName: t('workCenterPlan.planCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'moCode',
      headerName: t('workCenterPlan.moCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'woCode',
      headerName: t('workCenterPlan.woCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'itemName',
      headerName: t('workCenterPlan.itemName'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'producingStepName',
      headerName: t('workCenterPlan.producingStepName'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'wcName',
      headerName: t('workCenterPlan.name'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.workCenter?.name
      },
    },
    {
      field: 'action',
      headerName: t('workCenterPlan.action'),
      width: 100,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        const workCenterId = params.row?.workCenter?.id

        return (
          <div>
            <IconButton
              onClick={() =>
                history.replace({
                  pathname: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
                  state: { id, workCenterId },
                })
              }
            >
              <Icon name="show" />
            </IconButton>
          </div>
        )
      },
    },
  ])
  useEffect(() => {
    refreshData()
  }, [page, pageSize, keyword, filters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, moCode: filters?.moCode?.code },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWorkCenterPlan({ params })
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('workCenterPlan.import')}
        onExport={() => {
          exportWorkCenterPlanApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
            keyword: keyword.trim(),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
            sort: convertSortParams(sort),
          })
        }}
        disabled
      />
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.workCenterPlan')}
      onSearch={setKeyword}
      placeholder={t('workCenterPlan.searchPlaceHolder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('workCenterPlan.title')}
        rows={wcpList?.items}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={wcpList?.meta?.total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      ></DataTable>
    </Page>
  )
}
export default WorkCenterPlanList
