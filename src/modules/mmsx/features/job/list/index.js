import React, { useEffect, useMemo, useState } from 'react'

import { Checkbox, FormControlLabel, IconButton } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  JOB_STATUS_LIST,
  WORK_TYPE,
  WORK_TYPE_MAP,
} from '~/modules/mmsx/constants'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'
import qs from '~/utils/qs'

import FilterForm from './filter-form'
import JobQuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.JOB.LIST.PATH,
    title: ROUTE.JOB.LIST.TITLE,
  },
]
const Job = () => {
  const {
    data: { jobLists, isLoading, total },
    actions,
  } = useJob()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const [checked, setChecked] = useState(true)
  const { id } = useParams()
  const location = useLocation()
  const { groupId } = qs.parse(location.search)
  const {
    data: { detailPlan },
    actions: createPlanAction,
  } = useCreatePlan()

  useEffect(() => {
    createPlanAction.getDetailPlan(groupId)
    return () => {
      createPlanAction.resetStateCreatePlan()
    }
  }, [id])
  const DEFAULT_FILTERS = {
    code: '',
    requestCode: '',
    requestName: '',
    serial: '',
    deviceName: '',
    priority: '',
    planDay: null,
    actualDay: null,
  }

  const DEFAULT_QUICK_FILTERS = {
    type: '',
    status: null,
    createdAt:
      groupId && !isEmpty(detailPlan)
        ? [new Date(detailPlan?.planFrom), new Date(detailPlan?.planTo)]
        : null,
    assign: '',
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
        field: 'requestCode',
        headerName: t('job.requestCode'),
        width: 150,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          const { type } = params.row
          if (type === WORK_TYPE.WARNING) {
            return params.row.warning?.code
          } else if (type === WORK_TYPE.SCHEDULE_MAINTAIN) {
            return params.row.maintenancePeriodWarning?.code
          } else if (type === WORK_TYPE.REQUEST) {
            return params.row.maintainRequest?.code
          } else if (type === WORK_TYPE.PERIOD_CHECK) {
            return params.row.checklistTemplate?.code
          } else if (type === WORK_TYPE.INSTALL) {
            return params.row.installationTemplate?.code
          }
        },
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
        field: 'requestName',
        headerName: t('job.requestName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          if (type === WORK_TYPE.WARNING || type === WORK_TYPE.PERIOD_CHECK) {
            return params.row.checklistTemplate?.name
          } else if (type === WORK_TYPE.SCHEDULE_MAINTAIN) {
            return params.row.maintenancePeriodWarning?.name
          } else if (type === WORK_TYPE.REQUEST) {
            return params.row.maintainRequest?.name
          } else if (type === WORK_TYPE.INSTALL) {
            return params.row.installationTemplate?.name
          }
        },
      },
      {
        field: 'performer',
        headerName: t('job.performer'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.assign?.fullname
        },
      },
      {
        field: 'serial',
        headerName: t('job.serial'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          if (type === WORK_TYPE.WARNING) {
            return params.row.warning?.deviceAssignment?.serial
          } else if (type === WORK_TYPE.SCHEDULE_MAINTAIN) {
            return params.row.maintenancePeriodWarning?.deviceAssignment?.serial
          } else if (type === WORK_TYPE.REQUEST) {
            return params.row.maintainRequest?.deviceAssignment?.serial
          } else if (type === WORK_TYPE.PERIOD_CHECK) {
            return params.row.checklistTemplate?.deviceAssignment?.serial
          } else if (type === WORK_TYPE.INSTALL) {
            return params.row.installationTemplate?.deviceAssignment?.serial
          }
        },
      },
      {
        field: 'deviceName',
        headerName: t('job.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          if (type === WORK_TYPE.WARNING) {
            return params.row.warning?.deviceAssignment?.device?.name
          } else if (type === WORK_TYPE.SCHEDULE_MAINTAIN) {
            return params.row.maintenancePeriodWarning?.deviceAssignment?.device
              ?.name
          } else if (type === WORK_TYPE.REQUEST) {
            return params.row.maintainRequest?.deviceAssignment?.device?.name
          } else if (type === WORK_TYPE.PERIOD_CHECK) {
            return params.row.checklistTemplate?.deviceAssignment?.device?.name
          } else if (type === WORK_TYPE.INSTALL) {
            return params.row.installationTemplate?.deviceAssignment?.device
              ?.name
          }
        },
      },
      {
        field: 'description',
        headerName: t('job.description'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          if (type === WORK_TYPE.WARNING) {
            return params.row.warning?.description
          } else if (type === WORK_TYPE.SCHEDULE_MAINTAIN) {
            return params.row.maintenancePeriodWarning?.description
          } else if (type === WORK_TYPE.REQUEST) {
            return params.row.maintainRequest?.description
          } else if (type === WORK_TYPE.PERIOD_CHECK) {
            return params.row.checklistTemplate?.description
          } else if (type === WORK_TYPE.INSTALL) {
            return params.row.installationTemplate?.description
          }
        },
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
        field: 'createdAt',
        headerName: t('job.createdAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params.row?.createdAt)
        },
      },
      {
        field: 'actions',
        headerName: t('job.action'),
        width: 150,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params.row
          const nonAssign =
            status === (JOB_STATUS_LIST[0].id || JOB_STATUS_LIST[2].id)
          return (
            <>
              <IconButton
                onClick={() =>
                  history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`))
                }
              >
                <Icon name="show" />
              </IconButton>

              {nonAssign && (
                <IconButton
                  onClick={() =>
                    history.push(ROUTE.JOB.ASSIGN.PATH.replace(':id', `${id}`))
                  }
                >
                  <Icon name="assign" />
                </IconButton>
              )}
            </>
          )
        },
      },
    ],
    [],
  )

  const stringify = JSON.parse(localStorage.getItem('userInfo'))
  const userId = stringify?.id

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
        },
        columns,
      ),
      sort: convertSortParams(sort),
      user: checked ? userId : null,
    }
    actions.searchJobList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, checked, quickFilters])

  const renderHeaderRight = () => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="myTask"
            defaultChecked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label={t('job.button.myTask')}
      />
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.job')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('maintainRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <JobQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        title={t('job.title')}
        columns={columns}
        rows={jobLists}
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

export default Job
