import React, { useState, useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CREATE_PLAN_STATUS,
  CREATE_PLAN_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import JobQuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.CREATE_PLAN.LIST.PATH,
    title: ROUTE.CREATE_PLAN.LIST.TITLE,
  },
]
function CreatePlan() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const {
    data: { createPlanList, meta, isLoading },
    actions,
  } = useCreatePlan()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpeRejectedmModal, setIsOpeRejectedmModal] = useState(false)
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    status: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    planForm: '',
    planTo: '',
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
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('createPlanList.table.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('createPlanList.table.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'date',
        headerName: t('createPlanList.table.time'),
        width: 250,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return `${convertUtcDateToLocalTz(
            params?.row?.planFrom,
          )} - ${convertUtcDateToLocalTz(params?.row?.planTo)}`
        },
      },
      {
        field: 'jobPlanTotal',
        headerName: t('createPlanList.table.planJobQuantity'),
        width: 150,
        sortable: true,
      },
      {
        field: 'jobExecutionTotal',
        headerName: t('createPlanList.table.actualJobQuantity'),
        width: 150,
        sortable: true,
      },

      {
        field: 'status',
        headerName: t('createPlanList.table.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={CREATE_PLAN_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('common.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { _id, status } = params?.row
          const isPending = status === CREATE_PLAN_STATUS.PENDING
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.CREATE_PLAN.DETAIL.PATH.replace(':id', `${_id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.CREATE_PLAN.EDIT.PATH.replace(':id', `${_id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickRejected(params.row)}>
                  <Icon name="remove" />
                </IconButton>
              )}
            </div>
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
      filter: convertFilterParams({ ...filters, ...quickFilters }, [
        ...columns,
        { field: 'time', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.getCreatePlanList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteMakePlan(tempItem?._id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmPlan(tempItem?._id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpeRejectedmModal(true)
  }
  const onSubmitRejected = (values) => {
    const params = {
      id: tempItem?._id,
      reason: values?.comment,
    }
    actions.rejectPlan(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpeRejectedmModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.CREATE_PLAN.GANNT_CHART.PATH)}
          icon="ganttChart"
          sx={{ ml: 4 / 3 }}
          variant="outlined"
        >
          {t('jobList.button.ganttChart')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.CREATE_PLAN.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('createPlanList.title')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <JobQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        columns={columns}
        rows={createPlanList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={meta?.total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('common.modalDelete.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('common.modalDelete.description')}
        <LV
          label={t('createPlanList.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('createPlanList.table.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('createPlanList.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('createPlanList.table.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>

      <Dialog
        open={isOpeRejectedmModal}
        onClose={() => setIsOpeRejectedmModal(false)}
        onCancel={() => setIsOpeRejectedmModal(false)}
        title={t('general:common.notify')}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        formikProps={{
          initialValues: { comment: '' },
          validationSchema: Yup.object().shape({
            comment: Yup.string().required(t('general:form.required')),
          }),
          onSubmit: onSubmitRejected,
          enableReinitialize: true,
        }}
      >
        {t('common.modalDelete.description')}
        <LV
          label={t('warningList.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warningList.table.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />

        <Field.TextField
          name="comment"
          label={t('common.modalConfirm.enterComment')}
          placeholder={t('common.modalConfirm.enterComment')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          required
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
      </Dialog>
    </Page>
  )
}

export default CreatePlan
