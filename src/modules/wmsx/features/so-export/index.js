import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS_SO_EXPORT,
  ORDER_STATUS_SO_EXPORT_OPTIONS,
} from '~/modules/wmsx/constants'
import useSOExport from '~/modules/wmsx/redux/hooks/useSOExport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.ORDER_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.SO_EXPORT.LIST.PATH,
    title: ROUTE.SO_EXPORT.LIST.TITLE,
  },
]
function SOExport() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [confirmModal, setConfirmModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
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
  } = useQueryState()

  const {
    data: { isLoading, soExportList, total },
    actions,
  } = useSOExport()

  const columns = [
    {
      field: 'code',
      headerName: t('soExport.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('soExport.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('soExport.description'),
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: t('soExport.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('soExport.deadline'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { deadline } = params?.row
        return convertUtcDateTimeToLocalTz(deadline)
      },
    },
    {
      field: 'status',
      headerName: t('soExport.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={ORDER_STATUS_SO_EXPORT_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      fixed: true,
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id, status } = row
        const isEdit =
          status === ORDER_STATUS_SO_EXPORT.PENDING ||
          status === ORDER_STATUS_SO_EXPORT.REJECTED
        const isConfirmed = status === ORDER_STATUS_SO_EXPORT.PENDING
        const isRejected =
          status === ORDER_STATUS_SO_EXPORT.REJECTED ||
          status === ORDER_STATUS_SO_EXPORT.PENDING
        const isDelete =
          status === ORDER_STATUS_SO_EXPORT.PENDING ||
          status === ORDER_STATUS_SO_EXPORT.REJECTED

        const notHasTransaction =
          status === ORDER_STATUS_SO_EXPORT.PENDING ||
          status === ORDER_STATUS_SO_EXPORT.CONFIRMED ||
          status === ORDER_STATUS_SO_EXPORT.REJECTED
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.SO_EXPORT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.SO_EXPORT.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton onClick={() => handleDeleteOpenModal(row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton onClick={() => handleConfirmOpenModal(row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {isRejected && (
              <IconButton
                onClick={() => {
                  handleRejectOpenModal(row)
                }}
              >
                <Icon name="remove" />
              </IconButton>
            )}
            {!notHasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() =>
                  history.push(
                    `${ROUTE.SO_EXPORT.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
                  )
                }
              >
                {t('soExport.transactionList')}
              </Button>
            )}
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchSOExport(params)
  }

  const handleDeleteOpenModal = (tempItem) => {
    setDeleteModal(true)
    setTempItem(tempItem)
  }

  const handleConfirmOpenModal = (tempItem) => {
    setConfirmModal(true)
    setTempItem(tempItem)
  }
  const handleRejectOpenModal = (tempItem) => {
    setRejectModal(true)
    setTempItem(tempItem)
  }

  const onSubmitDelete = () => {
    actions.deleteSOExport(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
    setTempItem(null)
  }

  const submitConfirm = () => {
    actions.confirmSOExportById(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
    setTempItem(null)
  }
  const submitReject = () => {
    actions.rejectSOExportById(tempItem?.id, () => {
      refreshData()
    })
    setRejectModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        {/* <ImportExport
          name={t('menu.importExportData')}
          onImport={(params) => {
            importProductionOrderApi(params)
          }}
          onDownloadTemplate={getProductionOrderTemplateApi}
          onRefresh={refreshData}
          disabled
        /> */}
        <Button
          onClick={() => history.push(ROUTE.SO_EXPORT.CREATE.PATH)}
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
      title={t('menu.soExport')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('soExport.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('soExport.title')}
        rows={soExportList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
      />
      <Dialog
        open={deleteModal}
        title={t('soExport.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('soExport.deleteConfirm')}
        <LabelValue
          label={t('soExport.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('soExport.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={confirmModal}
        title={t('general:common.notify')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LabelValue
          label={t('soExport.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('soExport.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={rejectModal}
        title={t('general:common.notify')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.reject')}
        <LabelValue
          label={t('soExport.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('soExport.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default SOExport
