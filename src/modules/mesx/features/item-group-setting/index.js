import React, { useState, useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/database/routes/config'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  // {
  //   title: 'database',
  // },
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
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)

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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('itemGroupDefine.groupCode'),
      width: 100,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('itemGroupDefine.groupName'),
      width: 200,
      fixed: true,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('itemGroupDefine.groupNote'),
      width: 350,
    },
    {
      field: 'createdAt',
      filterFormat: 'date',
      headerName: t('itemGroupDefine.createDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('itemGroupDefine.updateDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
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
            <IconButton onClick={() => handleDeleteOpenModal(row)}>
              <Icon name="delete" />
            </IconButton>
          </>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchItemGroups(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteItemGroup(tempItem?.id, () => {
      refreshData()
    })
    setDeleteModal(false)
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
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  /**
   * Refresh data
   */

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.itemGroupDefine')}
        onSearch={setKeyword}
        placeholder={t('itemGroupDefine.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('itemGroupDefine.title')}
          rows={itemGroupList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={setFilters}
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
        <Dialog
          open={deleteModal}
          title={t('itemGroupDefine.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('itemGroupDefine.confirmDelete')}
          <LV
            label={t('itemGroupDefine.groupCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('itemGroupDefine.groupName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default ItemGroupSetting
