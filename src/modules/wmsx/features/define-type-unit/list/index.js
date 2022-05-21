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
import { DEFINE_TYPE_UNIT_STATUS } from '~/modules/wmsx/constants'
import useDefineTypeUnit from '~/modules/wmsx/redux/hooks/useDefineTypeUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './form-filters'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.TYPE_UNIT.LIST.PATH,
    title: ROUTE.TYPE_UNIT.LIST.TITLE,
  },
]
const DefineTypeUnit = () => {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { typeUnitsList, total, isLoading },
    actions,
  } = useDefineTypeUnit()

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
      headerName: t('defineTypeUnit.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineTypeUnit.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'action',
      headerName: t('defineTypeUnit.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params.row
        const isEdit = status === DEFINE_TYPE_UNIT_STATUS.PENDING
        const isConfirmed = status === DEFINE_TYPE_UNIT_STATUS.PENDING
        const isDelete =
          status === DEFINE_TYPE_UNIT_STATUS.PENDING ||
          status === DEFINE_TYPE_UNIT_STATUS.REJECTED
        // const isActive = status === DEFINE_TYPE_UNIT_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.TYPE_UNIT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.TYPE_UNIT.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
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
    actions.searchTypeUnits(params)
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
    actions.deleteTypeUnit(modal?.tempItem?.id, () => {
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
    actions.confirmTypeUnitById(modal?.tempItem?.id, () => {
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
          onClick={() => history.push(ROUTE.TYPE_UNIT.CREATE.PATH)}
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
      title={t('menu.defineTypeUnit')}
      onSearch={setKeyword}
      placeholder={t('defineTypeUnit.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineTypeUnit.title')}
        rows={typeUnitsList}
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
        title={t('defineTypeUnit.deleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineTypeUnit.confirmDelete')}
        <LV
          label={t('defineTypeUnit.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineTypeUnit.name')}
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
          label={t('defineTypeUnit.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineTypeUnit.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineTypeUnit
