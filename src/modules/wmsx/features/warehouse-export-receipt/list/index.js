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
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import {
  exportWarehouseExportReceiptApi,
  getWarehouseExportReceiptTemplateApi,
  importWarehouseExportReceiptApi,
} from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
  },
]

function WarehouseExportReceipt() {
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
    data: { warehouseExportReceiptList, total, isLoading },
    actions,
  } = useWarehouseExportReceipt()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenUpdateStatusModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'receiptId',
      headerName: t('warehouseExportReceipt.receiptId'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'unit',
      headerName: t('warehouseExportReceipt.unit'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'typeBusiness',
      headerName: t('warehouseExportReceipt.typeBusiness'),
      width: 120,
      sortable: true,
    },
    {
      field: 'warehouseExport',
      headerName: t('warehouseExportReceipt.warehouseExport'),
      width: 120,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('warehouseExportReceipt.createdAt'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('warehouseExportReceipt.status'),
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
      field: 'numberReceiptEBS',
      headerName: t('warehouseExportReceipt.numberReceiptEBS'),
      width: 120,
    },
    {
      field: 'warehouseExportEBS',
      headerName: t('warehouseExportReceipt.warehouseExportEBS'),
      width: 120,
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
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH.replace(
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
                  ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH.replace(
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
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="comfirm" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="remove" />
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseExportReceipt(params)
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
    actions.deleteWarehouseExportReceipt(modal.tempItem?.id, () => {
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
          onImport={(params) => importWarehouseExportReceiptApi(params)}
          onExport={() =>
            exportWarehouseExportReceiptApi({
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
          onDownloadTemplate={getWarehouseExportReceiptTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() =>
            history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH)
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
      title={t('menu.warehouseExportReceipt')}
      onSearch={setKeyword}
      placeholder={t('warehouseExportReceipt.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseExportReceipt.list')}
        rows={warehouseExportReceiptList}
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
          apiUrl: API_URL.BUSINESS_TYPE,
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
        title={t('warehouseExportReceipt.deleteTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.deleteConfirm')}
        <LV
          label={t('warehouseExportReceipt.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseExportReceipt.description')}
          value={modal?.tempItem?.description}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default WarehouseExportReceipt
