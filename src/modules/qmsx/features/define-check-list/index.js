import { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CHECK_LIST_STATUS,
  CHECK_LIST_STATUS_TO_CONFIRM,
  CHECK_LIST_STATUS_TO_DELETE,
  CHECK_LIST_STATUS_TO_EDIT,
} from '~/modules/qmsx/constants'
import useDefineCheckList from '~/modules/qmsx/redux/hooks/useDefineCheckList'
import getExportCheckListApi from '~/modules/qmsx/redux/sagas/define-check-list/export-check-list'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { api } from '~/services/api'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_CHECK_LIST.LIST.PATH,
    title: ROUTE.DEFINE_CHECK_LIST.LIST.TITLE,
  },
]

function DefineCheckList() {
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
    data: { checkListList, total, isLoading },
    actions,
  } = useDefineCheckList()

  const [modalDelete, setDeleteModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const [modalConfirm, setConfirmModal] = useState({
    id: null,
    isOpenConfirmModal: false,
  })

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sortable: false,
    // },
    {
      field: 'code',
      headerName: t('defineCheckList.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineCheckList.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('defineCheckList.description'),
      width: 200,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('general:common.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('defineCheckList.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status options={CHECK_LIST_STATUS} value={+status} variant="text" />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params?.row
        const canConfirm = CHECK_LIST_STATUS_TO_CONFIRM.includes(+status)
        const canDelete = CHECK_LIST_STATUS_TO_DELETE.includes(+status)
        const canEdit = CHECK_LIST_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_CHECK_LIST.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_CHECK_LIST.EDIT.PATH.replace(':id', `${id}`),
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
              <IconButton onClick={() => onClickConfirm(id)}>
                <Icon name="tick" />
              </IconButton>
            )}
            <IconButton onClick={() => onClickClone(id)}>
              <Icon name="invoid" />
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
    setSelectedRows([])
    actions.searchCheckList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickClone = (id) => {
    history.push(ROUTE.DEFINE_CHECK_LIST.CREATE.PATH, id)
  }

  // Handle: Onclick DELETE
  const onClickDelete = (id) => {
    setDeleteModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modalDelete.id,
    }
    actions.deleteCheckList(params, () => {
      setDeleteModal({ ...modalDelete, isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setDeleteModal({ isOpenDeleteModal: false, id: null })
  }

  // Handle: Onclick CONFIRM
  const onClickConfirm = (id) => {
    setConfirmModal({ id, isOpenConfirmModal: true })
  }

  const onSubmitConfirm = () => {
    const params = {
      id: modalConfirm.id,
    }
    actions.confirmCheckList(params, () => {
      setConfirmModal({ ...modalConfirm, isOpenConfirmModal: false })
      refreshData()
    })
  }

  const onCloseConfirmModal = () => {
    setConfirmModal({ isOpenConfirmModal: false, id: null })
  }

  //handle: selected checkbox
  const onSelectionChange = (selected) => {
    setSelectedRows(selected)
  }

  const importCheckListApi = (params) => {
    const uri = `/v1/quality-controls/check-lists/import`
    const formData = new FormData()
    formData.append('file', params)
    return api.postMultiplePart(uri, formData)
  }

  const getImportCheckListTemplateApi = () => {
    const uri = `/v1/quality-controls/check-lists/import-template`
    return api.get(uri)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('importExport.checkList')}
          onImport={importCheckListApi}
          onDownloadTemplate={getImportCheckListTemplateApi}
          onExport={() =>
            getExportCheckListApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_CHECK_LIST.CREATE.PATH)}
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
      title={t('menu.defineCheckList')}
      onSearch={setKeyword}
      placeholder={t('defineCheckList.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineCheckList.checkListList')}
        rows={checkListList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        onSelectionChange={onSelectionChange}
        selected={selectedRows}
        onSettingChange={(settings) => setColumnsSettings(settings)}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modalDelete.isOpenDeleteModal}
        title={t('defineCheckList.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineCheckList.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('defineCheckList.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('defineCheckList.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default DefineCheckList
