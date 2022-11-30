import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import {
  MOVEMENT_TYPE_MAP,
  WAREHOUSE_MOVEMENT_ORDER_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import MovementsFilter from './filter-quick-form'

const Movements = ({ breadcrumbs, movementType, movementTypeOpts, onBack }) => {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const location = useLocation()
  const { parentId } = useParams()

  const {
    data: { movementList, total, isLoading },
    actions,
  } = useMovements()

  const warehouse =
    movementList?.length > 0 ? movementList?.[0]?.warehouse : null
  const DEFAULT_FILTERS = {
    createdAt: '',
    movementType: movementType,
    warehouseId: warehouse?.name,
  }

  const [exportReceiptList, setExportReceiptList] = useState([])
  const [movement, setMovement] = useState('')

  const exportReceiptListFormat = exportReceiptList?.map((e) => ({
    id: e?.id,
    orderCode: e?.code,
    orderType: 3,
    movementType: 3,
    warehouse: e?.warehouseId,
    createdAt: e?.createdAt,
  }))

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

  const columns = [
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
      fixed: true,
      renderCell: (params) => {
        const { form } = params?.row
        return form?.name || ''
      },
    },
    {
      field: 'idWms',
      headerName: t('movements.importExport.idWms'),
      width: 120,
      fixed: true,
      sortable: true,
      renderCell: (params) => params.row?.orderCode,
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
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'createdByUser',
      headerName: t('movements.createdByUser'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.user?.username
      },
    },
    {
      field: 'action',
      headerName: t('movements.action'),
      width: 100,
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
                    ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                } else {
                  history.push(`${location.pathname}/${id}`)
                }
              }}
            >
              <Icon name="show" />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const refreshData = () => {
    if (!parentId) return

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          movementType: movementType,
          orderId: parentId,
          ...filters,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    setExportReceiptList([])
    setMovement('')
    actions.searchMovements(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, parentId])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.movements')}
      onSearch={setKeyword}
      onBack={onBack}
      placeholder={t('movements.searchPlaceholder')}
      loading={isLoading}
    >
      <MovementsFilter
        setQuickFilters={setFilters}
        quickFilters={filters}
        defaultFilter={DEFAULT_FILTERS}
        movementTypeOpts={movementTypeOpts}
        setExportReceiptList={setExportReceiptList}
        setMovement={setMovement}
      />
      <DataTable
        title={t('movements.title')}
        rows={
          isEmpty(exportReceiptList) && movement !== 'export'
            ? movementList
            : exportReceiptListFormat
        }
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
      />
    </Page>
  )
}

Movements.defaultProps = {
  breadcrumbs: [],
}

Movements.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default Movements
