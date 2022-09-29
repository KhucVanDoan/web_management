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
import { exportCompanyApi } from '~/modules/database/redux/sagas/define-company/import-export-company'
import { TYPE_ENUM_EXPORT } from '~/modules/mesx/constants'
import useSetStoragePeriod from '~/modules/wmsx/redux/hooks/useSetStoragePeriod'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.SET_STORAGE_PERIOD.LIST.PATH,
    title: ROUTE.SET_STORAGE_PERIOD.LIST.TITLE,
  },
]

function SetStoragePeriod() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    warehouseId: '',
    itemCode: '',
    itemName: '',
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
    data: { storagePeriodList, total, isLoading },
    actions,
  } = useSetStoragePeriod()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'warehouseCode',
      headerName: t('setStoragePeriod.warehouseCode'),
      width: 120,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params.row.warehouse?.code
      },
    },
    {
      field: 'warehouseName',
      headerName: t('setStoragePeriod.warehouseName'),
      width: 120,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params.row.warehouse?.name
      },
    },
    {
      field: 'expiryWarehouse',
      headerName: t('setStoragePeriod.storageLimit'),
      width: 120,
      sortable: true,
    },
    {
      field: 'expiryWarningWarehouse',
      headerName: t('setStoragePeriod.warningPeriod'),
      width: 120,
      sortable: true,
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.SET_STORAGE_PERIOD.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.SET_STORAGE_PERIOD.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
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
        { ...filters, warehouseId: filters?.warehouseId?.id },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchStoragePeriods(params)
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
    actions.deleteStoragePeriod(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('setStoragePeriod.export')}
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
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.SET_STORAGE_PERIOD.CREATE.PATH)}
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
      title={t('menu.setStoragePeriod')}
      onSearch={setKeyword}
      placeholder={t('setStoragePeriod.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('setStoragePeriod.list')}
        rows={storagePeriodList}
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
        }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.CONSTRUCTION,
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
        title={t('setStoragePeriod.setStoragePeriodDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('setStoragePeriod.deleteConfirm')}
        <LV
          label={t('setStoragePeriod.warehouseCode')}
          value={modal?.tempItem?.warehouse?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('setStoragePeriod.warehouseName')}
          value={modal?.tempItem?.warehouse?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default SetStoragePeriod
