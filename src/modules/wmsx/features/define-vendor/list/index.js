import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import {
  exportVendorApi,
  getVendorTemplateApi,
  importVendorApi,
} from '~/modules/wmsx/redux/sagas/define-vendor/import-export-vendor'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: ROUTE.PRODUCTION_INFORMATION_MANAGENMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_VENDEOR.LIST.PATH,
    title: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
  },
]
function DefineVendor() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { vendorsList, total, isLoading },
    actions,
  } = useDefineVendor()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
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
      headerName: t('defineVendor.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineVendor.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },

    {
      field: 'email',
      headerName: t('defineVendor.email'),
      width: 200,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('defineVendor.phoneColumn'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'fax',
      headerName: t('defineVendor.faxColumn'),
      width: 100,
    },
    {
      field: 'address',
      headerName: t('defineVendor.addressColumn'),
      filterFormat: 'date',
      width: 200,
    },
    {
      field: 'action',
      headerName: t('defineVendor.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_VENDEOR.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_VENDEOR.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
              <Icon name="delete" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.DEFINE_VENDEOR.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
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
    actions.searchVendors(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteVendor(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onImport={(params) => {
            importVendorApi(params)
          }}
          onExport={() => {
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
            })
          }}
          onDownloadTemplate={getVendorTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_VENDEOR.CREATE.PATH)}
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
      title={t('menu.defineVendor')}
      onSearch={setKeyword}
      placeholder={t('defineVendor.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
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
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineVendor.deleteModalTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineVendor.confirmDelete')}
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
      </Dialog>
    </Page>
  )
}

export default DefineVendor
