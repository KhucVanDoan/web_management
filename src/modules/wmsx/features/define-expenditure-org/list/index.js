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
import { TYPE_ENUM_EXPORT } from '~/modules/mesx/constants'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import StatusSwitcher from '~/modules/wmsx/partials/StatusSwitcher'
import useDefineExpenditureOrg from '~/modules/wmsx/redux/hooks/useDefineExpenditureOrg'
import { exportCompanyApi } from '~/modules/wmsx/redux/sagas/company-management/import-export-company'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.TITLE,
  },
]
function DefineExpenditureOrg() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { expenditureOrgList, total, isLoading },
    actions,
  } = useDefineExpenditureOrg()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

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
      headerName: t('defineExpenditureOrg.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineExpenditureOrg.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'email',
      headerName: t('defineExpenditureOrg.email'),
      width: 150,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('defineExpenditureOrg.phone'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('defineExpenditureOrg.description'),
      filterFormat: 'date',
      width: 150,
    },
    {
      field: 'status',
      headerName: t('defineExpenditureOrg.status'),
      width: 120,
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
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.PATH.replace(
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
                  ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickUpdateStatus(params.row)}>
              <Icon name={isLocked ? 'locked' : 'unlock'} />
            </IconButton>
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
    actions.searchExpenditureOrg(params)
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
      actions.rejectExpenditureOrgById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmExpenditureOrgById(modal.tempItem?.id, () => {
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
          name={t('menu.importExportData')}
          onImport={() => {}}
          onExport={() =>
            exportCompanyApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
              type: TYPE_ENUM_EXPORT.COMPANY,
            })
          }
          onDownloadTemplate={() => {}}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.PATH)}
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
      title={t('menu.defineExpenditureOrg')}
      onSearch={setKeyword}
      placeholder={t('defineExpenditureOrg.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineExpenditureOrg.list')}
        rows={expenditureOrgList}
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
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.VENDOR,
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
          label={t('defineExpenditureOrg.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineExpenditureOrg.name')}
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

export default DefineExpenditureOrg