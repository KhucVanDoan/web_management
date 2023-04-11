import React, { useState, useEffect } from 'react'

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
import IconButton from '~/components/IconButton'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { exportCompanyApi } from '~/modules/database/redux/sagas/define-company/import-export-company'
import { TYPE_ENUM_EXPORT } from '~/modules/mesx/constants'
import {
  STATUS_SYNC_ORDER_TO_EBS,
  STATUS_SYNC_WAREHOUSE_IMPORT_TO_EBS_OPTIONS,
  SYNC_STATUS_CAN_UPDATE_HEADER_POI,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
} from '~/utils'

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
  const { canAccess } = useApp()
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
    isOpenRejectedModal: false,
    isOpenConfirmEBSModal: false,
    isOpenCancelSyncEMSModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('warehouseImportReceipt.id'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.code
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseImportReceipt.departmentReceipt'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.departmentReceipt?.name
      },
    },
    {
      field: 'businessTypeId',
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
        return params?.row?.warehouse?.code
      },
    },
    {
      field: 'receiptDate',
      headerName: t('warehouseImportReceipt.receiptDate'),
      width: 150,
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.receiptDate)
      },
    },
    {
      field: 'createdAt',
      headerName: t('warehouseImportReceipt.createdAt'),
      width: 150,
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
      },
    },
    {
      field: 'createdByUser',
      headerName: t('warehouseImportReceipt.createdByUser'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.createdByUser?.fullName
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
            options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'receiptEBS',
      headerName: t('warehouseImportReceipt.receiptEBS'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.ebsId
      },
    },
    {
      field: 'warehouseImportEbs',
      headerName: t('warehouseImportReceipt.warehouseImportEbs'),
      width: 250,
      renderCell: (params) => {
        const { status, syncStatus } = params?.row
        const isConfirmWarehouseImport =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.IN_PROGRESS ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED
        // return (
        //   isConfirmWarehouseImport &&
        //   isSync &&
        //   !params?.row?.ebsId && (
        //     <Button
        //       variant="text"
        //       size="small"
        //       bold={false}
        //       onClick={() => onClickConfirmEBS(params?.row)}
        //     >
        //       {t('warehouseImportReceipt.confirmWarehouseImport')}
        //     </Button>
        //   )
        // )
        return (
          isConfirmWarehouseImport &&
          (syncStatus === STATUS_SYNC_ORDER_TO_EBS.OUT_OF_SYNC ? (
            <Guard code={FUNCTION_CODE.SALE_SYNC_PURCHASED_ORDER_IMPORT_TO_EBS}>
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() => onClickConfirmEBS(params?.row)}
              >
                {t('warehouseImportReceipt.confirmWarehouseImport')}
              </Button>
            </Guard>
          ) : (
            <Status
              options={STATUS_SYNC_WAREHOUSE_IMPORT_TO_EBS_OPTIONS}
              value={syncStatus}
              variant="text"
              sx={{ ml: 1 }}
            />
          ))
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      sticky: { right: 0 },
      resizable: false,
      fixed: true,
      renderCell: (params) => {
        const { id, status, syncStatus } = params?.row
        const isEdit =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.REJECTED ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED
        const isDelete =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.REJECTED
        const isConfirmed = status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING
        const isRejected = status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING
        const hasTransaction =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.IN_PROGRESS ||
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED
        const isCancelSync =
          syncStatus === STATUS_SYNC_ORDER_TO_EBS.SYNC_WSO2_ERROR
        const isEditHeader =
          (status === WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED &&
            SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(syncStatus)) ||
          (status === WAREHOUSE_IMPORT_RECEIPT_STATUS.IN_PROGRESS &&
            SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(syncStatus)) ||
          (status === WAREHOUSE_IMPORT_RECEIPT_STATUS.RECEIVED &&
            SYNC_STATUS_CAN_UPDATE_HEADER_POI.includes(syncStatus))
        return (
          <div>
            <Guard code={FUNCTION_CODE.SALE_DETAIL_PURCHASED_ORDER_IMPORT}>
              <IconButton
                title={t('iconButtonHover.view')}
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name={'show'} />
              </IconButton>
            </Guard>
            {isCancelSync && (
              <Guard
                code={FUNCTION_CODE.SALE_CANCEL_SYNC_PURCHASED_ORDER_IMPORT}
              >
                <IconButton
                  title={t('iconButtonHover.cancel')}
                  onClick={() => onClickCancelSyncEBS(params?.row)}
                >
                  <Icon name="cancelSync" />
                </IconButton>
              </Guard>
            )}
            {isEditHeader && (
              <Guard
                code={FUNCTION_CODE.SALE_UPDATE_HEADER_PURCHASED_ORDER_IMPORT}
              >
                <IconButton
                  title={t('iconButtonHover.updateHeader')}
                  onClick={() =>
                    history.push(
                      ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT_HEADER.PATH.replace(
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
            {isEdit && (
              <Guard code={FUNCTION_CODE.SALE_UPDATE_PURCHASED_ORDER_IMPORT}>
                <IconButton
                  title={t('iconButtonHover.update')}
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
              </Guard>
            )}

            {isDelete && (
              <Guard code={FUNCTION_CODE.SALE_DELETE_PURCHASED_ORDER_IMPORT}>
                <IconButton
                  title={t('iconButtonHover.delete')}
                  onClick={() => onClickDelete(params.row)}
                >
                  <Icon name="delete" />
                </IconButton>
              </Guard>
            )}
            {isConfirmed && (
              <Guard code={FUNCTION_CODE.SALE_CONFIRM_PURCHASED_ORDER_IMPORT}>
                <IconButton
                  title={t('iconButtonHover.confirm')}
                  onClick={() => onClickConfirm(params.row)}
                >
                  <Icon name="tick" />
                </IconButton>
              </Guard>
            )}
            {isRejected && (
              <Guard code={FUNCTION_CODE.SALE_REJECT_PURCHASED_ORDER_IMPORT}>
                <IconButton
                  title={t('iconButtonHover.reject')}
                  onClick={() => onClickRejected(params.row)}
                >
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
                    `${ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
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
          sourceId: filters?.sourceId?.id,
          warehouseId: filters?.warehouseId?.id,
        },
        columns,
      ),
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
  const onClickConfirmEBS = (tempItem) => {
    setModal({ tempItem, isOpenConfirmEBSModal: true })
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
  const onSubmitConfirmEBS = () => {
    actions.confirmWarehouseImportEBSById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmEBSModal: false, tempItem: null })
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
      isOpenConfirmEBSModal: false,
    })
  }
  const onClickCancelSyncEBS = (tempItem) => {
    setModal({ tempItem, isOpenCancelSyncEMSModal: true })
  }
  const onSubmitCancelEBS = () => {
    actions.cancelWarehouseImportEBSById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenCancelSyncEMSModal: false, tempItem: null })
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('constructionManagement.export')}
          {...(canAccess(FUNCTION_CODE.SALE_EXPORT_PURCHASED_ORDER_IMPORT)
            ? {
                onExport: () =>
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
                  }),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.SALE_IMPORT_PURCHASED_ORDER_IMPORT)
            ? {
                onImport: () => {},
              }
            : {})}
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.SALE_CREATE_PURCHASED_ORDER_IMPORT}>
          <Button
            onClick={() =>
              history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH)
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
        //   apiUrl: API_URL.CONSTRUCTION,
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
        open={modal.isOpenCancelSyncEMSModal}
        title={t('warehouseExportReceipt.cancelSyncTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitCancelEBS}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportReceipt.cancelEBS')}
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmEBSModal}
        title={t('warehouseImportReceipt.confirmTitlePopupEBS')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirmEBS}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        <div>{t('warehouseImportReceipt.ConfirmEBS')}</div>
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
