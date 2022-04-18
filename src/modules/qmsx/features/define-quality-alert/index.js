import { useEffect, useState } from 'react'

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
  CREATE_OPTIONS_LIST,
  QUALITY_ALERT_STATUS,
  QUALITY_ALERT_STATUS_TO_CONFIRM,
  QUALITY_ALERT_STATUS_TO_DELETE,
  QUALITY_ALERT_STATUS_TO_EDIT,
  STAGE_OPTION,
  STAGE_OPTION_MAP,
  TYPE_QC_OPTIONS,
} from '~/modules/qmsx/constants'
import useDefineQualityAlert from '~/modules/qmsx/redux/hooks/useDefineQualityAlert'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH,
    title: ROUTE.DEFINE_QUALITY_ALERT.LIST.TITLE,
  },
]

function DefineQualityAlert() {
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
    data: { qualityAlertList, total, isLoading },
    actions,
  } = useDefineQualityAlert()

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
      headerName: t('defineQualityAlert.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineQualityAlert.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'stage',
      headerName: t('defineQualityAlert.stageQc'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { stage } = params?.row
        return t(STAGE_OPTION_MAP[+stage])
      },
    },
    {
      field: 'createdBy',
      headerName: t('common.createdBy'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { username } = params?.row
        return username
      },
    },
    {
      field: 'status',
      headerName: t('defineQualityAlert.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row

        return (
          <Status
            options={QUALITY_ALERT_STATUS}
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
        const { id, status, stage } = params?.row
        const canConfirm = QUALITY_ALERT_STATUS_TO_CONFIRM.includes(+status)
        const canDelete = QUALITY_ALERT_STATUS_TO_DELETE.includes(+status)
        const canEdit = QUALITY_ALERT_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton onClick={() => onClickViewDetail(stage, id)}>
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton onClick={() => onClickEdit(stage, id)}>
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

  const onClickViewDetail = (stage, id) => {
    switch (+stage) {
      case STAGE_OPTION.PRODUCTION_INPUT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_INPUT.PATH.replace(
            ':id',
            id,
          ),
        )
      case STAGE_OPTION.PRODUCTION_OUTPUT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_OUTPUT.PATH.replace(
            ':id',
            id,
          ),
        )
      case STAGE_OPTION.PO_IMPORT:
      case STAGE_OPTION.PRO_IMPORT:
      case STAGE_OPTION.IMO_IMPORT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.DETAIL_INPUT.PATH.replace(':id', id),
        )
      case STAGE_OPTION.PRO_EXPORT:
      case STAGE_OPTION.SO_EXPORT:
      case STAGE_OPTION.EXO_EXPORT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.DETAIL_OUTPUT.PATH.replace(':id', id),
        )
      default:
        break
    }
  }

  const onClickEdit = (stage, id) => {
    switch (+stage) {
      case STAGE_OPTION.PRODUCTION_INPUT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.PATH.replace(
            ':id',
            id,
          ),
        )
      case STAGE_OPTION.PRODUCTION_OUTPUT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_OUTPUT.PATH.replace(
            ':id',
            id,
          ),
        )
      case STAGE_OPTION.PO_IMPORT:
      case STAGE_OPTION.PRO_IMPORT:
      case STAGE_OPTION.IMO_IMPORT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.EDIT_INPUT.PATH.replace(':id', id),
        )
      case STAGE_OPTION.PRO_EXPORT:
      case STAGE_OPTION.SO_EXPORT:
      case STAGE_OPTION.EXO_EXPORT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.EDIT_OUTPUT.PATH.replace(':id', id),
        )
      default:
        break
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
    actions.searchQualityAlert(params)
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
    actions.deleteQualityAlert(params, () => {
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
    actions.confirmQualityAlert(params, () => {
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
        <Dropdown
          sx={{ ml: 4 / 3 }}
          icon="add"
          title={t('common.create')}
          options={CREATE_OPTIONS_LIST}
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
          ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.PATH,
        )
      case TYPE_QC_OPTIONS.PRODUCTION_OUTPUT:
        return history.push(
          ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_OUTPUT.PATH,
        )
      case TYPE_QC_OPTIONS.INPUT:
        return history.push(ROUTE.DEFINE_QUALITY_ALERT.CREATE_INPUT.PATH)
      case TYPE_QC_OPTIONS.OUTPUT:
        return history.push(ROUTE.DEFINE_QUALITY_ALERT.CREATE_OUTPUT.PATH)
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineQualityAlert')}
      onSearch={setKeyword}
      placeholder={t('defineQualityAlert.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineQualityAlert.qualityAlertList')}
        rows={qualityAlertList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={modalDelete.isOpenDeleteModal}
        title={t('defineQualityAlert.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineQualityAlert.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('defineQualityAlert.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('defineQualityAlert.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default DefineQualityAlert
