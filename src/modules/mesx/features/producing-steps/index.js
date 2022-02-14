import React, { useEffect, useMemo, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  PRODUCING_STEP_STATUS_MAP,
  PRODUCING_STEP_STATUS_TO_CONFIRM,
  PRODUCING_STEP_STATUS_TO_EDIT,
  PRODUCING_STEP_STATUS_TO_DELETE,
  ROWS_PER_PAGE_OPTIONS,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertObjectToArrayFilter } from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: 'producingInfo',
  },
  {
    route: ROUTE.PRODUCING_STEP.LIST.PATH,
    title: ROUTE.PRODUCING_STEP.LIST.TITLE,
  },
]

function ProducingStep() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { list, isLoading, total },
    actions,
  } = useProducingStep()
  const [id, setId] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setfilters] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      sortable: false,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('producingStep.code'),
      width: 200,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('producingStep.name'),
      width: 200,
      fixed: true,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('producingStep.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return t(PRODUCING_STEP_STATUS_MAP[status])
      },
    },
    {
      field: 'action',
      headerName: t('producingStep.action'),
      width: 250,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const canConfirm = PRODUCING_STEP_STATUS_TO_CONFIRM.includes(status)
        const canEdit = PRODUCING_STEP_STATUS_TO_EDIT.includes(status)
        const canDelete = PRODUCING_STEP_STATUS_TO_DELETE.includes(status)
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.PRODUCING_STEP.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.PRODUCING_STEP.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {canDelete && (
              <IconButton
                onClick={() => {
                  setId(id)
                  setDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                onClick={() => {
                  setId(id)
                  setConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ])

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

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
    actions.searchProducingSteps(params)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" disabled icon="download">
          {t('producingStep.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.PRODUCING_STEP.CREATE.PATH)}
          icon="add"
          sx={{ ml: '16px' }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteProducingStep(
      id,
      () => setDeleteModal(false),
      () => setDeleteModal(false),
    )
  }

  const onSubmitConfirm = () => {
    actions.confirmProducingStep(
      id,
      () => setConfirmModal(false),
      () => setConfirmModal(false),
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('producingStep.title')}
        onSearch={setKeyword}
        placeholder={t('producingStep.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={list}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onChangeFilter={setfilters}
          onChangeSort={setSort}
          total={total}
          title={t('general:dataTable.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: setfilters,
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('producingStep.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
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
          {t('producingStep.confirmDelete')}
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('producingStep.deleteTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('common.no')}
          cancelProps={{
            variant: 'outlined',
            color: 'subText',
          }}
          onSubmit={onSubmitConfirm}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('producingStep.confirmDelete')}
        </Dialog>
      </Page>
    </>
  )
}

export default ProducingStep
