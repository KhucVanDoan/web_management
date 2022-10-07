import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTableCollapse from '~/components/DataTableCollapse'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'

import FilterForm from './filter-form'

function ItemSettingTableRecipt() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const { page, pageSize, setPage, setPageSize, setSort, filters, setFilters } =
    useQueryState()
  const {
    data: { isLoadingItem, totalItem, itemListDetailRecipt },
    actions,
  } = useInventoryCalendar()
  useEffect(() => {
    refreshData()
  }, [id, page])
  const refreshData = () => {
    const params = {
      id: id,
      page,
      limit: pageSize,
    }
    actions.getListItemDetailRecipt(params)
  }

  const dataTable = itemListDetailRecipt?.map((item) => ({
    ...item,
    planQuantity: +item?.planQuantity,
    details: item?.lots,
  }))

  const getColumns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'itemCode',
      headerName: t('inventoryCalendar.items.itemCode'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('inventoryCalendar.items.itemName'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.item?.name
      },
    },
    {
      field: 'unit',
      headerName: t('inventoryCalendar.items.unit'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.item?.itemUnit?.name
      },
    },
    {
      field: 'inventoryDay',
      headerName: t('inventoryCalendar.items.inventoryDay'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.inventoryDay
      },
    },
    {
      field: 'warehouseCode',
      headerName: t('inventoryCalendar.items.warehouseCode'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.warehouseCode
      },
    },
    {
      field: 'location',
      headerName: t('inventoryCalendar.items.location'),
      width: 50,
    },
    {
      field: 'lotNumber',
      headerName: t('inventoryCalendar.items.lotNumber'),
      width: 50,
    },
    {
      field: 'planQuantity',
      headerName: t('inventoryCalendar.items.planQuantity'),
      width: 50,
    },
    {
      field: 'importedQuantityFromCheckPointToExecuteDate',
      headerName: t(
        'inventoryCalendar.items.importedQuantityFromCheckPointToExecuteDate',
      ),
      width: 50,
    },
    {
      field: 'exportedQuantityFromCheckPointToExecuteDate',
      headerName: t(
        'inventoryCalendar.items.exportedQuantityFromCheckPointToExecuteDate',
      ),
      width: 50,
    },
    {
      field: 'inventoryQuantityAtExecuteDate',
      headerName: t('inventoryCalendar.items.inventoryQuantityAtExecuteDate'),
      width: 50,
    },
    {
      field: 'actualInventoryQuantity',
      headerName: t('inventoryCalendar.items.actualInventoryQuantity'),
      width: 50,
    },
    {
      field: 'importedQuantityFromStartExecute',
      headerName: t('inventoryCalendar.items.importedQuantityFromStartExecute'),
      width: 50,
    },
    {
      field: 'exportedQuantityFromStartExecute',
      headerName: t('inventoryCalendar.items.exportedQuantityFromStartExecute'),
      width: 50,
    },
    {
      field: 'remainingQuantityAtCheckPoint',
      headerName: t('inventoryCalendar.items.remainingQuantityAtCheckPoint'),
      width: 50,
    },
    {
      field: 'actualRemainingQuantityAtCheckPoint',
      headerName: t(
        'inventoryCalendar.items.actualRemainingQuantityAtCheckPoint',
      ),
      width: 50,
    },
    {
      field: 'excessQuantity',
      headerName: t('inventoryCalendar.items.excessQuantity'),
      width: 50,
    },
    {
      field: 'missingQuantity',
      headerName: t('inventoryCalendar.items.missingQuantity'),
      width: 50,
    },
  ]
  return (
    <>
      <DataTableCollapse
        rows={dataTable}
        title={t('inventoryCalendar.items.tableTitle')}
        loading={isLoadingItem}
        total={totalItem}
        columns={getColumns}
        pageSize={pageSize}
        page={page}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        striped={false}
      />
    </>
  )
}

export default ItemSettingTableRecipt
