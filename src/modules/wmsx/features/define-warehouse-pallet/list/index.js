import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDefineWarehousePallet from '~/modules/wmsx/redux/hooks/useDefineWarehousePallet'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FormFilter from './form-filter'

const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.WAREHOUSE_PALLET.LIST.PATH,
    title: ROUTE.WAREHOUSE_PALLET.LIST.TITLE,
  },
]

const DefineWarehousePallet = () => {
  const {
    data: { defineWarehousePalletList, isLoading, total },
    actions,
  } = useDefineWarehousePallet()

  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
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
        headerName: t('defineWarehousePallet.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('defineWarehousePallet.name'),
        width: 150,
        sortable: true,
      },
      {
        field: 'warehouseArea',
        headerName: t('defineWarehousePallet.warehouseShelf'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.warehouseShelf?.name
        },
      },
      {
        field: 'warehouseArea',
        headerName: t('defineWarehousePallet.warehouseArea'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.warehouseSector?.name
        },
      },
      {
        field: 'warehouse',
        headerName: t('defineWarehousePallet.warehouse'),
        width: 200,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return params?.row?.warehouse?.name
        },
      },

      {
        field: 'action',
        headerName: t('defineWarehousePallet.actions'),
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
                    ROUTE.WAREHOUSE_PALLET.DETAIL.PATH.replace(':id', `${id}`),
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
    actions.searchDefineWarehousePallet(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const renderHeaderRight = () => {
    return <></>
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineWarehousePallet')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineWarehousePallet.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('defineWarehousePallet.title')}
        columns={columns}
        rows={defineWarehousePalletList}
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
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.WAREHOUSE_PALLET,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      ></DataTable>
    </Page>
  )
}

export default DefineWarehousePallet
