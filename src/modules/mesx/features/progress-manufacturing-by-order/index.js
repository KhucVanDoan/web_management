import React, { useEffect } from 'react'

import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ROUTE as ROUTEDATABASE } from '~/modules/database/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import { PROGRESS_MANUFACTURING_BY_ORDER_STATUS_OPTION } from '../../constants'
import useProgressManufacturingByOrder from '../../redux/hooks/useProgressManufacturingByOrder'
import { ROUTE } from '../../routes/config'
import ProgressManufacturingFilter from './filter-form'
const breadcrumbs = [
  { title: 'statistical' },
  {
    route: ROUTE.PROGRESS_MANUFACTURING_BY_ORDER.LIST.PATH,
    title: ROUTE.PROGRESS_MANUFACTURING_BY_ORDER.LIST.TITLE,
  },
]
const progressManufacturingByOrder = () => {
  const {
    page,
    keyword,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
    filters,
    setFilters,
    setKeyword,
  } = useQueryState()
  const history = useHistory()
  const {
    data: { isLoading, progressByOrderList },
    actions,
  } = useProgressManufacturingByOrder()
  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, filters, sort])
  const { t } = useTranslation(['mesx'])
  const renderHeaderRight = () => {
    // @TODO: <doan.khucvan> handle export
    return (
      <Button variant="outlined" disabled icon="download">
        {t('progressManufacturingByOrder.export')}
      </Button>
    )
  }
  const columns = [
    {
      field: 'soIds',
      headerName: t('progressManufacturingByOrder.code'),
      width: 100,
      sortable: true,
      filterFormat: 'multiple',
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return (
          <Button
            variant="text"
            onClick={() =>
              history.push(
                ROUTEDATABASE.SALE_ORDER.DETAILS.PATH.replace(
                  ':id',
                  `${row?.saleOrder?.id}`,
                ),
              )
            }
            size="small"
            bold={false}
          >
            {row?.saleOrder?.code}
          </Button>
        )
      },
    },
    {
      field: 'name',
      headerName: t('progressManufacturingByOrder.name'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        return row?.saleOrder?.name
      },
    },
    {
      field: 'orderedAt',
      headerName: t('progressManufacturingByOrder.dateSell'),
      width: 150,
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row?.saleOrder?.orderedAt)
      },
    },
    {
      field: 'deadline',
      headerName: t('progressManufacturingByOrder.deliveryDate'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row?.saleOrder?.deadline)
      },
    },
    {
      field: 'status',
      headerName: t('progressManufacturingByOrder.status'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={PROGRESS_MANUFACTURING_BY_ORDER_STATUS_OPTION}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'masterPlanIds',
      headerName: t('progressManufacturingByOrder.planManufacturing'),
      width: 200,
      filterFormat: 'multiple',
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.masterPlan?.code
      },
    },
    {
      field: 'moName',
      headerName: t('progressManufacturingByOrder.moName'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row.code
      },
    },
    {
      field: 'planDate',
      headerName: t('progressManufacturingByOrder.datePlan'),
      width: 200,
      filterFormat: 'date',
      sortable: true,
      align: 'left',
      renderCell: (params) => {
        const { row } = params
        return `${convertUtcDateToLocalTz(
          row?.planFrom,
        )} - ${convertUtcDateToLocalTz(row?.planTo)}`
      },
    },
    {
      field: 'datePerform',
      headerName: t('progressManufacturingByOrder.datePerform'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row?.masterPlan?.dateFrom)
      },
    },
    {
      field: 'dateEnd',
      headerName: t('progressManufacturingByOrder.dateEnd'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return convertUtcDateToLocalTz(row?.completedAt)
      },
    },
    {
      field: 'planQuantity',
      headerName: t('progressManufacturingByOrder.planQuantity'),
      width: 100,
      sortable: true,
      align: 'right',
    },
    {
      field: 'actualQuantity',
      headerName: t('progressManufacturingByOrder.quantity'),
      width: 100,
      sortable: true,
      align: 'right',
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          masterPlanIds: filters?.masterPlanIds?.map((e) => e?.id),
        },
        [
          ...columns,
          {
            field: 'soIds',
          },
          {
            field: 'isHasPlan',
          },
        ],
      ),
      sort: convertSortParams(sort),
    }
    actions.getProgressManufacturingByOrder(params)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.progressManufacturingByOrder')}
      onSearch={setKeyword}
      placeholder={t('progressManufacturingByOrder.searchPlaceholder')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <ProgressManufacturingFilter setFilters={setFilters} />
      <Box mt={4}>
        <DataTable
          title={t('progressManufacturingByOrder.title')}
          rows={progressByOrderList?.items}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          total={progressByOrderList?.meta?.total}
          sort={sort}
          hideSetting
        />
      </Box>
    </Page>
  )
}

export default progressManufacturingByOrder
