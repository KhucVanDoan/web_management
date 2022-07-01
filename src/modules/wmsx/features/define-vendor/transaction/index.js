import { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Status from '~/components/Status'
import { PURCHASED_ORDER_STATUS } from '~/modules/database/constants'
import usePurchasedOrder from '~/modules/database/redux/hooks/usePurchasedOrder'
import { ROUTE } from '~/modules/database/routes/config'
import { PAYMENT_STATUS_OPTION } from '~/modules/wmsx/constants'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'

function TransactionVendor({ id }) {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
    purchasedAt: null,
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
        return convertUtcDateToLocalTz(purchasedAt)
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
        return convertUtcDateToLocalTz(deadline)
      },
    },
    {
      field: 'totalPrice',
      headerName: t('mesx:purchasedOrder.totalPrice'),
      width: 150,
      renderCell: (params) => {
        const { purchasedOrderDetail } = params.row
        return isEmpty(purchasedOrderDetail)
          ? 0
          : purchasedOrderDetail.reduce(
              (prev, curr) => prev + +curr.price * +curr.quantity,
              0,
            )
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
        const { company } = params?.row
        return company?.name
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
      filter: convertFilterParams(
        { ...filters, vendorId: id, status: PURCHASED_ORDER_STATUS.CONFIRMED },
        columns,
      ),
      sort: convertSortParams(sort),
    }

    actions.searchPurchasedOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  return (
    <DataTable
      title={`Tổng công nợ: ${vendorDetails?.totalMoney || 0} VNĐ`}
      beforeTopbar={
        // @TODO: <linh.taquang> handle export
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {}}
          onRefresh={refreshData}
          disabled
        />
      }
      rows={id ? purchasedOrderList : []}
      pageSize={pageSize}
      page={page}
      columns={columns}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onSortChange={setSort}
      total={id ? total : 0}
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
