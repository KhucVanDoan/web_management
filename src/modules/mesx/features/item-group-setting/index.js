import React, { useState, useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertObjectToArrayFilter, formatDateTimeUtc } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ITEM_GROUP.LIST.PATH,
    title: ROUTE.ITEM_GROUP.LIST.TITLE,
  },
]
const ItemGroupSetting = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading, itemGroupList, total },
    actions,
  } = useItemGroup()
  const [id, setId] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setfilters] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      sortable: false,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('itemGroupDefine.groupCode'),
      width: 100,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('itemGroupDefine.groupName'),
      width: 200,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('itemGroupDefine.groupNote'),
      width: 400,
      sortable: false,
    },
    {
      field: 'createdAt',
      type: 'date',
      headerName: t('itemGroupDefine.createDate'),
      width: 150,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('itemGroupDefine.updateDate'),
      width: 150,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return formatDateTimeUtc(updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('itemGroupDefine.action'),
      width: 150,
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
                  ROUTE.ITEM_GROUP.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ITEM_GROUP.EDIT.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleDeleteOpenModal(id)}>
              <Icon name="delete" />
            </IconButton>
          </>
        )
      },
    },
  ])
  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const handleDeleteOpenModal = (id) => {
    setId(id)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteItemGroup(
      id,
      () => {
        setDeleteModal(false)
      },
      () => {
        setDeleteModal(false)
      },
    )
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: <linh.taquang> handle import/export */}
        <Button variant="outlined" disabled icon="download">
          {t('itemGroupDefine.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.ITEM_GROUP.CREATE.PATH)}
          icon="add"
          sx={{ ml: '16px' }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  /**
   * Refresh data
   */
  const refreshData = () => {
    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: JSON.stringify(convertObjectToArrayFilter(filters, columns)),
      sort: JSON.stringify(sortData),
    }
    actions.searchItemGroups(params)
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('itemGroupDefine.title')}
        onSearch={setKeyword}
        placeholder={t('itemGroupDefine.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={itemGroupList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onChangeFilter={setfilters}
          onChangeSort={setSort}
          total={total}
          title={t('general:dataTable.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: setfilters,
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('itemGroupDefine.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          cancelProps={{
            variant: 'outlined',
            color: 'subText',
          }}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
        >
          {t('itemGroupDefine.confirmDelete')}
        </Dialog>
      </Page>
    </>
  )
}

export default ItemGroupSetting
