import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useMaintainanceProgress from '~/modules/mmsx/redux/hooks/useMaintainanceProgress'
import { exportMaintainanceProgressApi } from '~/modules/mmsx/redux/sagas/maintainance-progress/import-export'
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
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    fullName: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    userId: '',
    date: null,
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

  const columns = [
    {
      field: 'userCode',
      headerName: t('maintainanceProgress.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'fullName',
      headerName: t('maintainanceProgress.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'userRole',
      headerName: t('maintainanceProgress.role'),
      width: 150,
    },
    {
      field: 'startWork',
      headerName: t('maintainanceProgress.startDay'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.startWork)
      },
    },
    {
      field: 'totalQuantity',
      headerName: t('maintainanceProgress.assignedWork'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'successQuantity',
      headerName: t('maintainanceProgress.completedWork'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'executeQuantity',
      headerName: t('maintainanceProgress.doingWork'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'lateQuantity',
      headerName: t('maintainanceProgress.outOfDateWork'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'waitQuantity',
      headerName: t('maintainanceProgress.pendingWork'),
      width: 120,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'actions',
      headerName: t('maintainanceProgress.actions'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { userId } = params.row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MAINTAINANCE_PROGRESS.DETAIL.PATH.replace(
                    ':id',
                    `${userId}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
          </>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, ...quickFilters, userId: quickFilters?.userId?.id },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchMaintainanceProgress(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])
  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('common.exportFile')}
        onExport={() => {
          exportMaintainanceProgressApi({
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
      title={t('menu.maintainanceProgress')}
      renderHeaderRight={renderHeaderRight}
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
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
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
