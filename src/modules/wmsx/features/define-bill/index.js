import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  DEFINE_BILL_STATUS,
  DEFINE_BILL_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useBill from '~/modules/wmsx/redux/hooks/useBill'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_BILL.LIST.PATH,
    title: ROUTE.DEFINE_BILL.LIST.TITLE,
  },
]
function DefineBill() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [confirmModal, setConfirmModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    invoiceType: '',
    customer: '',
    currencyUnit: '',
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
  } = useQueryState()

  const {
    data: { isLoading, billList, total },
    actions,
  } = useBill()

  const columns = [
    {
      field: 'code',
      headerName: t('defineBill.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('defineBill.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'invoiceType',
      headerName: t('defineBill.type'),
      width: 150,
      fixed: true,
      sortable: true,
      renderCell: (params) => {
        return params.row?.invoiceType?.name
      },
    },
    {
      field: 'customer',
      headerName: t('defineBill.customerName'),
      width: 150,
      fixed: true,
      sortable: true,
      renderCell: (params) => {
        return params.row?.customer?.name
      },
    },
    {
      field: 'totalPrice',
      headerName: t('defineBill.cost'),
      width: 150,
      sortable: false,
    },
    {
      field: 'currencyUnit',
      headerName: t('defineBill.currencyUnit'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params.row?.currencyUnit?.name
      },
    },
    {
      field: 'status',
      headerName: t('defineBill.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEFINE_BILL_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdBy',
      headerName: t('defineBill.createdBy'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.createByUser?.fullName
      },
    },
    {
      field: 'createdAt',
      headerName: t('defineBill.createdAt'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row.createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      fixed: true,
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id, status } = row
        const isEdit = status === DEFINE_BILL_STATUS.PENDING
        const isConfirmed = status === DEFINE_BILL_STATUS.PENDING
        const isDelete =
          status === DEFINE_BILL_STATUS.PENDING ||
          status === DEFINE_BILL_STATUS.REJECTED
        const isRejected = status === DEFINE_BILL_STATUS.REJECTED
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_BILL.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>

            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_BILL.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton onClick={() => handleDeleteOpenModal(row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton onClick={() => handleConfirmOpenModal(row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {isRejected && (
              <IconButton disabled>
                <Icon name="remove" />
              </IconButton>
            )}
          </>
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
    actions.searchBills(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleDeleteOpenModal = (tempItem) => {
    setDeleteModal(true)
    setTempItem(tempItem)
  }

  const handleConfirmOpenModal = (tempItem) => {
    setConfirmModal(true)
    setTempItem(tempItem)
  }

  const onSubmitDelete = () => {
    actions.deleteBill(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
    setTempItem(null)
  }

  const submitConfirm = () => {
    actions.confirmBillById(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_BILL.CREATE.PATH)}
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
      title={t('menu.defineBill')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineBill.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('defineBill.title')}
        rows={billList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
        bulkActions={{
          actions: [
            BULK_ACTION.APPROVE,
            BULK_ACTION.REJECT,
            BULK_ACTION.DELETE,
          ],
          apiUrl: API_URL.BILL,
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
        open={deleteModal}
        title={t('defineBill.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineBill.deleteConfirm')}
        <LabelValue
          label={t('defineBill.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('defineBill.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={confirmModal}
        title={t('general:common.notify')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LabelValue
          label={t('defineBill.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('defineBill.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineBill
