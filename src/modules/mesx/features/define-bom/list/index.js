import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import {
  BOM_STATUS_MAP,
  BOM_STATUS_TO_EDIT,
  BOM_STATUS_TO_CONFIRM,
  BOM_STATUS_TO_DELETE,
} from '~/modules/mesx/constants'
import { filterSchema } from '~/modules/mesx/features/define-bom/list/filter/schema'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: 'producingInfo',
  },
  {
    route: ROUTE.DEFINE_BOM.LIST.PATH,
    title: ROUTE.DEFINE_BOM.LIST.TITLE,
  },
]

function DefineBOM() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading, BOMList, total },
    actions,
  } = useBOM()

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

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('defineBOM.bomCode'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('defineBOM.bomName'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemCode',
      headerName: t('defineBOM.itemCode'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('defineBOM.itemName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.item?.name
      },
    },
    {
      field: 'status',
      headerName: t('defineBOM.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return t(BOM_STATUS_MAP[status])
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const canEdit = BOM_STATUS_TO_EDIT.includes(status)
        const canConfirm = BOM_STATUS_TO_CONFIRM.includes(status)
        const canDelete = BOM_STATUS_TO_DELETE.includes(status)
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_BOM.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_BOM.EDIT.PATH.replace(':id', `${id}`),
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
  ]

  useEffect(() => {
    refreshData()
  }, [keyword, page, filters, sort, pageSize])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchBOM(params)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" disabled icon="download">
          {t('defineBOM.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_BOM.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteBOM(
      id,
      () => setDeleteModal(false),
      () => setDeleteModal(false),
    )
  }

  const onSubmitConfirm = () => {
    actions.confirmBOMById(
      id,
      () => setConfirmModal(false),
      () => setConfirmModal(false),
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('defineBOM.title')}
        onSearch={setKeyword}
        placeholder={t('defineBOM.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={BOMList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onChangeFilter={setfilters}
          onChangeSort={setSort}
          total={total}
          title={t('defineBOM.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            validationSchema: filterSchema(t),
            onApply: setfilters,
          }}
          sort={sort}
          checkboxSelection
        />
        <Dialog
          open={deleteModal}
          title={t('defineBOM.deleteModalTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('defineBOM.deleteConfirm')}
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('defineBOM.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitConfirm}
          submitLabel={t('common.yes')}
          noBorderBottom
        >
          {t('defineBOM.confirmBody')}
        </Dialog>
      </Page>
    </>
  )
}

export default DefineBOM
