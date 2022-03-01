import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDefineFactory from '~/modules/mesx/redux/hooks/useDefineFactory'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_FACTORY.LIST.PATH,
    title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
  },
]

function DefineFactory() {
  const { t } = useTranslation('mesx')
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    companyName: '',
    createTime: [],
  }
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const {
    data: { factoryList, total, isLoading },
    actions,
  } = useDefineFactory()

  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    // },
    {
      field: 'code',
      headerName: t('defineFactory.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineFactory.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'companyName',
      headerName: t('defineFactory.companyName'),
      width: 200,
      sortable: true,
    },
    {
      field: 'location',
      headerName: t('defineFactory.location'),
      width: 200,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: t('defineFactory.phone'),
      width: 150,
      sortable: false,
    },
    {
      field: 'description',
      headerName: t('defineFactory.description'),
      width: 100,
      sortable: false,
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_FACTORY.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_FACTORY.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row.id)}>
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', type: 'date' },
      ]),
      sort: convertSortParams(sort),
    }

    actions.searchFactories(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (id) => {
    setModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteFactory(modal.id, () => {
      setModal({ isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, id: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_FACTORY.CREATE.PATH)}
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
      title={t('menu.defineFactory')}
      onSearch={setKeyword}
      placeholder={t('defineFactory.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineFactory.factoryList')}
        rows={factoryList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
        checkboxSelection
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineFactory.defineFactoryDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineFactory.deleteConfirm')}
      </Dialog>
    </Page>
  )
}

export default DefineFactory
