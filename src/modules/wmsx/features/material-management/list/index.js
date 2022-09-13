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
  MATERIAL_ACTIVE_STATUS,
  MATERIAL_ACTIVE_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import StatusSwitcher from '~/modules/wmsx/partials/StatusSwitcher'
import useMaterialManagement from '~/modules/wmsx/redux/hooks/useMaterialManagement'
import {
  exportMaterialApi,
  getMaterialTemplateApi,
  importMaterialApi,
} from '~/modules/wmsx/redux/sagas/material-management/import-export-material'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    route: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
    title: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
  },
]

function MaterialManagement() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
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
    data: { materialList, total, isLoading },
    actions,
  } = useMaterialManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('materialManagement.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('materialManagement.name'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'normalizeCode',
      headerName: t('materialManagement.normalizedCode'),
      width: 120,
    },
    {
      field: 'country',
      headerName: t('materialManagement.country'),
      width: 120,
      renderCell: (item) => item?.manufacturingCountry?.name,
    },
    {
      field: 'objectCategory',
      headerName: t('materialManagement.objectCategory'),
      width: 120,
      renderCell: (item) => item?.objectCategory?.name,
    },
    {
      field: 'description',
      headerName: t('materialManagement.description'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('materialManagement.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={MATERIAL_ACTIVE_STATUS_OPTIONS}
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
        const isLocked = status === MATERIAL_ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
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
      filter: convertFilterParams(
        {
          ...filters,
          manufacturingCountryId: filters?.manufacturingCountryId?.id,
          objectCategoryId: filters?.objectCategoryId?.id,
        },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchMaterials(params)
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
    if (modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE) {
      actions.rejectMaterialById(modal.tempItem?.id, () => refreshData())
    } else if (
      modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.INACTIVE ||
      modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.REJECTED
    ) {
      actions.confirmMaterialById(modal.tempItem?.id, () => {
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
          onImport={(params) => importMaterialApi(params)}
          onExport={() =>
            exportMaterialApi({
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
          onDownloadTemplate={getMaterialTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH)}
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
      title={t('menu.materialManagement')}
      onSearch={setKeyword}
      placeholder={t('materialManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('materialManagement.list')}
        rows={materialList}
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
          /* @TODO update uri */

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
        open={modal.isOpenUpdateStatusModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE
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
          label={t('materialManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('materialManagement.description')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={MATERIAL_ACTIVE_STATUS_OPTIONS}
              value={modal?.tempItem?.status}
              nextValue={
                modal?.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE
                  ? MATERIAL_ACTIVE_STATUS.INACTIVE
                  : MATERIAL_ACTIVE_STATUS.ACTIVE
              }
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default MaterialManagement
