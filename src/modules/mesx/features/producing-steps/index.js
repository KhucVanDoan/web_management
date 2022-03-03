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
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

import FilterForm from './filter'
import { filterSchema } from './filter/schema'

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
  const DEFAULT_FILTER = {
    code: '',
    name: '',
    status: '',
  }
  const [id, setId] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setfilters] = useState(DEFAULT_FILTER)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('producingStep.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('producingStep.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('producingStep.description'),
      width: 150,
      fixed: true,
    },
    {
      field: 'createdAt',
      headerName: t('producingStep.createdAt'),
      width: 150,
      sortable: true,
      type: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('producingStep.updatedAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return formatDateTimeUtc(updatedAt)
      },
    },
    {
      field: 'status',
      headerName: t('producingStep.status'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(PRODUCING_STEP_STATUS_MAP[status])
      },
    },
    {
      field: 'action',
      headerName: t('producingStep.action'),
      width: 150,
      align: 'center',
      fixed: true,
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
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
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
          sx={{ ml: 4 / 3 }}
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
        title={t('menu.producingStep')}
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
          title={t('producingStep.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            onApply: setfilters,
            validationSchema: filterSchema(t),
          }}
          sort={sort}
          checkboxSelection
        />
        <Dialog
          open={deleteModal}
          title={t('producingStep.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
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
          title={t('producingStep.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitConfirm}
          submitLabel={t('common.yes')}
          noBorderBottom
        >
          {t('producingStep.confirmBody')}
        </Dialog>
      </Page>
    </>
  )
}

export default ProducingStep
