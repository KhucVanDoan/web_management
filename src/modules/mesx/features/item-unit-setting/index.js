import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useItemUnit from '~/modules/mesx/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc, convertObjectToArrayFilter } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ITEM_UNIT.LIST.PATH,
    title: ROUTE.ITEM_UNIT.LIST.TITLE,
  },
]
function ItemUnitSetting() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading, itemUnitList, total },
    actions,
  } = useItemUnit()
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setfilters] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])
  const [deleteModal, setDeleteModal] = useState(false)
  const [id, setId] = useState()

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
      headerName: t('itemUnitDefine.unitCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('itemUnitDefine.unitName'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('itemUnitDefine.unitNote'),
      width: 400,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: t('itemUnitDefine.createDate'),
      width: 150,
      sortable: true,
      type: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('itemUnitDefine.updateDate'),
      width: 150,
      type: 'date',
      renderCell: (params) => {
        const updateAt = params.row.updatedAt
        return formatDateTimeUtc(updateAt)
      },
    },
    {
      field: 'action',
      headerName: t('itemUnitDefine.action'),
      disableClickEventBubbling: true,
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
                  ROUTE.ITEM_UNIT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ITEM_UNIT.EDIT.PATH.replace(':id', `${id}`))
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
    actions.searchItemUnits(params)
  }, [page, pageSize, sort, filters, keyword])

  const handleDeleteOpenModal = (id) => {
    setId(id)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteItemUnit(
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
        {/* TODO: <linh.taquang> handle import export */}
        <Button variant="outlined" disabled icon="download">
          {t('itemUnitDefine.import')}
        </Button>

        <Button
          onClick={() => history.push(ROUTE.ITEM_UNIT.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('itemUnitDefine.title')}
        onSearch={setKeyword}
        placeholder={t('itemUnitDefine.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={itemUnitList}
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
          title={t('itemUnitDefine.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('itemUnitDefine.confirmDelete')}
        </Dialog>
      </Page>
    </>
  )
}

export default ItemUnitSetting
