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
import { DEFAULT_UNITS_MAP, WEIGHT_UNITS_MAP } from '~/modules/wmsx/constants'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH,
    title: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.TITLE,
  },
]
function DefineTemplateShelf() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { templateShelfList, total, isLoading },
    actions,
  } = useDefineTemplateShelf()

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
      field: 'name',
      headerName: t('defineTemplateShelf.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'size',
      headerName: t('defineTemplateShelf.size'),
      width: 200,
      sortable: false,
      fixed: true,
      renderCell: (params) => {
        return `${params.row?.long?.value} * ${params.row?.width?.value} * ${
          params.row?.height?.value
        } ${t(DEFAULT_UNITS_MAP[params.row?.width?.unit])}`
      },
    },
    {
      field: 'weightLoad',
      headerName: t('defineTemplateShelf.weightLoad'),
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return `${params.row?.weightLoad?.value} ${t(
          WEIGHT_UNITS_MAP[params.row?.weightLoad?.unit],
        )}`
      },
    },
    {
      field: 'totalTemplateShelfFloors',
      headerName: t('defineTemplateShelf.totalTemplateShelfFloors'),
      width: 200,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: t('defineTemplateShelf.createdAt'),
      filterFormat: 'date',
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('defineTemplateShelf.action'),
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
                  ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.PATH.replace(':id', `${id}`),
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
    actions.searchTemplateShelfs(params)
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
    actions.deleteTemplateShelf(modal?.tempItem?.id, () => {
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
          onClick={() => history.push(ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.PATH)}
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
      title={t('menu.defineTemplateShelf')}
      onSearch={setKeyword}
      placeholder={t('defineTemplateShelf.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineTemplateShelf.title')}
        rows={templateShelfList}
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
        title={t('defineTemplateShelf.deleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineTemplateShelf.confirmDelete')}
        {/* <LV
          label={t('defineTemplateShelf.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        /> */}
        <LV
          label={t('defineTemplateShelf.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineTemplateShelf
