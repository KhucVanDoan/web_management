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
  OUTPUT_QC_PLAN_STATUS,
  OUTPUT_QC_PLAN_STATUS_TO_DELETE,
  OUTPUT_QC_PLAN_STATUS_TO_CONFIRM,
  OUTPUT_QC_PLAN_STATUS_TO_EDIT,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useOutputQualityControlPlan from '~/modules/qmsx/redux/hooks/useOutputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
]

function OutputQualityControlPlan() {
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
    data: { outputQcPlanList, total, isLoading },
    actions,
  } = useOutputQualityControlPlan()

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
      headerName: t('outputQualityControlPlan.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('outputQualityControlPlan.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'qcStageName',
      headerName: t('outputQualityControlPlan.stageQc'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { qcStageId } = params?.row
        return t(STAGE_OPTION_MAP[+qcStageId])
      },
    },
    {
      field: 'orderName',
      headerName: t('outputQualityControlPlan.orderName'),
      width: 200,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('outputQualityControlPlan.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status
            options={OUTPUT_QC_PLAN_STATUS}
            value={+status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params?.row
        const canConfirm = OUTPUT_QC_PLAN_STATUS_TO_CONFIRM.includes(+status)
        const canDelete = OUTPUT_QC_PLAN_STATUS_TO_DELETE.includes(+status)
        const canEdit = OUTPUT_QC_PLAN_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH.replace(
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
                    ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.EDIT.PATH.replace(
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
    actions.searchOutputQcPlan(params)
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
    actions.deleteOutputQcPlan(params, () => {
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
    actions.confirmOutputQcPlan(params, () => {
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
        <Button
          onClick={() =>
            history.push(ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.CREATE.PATH)
          }
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.outputQualityControlPlan')}
      onSearch={setKeyword}
      placeholder={t('outputQualityControlPlan.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('outputQualityControlPlan.outputQualityControlPlanList')}
        rows={outputQcPlanList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modalDelete.isOpenDeleteModal}
        title={t('outputQualityControlPlan.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('outputQualityControlPlan.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('outputQualityControlPlan.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('outputQualityControlPlan.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default OutputQualityControlPlan
