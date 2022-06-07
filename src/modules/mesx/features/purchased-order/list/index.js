import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_TYPE_MAP,
  PURCHASED_ORDER_STATUS,
  PURCHASED_ORDER_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import usePurchasedOrder from '~/modules/mesx/redux/hooks/usePurchasedOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'
import { rejectSchema } from './schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.PURCHASED_ORDER.LIST.PATH,
    title: ROUTE.PURCHASED_ORDER.LIST.TITLE,
  },
]

function PurchasedOrder() {
  const { t } = useTranslation('mesx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    vendorName: '',
    status: '',
    createdAt: null,
    deadline: null,
  }

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

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
    data: { purchasedOrderList, total, isLoading },
    actions,
  } = usePurchasedOrder()

  const columns = [
    {
      field: 'code',
      headerName: t('purchasedOrder.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('purchasedOrder.name'),
      width: 180,
      sortable: true,
      fixed: true,
    },
    {
      field: 'type',
      headerName: t('purchasedOrder.type'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const { type } = params.row
        return t(ORDER_TYPE_MAP[type])
      },
    },
    {
      field: 'vendorName',
      headerName: t('purchasedOrder.vendor.name'),
      width: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('purchasedOrder.status'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={PURCHASED_ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('purchasedOrder.createdAt'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { createdAt } = params.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('purchasedOrder.deadline'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { deadline } = params.row
        return convertUtcDateTimeToLocalTz(deadline)
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === PURCHASED_ORDER_STATUS.PENDING
        const isRejected = status === PURCHASED_ORDER_STATUS.REJECTED
        return (
          <Box sx={{ whiteSpace: 'nowrap' }}>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.PURCHASED_ORDER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isConfirmed && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.PURCHASED_ORDER.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenDeleteModal(true)
                  }}
                >
                  <Icon name="delete" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenConfirmModal(true)
                  }}
                >
                  <Icon name="tick" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenRejectModal(true)
                  }}
                >
                  <Icon name="remove" />
                </IconButton>
              </>
            )}
            {isRejected && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.PURCHASED_ORDER.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.PURCHASED_ORDER.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
            </IconButton>
          </Box>
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
        { ...filters, vendorName: filters?.vendorName?.name },
        columns,
      ),
      sort: convertSortParams(sort),
    }

    actions.searchPurchasedOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onSubmitDelete = () => {
    actions.deletePurchasedOrder(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenDeleteModal(false)
    setTempItem(null)
  }

  const onSubmitConfirm = () => {
    actions.confirmPurchasedOrderById(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
    setTempItem(null)
  }

  const onSubmitReject = () => {
    actions.rejectPurchasedOrderById(tempItem?.id, refreshData)
    setIsOpenRejectModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.PURCHASED_ORDER.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.purchasedOrder')}
      onSearch={setKeyword}
      placeholder={t('purchasedOrder.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('purchasedOrder.title')}
        rows={purchasedOrderList}
        pageSize={pageSize}
        page={page}
        columns={columns}
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
          validationSchema: filterSchema(t),
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('purchasedOrder.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('purchasedOrder.deleteConfirm')}
        <LV
          label={t('purchasedOrder.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrder.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        maxWidth="sm"
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={onSubmitConfirm}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('purchasedOrder.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrder.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectModal}
        title={t('general:common.notify')}
        maxWidth="sm"
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={onSubmitReject}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        validationSchema={Yup.object().shape({
          reason: Yup.string().required(t('general:form.required')),
        })}
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('purchasedOrder.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('purchasedOrder.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <Formik validationSchema={rejectSchema(t)}>
          {() => (
            <Form sx={{ mt: 2 }}>
              <Field.TextField
                name="reason"
                label={t('purchasedOrder.reason')}
                placeholder={t('purchasedOrder.reason')}
                multiline
                rows={3}
                required
                sx={{ mt: 4 / 3, color: 'subText' }}
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </Page>
  )
}

export default PurchasedOrder
