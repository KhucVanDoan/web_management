import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ROLE,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
  getLocalItem,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
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
  const userInfo = getLocalItem('userInfo')
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
    isOpenSeenModal: false,
    isOpenRetryModal: false,
  })

  // const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: 'Mã phiếu',
      width: 150,
      sortable: false,
      visible: 'always',
      renderCell: (params) => {
        return params?.row?.id
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tháng',
      width: 150,
      filterFormat: 'date',
      sortable: false,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.date)
      },
    },
    {
      field: 'createdByUser',
      headerName: 'Người tạo',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.createdByUser?.fullName
      },
    },

    {
      field: 'employee',
      headerName: 'Lái xe',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.employee?.fullName
      },
    },

    {
      field: 'vehicleNumber',
      headerName: 'Số xe',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.vehicleNumber
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: true,
      width: 100,
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
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, status } = params?.row
        const isEdit =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING &&
          (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER)

        const isDelete =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING &&
          (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER)
        const isConfirmed =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING &&
          (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER)
        const isSeenDriver =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED &&
          (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER)
        const isRetry =
          status === WAREHOUSE_IMPORT_RECEIPT_STATUS.SIGNED &&
          (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER)
        return (
          <div>
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
            {isEdit && (
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
            )}
            {isDelete && (
              <IconButton
                title={t('iconButtonHover.delete')}
                onClick={() => onClickDelete(params.row)}
              >
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton
                title={t('iconButtonHover.confirm')}
                onClick={() => onClickConfirm(params.row)}
              >
                <Icon name="tick" />
              </IconButton>
            )}
            {isSeenDriver && (
              <IconButton
                title="Gửi cho lái xe"
                onClick={() => onClickSeenDriver(params.row)}
              >
                <Icon name="assign" />
              </IconButton>
            )}
            {isRetry && (
              <IconButton
                title="Yêu cầu ký lại"
                onClick={() => onClickRetry(params.row)}
              >
                <Icon name="retrySyncReceipt" />
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

  // useEffect(() => {
  //   setSelectedRows([])
  // }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }
  const onClickConfirm = (tempItem) => {
    setModal({ tempItem, isOpenConfirmModal: true })
  }
  const onClickSeenDriver = (tempItem) => {
    setModal({ tempItem, isOpenSeenModal: true })
  }
  const onClickRetry = (tempItem) => {
    setModal({ tempItem, isOpenRetryModal: true })
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
  const onSubmitSeen = () => {
    actions.seenToDriver(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenSeenModal: false, tempItem: null })
  }
  const onSubmitRetry = () => {
    actions.retry(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenConfirmModal: false, tempItem: null })
  }
  const onCloseDeleteModal = () => {
    setModal({
      isOpenDeleteModal: false,
      tempItem: null,
      isOpenConfirmModal: false,
      isOpenSeenModal: false,
      isOpenRetryModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        {(userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER) && (
          <Button
            onClick={() =>
              history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH)
            }
            sx={{ ml: 4 / 3 }}
            icon="add"
          >
            {t('general:common.create')}
          </Button>
        )}
      </>
    )
  }
  return (
    <Page
      breadcrumbs={
        (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER) &&
        breadcrumbs
      }
      title={
        (userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER) &&
        'Phiếu giám sát xe'
      }
      onSearch={setKeyword}
      placeholder={t('warehouseImportReceipt.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title="Danh sách phiếu giám sát xe"
        rows={warehouseImportReceiptList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        // onSelectionChange={setSelectedRows}
        // selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
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
        open={modal.isOpenSeenModal}
        title="Gửi phiếu giám sát sử dụng cho lái xe"
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitSeen}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        Bạn có chắc chắn muốn gửi không?
      </Dialog>
      <Dialog
        open={modal.isOpenRetryModal}
        title="Gửi yêu cầu ký tên lại cho lái xe"
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRetry}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        Bạn có chắc chắn muốn gửi yêu cầu không?
      </Dialog>
    </Page>
  )
}

export default WarehouseImportReceipt
