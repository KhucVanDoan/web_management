import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  INPUT_QC_PLAN_STATUS,
  INPUT_QC_PLAN_STATUS_TO_DELETE,
  INPUT_QC_PLAN_STATUS_TO_CONFIRM,
  INPUT_QC_PLAN_STATUS_TO_EDIT,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useInputQualityControlPlan from '~/modules/qmsx/redux/hooks/useInputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
]

function InputQualityControlPlan() {
  const { t } = useTranslation('qmsx')
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
  } = useQueryState()
  const {
    data: { inputQcPlanList, total, isLoading },
    actions,
  } = useInputQualityControlPlan()

  const [modalDelete, setDeleteModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const [modalConfirm, setConfirmModal] = useState({
    id: null,
    isOpenConfirmModal: false,
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      sortable: false,
    },
    {
      field: 'code',
      headerName: t('inputQualityControlPlan.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('inputQualityControlPlan.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'qcStageName',
      headerName: t('inputQualityControlPlan.stageQc'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { qcStageId } = params?.row
        return t(STAGE_OPTION_MAP[+qcStageId])
      },
    },
    {
      field: 'orderName',
      headerName: t('inputQualityControlPlan.orderName'),
      width: 200,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('inputQualityControlPlan.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status
            options={INPUT_QC_PLAN_STATUS}
            value={+status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params?.row
        const canConfirm = INPUT_QC_PLAN_STATUS_TO_CONFIRM.includes(+status)
        const canDelete = INPUT_QC_PLAN_STATUS_TO_DELETE.includes(+status)
        const canEdit = INPUT_QC_PLAN_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.INPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.INPUT_QUALITY_CONTROL_PLAN.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {canDelete && (
              <IconButton onClick={() => onClickDelete(id)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton onClick={() => onClickConfirm(id)}>
                <Icon name="tick" />
              </IconButton>
            )}
          </div>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters),
      sort: convertSortParams(sort),
    }
    actions.searchInputQcPlan(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  // Handle: Onclick DELETE
  const onClickDelete = (id) => {
    setDeleteModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modalDelete.id,
    }
    actions.deleteInputQcPlan(params, () => {
      setDeleteModal({ ...modalDelete, isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setDeleteModal({ isOpenDeleteModal: false, id: null })
  }

  // Handle: Onclick CONFIRM
  const onClickConfirm = (id) => {
    setConfirmModal({ id, isOpenConfirmModal: true })
  }

  const onSubmitConfirm = () => {
    const params = {
      id: modalConfirm.id,
    }
    actions.confirmInputQcPlan(params, () => {
      setConfirmModal({ ...modalConfirm, isOpenConfirmModal: false })
      refreshData()
    })
  }

  const onCloseConfirmModal = () => {
    setConfirmModal({ isOpenConfirmModal: false, id: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download">
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() =>
            history.push(ROUTE.INPUT_QUALITY_CONTROL_PLAN.CREATE.PATH)
          }
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inputQualityControlPlan')}
      onSearch={setKeyword}
      placeholder={t('inputQualityControlPlan.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('inputQualityControlPlan.inputQualityControlPlanList')}
        rows={inputQcPlanList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modalDelete.isOpenDeleteModal}
        title={t('inputQualityControlPlan.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inputQualityControlPlan.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('inputQualityControlPlan.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('inputQualityControlPlan.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default InputQualityControlPlan
