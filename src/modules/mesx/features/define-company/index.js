import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertObjectToArrayFilter } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_COMPANY.LIST.PATH,
    title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
  },
]

function DefineCompany() {
  const { t } = useTranslation('mesx')
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const {
    data: { companyList, total, isLoading },
    actions,
  } = useDefineCompany()

  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const taxList = []
  // eslint-disable-next-line array-callback-return
  companyList.map((item) => {
    if (!!item['taxNo']) {
      return taxList.push(item['taxNo'])
    }
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      sortable: false,
    },
    {
      field: 'code',
      headerName: t('defineCompany.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineCompany.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'address',
      headerName: t('defineCompany.address'),
      width: 150,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('defineCompany.phone'),
      width: 100,
      sortable: false,
    },
    {
      field: 'taxNo',
      headerName: t('defineCompany.tax'),
      width: 100,
      type: 'categorical',
      filterOptions: {
        options: taxList,
        getOptionValue: (option) => option?.toString(),
      },
    },
    {
      field: 'email',
      headerName: t('defineCompany.email'),
      width: 100,
      sortable: false,
    },
    {
      field: 'fax',
      headerName: t('defineCompany.fax'),
      width: 100,
      sortable: false,
    },
    {
      field: 'description',
      headerName: t('defineCompany.description'),
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
                  ROUTE.DEFINE_COMPANY.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_COMPANY.EDIT.PATH.replace(':id', `${id}`),
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
      page,
      limit: pageSize,
      filter: JSON.stringify(convertObjectToArrayFilter(filters, columns)),
      sort: JSON.stringify(sortData),
    }
    actions.searchCompanies(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (id) => {
    setModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteCompany(modal.id, () => {
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
        <Button variant="outlined" sx={{ ml: '16px' }}>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_COMPANY.CREATE.PATH)}
          sx={{ ml: '16px' }}
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
      title={t('menu.defineCompany')}
      onSearch={setKeyword}
      placeholder={t('defineCompany.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineCompany.companyList')}
        rows={companyList}
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
        title={t('defineCompany.defineCompanyDelete')}
        onCancel={onCloseDeleteModal}
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
        noBorderBottom
      >
        {t('defineCompany.deleteConfirm')}
      </Dialog>
    </Page>
  )
}

export default DefineCompany
