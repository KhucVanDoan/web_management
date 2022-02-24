import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { WORK_CENTER_STATUS_MAP } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import {
  WORK_CENTER_STATUS_TO_CONFIRM,
  WORK_CENTER_STATUS_TO_DELETE,
  WORK_CENTER_STATUS_TO_EDIT,
} from '~/modules/mesx/constants'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from '../form-fillter'
import { filterSchema } from '../form-fillter/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.WORK_CENTER.LIST.PATH,
    title: ROUTE.WORK_CENTER.LIST.TITLE,
  },
]
const DEFAULT_FILTER = {
  code: '',
  name: '',
  factory: '',
  status: '',
}
const WorkCenter = () => {
  const [id, setId] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTER)
  const [sort, setSort] = useState(null)
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading, wcList, total },
    actions,
  } = useWorkCenter()

  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, filters, sort])

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
      headerName: t('workCenter.code'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('workCenter.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'factory',
      headerName: t('workCenter.factoryName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.factory?.name
      },
    },
    {
      field: 'status',
      headerName: t('workCenter.status'),
      width: 200,

      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(WORK_CENTER_STATUS_MAP[status])
      },
    },
    {
      field: 'action',
      headerName: t('workCenter.action'),
      width: 160,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params.row
        const canConfirm = WORK_CENTER_STATUS_TO_CONFIRM.includes(status)
        const canEdit = WORK_CENTER_STATUS_TO_EDIT.includes(status)
        const canDelete = WORK_CENTER_STATUS_TO_DELETE.includes(status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WORK_CENTER.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>

            <>
              {canEdit && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.WORK_CENTER.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}

              {canDelete && (
                <IconButton onClick={() => onClickDelete(id)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton onClick={() => onClickConfirmed(id)}>
                  <Icon name="tick" />
                </IconButton>
              )}
            </>
          </div>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWorkCenter(params)
  }

  const onClickDelete = (id) => {
    setId(id)
    setIsOpenDeleteModal(true)
  }

  const onClickConfirmed = (id) => {
    setId(id)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmWorkCenter(
      id,
      () => {
        setId(null)
        setIsOpenConfirmModal(false)
      },
      () => {
        setId(null)
        setIsOpenConfirmModal(false)
      },
    )
  }

  const onSubmitDelete = () => {
    actions.deleteWorkCenter(
      id,
      () => {
        setIsOpenDeleteModal(false)
      },
      () => {
        setIsOpenDeleteModal(false)
      },
    )
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: <doan.khucvan> handle import/export */}
        <Button variant="outlined" disabled icon="download">
          {t('workCenter.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.WORK_CENTER.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('workCenter.title')}
      onSearch={setKeyword}
      placeholder={t('workCenter.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        rows={wcList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        total={total}
        title={t('general:dataTable.title')}
        sort={sort}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTER,
          values: filters,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('workCenter.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('workCenter.deleteConfirm')}
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('common.yes')}
        noBorderBottom
      >
        {t('common.confirmMessage.confirm')}
      </Dialog>
    </Page>
  )
}
export default WorkCenter
