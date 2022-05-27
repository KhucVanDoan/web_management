import React, { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { INVENTORY_STATUS_OPTIONS } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: 'warehouseManagement',
  },
  {
    route: ROUTE.INVENTORY.LIST.PATH,
    title: ROUTE.INVENTORY.LIST.TITLE,
  },
]

const Inventory = () => {
  const {
    data: { inventoryStatistic, isLoading, total },
    actions,
  } = useInventory()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    executionDay: '',
    createdByUser: '',
    warehouseName: '',
    warehouseType: '',
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  useEffect(() => {
    actions.getWarehouseType()
  }, [])

  const columns = [
    {
      field: 'code',
      headerName: t('inventories.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'executionDay',
      headerName: t('inventories.inventoryExecutionDay'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
    },
    {
      field: 'createdByUser',
      headerName: t('inventories.createdByUser'),
      width: 150,
      sortable: false,
    },
    {
      field: 'warehouseName',
      headerName: t('inventories.warehouseName'),
      width: 200,
      sortable: false,
    },
    {
      field: 'warehouseType',
      headerName: t('inventories.warehouseType'),
      width: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('inventories.inventoryStatus'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={INVENTORY_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('inventories.action'),
      width: 100,
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.INVENTORY.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const formattedData = inventoryStatistic?.map((item) => ({
    id: item?.id,
    code: item?.code,
    executionDay: item?.executionDay
      ? convertUtcDateToLocalTz(item?.executionDay)
      : '',
    createdByUser: item?.createdByUser?.fullName,
    warehouseName: item?.warehouse?.name,
    warehouseId: item?.warehouse?.id,
    warehouseType: item?.warehouse?.warehouseTypes
      .map((type) => type.name)
      .join(','),
    status: item?.status,
  }))

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchInventory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <Button variant="outlined" icon="download">
          {t('warehouseSetting.import')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventory')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseSetting.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('inventories.title')}
        columns={columns}
        rows={formattedData}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default Inventory
