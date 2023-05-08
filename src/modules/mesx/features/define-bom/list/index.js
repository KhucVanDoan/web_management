import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  BOM_STATUS_OPTIONS,
  BOM_STATUS_TO_EDIT,
  BOM_STATUS_TO_CONFIRM,
  BOM_STATUS_TO_DELETE,
} from '~/modules/mesx/constants'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { exportBomApi } from '~/modules/mesx/redux/sagas/define-bom/import-export-bom'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

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

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
  }

  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   visible: 'always',
    // },
    {
      field: 'code',
      headerName: t('defineBOM.bomCode'),
      width: 150,
      visible: 'always',
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('defineBOM.bomName'),
      width: 150,
      visible: 'always',
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
      field: 'createdAt',
      filterFormat: 'date',
      headerName: t('defineBOM.createAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('defineBOM.updateAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'status',
      headerName: t('defineBOM.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={BOM_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
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
                  setTempItem(params.row)
                  setDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
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

  useEffect(() => {
    refreshData()
  }, [keyword, page, filters, sort, pageSize])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('defineBOM.export')}
          onExport={() => {
            exportBomApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_BOM.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteBOM(tempItem?.id, () => refreshData())
    setDeleteModal(false)
    setTempItem(null)
  }

  const onSubmitConfirm = () => {
    actions.confirmBOMById(tempItem?.id, () => refreshData())
    setConfirmModal(false)
    setTempItem(null)
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.defineBOM')}
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
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          //onSelectionChange={setSelectedRows}
          selected={selectedRows}
          total={total}
          title={t('defineBOM.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('defineBOM.deleteModalTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('defineBOM.deleteConfirm')}
          <LV
            label={t('defineBOM.itemCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('defineBOM.itemName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('defineBOM.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitConfirm}
          submitLabel={t('general:common.yes')}
          noBorderBottom
        >
          {t('defineBOM.confirmBody')}
          <LV
            label={t('defineBOM.itemCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('defineBOM.itemName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default DefineBOM
