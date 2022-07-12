import React, { useEffect, useMemo } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { JOB_STATUS_LIST, WORK_TYPE_MAP } from '~/modules/mmsx/constants'
import useMaintainanceProgress from '~/modules/mmsx/redux/hooks/useMaintainanceProgress'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import MaintainanceProgressQuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.MAINTAINANCE_PROGRESS.LIST.PATH,
    title: ROUTE.MAINTAINANCE_PROGRESS.LIST.TITLE,
  },
]
const MaintainanceProgress = () => {
  const {
    data: { progressReport, isLoading, total },
    actions,
  } = useMaintainanceProgress()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    serial: '',
    deviceName: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    type: '',
    status: null,
    createdAt: null,
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
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('job.workCode'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'workType',
        headerName: t('job.workType'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          return t(WORK_TYPE_MAP[type])
        },
      },
      {
        field: 'serial',
        headerName: t('job.serial'),
        width: 150,
        sortable: true,
      },
      {
        field: 'deviceName',
        headerName: t('job.deviceName'),
        width: 150,
        sortable: true,
      },
      {
        field: 'description',
        headerName: t('job.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'status',
        headerName: t('job.status'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status options={JOB_STATUS_LIST} value={status} variant="text" />
          )
        },
      },
      {
        field: 'planDay',
        headerName: t('job.planDay'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return params.row.planFrom && params.row.planTo
            ? convertUtcDateToLocalTz(params.row.planFrom) +
                ' - ' +
                convertUtcDateToLocalTz(params.row.planTo)
            : ''
        },
      },
      {
        field: 'actualDay',
        headerName: t('job.actualDay'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return params.row.executionDateFrom && params.row.executionDateTo
            ? convertUtcDateToLocalTz(params.row.executionDateFrom) +
                ' - ' +
                convertUtcDateToLocalTz(params.row.executionDateTo)
            : ''
        },
      },
      {
        field: 'actions',
        headerName: t('job.action'),
        width: 150,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id } = params.row

          return (
            <>
              <IconButton
                onClick={() =>
                  history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`))
                }
              >
                <Icon name="show" />
              </IconButton>
            </>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams({ ...filters, ...quickFilters }, columns),
      sort: convertSortParams(sort),
    }
    actions.searchMaintainanceProgress(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintainanceProgress')}
      onSearch={setKeyword}
      placeholder={t('maintainRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <MaintainanceProgressQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        columns={columns}
        rows={progressReport}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default MaintainanceProgress
