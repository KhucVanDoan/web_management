import React, { useState, useEffect, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'
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
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
  }

  const [filters, setfilters] = useState(DEFAULT_FILTERS)

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
      type: 'date',
      headerName: t('itemGroupDefine.createDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('itemGroupDefine.updateDate'),
      width: 150,
      sortable: true,
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
          {t('common.create')}
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
          onChangeFilter={setfilters}
          onChangeSort={setSort}
          total={total}
          filters={{
            form: <FilterForm />,
            defaultValue: DEFAULT_FILTERS,
            validationSchema: filterSchema(t),
            values: filters,
            onApply: setfilters,
          }}
          sort={sort}
          checkboxSelection
        />
        <Dialog
          open={deleteModal}
          title={t('itemGroupDefine.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
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
