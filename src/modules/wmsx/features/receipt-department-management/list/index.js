import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  RECEIPT_DEPARTMENT_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useReceiptDepartmentManagement from '~/modules/wmsx/redux/hooks/useReceiptDepartmentManagement'
import {
  exportReceiptDepartmentApi,
  getReceiptDepartmentTemplateApi,
  importReceiptDepartmentApi,
} from '~/modules/wmsx/redux/sagas/receipt-department-management/import-export-receipt-department'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
  },
]

function ReceiptDepartmentManagement() {
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
    data: { receiptDepartmentList, total, isLoading },
    actions,
  } = useReceiptDepartmentManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenUpdateStatusModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const { canAccess } = useApp()
  const columns = [
    {
      field: 'code',
      headerName: t('receiptDepartmentManagement.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('receiptDepartmentManagement.name'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'departmentType',
      headerName: t('receiptDepartmentManagement.departmentType'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return t(`${RECEIPT_DEPARTMENT_TYPE_MAP[params?.row?.departmentType]}`)
      },
    },
    {
      field: 'description',
      headerName: t('receiptDepartmentManagement.description'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('receiptDepartmentManagement.status'),
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
            <Guard code={FUNCTION_CODE.USER_DETAIL_DEPARTMENT_RECEIPT}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.USER_UPDATE_DEPARTMENT_RECEIPT}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {/* <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
            </IconButton> */}
            <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.USER_REJECT_DEPARTMENT_RECEIPT
                  : FUNCTION_CODE.USER_CONFIRM_DEPARTMENT_RECEIPT
              }
            >
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name={isLocked ? 'locked' : 'unlock'} />
              </IconButton>
            </Guard>
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
    actions.searchReceiptDepartment(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  // const onClickDelete = (tempItem) => {
  //   setModal({ tempItem, isOpenDeleteModal: true })
  // }

  const onSubmitDelete = () => {
    actions.deleteReceiptDepartment(modal.tempItem?.id, () => {
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
      actions.rejectReceiptDepartmentById(modal.tempItem?.id, () =>
        refreshData(),
      )
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmReceiptDepartmentById(modal.tempItem?.id, () => {
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
          onImport={(params) => importReceiptDepartmentApi(params)}
          {...(canAccess(FUNCTION_CODE.USER_EXPORT_DEPARTMENT_RECEIPT)
            ? {
                onExport: () =>
                  exportReceiptDepartmentApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: `${x?.id}` })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    sort: convertSortParams(sort),
                  }),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.USER_IMPORT_DEPARTMENT_RECEIPT)
            ? {
                onImport: () =>
                  importReceiptDepartmentApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: `${x?.id}` })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    sort: convertSortParams(sort),
                  }),
              }
            : {})}
          onDownloadTemplate={getReceiptDepartmentTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.USER_CREATE_DEPARTMENT_RECEIPT}>
          <Button
            onClick={() =>
              history.push(ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH)
            }
            sx={{ ml: 4 / 3 }}
            icon="add"
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.receiptDepartmentManagement')}
      onSearch={setKeyword}
      placeholder={t('receiptDepartmentManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('receiptDepartmentManagement.list')}
        rows={receiptDepartmentList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        //onSelectionChange={setSelectedRows}
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
        // bulkActions={{
        //   actions: [BULK_ACTION.DELETE],
        //   apiUrl: API_URL.RECEIPT_DEPARTMENT,
        //   onSuccess: () => {
        //     if (page === 1) {
        //       refreshData()
        //     } else {
        //       setPage(1)
        //     }
        //     setSelectedRows([])
        //   },
        // }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('receiptDepartmentManagement.deleteTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('receiptDepartmentManagement.deleteConfirm')}
        <LV
          label={t('receiptDepartmentManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('receiptDepartmentManagement.description')}
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
          label={t('receiptDepartmentManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('receiptDepartmentManagement.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={ACTIVE_STATUS_OPTIONS}
              value={modal?.tempItem?.status}
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ReceiptDepartmentManagement
