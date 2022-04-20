import { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ERROR_REPORT_STATUS,
  ERROR_REPORT_STATUS_TO_CONFIRM,
  ERROR_REPORT_STATUS_TO_REJECT,
  STAGE_OPTION,
} from '~/modules/qmsx/constants'
import useDefineErrorReport from '~/modules/qmsx/redux/hooks/useDefineErrorReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'
import qs from '~/utils/qs'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_ERROR_REPORT.LIST.PATH,
    title: ROUTE.DEFINE_ERROR_REPORT.LIST.TITLE,
  },
]

const ENDPOINT_PATCH = {
  IOQC: 'ioqc',
  PRODUCING_STEP: 'producing-steps',
}

function DefineErrorReport() {
  const { t } = useTranslation('qmsx')
  const history = useHistory()
  const location = useLocation()

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
    data: { errorReportList, total, isLoading },
    actions,
  } = useDefineErrorReport()

  const [modalConfirm, setModalConfirm] = useState({
    id: null,
    qcStageId: null,
    isOpenConfirmModal: false,
  })

  const [modalReject, setModalReject] = useState({
    id: null,
    qcStageId: null,
    isOpenRejectModal: false,
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
      headerName: t('defineErrorReport.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineErrorReport.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'qcStageName',
      headerName: t('defineErrorReport.qcStages'),
      width: 150,
      sortable: true,
    },
    {
      field: 'orderName',
      headerName: t('defineErrorReport.orderName'),
      width: 200,
      sortable: true,
    },
    {
      field: 'transactionHistoryCode',
      headerName: t('defineErrorReport.transactionHistoryCode'),
      width: 150,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('defineErrorReport.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'createdBy',
      headerName: t('defineErrorReport.createdBy'),
      width: 150,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('defineErrorReport.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row

        return (
          <Status
            options={ERROR_REPORT_STATUS}
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
        const { id, status, qcStageId } = params?.row
        const canConfirm = ERROR_REPORT_STATUS_TO_CONFIRM.includes(+status)
        const canReject = ERROR_REPORT_STATUS_TO_REJECT.includes(+status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_ERROR_REPORT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canConfirm && (
              <IconButton onClick={() => onClickConfirm(id, qcStageId)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {canReject && (
              <IconButton onClick={() => onClickReject(id, qcStageId)}>
                <Icon name="remove" />
              </IconButton>
            )}
          </div>
        )
      },
    },
  ]

  const locationSearch = location.search

  useEffect(() => {
    const { errorReportId } = qs.parse(locationSearch)

    if (isNil(errorReportId)) refreshData()
    // if there is only 1 value on the query params it will be converted to an object instead of an array
    // must be transformed into an array
    else
      searchByIds(
        Array.isArray(errorReportId) ? errorReportId : [errorReportId],
      )
  }, [locationSearch, page, pageSize, filters, sort, keyword])

  const searchByIds = (ids) => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...{ id: JSON.stringify(ids) },
        },
        [{ field: 'createdAt', filterFormat: 'date' }, { field: 'id' }],
      ),
      sort: convertSortParams(sort),
    }

    actions.searchErrorReport(params)
  }

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchErrorReport(params)
  }

  //@Handle: confirm record
  const onClickConfirm = (id, qcStageId) => {
    setModalConfirm({ id, qcStageId, isOpenConfirmModal: true })
  }

  const onSubmitConfirm = () => {
    if (
      modalConfirm.qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT ||
      modalConfirm.qcStageId === STAGE_OPTION.PRODUCTION_INPUT
    ) {
      const params = {
        id: modalConfirm.id,
        endPointPatch: ENDPOINT_PATCH.PRODUCING_STEP,
      }
      actions.confirmErrorReport(params, () => {
        onCloseConfirmModal()
        refreshData()
      })
    } else {
      const params = {
        id: modalConfirm.id,
        endPointPatch: ENDPOINT_PATCH.IOQC,
      }
      actions.confirmErrorReport(params, () => {
        onCloseConfirmModal()
        refreshData()
      })
    }
  }

  const onCloseConfirmModal = () => {
    setModalConfirm({ isOpenConfirmModal: false, id: null, qcStageId: null })
  }

  //@Handle: reject record
  const onClickReject = (id, qcStageId) => {
    setModalReject({ id, qcStageId, isOpenRejectModal: true })
  }

  const onCloseRejectModal = () => {
    setModalReject({ isOpenRejectModal: false, id: null, qcStageId: null })
  }

  const onSubmitReject = () => {
    if (
      modalConfirm.qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT ||
      modalConfirm.qcStageId === STAGE_OPTION.PRODUCTION_INPUT
    ) {
      const params = {
        id: modalReject.id,
        endPointPatch: ENDPOINT_PATCH.PRODUCING_STEP,
      }
      actions.rejectErrorReport(params, () => {
        onCloseRejectModal()
        refreshData()
      })
    } else {
      const params = {
        id: modalReject.id,
        endPointPatch: ENDPOINT_PATCH.IOQC,
      }
      actions.rejectErrorReport(params, () => {
        onCloseRejectModal()
        refreshData()
      })
    }
  }

  const renderHeaderRight = () => {
    return (
      <Button variant="outlined" icon="download">
        {t('menu.exportData')}
      </Button>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineErrorReport')}
      onSearch={setKeyword}
      placeholder={t('defineErrorReport.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineErrorReport.errorReportList')}
        rows={errorReportList}
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
        open={modalConfirm.isOpenConfirmModal}
        title={t('defineErrorReport.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('defineErrorReport.modalConfirmContent')}
      </Dialog>
      <Dialog
        open={modalReject.isOpenRejectModal}
        title={t('defineErrorReport.modalRejectTitle')}
        onCancel={onCloseRejectModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitReject}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('defineErrorReport.modalRejectContent')}
      </Dialog>
    </Page>
  )
}

export default DefineErrorReport
