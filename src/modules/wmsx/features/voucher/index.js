import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import { DEFINE_VOUCHER_STATUS } from '../../constants'
import useVoucher from '../../redux/hooks/useVoucher'
import { ROUTE } from '../../routes/config'
import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_VOUCHER.LIST.PATH,
    title: ROUTE.DEFINE_VOUCHER.LIST.TITLE,
  },
]
function DefineVoucher() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [confirmModal, setConfirmModal] = useState(false)
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    date: '',
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
    data: { isLoading, voucherList, total },
    actions,
  } = useVoucher()

  const columns = [
    {
      field: 'code',
      headerName: t('defineVoucher.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('defineVoucher.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'percentage',
      headerName: t('defineVoucher.percentage'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'date',
      headerName: t('defineVoucher.date'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return (
          convertUtcDateToLocalTz(row.dateFrom) +
          ' - ' +
          convertUtcDateToLocalTz(row.dateTo)
        )
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
        const { id } = row
        const isPending = row?.status === DEFINE_VOUCHER_STATUS.PENDING
        const isConfirmed = row?.status === DEFINE_VOUCHER_STATUS.ACTIVE
        // const isActive = row?.status === DEFINE_VOUCHER_STATUS.ACTIVE
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_VOUCHER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>

            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_VOUCHER.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            {!isConfirmed && (
              <IconButton onClick={() => handleDeleteOpenModal(row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isPending && (
              <IconButton onClick={() => handleConfirmOpenModal(row)}>
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchVoucher(params)
  }

  const handleDeleteOpenModal = (tempItem) => {
    setDeleteModal(true)
    setTempItem(tempItem)
  }

  const handleConfirmOpenModal = (tempItem) => {
    setConfirmModal(true)
    setTempItem(tempItem)
  }

  const submitConfirm = () => {
    actions.confirmVoucherId(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
    setTempItem(null)
  }

  const onSubmitDelete = () => {
    actions.deleteVoucher(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <Button variant="outlined" icon="download" disabled>
          {t('defineVoucher.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_VOUCHER.CREATE.PATH)}
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
      title={t('menu.defineVoucher')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineVoucher.searchPlaceHolder')}
      loading={isLoading}
    >
      <DataTable
        title={t('defineVoucher.title')}
        rows={voucherList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
      />
      <Dialog
        open={deleteModal}
        title={t('defineVoucher.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineVoucher.confirmDelete')}
        <LabelValue
          label={t('defineVoucher.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('defineVoucher.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={confirmModal}
        title={t('defineVoucher.confirmTitle')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('defineVoucher.confirmBody')}
        <LabelValue
          label={t('defineVoucher.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('defineVoucher.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineVoucher
