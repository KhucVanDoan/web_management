import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useRoleList from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
]
const RoleList = () => {
  const { t } = useTranslation(['configuration'])

  const {
    data: { roleList, isLoading, total },
    actions,
  } = useRoleList()

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
      field: 'code',
      headerName: t('roleList.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('roleList.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: () => {
        return (
          <div>
            <IconButton onClick={() => {}}>
              <Icon name="show" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Icon name="delete" />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchRoleList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        <Button onClick={() => {}} icon="add" sx={{ ml: 4 / 3 }}>
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.roleList')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('roleList.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('roleList.title')}
        columns={columns}
        rows={roleList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default RoleList
