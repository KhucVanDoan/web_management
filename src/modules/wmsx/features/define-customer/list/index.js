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
import useDefineCustomer from '~/modules/wmsx/redux/hooks/useDefineCustomer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: ROUTE.PRODUCTION_INFORMATION_MANAGENMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
    title: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
  },
]
const DefineCustomer = () => {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { customersList, total, isLoading },
    actions,
  } = useDefineCustomer()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })
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
      headerName: t('defineCustomer.codeColumn'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineCustomer.nameColumn'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'email',
      headerName: t('defineCustomer.emailColumn'),
      sortable: true,
      width: 200,
    },
    {
      field: 'phone',
      headerName: t('defineCustomer.phoneColumn'),
      sortable: true,
      width: 200,
    },
    {
      field: 'customerLevel',
      headerName: t('defineCustomer.customerRank'),
      width: 200,
      renderCell: (params) => {
        const { customerLevel } = params?.row
        return customerLevel ? customerLevel?.name : ''
      },
    },
    {
      field: 'rentWarehouse',
      headerName: t('defineCustomer.customerTransaction'),
      width: 200,
      // renderCell: (params) => {
      //   const { id } = params?.row
      //   return (
      //     <Link to={`${ROUTE.RENT_WAREHOUSE_DASHBOARD.PATH}/${id}`}>
      //       {t('importManufacturingOrder.transactionList')}
      //     </Link>
      //   )
      // },
    },
    {
      field: 'action',
      headerName: t('defineCustomer.actionColumn'),
      width: 200,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params.row
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
            <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
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
    actions.searchCustomers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteCustomer(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
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
      placeholder={t('defineCustomer.searchPlaceHolder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineCustomer.title')}
        rows={customersList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineCustomer.deleteModalTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineCustomer.confirmDelete')}
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