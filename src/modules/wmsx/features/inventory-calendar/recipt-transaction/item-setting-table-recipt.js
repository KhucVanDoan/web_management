import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTableCollapse from '~/components/DataTableCollapse'
import NumberFormatText from '~/components/NumberFormat'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'

// import FilterForm from './filter-form'

function ItemSettingTableRecipt() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const { page, pageSize, setPage, setPageSize, setSort } = useQueryState()
  const {
    data: { isLoadingItem, totalItem, itemListDetailRecipt },
    actions,
  } = useInventoryCalendar()
  useEffect(() => {
    refreshData()
  }, [id, page, pageSize])
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
      width: 250,
      renderCell: (params) => {
        return params?.row?.item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('inventoryCalendar.items.itemName'),
      width: 250,
      renderCell: (params) => {
        return params?.row?.item?.name
      },
    },
    {
      field: 'unit',
      headerName: t('inventoryCalendar.items.unit'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.item?.itemUnit?.name
      },
    },
    {
      field: 'inventoryDay',
      headerName: t('inventoryCalendar.items.inventoryDay'),
      width: 150,
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
      width: 150,
    },
    {
      field: 'lotNumber',
      headerName: t('inventoryCalendar.items.lotNumber'),
      width: 150,
    },
    {
      field: 'planQuantity',
      headerName: t('inventoryCalendar.items.planQuantity'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.planQuantity}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'importedQuantityFromCheckPointToExecuteDate',
      headerName: t(
        'inventoryCalendar.items.importedQuantityFromCheckPointToExecuteDate',
      ),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.importedQuantityFromCheckPointToExecuteDate}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'exportedQuantityFromCheckPointToExecuteDate',
      headerName: t(
        'inventoryCalendar.items.exportedQuantityFromCheckPointToExecuteDate',
      ),
      width: 50,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.exportedQuantityFromCheckPointToExecuteDate}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'inventoryQuantityAtExecuteDate',
      headerName: t('inventoryCalendar.items.inventoryQuantityAtExecuteDate'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.inventoryQuantityAtExecuteDate}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'actualInventoryQuantity',
      headerName: t('inventoryCalendar.items.actualInventoryQuantity'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.actualInventoryQuantity}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'importedQuantityFromStartExecute',
      headerName: t('inventoryCalendar.items.importedQuantityFromStartExecute'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.importedQuantityFromStartExecute}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'exportedQuantityFromStartExecute',
      headerName: t('inventoryCalendar.items.exportedQuantityFromStartExecute'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.exportedQuantityFromStartExecute}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'remainingQuantityAtCheckPoint',
      headerName: t('inventoryCalendar.items.remainingQuantityAtCheckPoint'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.remainingQuantityAtCheckPoint}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'actualRemainingQuantityAtCheckPoint',
      headerName: t(
        'inventoryCalendar.items.actualRemainingQuantityAtCheckPoint',
      ),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.actualRemainingQuantityAtCheckPoint}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'excessQuantity',
      headerName: t('inventoryCalendar.items.excessQuantity'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.excessQuantity}
            formatter="quantity"
          />
        )
      },
    },
    {
      field: 'missingQuantity',
      headerName: t('inventoryCalendar.items.missingQuantity'),
      width: 80,
      renderCell: (params) => {
        return (
          <NumberFormatText
            value={params?.row?.missingQuantity}
            formatter="quantity"
          />
        )
      },
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
        // filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        hideSetting
        striped={false}
      />
    </>
  )
}

export default ItemSettingTableRecipt
