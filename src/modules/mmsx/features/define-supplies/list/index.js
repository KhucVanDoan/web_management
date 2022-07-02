import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  SUPPLIES_STATUS,
  SUPPLIES_STATUS_OPTION,
  SUPPLIES_TYPE,
} from '~/modules/mmsx/constants'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'deviceManagement',
  },
  {
    route: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
    title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
  },
]
const DefineSupplies = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { suppliesList, isLoading, total },
    actions,
  } = useDefineSupplies()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    updateAt: '',
    type: '',
    supplyGroupName: '',
    status: '',
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('supplies.category.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('supplies.category.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'supplyGroupName',
        headerName: t('supplies.category.suppliesCategory'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.supplyGroup?.name
        },
      },
      {
        field: 'type',
        headerName: t('supplies.category.type'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const type = SUPPLIES_TYPE.find((e) => e.id === params?.row?.type)
          return type ? t(type.text) : ''
        },
      },
      {
        field: 'description',
        headerName: t('supplies.category.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'Supplier',
        headerName: t('supplies.category.supplier'),
        width: 150,
        sortable: true,
      },

      {
        field: 'status',
        headerName: t('deviceCategory.form.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={SUPPLIES_STATUS_OPTION}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('common.createdAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('common.updatedAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('maintenanceTeam.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === SUPPLIES_STATUS.PENDING
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_SUPPLIES.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEFINE_SUPPLIES.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchListSupplies(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteSupplies(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmSupplies(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_SUPPLIES.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.supplies')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('supplies.title')}
        columns={columns}
        rows={suppliesList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('supplies.delete.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('supplies.delete.description')}
        <LV
          label={t('supplies.category.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('supplies.category.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        noBorderBotttom
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('supplies.confirm.description')}
        <LV
          label={t('supplies.category.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('supplies.category.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineSupplies
