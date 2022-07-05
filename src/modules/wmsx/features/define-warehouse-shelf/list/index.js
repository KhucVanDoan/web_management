import React, { useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDefineWarehouseShelf from '~/modules/wmsx/redux/hooks/useDefineWarehouseShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FormFilter from './form-filter'

const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.WAREHOUSE_SHELF.LIST.PATH,
    title: ROUTE.WAREHOUSE_SHELF.LIST.TITLE,
  },
]

const DefineWarehouseShelf = () => {
  const {
    data: { defineWarehouseShelfList, isLoading, total },
    actions,
  } = useDefineWarehouseShelf()
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
        headerName: t('defineWarehouseShelf.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('defineWarehouseShelf.name'),
        width: 150,
        sortable: true,
      },
      {
        field: 'warehouseArea',
        headerName: t('defineWarehouseShelf.warehouseArea'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.warehouseSector?.name
        },
      },
      {
        field: 'warehouse',
        headerName: t('defineWarehouseShelf.warehouse'),
        width: 200,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return params?.row?.warehouse?.name
        },
      },

      {
        field: 'action',
        headerName: t('defineWarehouseShelf.actions'),
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
                    ROUTE.WAREHOUSE_SHELF.DETAIL.PATH.replace(':id', `${id}`),
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
    actions.searchDefineWarehouseShelf(params)
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
      title={t('menu.warehouseShelf')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineWarehouseShelf.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('defineWarehouseShelf.title')}
        columns={columns}
        rows={defineWarehouseShelfList}
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

export default DefineWarehouseShelf
