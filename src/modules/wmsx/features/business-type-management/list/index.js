import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_MAP,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useBussinessTypeManagement from '~/modules/wmsx/redux/hooks/useBusinessTypeManagement'
import {
  exportBusinessTypeApi,
  getBusinessTypeTemplateApi,
  importBusinessTypeApi,
} from '~/modules/wmsx/redux/sagas/business-type-management/import-export-business-type'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
    title: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
  },
]

function BussinessTypeManagement() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createTime: [],
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { businessTypeList, total, isLoading },
    actions,
  } = useBussinessTypeManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenUpdateStatusModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('businessTypeManagement.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('businessTypeManagement.name'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'parentBusiness',
      headerName: t('businessTypeManagement.parentBusiness'),
      width: 120,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('businessTypeManagement.description'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('businessTypeManagement.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
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
      width: 150,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
            </IconButton>
            {isLocked && (
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name="locked" />
              </IconButton>
            )}
            {!isLocked && (
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name="unlock" />
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchBusinessTypes(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteBusinessType(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectBusinessTypeById(modal.tempItem?.id, () => refreshData())
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmBusinessTypeById(modal.tempItem?.id, () => {
        refreshData()
      })
    }
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const onCloseUpdateStatusModal = () => {
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          onImport={(params) => importBusinessTypeApi(params)}
          onExport={() =>
            exportBusinessTypeApi({
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
          onDownloadTemplate={getBusinessTypeTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() =>
            history.push(ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH)
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
      title={t('menu.businessTypeManagement')}
      onSearch={setKeyword}
      placeholder={t('businessTypeManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('businessTypeManagement.list')}
        rows={businessTypeList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          // @TODO khanh.nguyenvan add apiURL business type
          apiUrl: API_URL.COMPANY,
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
        open={modal.isOpenDeleteModal}
        title={t('businessTypeManagement.constructionManagementDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('businessTypeManagement.deleteConfirm')}
        <LV
          label={t('businessTypeManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('businessTypeManagement.description')}
          value={modal?.tempItem?.description}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenUpdateStatusModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === ACTIVE_STATUS.ACTIVE
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
          label={t('businessTypeManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('businessTypeManagement.description')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={t(ACTIVE_STATUS_MAP[modal?.tempItem?.status])}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default BussinessTypeManagement
