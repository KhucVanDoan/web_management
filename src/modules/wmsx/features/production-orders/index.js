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
import Status from '~/components/Status'
import { ORDER_TYPE_MAP } from '~/modules/mesx/constants'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  ORDER_STATUS,
  ORDER_STATUS_OPTIONS,
  TRANSFER_STATUS,
} from '../../constants'
import useProductionOrder from '../../redux/hooks/useProductionOrder'
import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.ORDER_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.PRODUCTION_ORDER.LIST.PATH,
    title: ROUTE.PRODUCTION_ORDER.LIST.TITLE,
  },
]
function ProductionOrder() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [confirmModal, setConfirmModal] = useState(false)
  // const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    type: '',
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
    data: { isLoading, productionOrderList, total },
    actions,
  } = useProductionOrder()

  const columns = [
    {
      field: 'code',
      headerName: t('productionOrder.codeList'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('productionOrder.nameList'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'type',
      headerName: t('productionOrder.typeList'),
      width: 150,
      fixed: true,
      sortable: true,
      renderCell: (params) => {
        const { type } = params.row
        return t(ORDER_TYPE_MAP[type])
      },
    },
    {
      field: 'description',
      headerName: t('productionOrder.description'),
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: t('productionOrder.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('productionOrder.deadline'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { deadline } = params?.row
        return convertUtcDateTimeToLocalTz(deadline)
      },
    },
    {
      field: 'status',
      headerName: t('productionOrder.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
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
      field: 'action',
      headerName: t('productionOrder.action'),
      fixed: true,
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id, status } = row
        const isEdit = status === ORDER_STATUS.PENDING
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        const hasTransaction =
          status === TRANSFER_STATUS.COMPLETED ||
          status === TRANSFER_STATUS.EXPORTING
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.PRODUCTION_ORDER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.PRODUCTION_ORDER.EDIT.PATH.replace(':id', `${id}`),
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
            {isConfirmed && (
              // @TODO: waiting confirm BA
              <IconButton
                onClick={() => {
                  setTempItem(row)
                  // setIsOpenRejectModal(true)
                }}
                disabled
              >
                <Icon name="remove" />
              </IconButton>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() =>
                  history.push(
                    `${ROUTE.PRODUCTION_ORDER.TRANSACTIONS.LIST.PATH.replace(
                      ':parentId',
                      `${id}`,
                    )}`,
                  )
                }
              >
                {t('productionOrder.transactions')}
              </Button>
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
    actions.searchProductionOrders(params)
  }

  const submitConfirm = () => {
    actions.confirmProductionOrderById(tempItem?.id, () => {
      refreshData()
    })
    setConfirmModal(false)
    setTempItem(null)
  }

  const handleDeleteOpenModal = (tempItem) => {
    setDeleteModal(true)
    setTempItem(tempItem)
  }

  const handleConfirmOpenModal = (tempItem) => {
    setConfirmModal(true)
    setTempItem(tempItem)
  }

  const onSubmitDelete = () => {
    actions.deleteProductionOrder(tempItem?.id, () => {
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
          {t('productionOrder.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.PRODUCTION_ORDER.CREATE.PATH)}
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
      title={t('menu.productionOrder')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('productionOrder.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('productionOrder.title')}
        rows={productionOrderList}
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
        title={t('productionOrder.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('productionOrder.deleteConfirm')}
        <LabelValue
          label={t('productionOrder.codeList')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('productionOrder.nameList')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={confirmModal}
        title={t('productionOrder.confirmTitle')}
        onCancel={() => setConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('productionOrder.confirmBody')}
        <LabelValue
          label={t('productionOrder.codeList')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('productionOrder.nameList')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ProductionOrder
