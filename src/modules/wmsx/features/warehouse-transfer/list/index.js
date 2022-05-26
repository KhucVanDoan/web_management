import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  TRANSFER_STATUS,
  TRANSFER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filters-form'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.WAREHOUSE_TRANSFERS.LIST.PATH,
    title: ROUTE.WAREHOUSE_TRANSFERS.LIST.TITLE,
  },
]

const warehouseTransfer = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const {
    data: { warehouseTransferList, isLoading, total },
    actions,
  } = useWarehouseTransfer()
  const { t } = useTranslation(['wmsx'])
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('warehouseTransfer.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('warehouseTransfer.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'sourceWarehouseName',
        headerName: t('warehouseTransfer.sourceWarehouseName'),
        width: 150,
      },
      {
        field: 'sourceWarehouseName',
        headerName: t('warehouseTransfer.sourceFactoryName'),
        width: 150,
      },
      {
        field: 'sourceWarehouseName',
        headerName: t('warehouseTransfer.destinationWarehouseName'),
        width: 150,
      },
      {
        field: 'sourceWarehouseName',
        headerName: t('warehouseTransfer.destinationFactoryName'),
        width: 150,
      },
      {
        field: 'createdAt',
        headerName: t('warehouseTransfer.createdAt'),
        width: 200,
        filterFomat: 'date',
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'createbyuser',
        headerName: t('warehouseTransfer.createbyuser'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.createdByUser?.fullName
        },
      },
      {
        field: 'status',
        headerName: t('warehouseTransfer.status'),
        width: 200,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={TRANSFER_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('warehouseTransfer.actions'),
        width: 200,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isEdit = status === TRANSFER_STATUS.PENDING
          const isConfirmed = status === TRANSFER_STATUS.PENDING
          const isRejected = status === TRANSFER_STATUS.REJECTED
          const isDelete =
            status === TRANSFER_STATUS.PENDING ||
            status === TRANSFER_STATUS.REJECTED

          const hasTransaction =
            status === TRANSFER_STATUS.COMPLETED ||
            status === TRANSFER_STATUS.EXPORTING
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_TRANSFERS.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isEdit ||
                (isRejected && (
                  <IconButton
                    onClick={() =>
                      history.push(
                        ROUTE.WAREHOUSE_TRANSFERS.EDIT.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                ))}
              {isDelete && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {isConfirmed && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {hasTransaction && (
                <Button
                  variant="text"
                  // onClick={() => history.push()}
                  size="small"
                >
                  {t('warehouseTransfer.transactions')}
                </Button>
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseTransfers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseTransfer(tempItem?.id, () => {
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
    actions.confirmWarehouseTransferById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.WAREHOUSE_TRANSFERS.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseTransferOrder')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseTransfer.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseTransfer.title')}
        columns={columns}
        rows={warehouseTransferList}
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
      ></DataTable>
      <Dialog
        open={isOpenDeleteModal}
        title={t('warehouseTransfer.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseTransfer.deleteConfirm')}
        <LV
          label={t('warehouseTransfer.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
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
        noBorderBotttom
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('warehouseTransfer.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseTransfer.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default warehouseTransfer
