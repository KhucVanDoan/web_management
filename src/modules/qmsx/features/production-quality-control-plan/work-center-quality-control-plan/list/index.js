import { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import qs from 'query-string'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { WORK_CENTER_PLAN_STATUS, STAGE_OPTION } from '~/modules/qmsx/constants'
import useWorkCenterQualityControlPlan from '~/modules/qmsx/redux/hooks/useWorkCenterQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
]

const ENDPOINT_PATCH = {
  INPUT: 'input-schedules',
  OUTPUT: 'output-schedules',
}

const WorkCenterQualityControlPlanList = () => {
  const [keyword, setKeyword] = useState('')
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = qs.parse(location.search)

  const {
    data: { wcQcPlanList, total, isLoading },
    actions,
  } = useWorkCenterQualityControlPlan()

  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'planCode',
      headerName: t('workCenterQualityControlPlan.planCode'),
      width: 100,
      renderCell: (params) => {
        const { id } = params?.row
        return id
      },
    },
    {
      field: 'woCode',
      headerName: t('workCenterQualityControlPlan.woCode'),
      width: 100,
      renderCell: (params) => {
        const { workOrder } = params?.row
        return workOrder?.code
      },
    },
    {
      field: 'code',
      headerName: t('workCenterQualityControlPlan.code'),
      width: 100,
      renderCell: (params) => {
        const { workCenter } = params?.row
        return workCenter?.code
      },
    },
    {
      field: 'name',
      headerName: t('workCenterQualityControlPlan.name'),
      width: 150,
      renderCell: (params) => {
        const { workCenter } = params?.row
        return workCenter?.name
      },
    },
    {
      field: 'status',
      headerName: t('workCenterQualityControlPlan.status'),
      width: 100,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status
            options={WORK_CENTER_PLAN_STATUS}
            value={+status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('workCenterQualityControlPlan.action'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { id, currentUserCanEdit, workCenter, workOrder } = params?.row
        const canEdit = currentUserCanEdit
        const workCenterId = workCenter?.id
        const workOrderId = workOrder?.id
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  )}?productionQcPlanId=${
                    urlSearchParams?.productionQcPlanId
                  }&moPlanId=${urlSearchParams?.moPlanId}&qcStageId=${
                    urlSearchParams?.qcStageId
                  }&workCenterId=${workCenterId}&workOrderId=${workOrderId}`,
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    )}?productionQcPlanId=${
                      urlSearchParams?.productionQcPlanId
                    }&moPlanId=${urlSearchParams?.moPlanId}&qcStageId=${
                      urlSearchParams?.qcStageId
                    }&workCenterId=${workCenterId}&workOrderId=${workOrderId}`,
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ])

  useEffect(() => {
    refreshData()
  }, [keyword])

  const refreshData = () => {
    const params = {
      endpointPatch:
        urlSearchParams?.qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT
          ? ENDPOINT_PATCH.OUTPUT
          : ENDPOINT_PATCH.INPUT,
      id: urlSearchParams?.moPlanId,
      param: {
        keyword: keyword.trim(),
      },
    }
    actions.searchWorkCenterQualityControlPlan(params)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.workCenterQualityControlPlan')}
      renderSearchBox={true}
      onSearch={setKeyword}
      placeholder={t('workCenterQualityControlPlan.searchPlaceHolder')}
      loading={isLoading}
    >
      <DataTable
        title={t(
          'workCenterQualityControlPlan.workCenterQualityControlPlanList',
        )}
        rows={wcQcPlanList}
        columns={columns}
        total={total}
        hideSetting
        hideFooter
      />
    </Page>
  )
}
export default WorkCenterQualityControlPlanList
