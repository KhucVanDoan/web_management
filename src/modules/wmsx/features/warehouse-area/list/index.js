import React, { useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FormFilter from './filter'
const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.WAREHOUSE_AREA.LIST.PATH,
    title: ROUTE.WAREHOUSE_AREA.LIST.TITLE,
  },
]

const WarehouseArea = () => {
  const {
    data: { warehouseAreaList, isLoading, total },
    actions,
  } = useWarehouseArea()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('warehouseArea.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('warehouseArea.name'),
        width: 150,
        sortable: true,
      },

      {
        field: 'warehouseName',
        headerName: t('warehouseArea.warehouseName'),
        width: 200,
        sortable: true,
        fixed: true,
      },
      {
        field: 'createdAt',
        headerName: t('warehouseArea.createdAt'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'action',
        headerName: t('warehouseArea.actions'),
        width: 200,
        align: 'center',
        fixed: true,
        renderCell: (params) => {
          const { id } = params?.row
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_AREA.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseAreas(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return <></>
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseArea')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseArea.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseArea.title')}
        columns={columns}
        rows={warehouseAreaList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FormFilter />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      ></DataTable>
    </Page>
  )
}

export default WarehouseArea
