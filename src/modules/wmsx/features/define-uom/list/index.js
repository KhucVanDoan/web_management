import React, { useEffect, useState, useMemo } from 'react'

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
import { TYPE_ITEM_EXPORT } from '~/modules/database/constants'
import {
  exportItemUnitSettingApi,
  getItemUnitSettingTemplateApi,
} from '~/modules/database/redux/sagas/item-unit-setting/import-export-item-unit'
import {
  UOM_ACTIVE_STATUS,
  UOM_ACTIVE_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import StatusSwitcher from '~/modules/wmsx/partials/StatusSwitcher'
import useDefineUom from '~/modules/wmsx/redux/hooks/useDefineUom'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_UOM.LIST.PATH,
    title: ROUTE.DEFINE_UOM.LIST.TITLE,
  },
]
function DefineUom() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const {
    data: { uomList, isLoading, total },
    actions,
  } = useDefineUom()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
  }

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = useMemo(() => [
    {
      field: 'code',
      headerName: t('defineUom.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineUom.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'shortName',
      headerName: t('defineUom.shortName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('defineUom.description'),
      width: 200,
    },
    {
      field: 'status',
      headerName: t('defineUom.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={UOM_ACTIVE_STATUS_OPTIONS}
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
        const isLocked = status === UOM_ACTIVE_STATUS.ACTIVE
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_UOM.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.DEFINE_UOM.EDIT.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
            </IconButton>
            <IconButton onClick={() => onClickUpdateStatus(params.row)}>
              <Icon name={isLocked ? 'locked' : 'unlock'} />
            </IconButton>
          </>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchUoms(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteUom(modal.tempItem?.id, () => {
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
    if (modal.tempItem?.status === UOM_ACTIVE_STATUS.ACTIVE) {
      actions.rejectUomById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === UOM_ACTIVE_STATUS.INACTIVE) {
      actions.confirmUomById(modal.tempItem?.id, () => {
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
          name={t('defineUom.export')}
          onImport={() => {}}
          onExport={() =>
            exportItemUnitSettingApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
              type: TYPE_ITEM_EXPORT.DEFINE_UOM,
            })
          }
          onDownloadTemplate={getItemUnitSettingTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_UOM.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.defineUom')}
        onSearch={setKeyword}
        placeholder={t('defineUom.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('defineUom.title')}
          rows={uomList}
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
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
          sort={sort}
          bulkActions={{
            actions: [BULK_ACTION.DELETE],
            apiUrl: API_URL.DEFINE_UOM,
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
          title={t('defineUom.defineUomDelete')}
          onCancel={onCloseDeleteModal}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('defineUom.deleteConfirm')}
          <LV
            label={t('defineUom.code')}
            value={modal?.tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('defineUom.name')}
            value={modal?.tempItem?.name}
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
          {...(modal?.tempItem?.status === UOM_ACTIVE_STATUS.ACTIVE
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
            label={t('defineUom.code')}
            value={modal?.tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('defineUom.name')}
            value={modal?.tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('general.status')}
            value={
              <StatusSwitcher
                options={UOM_ACTIVE_STATUS_OPTIONS}
                value={modal?.tempItem?.status}
              />
            }
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default DefineUom
