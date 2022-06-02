import React, { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ORDER_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const Movements = ({ breadcrumbs, movementType, onBack }) => {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const location = useLocation()
  const { parentId } = useParams()

  const {
    data: { movementList, total, isLoading },
    actions,
  } = useMovements()

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
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'warehouseType',
      headerName: t('movements.warehouseType'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.warehouse?.warehouseTypes
          ?.map((w) => w?.name)
          ?.join('; ')
      },
    },
    {
      field: 'orderCode',
      headerName: t('movements.letterCode'),
      width: 120,
      sortable: true,
    },
    {
      field: 'orderStatus',
      headerName: t('movements.orderStatus'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const status = Number(params?.row.orderStatus)
        return (
          <Status
            options={ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'approveDate',
      headerName: t('movements.approveDate'),
      filterFormat: 'date',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'createdByUser',
      headerName: t('movements.createdByUser'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.user?.fullName
      },
    },
    {
      field: 'movementStatus',
      headerName: t('movements.movementStatus'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('movements.action'),
      width: 100,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() => history.push(`${location.pathname}/${id}`)}
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
        { ...filters, movementType: movementType, orderId: parentId },
        columns,
      ),
      sort: convertSortParams(sort),
    }
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
      <DataTable
        title={t('movements.title')}
        rows={movementList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
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