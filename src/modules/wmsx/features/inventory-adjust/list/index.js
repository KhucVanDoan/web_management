import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  INVENTORY_ADJUST_STATUS,
  INVENTORY_ADJUST_STATUS_OPTIONS,
  INVENTORY_ADJUST_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useInventoryAdjust from '~/modules/wmsx/redux/hooks/useInventoryAdjust'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_ADJUST.LIST.PATH,
    title: ROUTE.INVENTORY_ADJUST.LIST.TITLE,
  },
]

const InventoryAdjust = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { inventoryAdjustList, isLoading, total },
    actions,
  } = useInventoryAdjust()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    type: '',
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('inventoryAdjust.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('inventoryAdjust.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'type',
        headerName: t('inventoryAdjust.type'),
        width: 100,
        renderCell: (params) => {
          return t(`${INVENTORY_ADJUST_TYPE_MAP[params?.row?.type]}`)
        },
      },
      {
        field: 'reason',
        headerName: t('inventoryAdjust.reason'),
        width: 100,
        renderCell: (params) => {
          return params?.row?.reason?.name
        },
      },
      {
        field: 'receiptDate',
        headerName: t('inventoryAdjust.licenseDate'),
        width: 150,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.receiptDate)
        },
      },
      {
        field: 'status',
        headerName: t('inventoryAdjust.status'),
        width: 150,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={INVENTORY_ADJUST_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('inventoryAdjust.actions'),
        width: 200,
        align: 'center',
        visible: 'always',
        sticky: 'right',
        resizable: false,
        renderCell: (params) => {
          const { id, status } = params?.row
          const canConfirm = status === INVENTORY_ADJUST_STATUS.PENDING
          const canRejected = status === INVENTORY_ADJUST_STATUS.PENDING
          const canEdit =
            status === INVENTORY_ADJUST_STATUS.PENDING ||
            status === INVENTORY_ADJUST_STATUS.REJECTED
          const canDelete =
            status === INVENTORY_ADJUST_STATUS.PENDING ||
            status === INVENTORY_ADJUST_STATUS.REJECTED
          return (
            <div>
              <Guard code={FUNCTION_CODE.WAREHOUSE_DETAIL_INVENTORY_ADJUSTMENT}>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.INVENTORY_ADJUST.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {canEdit && (
                <Guard
                  code={FUNCTION_CODE.WAREHOUSE_UPDATE_INVENTORY_ADJUSTMENT}
                >
                  <IconButton
                    onClick={() =>
                      history.push(
                        ROUTE.INVENTORY_ADJUST.EDIT.PATH.replace(
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
              {canDelete && (
                <Guard
                  code={FUNCTION_CODE.WAREHOUSE_DELETE_INVENTORY_ADJUSTMENT}
                >
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
              )}
              {canConfirm && (
                <Guard
                  code={FUNCTION_CODE.WAREHOUSE_CONFIRM_INVENTORY_ADJUSTMENT}
                >
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                </Guard>
              )}
              {canRejected && (
                <Guard
                  code={FUNCTION_CODE.WAREHOUSE_REJECT_INVENTORY_ADJUSTMENT}
                >
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              )}
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        ...columns,
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchInventoryAdjust(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteInventoryAdjust(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmInventoryAdjustById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }
  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }
  const submitReject = () => {
    actions.rejectInventoryAdjustById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.WAREHOUSE_CREATE_INVENTORY_ADJUSTMENT}>
          <Button
            onClick={() => history.push(ROUTE.INVENTORY_ADJUST.CREATE.PATH)}
            icon="add"
            sx={{ ml: 4 / 3 }}
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
      title={t('menu.inventoryAdjust')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('inventoryAdjust.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('inventoryAdjust.list')}
        columns={columns}
        rows={inventoryAdjustList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        // bulkActions={{
        //   actions: [
        //     BULK_ACTION.APPROVE,
        //     BULK_ACTION.REJECT,
        //     BULK_ACTION.DELETE,
        //   ],
        //   apiUrl: API_URL.INVENTORY_ADJUST,
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
        open={isOpenDeleteModal}
        title={t('inventoryAdjust.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventoryAdjust.deleteConfirm')}
        <LV
          label={t('inventoryAdjust.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryAdjust.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('inventoryAdjust.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryAdjust.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectModal}
        title={t('general:common.reject')}
        onCancel={() => setIsOpenRejectModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('inventoryAdjust.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryAdjust.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default InventoryAdjust
