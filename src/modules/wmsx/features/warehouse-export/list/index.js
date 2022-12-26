import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import {
  MOVEMENT_TYPE,
  MOVEMENT_TYPE_MAP,
  ORDER_STATUS,
  WAREHOUSE_EXPORT_TYPE,
  WAREHOUSE_MOVEMENT_ORDER_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useWarehouseExport from '~/modules/wmsx/redux/hooks/useWarehouseExport'
import { searchWarehouseExportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/search'
import { exportWarehouseExportApi } from '~/modules/wmsx/redux/sagas/warehouse-export/import-export-warehouse-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'
import WarehouseExportFilter from './filter-quick-form'
const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
  },
]
function WarehouseExport() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { warehouseExportList, total, isLoading },
    actions,
  } = useWarehouseExport()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [exportReceiptList, setExportReceiptList] = useState([])
  const [momentsType, setMomentsType] = useState(WAREHOUSE_EXPORT_TYPE.SO)
  const exportReceiptListFormat = useMemo(
    () =>
      exportReceiptList?.map((e) => ({
        ...e,
        id: e?.id,
        orderCode: e?.code,
        orderType: 3,
        movementType: 3,
        warehouse: e?.warehouseId,
        createdAt: e?.createdAt,
        user: e?.user,
      })),
    [exportReceiptList],
  )
  const DEFAULT_FILTERS = {
    code: '',
    createdByUser: '',
    status: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    createdAt: '',
    warehouseId: [],
    orderType: WAREHOUSE_EXPORT_TYPE.SO,
    movementType: MOVEMENT_TYPE.SO_EXPORT,
  }
  const {
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('movements.code'),
        width: 120,
        sortable: true,
        fixed: true,
      },
      {
        field: 'formNumber',
        headerName: t('movements.importExport.formNumber'),
        width: 120,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.ebsId || params?.row?.order?.ebsId
        },
      },
      {
        field: 'idWms',
        headerName: t('movements.importExport.idWms'),
        width: 120,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.orderType === WAREHOUSE_EXPORT_TYPE.SWIFT_LOCATOR
            ? ''
            : params.row.orderCode
        },
      },
      {
        field: 'orderType',
        headerName: t('movements.importExport.receiptType'),
        width: 120,
        renderCell: (params) => {
          return t(WAREHOUSE_MOVEMENT_ORDER_TYPE_MAP[params.row?.orderType])
        },
      },
      {
        field: 'movementType',
        headerName: t('movements.importExport.movementType'),
        width: 120,
        renderCell: (params) => {
          return t(MOVEMENT_TYPE_MAP[params.row?.movementType])
        },
      },
      {
        field: 'warehouseName',
        headerName: t('movements.importExport.warehouseName'),
        width: 120,
        sortable: false,
        renderCell: (params) => {
          return params?.row?.warehouse?.name
        },
      },
      {
        field: 'createdAt',
        headerName: t('movements.importExport.executeDate'),
        filterFormat: 'date',
        width: 120,
        sortable: true,
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return convertUtcDateToLocalTz(createdAt)
        },
      },
      {
        field: 'createdByUser',
        headerName: t('movements.createdByUser'),
        width: 120,
        sortable: false,
        renderCell: (params) => {
          return params?.row?.user?.fullName
        },
      },
      {
        field: 'action',
        headerName: t('movements.action'),
        width: 120,
        sortable: false,
        align: 'center',
        fixed: true,
        renderCell: (params) => {
          const { id, movementType, orderType } = params.row
          return (
            <div>
              <IconButton
                onClick={() => {
                  if (orderType === 3 && movementType !== 5) {
                    history.push(
                      ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  } else {
                    history.push(
                      ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                }}
              >
                <Icon name="show" />
              </IconButton>
            </div>
          )
        },
      },
    ],
    [exportReceiptList, warehouseExportList],
  )

  const refreshData = async () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          warehouseId: quickFilters?.warehouseId?.map((item) => item?.id),
          departmentReceiptId: filters?.departmentReceiptId?.id,
          businessTypeId: filters?.businessTypeId?.id,
          createdAt: filters?.createdAt || quickFilters?.createdAt,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    const paramsExport = {
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          status: [
            ORDER_STATUS.IN_COLLECTING,
            ORDER_STATUS.COLLECTED,
            ORDER_STATUS.COMPLETED,
          ],
          warehouseId: quickFilters?.warehouseId?.map((item) => item?.id),
          departmentReceiptId: filters?.departmentReceiptId?.id,
          businessTypeId: filters?.businessTypeId?.id,
          createdAt: filters?.createdAt || quickFilters?.createdAt,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    if (quickFilters?.movementType === 'export') {
      const response = await searchWarehouseExportReceiptApi(paramsExport)
      setExportReceiptList(response?.data?.items)
    } else {
      actions.searchWarehouseExport(params)
    }
  }
  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters, quickFilters])
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {
            exportWarehouseExportApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }}
          onRefresh={refreshData}
          disabled
        />
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExport')}
      renderHeaderRight={renderHeaderRight}
      placeholder={t('warehouseExport.searchPlaceholder')}
      loading={isLoading}
    >
      <WarehouseExportFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
        setMomentsType={setMomentsType}
      />
      <DataTable
        title={t('warehouseExport.tableTitle')}
        rows={
          quickFilters?.movementType === 'export'
            ? exportReceiptListFormat
            : warehouseExportList
        }
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm momentsType={momentsType} />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default WarehouseExport
