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
import { DEFINE_PAYMENT_TYPE_STATUS } from '~/modules/wmsx/constants'
import useDefinePaymentType from '~/modules/wmsx/redux/hooks/useDefinePaymentType'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH,
    title: ROUTE.DEFINE_PAYMENT_TYPE.LIST.TITLE,
  },
]
function DefinePaymentType() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [confirmModal, setConfirmModal] = useState(false)
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
    data: { isLoading, paymentTypeList, total },
    actions,
  } = useDefinePaymentType()

  const columns = [
    {
      field: 'code',
      headerName: t('definePaymentType.code'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('definePaymentType.name'),
      width: 150,
      fixed: true,
      sortable: true,
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
        const isPending = row?.status === DEFINE_PAYMENT_TYPE_STATUS.PENDING
        const isConfirmed = row?.status === DEFINE_PAYMENT_TYPE_STATUS.ACTIVE
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isPending && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_PAYMENT_TYPE.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
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
    actions.searchPaymentTypes(params)
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
    actions.confirmPaymentTypeById(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
    setTempItem(null)
  }

  const onSubmitDelete = () => {
    actions.deletePaymentType(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_PAYMENT_TYPE.CREATE.PATH)}
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
      title={t('menu.definePaymentType')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('definePaymentType.searchPlaceHolder')}
      loading={isLoading}
    >
      <DataTable
        title={t('definePaymentType.title')}
        rows={paymentTypeList}
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
        title={t('definePaymentType.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('definePaymentType.deleteConfirm')}
        <LabelValue
          label={t('definePaymentType.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('definePaymentType.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={confirmModal}
        title={t('definePaymentType.confirmModalTitle')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('definePaymentType.confirmBody')}
        <LabelValue
          label={t('definePaymentType.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('definePaymentType.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefinePaymentType
