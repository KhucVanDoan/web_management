import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  PRODUCTION_QC_PLAN_STATUS,
  PRODUCTION_QC_PLAN_STATUS_OPTIONS,
  PRODUCTION_QC_PLAN_STATUS_TO_DELETE,
  PRODUCTION_QC_PLAN_STATUS_TO_CONFIRM,
  PRODUCTION_QC_PLAN_STATUS_TO_EDIT,
  STAGE_OPTION_MAP,
  CREATE_OPTIONS_PRODUCTION_LIST,
  TYPE_QC_OPTIONS,
  STAGE_OPTION,
} from '~/modules/qmsx/constants'
import useProductionQualityControlPlan from '~/modules/qmsx/redux/hooks/useProductionQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
]

const HAS_MATERIAL = {
  FALSE: '0',
  TRUE: '1',
}

function ProductionQualityControlPlan() {
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
    data: { productionQcPlanList, total, isLoading },
    actions,
  } = useProductionQualityControlPlan()

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
      headerName: t('productionQualityControlPlan.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('productionQualityControlPlan.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'qcStageName',
      headerName: t('productionQualityControlPlan.stageQc'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { qcStageId } = params?.row
        return t(STAGE_OPTION_MAP[+qcStageId])
      },
    },
    {
      field: 'orderName',
      headerName: t('productionQualityControlPlan.moName'),
      width: 200,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('productionQualityControlPlan.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status
            options={PRODUCTION_QC_PLAN_STATUS}
            value={+status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'workCenterPlan',
      headerName: t('productionQualityControlPlan.workCenterPlan'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const {
          moPlanId,
          id: productionQcPlanId,
          qcStageId,
          hasMaterials,
          status,
        } = params?.row
        const canGoToWorkCenterQcPlan =
          (qcStageId === STAGE_OPTION.PRODUCTION_INPUT &&
            hasMaterials === HAS_MATERIAL.TRUE &&
            +status !== PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING) ||
          (qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT &&
            +status !== PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING)
        return canGoToWorkCenterQcPlan ? (
          <Button
            variant="text"
            onClick={() =>
              history.push(
                `${ROUTE.WORK_CENTER_QUALITY_CONTROL_PLAN.LIST.PATH}?productionQcPlanId=${productionQcPlanId}&moPlanId=${moPlanId}&qcStageId=${qcStageId}`,
              )
            }
            bold={false}
            size="small"
          >
            {t('productionQualityControlPlan.workCenterPlan')}
          </Button>
        ) : (
          ''
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
        const { id, status, qcStageId } = params?.row
        const canConfirm = PRODUCTION_QC_PLAN_STATUS_TO_CONFIRM.includes(
          +status,
        )
        const canDelete = PRODUCTION_QC_PLAN_STATUS_TO_DELETE.includes(+status)
        const canEdit = PRODUCTION_QC_PLAN_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton onClick={() => handleViewDetail(id, qcStageId)}>
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton onClick={() => handleEdit(id, qcStageId)}>
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

  const handleEdit = (id, qcStageId) => {
    if (qcStageId === STAGE_OPTION.PRODUCTION_INPUT) {
      history.push(
        ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT.PATH.replace(
          ':id',
          `${id}`,
        ),
      )
    } else if (qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT) {
      history.push(
        ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_OUTPUT.PATH.replace(
          ':id',
          `${id}`,
        ),
      )
    }
  }

  const handleViewDetail = (id, qcStageId) => {
    if (qcStageId === STAGE_OPTION.PRODUCTION_INPUT) {
      history.push(
        ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_INPUT.PATH.replace(
          ':id',
          `${id}`,
        ),
      )
    } else if (qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT) {
      history.push(
        ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_OUTPUT.PATH.replace(
          ':id',
          `${id}`,
        ),
      )
    }
  }

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters),
      sort: convertSortParams(sort),
    }
    actions.searchProductionQcPlan(params)
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
    actions.deleteProductionQcPlan(params, () => {
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
    actions.confirmProductionQcPlan(params, () => {
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
        <Dropdown
          sx={{ ml: 4 / 3 }}
          icon="add"
          title={t('general:common.create')}
          options={CREATE_OPTIONS_PRODUCTION_LIST}
          handleMenuItemClick={(option) => handleMenuItemClick(option)}
          getOptionLabel={(option) => t(option.text) || ''}
        />
      </>
    )
  }

  const handleMenuItemClick = (option) => {
    switch (option?.value) {
      case TYPE_QC_OPTIONS.PRODUCTION_INPUT:
        return history.push(
          ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT.PATH,
        )
      case TYPE_QC_OPTIONS.PRODUCTION_OUTPUT:
        return history.push(
          ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_OUTPUT.PATH,
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.productionQualityControlPlan')}
      onSearch={setKeyword}
      placeholder={t('productionQualityControlPlan.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t(
          'productionQualityControlPlan.productionQualityControlPlanList',
        )}
        rows={productionQcPlanList}
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
        title={t('productionQualityControlPlan.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('productionQualityControlPlan.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('productionQualityControlPlan.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('productionQualityControlPlan.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default ProductionQualityControlPlan
