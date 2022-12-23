import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS,
  ORDER_STATUS_OPTIONS,
  STATUS_SYNC_ORDER_TO_EBS,
} from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import {
  exportWarehouseExportReceiptApi,
  getWarehouseExportReceiptTemplateApi,
  importWarehouseExportReceiptApi,
} from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

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
  const { canAccess } = useApp()
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
    isOpenConfirmModal: false,
    isOpenConfirmEBSModal: false,
    isOpenRejectedModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('warehouseExportReceipt.receiptId'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.code
      },
    },
    {
      field: 'departmentReceiptName',
      headerName: t('warehouseExportReceipt.departmentReception'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.departmentReceipt?.name
      },
    },
    {
      field: 'businessTypeName',
      headerName: t('warehouseExportReceipt.typeBusiness'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.businessType?.name
      },
    },
    {
      field: 'warehouseName',
      headerName: t('warehouseExportReceipt.warehouseExport'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.warehouseId?.name
      },
    },
    {
      field: 'receiptDate',
      headerName: t('warehouseExportReceipt.createdAt'),
      width: 120,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.receiptDate)
      },
    },
    {
      field: 'status',
      headerName: t('warehouseExportReceipt.status'),
      width: 120,
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
      field: 'numberReceiptEBS',
      headerName: t('warehouseExportReceipt.numberReceiptEBS'),
      width: 120,
      renderCell: (params) => {
        return params?.row?.ebsId
      },
    },
    {
      field: 'warehouseExportEBS',
      headerName: t('warehouseExportReceipt.warehouseExportEBS'),
      width: 150,
      renderCell: (params) => {
        const { syncStatus } = params?.row
        const isConfirmWarehouseExport =
          syncStatus === STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC ||
          syncStatus === STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR
        return (
          isConfirmWarehouseExport &&
          !params?.row?.ebsId && (
            <Button
              variant="text"
              size="small"
              bold={false}
              onClick={() => onClickConfirmEBS(params?.row)}
            >
              {t('warehouseExportReceipt.confirmWarehouseExport')}
            </Button>
          )
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 250,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status, warehouseId } = params?.row
        const isEdit =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isRejected = status === ORDER_STATUS.PENDING
        const hasTransaction =
          status === ORDER_STATUS.IN_COLLECTING ||
          status === ORDER_STATUS.COLLECTED ||
          status === ORDER_STATUS.COMPLETED
        return (
          <div>
            <Guard code={FUNCTION_CODE.SALE_DETAIL_SALE_ORDER_EXPORT}>
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
            </Guard>
            {isEdit && (
              <Guard code={FUNCTION_CODE.SALE_UPDATE_SALE_ORDER_EXPORT}>
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
              </Guard>
            )}
            {isDelete && (
              <Guard code={FUNCTION_CODE.SALE_DELETE_SALE_ORDER_EXPORT}>
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              </Guard>
            )}
            {isConfirmed && (
              <Guard code={FUNCTION_CODE.SALE_CONFIRM_SALE_ORDER_EXPORT}>
                <IconButton onClick={() => onClickConfirm(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              </Guard>
            )}
            {isRejected && (
              <Guard code={FUNCTION_CODE.SALE_REJECT_SALE_ORDER_EXPORT}>
                <IconButton onClick={() => onClickRejected(params.row)}>
                  <Icon name="remove" />
                </IconButton>
              </Guard>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() =>
                  history.push(
                    `${ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    ).replace(':warehouseId', `${warehouseId?.id}`)}`,
                  )
                }
              >
                {t('warehouseTransfer.transactions')}
              </Button>
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
      filter: convertFilterParams(
        {
          ...filters,
          businessTypeId: filters?.businessTypeId?.id,
          departmentReceiptId: filters?.departmentReceiptId?.id,
          warehouseId: filters?.warehouseId?.id,
          sourceId: filters?.sourceId?.id,
        },
        columns,
      ),
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
  const onClickConfirm = (tempItem) => {
    setModal({ tempItem, isOpenConfirmModal: true })
  }
  const onClickRejected = (tempItem) => {
    setModal({ tempItem, isOpenRejectedModal: true })
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseExportReceipt(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }
  const onSubmitConfirm = () => {
    actions.confirmWarehouseExportReceiptById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmModal: false, tempItem: null })
  }
  const onClickConfirmEBS = (tempItem) => {
    setModal({ tempItem, isOpenConfirmEBSModal: true })
  }
  const onSubmitConfirmEBS = () => {
    actions.confirmWarehouseExportEBSById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmEBSModal: false, tempItem: null })
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseExportReceiptById(modal.tempItem?.id, () => {
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
          {...(canAccess(FUNCTION_CODE.WAREHOUSE_EXPORT_LOCATION)
            ? {
                onExport: () =>
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
                  }),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.WAREHOUSE_IMPORT_LOCATION)
            ? {
                onImport: () =>
                  importWarehouseExportReceiptApi({
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
          onDownloadTemplate={getWarehouseExportReceiptTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.SALE_CREATE_SALE_ORDER_EXPORT}>
          <Button
            onClick={() =>
              history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH)
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
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        // bulkActions={{
        //   actions: [BULK_ACTION.DELETE],
        //   apiUrl: API_URL.BUSINESS_TYPE,
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
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('warehouseExportReceipt.confirmTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseExportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmEBSModal}
        title={t('warehouseExportReceipt.confirmTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        <div>{t('warehouseExportReceipt.ConfirmEBS')}</div>
        {t('warehouseExportReceipt.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenRejectedModal}
        title={t('warehouseExportReceipt.rejectTitlePopup')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejected}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.rejectConfirm')}
      </Dialog>
    </Page>
  )
}

export default WarehouseExportReceipt
