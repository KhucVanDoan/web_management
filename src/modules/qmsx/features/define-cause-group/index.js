import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { DEFAULT_DATE_TIME_FORMAT_VN } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useDefineCauseGroup from '~/modules/qmsx/redux/hooks/useDefineCauseGroup'
import { ROUTE } from '~/modules/qmsx/routes/config'
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
    route: ROUTE.DEFINE_CAUSE_GROUP.LIST.PATH,
    title: ROUTE.DEFINE_CAUSE_GROUP.LIST.TITLE,
  },
]

function DefineCauseGroup() {
  const { t } = useTranslation('qmsx')
  const history = useHistory()

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

  const {
    data: { causeGroupList, total, isLoading },
    actions,
  } = useDefineCauseGroup()

  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
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
      headerName: t('defineCauseGroup.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineCauseGroup.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('defineCauseGroup.description'),
      width: 100,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('common.createdAt'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return formatDateTimeUtc(createdAt, DEFAULT_DATE_TIME_FORMAT_VN)
      },
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
                  ROUTE.DEFINE_CAUSE_GROUP.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_CAUSE_GROUP.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(id)}>
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
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchCauseGroup(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (id) => {
    setModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modal?.id,
    }
    actions.deleteCauseGroup(params, () => {
      setModal({ ...modal, isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, id: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download">
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_CAUSE_GROUP.CREATE.PATH)}
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
      title={t('menu.defineCauseGroup')}
      onSearch={setKeyword}
      placeholder={t('defineCauseGroup.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineCauseGroup.causeGroupList')}
        rows={causeGroupList}
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
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineCauseGroup.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineCauseGroup.modalDeleteContent')}
      </Dialog>
    </Page>
  )
}

export default DefineCauseGroup
