import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.DEPARTMENT_LIST.LIST.PATH,
    title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
  },
]
const DepartmentList = () => {
  const { t } = useTranslation(['configuration'])

  const {
    data: { departmentList, isLoading, total },
    actions,
  } = useDepartmentList()

  const history = useHistory()

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
      headerName: t('departmentList.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('departmentList.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'note',
      headerName: t('departmentList.note'),
      width: 150,
      sortable: true,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
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
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEPARTMENT_LIST.ASSIGN.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="assign" />
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
    actions.searchDepartmentList(params)
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
      title={t('menu.departmentList')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('departmentList.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('departmentList.title')}
        columns={columns}
        rows={departmentList}
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

export default DepartmentList
