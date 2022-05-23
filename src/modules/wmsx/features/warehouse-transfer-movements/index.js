import { useEffect, useMemo } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useWarehouseTransferMovements from '~/modules/wmsx/redux/hooks/useWarehouseTransferMovements'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import {
  TRANSFER_STATUS_MAP,
  MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT,
  MOVEMENT_STATUS,
} from '../../constants'
import FilterForm from './filter'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.PATH,
    title: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.TITLE,
  },
  {
    title: 'warehouseTransfer',
  },
]
function WarehouseTransferMovements() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    id: '',
    orderCode: '',
    warehouseTypes: '',
    movementType: '',
    orderStatus: '',
    createdAt: '',
    createdBy: '',
    sourceWarehouseName: '',
    destinationWarehouseName: '',
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { warehouseTransferMovementList, total, isLoading },
    actions,
  } = useWarehouseTransferMovements()

  const columns = [
    {
      field: 'id',
      headerName: t('warehouseTransferMovement.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'orderCode',
      headerName: t('warehouseTransferMovement.letterCode'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'warehouseTypes',
      headerName: t('warehouseTransferMovement.warehouseType'),
      width: 150,
    },
    {
      field: 'movementType',
      headerName: t('warehouseTransferMovement.type'),
      width: 150,
    },
    {
      field: 'orderStatus',
      headerName: t('warehouseTransferMovement.letterStatus'),
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: t('warehouseTransferMovement.transferOn'),
      width: 150,
    },
    {
      field: 'createdBy',
      headerName: t('warehouseTransferMovement.createdByUser'),
      width: 150,
    },
    {
      field: 'sourceWarehouseName',
      headerName: t('warehouseTransferMovement.sourceWarehouseName'),
      width: 150,
    },
    {
      field: 'destinationWarehouseName',
      headerName: t('warehouseTransferMovement.destinationWarehouseName'),
      width: 150,
    },
    {
      field: 'status',
      headerName: t('warehouseTransferMovement.transactionStatus'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={MOVEMENT_STATUS} value={status} variant="text" />
        )
      },
    },
    {
      field: 'action',
      headerName: t('defineWarehouse.action'),
      width: 50,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters])

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseTransferMovements(params)
  }

  const formatData = useMemo(() => {
    return warehouseTransferMovementList.map((movement) => {
      return {
        id: movement.id,
        warehouseTypes: movement.warehouse.warehouseTypes
          ?.map((type) => type?.name || '')
          ?.join('; '),
        orderCode: movement?.transfer?.code,
        status: parseInt(movement.status),
        createdAt: convertUtcDateToLocalTz(movement.createdAt),
        createdBy: movement.user?.fullName ?? movement?.user?.username ?? '',
        sourceWarehouseName: movement.transfer?.sourceWarehouseName,
        orderStatus: t(TRANSFER_STATUS_MAP[movement.transfer?.status]),
        destinationWarehouseName: movement.transfer?.destinationWarehouseName,
        movementType: t(
          MOVEMENT_WAREHOUSE_TRANSFER_ORDER_TYPE_MAP_TEXT[
            movement?.movementType
          ],
        ),
      }
    })
  }, [warehouseTransferMovementList])

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.warehouseTransfer')}
        loading={isLoading}
      >
        <DataTable
          title={t('warehouseTransferMovement.title')}
          rows={formatData}
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
      </Page>
    </>
  )
}

export default WarehouseTransferMovements
