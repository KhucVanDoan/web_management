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
  SUPPLIES_CATEGORY_STATUS,
  SUPPLIES_CATEGORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useSuppliesCategory from '~/modules/mmsx/redux/hooks/useSuppliesCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.SUPPLIES_CATEGORY.LIST.PATH,
    title: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
  },
]
const SuppliesCategory = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { suppliesCategoryList, isLoading, total },
    actions,
  } = useSuppliesCategory()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
    createdAt: '',
    updateAt: '',
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
      {
        field: 'code',
        headerName: t('suppliesCategory.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('suppliesCategory.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'description',
        headerName: t('suppliesCategory.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'status',
        headerName: t('suppliesCategory.form.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={SUPPLIES_CATEGORY_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('suppliesCategory.createAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('suppliesCategory.updateAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('suppliesCategory.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === SUPPLIES_CATEGORY_STATUS.PENDING

          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <>
                  <IconButton
                    onClick={() =>
                      history.push(
                        ROUTE.SUPPLIES_CATEGORY.EDIT.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                </>
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
    actions.searchListSuppliesCategory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteSuppliesCategory(tempItem?.id, () => {
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
    actions.confirmSuppliesCategory(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.SUPPLIES_CATEGORY.CREATE.PATH)}
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
      title={t('menu.suppliesCategory')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('suppliesCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('suppliesCategory.title')}
        columns={columns}
        rows={suppliesCategoryList}
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
        title={t('suppliesCategory.deleteTitle')}
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
        {t('suppliesCategory.confirmDetele')}
        <LV
          label={t('suppliesCategory.form.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('suppliesCategory.form.name')}
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
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('suppliesCategory.form.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('suppliesCategory.form.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default SuppliesCategory
