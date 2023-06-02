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
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import {
  exportVendorApi,
  getVendorTemplateApi,
  importVendorApi,
  // getVendorTemplateApi,
  // importVendorApi,
} from '~/modules/wmsx/redux/sagas/define-vendor/import-export-vendor'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_VENDOR.LIST.PATH,
    title: ROUTE.DEFINE_VENDOR.LIST.TITLE,
  },
]
function DefineVendor() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { vendorsList, total, isLoading },
    actions,
  } = useDefineVendor()
  const { canAccess } = useApp()
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [loadingExport, setLoadingExport] = useState(false)
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

  const columns = [
    {
      field: 'code',
      headerName: t('defineVendor.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineVendor.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'email',
      headerName: t('defineVendor.email'),
      width: 150,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('defineVendor.phone'),
      width: 150,
      sortable: true,
    },
    {
      field: 'address',
      headerName: t('defineVendor.address'),
      filterFormat: 'date',
      width: 150,
    },
    {
      field: 'status',
      headerName: t('defineVendor.status'),
      width: 150,
      renderCell: (params) => {
        const status = Number(params?.row?.status)
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
      sortable: false,
      align: 'center',
      visible: 'always',
      sticky: 'right',

      renderCell: (params) => {
        const { id, status } = params.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <Guard code={FUNCTION_CODE.SALE_DETAIL_VENDOR}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_VENDOR.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.SALE_UPDATE_VENDOR}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_VENDOR.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.SALE_REJECT_VENDOR
                  : FUNCTION_CODE.SALE_CONFIRM_VENDOR
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchVendors(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectVendorById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmVendorById(modal.tempItem?.id, () => {
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
          name={t('menu.defineVendor')}
          loadingExport={setLoadingExport}
          {...(canAccess(FUNCTION_CODE.SALE_EXPORT_VENDOR)
            ? {
                onExport: () =>
                  exportVendorApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
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
                onImport: (importFile) => importVendorApi(importFile),
              }
            : {})}
          onDownloadTemplate={getVendorTemplateApi}
          onRefresh={refreshData}
          // disabled
        />
        <Guard code={FUNCTION_CODE.SALE_CREATE_VENDOR}>
          <Button
            onClick={() => history.push(ROUTE.DEFINE_VENDOR.CREATE.PATH)}
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
      title={t('menu.defineVendor')}
      onSearch={setKeyword}
      placeholder={t('defineVendor.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading || loadingExport}
    >
      <DataTable
        title={t('defineVendor.title')}
        rows={vendorsList}
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
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        // bulkActions={{
        //   actions: [BULK_ACTION.DELETE],
        //   apiUrl: API_URL.VENDOR,
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
          label={t('defineVendor.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineVendor.name')}
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

export default DefineVendor
