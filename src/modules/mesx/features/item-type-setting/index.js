import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ITEM_TYPE.LIST.PATH,
    title: ROUTE.ITEM_TYPE.LIST.TITLE,
  },
]
function ItemTypeSetting() {
  const { t } = useTranslation('mesx')
  const history = useHistory()
  const {
    data: { itemTypeList, total, isLoading },
    actions,
  } = useItemType()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      sortable: false,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('itemTypeSetting.typeCode'),
      width: 100,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('itemTypeSetting.typeName'),
      width: 200,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('itemTypeSetting.typeNote'),
      width: 400,
      sortable: false,
    },
    {
      field: 'createdAt',
      type: 'date',
      headerName: t('itemTypeSetting.createDate'),
      width: 150,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      type: 'date',
      headerName: t('itemTypeSetting.updateDate'),
      width: 150,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return formatDateTimeUtc(updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('itemTypeSetting.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ITEM_TYPE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ITEM_TYPE.EDIT.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteModal(id)}>
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
    actions.searchItemTypes(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const handleOpenDeleteModal = (id) => {
    setModal({
      id: id,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteItemType(modal.id, () => {
      setModal({ isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setModal({
      id: null,
      isOpenDeleteModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.ITEM_TYPE.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('common.create')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.itemTypeSetting')}
      onSearch={setKeyword}
      placeholder={t('itemTypeSetting.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('itemTypeSetting.title')}
        rows={itemTypeList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        checkboxSelection
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('itemTypeSetting.itemTypeDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('itemTypeSetting.confirmDelete')}
      </Dialog>
    </Page>
  )
}

export default ItemTypeSetting
