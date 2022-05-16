import React, { useState, useEffect } from 'react'

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
import useDefineCustomer from '~/modules/mesx/redux/hooks/useDefineCustomer'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
    title: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
  },
]

function DefineCustomer() {
  const { t } = useTranslation('mesx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    address: '',
    phone: null,
    email: '',
    fax: '',
    createTime: [],
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

  const {
    data: { customerList, total, isLoading },
    actions,
  } = useDefineCustomer()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sortable: false,
    // },
    {
      field: 'code',
      headerName: t('defineCustomer.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineCustomer.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'address',
      headerName: t('defineCustomer.address'),
      width: 120,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('defineCustomer.phone'),
      width: 100,
      sortable: false,
    },
    {
      field: 'email',
      headerName: t('defineCustomer.email'),
      width: 120,
      sortable: false,
    },
    {
      field: 'fax',
      headerName: t('defineCustomer.fax'),
      width: 100,
      sortable: false,
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
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
                  ROUTE.DEFINE_CUSTOMER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_CUSTOMER.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.DEFINE_CUSTOMER.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
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
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchCustomers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteCustomer(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_CUSTOMER.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCustomer')}
      onSearch={setKeyword}
      placeholder={t('defineCustomer.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineCustomer.customerList')}
        rows={customerList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineCustomer.defineCustomerDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineCustomer.deleteConfirm')}
        <LV
          label={t('defineCustomer.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineCustomer.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineCustomer
