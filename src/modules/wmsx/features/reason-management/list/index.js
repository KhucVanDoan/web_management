import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useReasonManagement from '~/modules/wmsx/redux/hooks/useReasonManagement'
import {
  exportReasonApi,
  importReasonApi,
} from '~/modules/wmsx/redux/sagas/reason-management/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.REASON_MANAGEMENT.LIST.PATH,
    title: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
  },
]
function ReasonManagement() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    date: '',
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
    data: { isLoading, reasonManagementList, total },
    actions,
  } = useReasonManagement()

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const columns = [
    {
      field: 'code',
      headerName: t('reasonManagement.code'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('reasonManagement.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('reasonManagement.description'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('reasonManagement.status'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { status } = params.row

        return (
          <Status
            options={ACTIVE_STATUS_OPTIONS}
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
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.REASON_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.REASON_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>

            <IconButton onClick={() => onClickUpdateStatus(params.row)}>
              <Icon name={isLocked ? 'locked' : 'unlock'} />
            </IconButton>
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
      filter: convertFilterParams(filters, [
        ...columns,
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchReasonManagement(params)
  }
  const onSubmitDelete = () => {
    actions.deleteReasonManagement(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
    setTempItem(null)
  }

  const onClickUpdateStatus = (tempItem) => {
    setIsActiveModal(true)
    setTempItem(tempItem)
  }

  const onSubmitUpdateStatus = () => {
    if (tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectReasonManagementById(tempItem?.id, () => {
        refreshData()
      })
    } else if (tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmReasonManagementById(tempItem?.id, () => {
        refreshData()
      })
    }
    setIsActiveModal(false)
    setTempItem(null)
  }

  const onCloseUpdateStatusModal = () => {
    setIsActiveModal(false)
    setTempItem(null)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('reasonManagement.export')}
          onExport={() =>
            exportReasonApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onImport={() =>
            importReasonApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.REASON_MANAGEMENT.CREATE.PATH)}
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
      title={t('menu.reasonManagement')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('reasonManagement.searchPlaceHolder')}
      loading={isLoading}
    >
      <DataTable
        title={t('reasonManagement.title')}
        rows={reasonManagementList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
        onSelectionChange={setSelectedRows}
        onSettingChange={setColumnsSettings}
        selected={selectedRows}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.PAYMENT_TYPE,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      />
      <Dialog
        open={deleteModal}
        title={t('reasonManagement.reasonManagementDelete')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('reasonManagement.deleteConfirm')}
        <LV
          label={t('reasonManagement.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('reasonManagement.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isActiveModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(tempItem?.status === ACTIVE_STATUS.ACTIVE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
        noBorderBottom
      >
        {t('general.confirmMessage')}
        <LV
          label={t('constructionManagement.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('constructionManagement.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={ACTIVE_STATUS_OPTIONS}
              value={tempItem?.status}
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ReasonManagement
