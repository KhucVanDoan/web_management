import { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Status from '~/components/Status'
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import { ROUTE } from '~/modules/database/routes/config'
import { PAYMENT_STATUS_OPTION } from '~/modules/wmsx/constants'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter'

function TransactionVendor({ id }) {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
    createdAt: null,
    deadline: null,
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { purchasedOrderList, total },
    actions,
  } = usePurchasedOrder()

  const {
    data: { vendorDetails },
  } = useDefineVendor()

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      fixed: true,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('mesx:purchasedOrder.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('mesx:purchasedOrder.name'),
      width: 180,
      sortable: true,
      fixed: true,
    },
    {
      field: 'purchasedAt',
      headerName: t('mesx:purchasedOrder.purchasedAt'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { purchasedAt } = params.row
        return convertUtcDateTimeToLocalTz(purchasedAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('mesx:purchasedOrder.deadline'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { deadline } = params.row
        return convertUtcDateTimeToLocalTz(deadline)
      },
    },
    {
      field: 'totalPrice',
      headerName: t('mesx:purchasedOrder.totalPrice'),
      width: 150,
      renderCell: (params) => {
        const { price, quantity } = params?.row?.purchasedOrderDetail[0]
        return price * quantity
      },
    },
    {
      field: 'statusPay',
      headerName: t('mesx:purchasedOrder.payStatus'),
      width: 150,
      renderCell: (params) => {
        const { paymentStatus } = params.row
        return (
          <Status
            options={PAYMENT_STATUS_OPTION}
            value={paymentStatus}
            variant="text"
          />
        )
      },
    },
    {
      field: 'customer',
      headerName: t('mesx:purchasedOrder.customer.subTitle'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { vendorName } = params?.row
        return vendorName
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <IconButton
            onClick={() =>
              history.push(
                ROUTE.PURCHASED_ORDER.DETAIL.PATH.replace(':id', `${id}`),
              )
            }
          >
            <Icon name="show" />
          </IconButton>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams({ ...filters, vendorId: id }, columns),
      sort: convertSortParams(sort),
    }

    actions.searchPurchasedOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  return (
    <DataTable
      title={`Tổng công nợ: ${vendorDetails?.totalMoney} VNĐ`}
      rows={purchasedOrderList}
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
  )
}

export default TransactionVendor
