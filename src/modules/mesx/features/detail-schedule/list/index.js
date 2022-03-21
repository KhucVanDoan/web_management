import React, { useState, useMemo, useEffect } from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import {
  DETAIL_SCHEDULE_STATUS_TO_EDIT,
  DETAIL_SCHEDULE_STATUS_TO_CONFIRM,
  DETAIL_SCHEDULE_STATUS_OPTIONS,
  DETAIL_SCHEDULE_STATUS_MAP,
  DETAIL_SCHEDULE_STATUS,
} from '~/modules/mesx/constants'
import { useDetailSchedule } from '~/modules/mesx/redux/hooks/useDetailSchedule'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.DETAIL_SCHEDULE.LIST.PATH,
    title: ROUTE.DETAIL_SCHEDULE.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  code: '',
  woCode: '',
  workCenters: '',
  quantity: '',
  actualQuantity: '',
  unit: '',
  status: '',
}

const DetailSchedule = () => {
  const {
    data: { isLoading, total, detailScheduleList },
    actions,
  } = useDetailSchedule()
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(null)
  const [keyword, setKeyword] = useState('')
  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 60,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('detailSchedule.code'),
      width: 150,
      fixed: true,
      sortable: true,
      renderCell: (params) => {
        const { id } = params.row
        return id
      },
    },
    {
      field: 'woCode',
      headerName: t('detailSchedule.woCode'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return row?.workOrder?.code
      },
    },
    {
      field: 'workCenter',
      headerName: t('detailSchedule.workCenter'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const workCenterName = params.row.workCenters
          ?.map((workCenter) => workCenter?.name)
          ?.join(' / ')
        return workCenterName
      },
    },
    {
      field: 'planQuantity',
      headerName: t('detailSchedule.planQuantity'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.quantity
      },
    },
    {
      field: 'productionQuantity',
      headerName: t('detailSchedule.productionQuantity'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.actualQuantity
      },
    },
    {
      field: 'unit',
      headerName: t('detailSchedule.unit'),
      width: 100,
      renderCell: (params) => {
        return params?.row?.item?.itemUnitName
      },
    },
    {
      field: 'status',
      headerName: t('detailSchedule.status'),
      width: 100,
      sortable: true,
      filterOptions: {
        options: DETAIL_SCHEDULE_STATUS_OPTIONS,
        getOptionValue: (option) => option?.id?.toString(),
        getOptionLabel: (option) => t(option?.text),
      },
      renderCell: (params) => {
        const { status } = params.row
        return t(DETAIL_SCHEDULE_STATUS_MAP[status])
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { status } = params.row
        const { id } = params?.row?.workOrder
        const canEdit = DETAIL_SCHEDULE_STATUS_TO_EDIT.includes(status)
        const canConfirm = DETAIL_SCHEDULE_STATUS_TO_CONFIRM.includes(status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DETAIL_SCHEDULE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DETAIL_SCHEDULE.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
                  setIsOpenConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
          </div>
        )
      },
    },
    {
      field: 'workCenterPlan',
      headerName: t('detailSchedule.workCenterPlan'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { status } = params.row
        const canGoToWorkCenterPlan =
          status === DETAIL_SCHEDULE_STATUS.CONFIRMED
        return (
          canGoToWorkCenterPlan && (
            <Button
              variant="text"
              size="small"
              bold={false}
              component={Link}
              //to={ROUTE.WORK_CENTER_PLAN.LIST_ALL.PATH + `${workOrder?.id}`}
              // @TODO: <doan.kv> bỏ comment dòng bên trên
            >
              {t('detailSchedule.workCenterPlan')}
            </Button>
          )
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchDetailSchedule(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const submitConfirm = () => {
    actions.approveDetailScheduleById(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
    setTempItem(null)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('detailSchedule.title')}
      onSearch={setKeyword}
      placeholder={t('detailSchedule.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        rows={detailScheduleList?.items}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeSort={setSort}
        total={total}
        title={t('general:dataTable.title')}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultvalue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
      />

      <Dialog
        open={isOpenConfirmModal}
        title={t('common.notify')}
        maxWidth="sm"
        onSubmit={submitConfirm}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('common.no')}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('common.confirmMessage.confirm')}
        <LV
          label={t('detailSchedule.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('detailSchedule.woCode')}
          value={tempItem?.woCode}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}
export default DetailSchedule
