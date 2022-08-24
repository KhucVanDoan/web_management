import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import {
  exportDefectListApi,
  getDefectListTemplateApi,
  importDefectListApi,
} from '~/modules/mmsx/redux/sagas/defect-list/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import { PRIORITY_LEVEL_MAP } from '../../constants'
import useDefect from '../../redux/hooks/useDefect'
import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.DEFECT_LIST.LIST.PATH,
    title: ROUTE.DEFECT_LIST.LIST.TITLE,
  },
]
function DefectList() {
  const { t } = useTranslation('mmsx')
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
    data: { defectList, total, isLoading },
    actions,
  } = useDefect()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('defectList.table.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defectList.table.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('defectList.table.description'),
      width: 300,
      sortable: false,
    },
    {
      field: 'deviceName',
      headerName: t('defectList.table.deviceName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.device?.name
      },
    },
    {
      field: 'priority',
      headerName: t('defectList.table.priority'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { priority } = params.row
        return t(PRIORITY_LEVEL_MAP[priority])
      },
    },
    {
      field: 'createdAt',
      headerName: t('common.createdAt'),
      filterFormat: 'date',
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('common.updatedAt'),
      filterFormat: 'date',
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFECT_LIST.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFECT_LIST.EDIT.PATH.replace(':id', `${id}`),
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
    actions.searchDefectList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteDefect(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('defect.export')}
          onImport={(params) => importDefectListApi(params)}
          onExport={() =>
            exportDefectListApi({
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
          }
          onDownloadTemplate={getDefectListTemplateApi}
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEFECT_LIST.CREATE.PATH)}
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
      title={t('menu.defectList')}
      onSearch={setKeyword}
      placeholder={t('defectList.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defectList.title')}
        rows={defectList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defectList.modalDelete.title')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defectList.modalDelete.description')}
        <LabelValue
          label={t('defectList.table.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('defectList.table.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefectList
