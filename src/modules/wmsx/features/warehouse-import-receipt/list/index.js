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
import Page from '~/components/Page'
import Status from '~/components/Status'
import { exportCompanyApi } from '~/modules/database/redux/sagas/define-company/import-export-company'
import { TYPE_ENUM_EXPORT } from '~/modules/mesx/constants'
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
  },
]

function WarehouseImportReceipt() {
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
    data: { warehouseImportReceiptList, total, isLoading },
    actions,
  } = useWarehouseImportReceipt()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
    isOpenRejectedModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: '#',
      headerName: t('warehouseImportReceipt.id'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'unit',
      headerName: t('warehouseImportReceipt.unit'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.departmentReceipt?.name
      },
    },
    {
      field: 'expenditureType',
      headerName: t('warehouseImportReceipt.expenditureType'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.businessType?.name
      },
    },
    {
      field: 'warehouse',
      headerName: t('warehouseImportReceipt.warehouse'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.warehouse?.name
      },
    },
    {
      field: 'createdAt',
      headerName: t('warehouseImportReceipt.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.receiptDate
      },
    },
    {
      field: 'status',
      headerName: t('warehouseImportReceipt.status'),
      sortable: true,
      width: 150,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'receiptNo',
      headerName: t('warehouseImportReceipt.receiptNo'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.receiptNumber
      },
    },
    {
      field: 'warehouseImportEbs',
      headerName: t('warehouseImportReceipt.warehouseImportEbs'),
      width: 150,
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isEdit =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isRejected = status === ORDER_STATUS.PENDING
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton onClick={() => onClickConfirm(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {isRejected && (
              <IconButton onClick={() => onClickRejected(params.row)}>
                <Icon name="remove" />
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
    actions.searchWarehouseImportReceipt(params)
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
  const onClickConfirm = (tempItem) => {
    setModal({ tempItem, isOpenConfirmModal: true })
  }
  const onClickRejected = (tempItem) => {
    setModal({ tempItem, isOpenRejectedModal: true })
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseImportReceipt(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }
  const onSubmitConfirm = () => {
    actions.confirmWarehouseImportReceiptById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmModal: false, tempItem: null })
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseImportReceiptById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenRejectedModal: false, tempItem: null })
  }
  const onCloseDeleteModal = () => {
    setModal({
      isOpenDeleteModal: false,
      tempItem: null,
      isOpenConfirmModal: false,
      isOpenRejectedModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('constructionManagement.export')}
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
          onClick={() =>
            history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH)
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
      title={t('menu.warehouseImportReceipt')}
      onSearch={setKeyword}
      placeholder={t('warehouseImportReceipt.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseImportReceipt.list')}
        rows={warehouseImportReceiptList}
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
        title={t('warehouseImportReceipt.deleteTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseImportReceipt.deleteConfirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('warehouseImportReceipt.confirmTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseImportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenRejectedModal}
        title={t('warehouseImportReceipt.rejectTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejected}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseImportReceipt.rejectConfirm')}
      </Dialog>
    </Page>
  )
}

export default WarehouseImportReceipt
