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
import { DEFINE_SERVICE_STATUS } from '~/modules/wmsx/constants'
import useDefineService from '~/modules/wmsx/redux/hooks/useDefineService'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_SERVICE.LIST.PATH,
    title: ROUTE.DEFINE_SERVICE.LIST.TITLE,
  },
]
const DefineService = () => {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { serviceList, total, isLoading },
    actions,
  } = useDefineService()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
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
      headerName: t('defineService.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineService.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'serviceTypeName',
      headerName: t('defineService.serviceType'),
      width: 150,
      sortable: true,
    },
    {
      field: 'action',
      headerName: t('defineService.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params.row
        const isPending = status === DEFINE_SERVICE_STATUS.PENDING
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_SERVICE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isPending && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_SERVICE.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isPending && (
              <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isPending && (
              <IconButton onClick={() => handleOpenConfirmModal(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
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
    actions.searchServices(params)
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
    actions.deleteService(modal?.tempItem?.id, () => {
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

  const handleOpenConfirmModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenConfirmModal: true,
    })
  }

  const onSubmitConfirmModal = () => {
    actions.confirmServiceById(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseConfirmModal = () => {
    setModal({
      tempItem: null,
      isOpenConfirmModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_SERVICE.CREATE.PATH)}
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
      title={t('menu.defineService')}
      onSearch={setKeyword}
      placeholder={t('defineService.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineService.title')}
        rows={serviceList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineService.deleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineService.confirmDelete')}
        <LV
          label={t('defineService.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineService.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={onCloseConfirmModal}
        onSubmit={onSubmitConfirmModal}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('defineService.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineService.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineService
