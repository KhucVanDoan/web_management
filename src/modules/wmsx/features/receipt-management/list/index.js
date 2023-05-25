import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  RECEIPT_MANAGEMENT_STATUS,
  RECEIPT_MANAGEMENT_STATUS_OPTIONS,
  STATUS_SYNC_RECEIPT_TO_EBS,
  STATUS_SYNC_RECEIPT_TO_EBS_OPTIONS,
} from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import ReceiptManagementFilter from './filter-quick-form'

const breadcrumbs = [
  {
    route: ROUTE.RECEIPT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.LIST.TITLE,
  },
]
function ReceiptManagement() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const [openModalSync, setOpenModalSync] = useState(false)
  const [tempItem, setTempItem] = useState(null)
  const {
    data: { receiptList, total, isLoading },
    actions,
  } = useReceiptManagement()

  const DEFAULT_QUICK_FILTERS = {
    receiptNo: '',
    receiptCode: '',
    contractNo: '',
    createdAt: '',
  }

  const DEFAULT_FILTERS = {
    code: '',
    createdByUser: '',
    status: '',
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
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      visible: 'always',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('receiptManagement.receiptCode'),
      width: 120,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'receiptNumber',
      headerName: t('receiptManagement.receiptNo'),
      width: 120,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'contractNumber',
      headerName: t('receiptManagement.contractNo'),
      width: 120,
    },

    {
      field: 'createdAt',
      headerName: t('receiptManagement.createdAt'),
      filterFormat: 'date',
      width: 120,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('general.status'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={RECEIPT_MANAGEMENT_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'syncStatus',
      headerName: t('receiptManagement.adjustDelivery'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const syncStatus = Number(params?.row.syncStatus)
        return (
          <Status
            options={STATUS_SYNC_RECEIPT_TO_EBS_OPTIONS}
            value={syncStatus}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('movements.action'),
      width: 120,
      sortable: false,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      resizable: false,
      renderCell: (params) => {
        const { id, status, syncStatus } = params.row
        const isCanceled = status === RECEIPT_MANAGEMENT_STATUS.NOT_YET_STOCKED
        const isRetrySync =
          syncStatus === STATUS_SYNC_RECEIPT_TO_EBS.SYNC_WSO2_ERROR ||
          syncStatus === STATUS_SYNC_RECEIPT_TO_EBS.SYNC_TO_EBS_ERROR
        return (
          <div>
            <Guard code={FUNCTION_CODE.SALE_DETAIL_RECEIPT}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            {isCanceled && (
              <Guard code={FUNCTION_CODE.SALE_RETURN_RECEIPT}>
                <IconButton
                  onClick={() => {
                    setOpenModal(true)
                    setTempItem(params?.row)
                  }}
                >
                  <Icon name="remove" />
                </IconButton>
              </Guard>
            )}
            {isRetrySync && (
              <Guard code={FUNCTION_CODE.SALE_SYNC_DELIVERY_RETURN_RECEIPT_EBS}>
                <IconButton
                  onClick={() => {
                    setOpenModalSync(true)
                    setTempItem(params?.row)
                  }}
                >
                  <Icon name="retrySyncReceipt" />
                </IconButton>
              </Guard>
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
          ...quickFilters,
          createdAt: filters?.createdAt || quickFilters?.createdAt,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchReceipt(params)
  }
  const onSubmitReturn = () => {
    actions.returnReceiptById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setOpenModal(false)
  }
  const onSubmitRetrySync = () => {
    actions.receiptEBSById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setOpenModalSync(false)
  }
  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.receiptManagement')}
      onSearch={setKeyword}
      placeholder={t('receiptManagement.searchPlaceholder')}
      loading={isLoading}
    >
      <ReceiptManagementFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        rows={receiptList}
        columns={columns}
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
          onApply: setFilters,
        }}
      />
      <Dialog
        open={openModal}
        title={t('receiptManagement.returnReceiptTitlePopup')}
        onCancel={() => setOpenModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitReturn}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('receiptManagement.returnReceiptConfirm')}
        <Typography sx={{ display: 'flex' }}>
          <>
            {t('receiptManagement.returnReceiptConfirmText')}
            <Typography sx={{ ml: 0.5, mr: 0.5, fontWeight: 800 }}>
              {tempItem?.receiptNumber}
            </Typography>
            -{' '}
            <Typography sx={{ ml: 0.5 }}>
              {t('receiptManagement.contractNumber')}
            </Typography>
            <Typography sx={{ ml: 0.5, fontWeight: 800 }}>
              {tempItem?.contractNumber}
            </Typography>
            <Typography sx={{ ml: 0.3 }}> ?</Typography>
          </>
        </Typography>
      </Dialog>
      <Dialog
        open={openModalSync}
        title={t('receiptManagement.confirmSyncTitle')}
        onCancel={() => setOpenModalSync(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRetrySync}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('receiptManagement.confirmSyncMessage')}
      </Dialog>
    </Page>
  )
}

export default ReceiptManagement
