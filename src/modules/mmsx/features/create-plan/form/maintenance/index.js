import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Status from '~/components/Status'
import {
  CREATE_PLAN_STATUS,
  JOB_STATUS_LIST,
  WORK_TYPE,
} from '~/modules/mmsx/constants'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

const Maintenance = ({ jobDraftLists, isUpdate, id, mode, status }) => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { jobDraftList, metaJobDraft },
    actions,
  } = useCreatePlan()
  useEffect(() => {
    if (!isEmpty(jobDraftLists)) {
      const params = {
        filter: convertFilterParams({
          isDraft: true,
          uuid: jobDraftLists?.uuid,
          type: WORK_TYPE.SCHEDULE_MAINTAIN,
        }),
      }
      actions?.getJobDraftList(params)
    } else if (isUpdate) {
      const params = {
        filter: convertFilterParams({
          planId: id,
          type: WORK_TYPE.SCHEDULE_MAINTAIN,
        }),
      }
      const paramsIsDraft = {
        filter: convertFilterParams({
          isDraft: true,
          planId: id,
          type: WORK_TYPE.PERIOD_CHECK,
        }),
      }
      actions?.getJobDraftList(
        status === CREATE_PLAN_STATUS.CONFIRMED ? params : paramsIsDraft,
      )
    }
  }, [jobDraftLists])
  useEffect(() => {
    if (isView) {
      const params = {
        filter: convertFilterParams({
          planId: id,
          type: WORK_TYPE.SCHEDULE_MAINTAIN,
        }),
      }
      const paramsIsDraft = {
        filter: convertFilterParams({
          isDraft: true,
          planId: id,
          type: WORK_TYPE.PERIOD_CHECK,
        }),
      }
      actions?.getJobDraftList(
        status === CREATE_PLAN_STATUS.CONFIRMED ? params : paramsIsDraft,
      )
    }
  }, [])
  const { page, pageSize, setPage, setPageSize, setSort } = useQueryState()
  const subColumns = [
    {
      field: 'index',
      headerName: '#',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('createPlanList.code'),
    },
    {
      field: 'deviceName',
      headerName: t('createPlanList.form.subTable.deviceName'),
      renderCell: (params) => {
        return params?.row?.deviceAssignmentId?.deviceId?.name
      },
    },
    {
      field: 'serial',
      headerName: t('createPlanList.form.subTable.serial'),
      renderCell: (params) => {
        return params?.row?.deviceAssignmentId?.serial
      },
    },
    {
      field: 'workCenterName',
      headerName: t('createPlanList.form.subTable.workCenterName'),
      renderCell: (params) => {
        return params?.row?.workcenter?.name
      },
    },
    {
      field: 'datePlan',
      headerName: t('createPlanList.form.subTable.datePlan'),
      renderCell: (params) => {
        return params?.row?.planFrom && params?.row?.planTo
          ? `${convertUtcDateToLocalTz(
              params?.row?.planFrom,
            )} - ${convertUtcDateToLocalTz(params?.row?.planTo)}`
          : ''
      },
    },
    {
      field: 'assignUser',
      headerName: t('createPlanList.form.subTable.assignUser'),
    },
    {
      field: 'dateReal',
      headerName: t('createPlanList.form.subTable.dateReal'),
    },
    {
      field: 'status',
      headerName: t('createPlanList.form.subTable.status'),
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={JOB_STATUS_LIST} value={status} variant="text" />
        )
      },
    },
    {
      field: 'action',
      headerName: t('createPlanList.form.subTable.action'),
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <IconButton
            onClick={() =>
              history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`))
            }
          >
            <Icon name="show" />
          </IconButton>
        )
      },
    },
  ]
  return (
    <DataTable
      columns={subColumns}
      rows={jobDraftList}
      striped={false}
      pageSize={pageSize}
      page={page}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onSortChange={setSort}
      total={metaJobDraft?.total}
      hideSetting
    />
  )
}

export default Maintenance
