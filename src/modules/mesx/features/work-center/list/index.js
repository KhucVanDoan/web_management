import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WORK_CENTER_STATUS_CONFIRM_TO_EDIT,
  WORK_CENTER_STATUS_OPTIONS,
  WORK_CENTER_STATUS_TO_CONFIRM,
  WORK_CENTER_STATUS_TO_DELETE,
  WORK_CENTER_STATUS_TO_EDIT,
} from '~/modules/mesx/constants'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import {
  exportWorkCenterApi,
  getWorkCenterTemplateApi,
  importWorkCenterApi,
} from '~/modules/mesx/redux/sagas/work-center/import-export-work-center'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from '../form-fillter'
import { DialogApprove } from './dialogs/approve'

const breadcrumbs = [
  {
    title: 'producingInfo',
  },
  {
    route: ROUTE.WORK_CENTER.LIST.PATH,
    title: ROUTE.WORK_CENTER.LIST.TITLE,
  },
]
const DEFAULT_FILTERS = {
  code: '',
  name: '',
  factoryId: [],
  status: '',
  createAt: '',
}
const WorkCenter = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const { refreshKey, clearRefreshKey } = useApp()

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

  const {
    data: { isLoading, wcList, total },
    actions,
  } = useWorkCenter()

  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, filters, sort])

  useEffect(() => {
    if (refreshKey) {
      if (wcList?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, wcList])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   visible: 'always',
    // },
    {
      field: 'code',
      headerName: t('workCenter.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('workCenter.name'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'factoryName',
      headerName: t('workCenter.factoryName'),
      filterFormat: 'multiple',
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
        return (
          <Status
            options={WORK_CENTER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('workCenter.action'),
      width: 160,
      sortable: false,
      align: 'center',
      visible: 'always',
      renderCell: (params) => {
        const { id, status } = params.row
        const canConfirm = WORK_CENTER_STATUS_TO_CONFIRM.includes(status)
        const canEdit = WORK_CENTER_STATUS_TO_EDIT.includes(status)
        const canEditConfirm =
          WORK_CENTER_STATUS_CONFIRM_TO_EDIT.includes(status)
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
              {canEdit || canEditConfirm ? (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.WORK_CENTER.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              ) : (
                ''
              )}
              {canDelete && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              <IconButton
                onClick={() =>
                  history.push(`${ROUTE.WORK_CENTER.CREATE.PATH}?cloneId=${id}`)
                }
              >
                <Icon name="clone" />
              </IconButton>
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
      filter: convertFilterParams(
        { ...filters, factoryId: filters?.factoryId?.map((item) => item?.id) },
        [
          ...columns,
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'factoryId', filterFormat: 'multiple' },
        ],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWorkCenter(params)
  }

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteWorkCenter(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)

    setIsOpenDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('workCenter.import')}
          onImport={(params) => {
            importWorkCenterApi(params)
          }}
          onExport={() => {
            exportWorkCenterApi({
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
          onDownloadTemplate={getWorkCenterTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.WORK_CENTER.CREATE.PATH)}
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
      title={t('menu.workCenter')}
      onSearch={setKeyword}
      placeholder={t('workCenter.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('workCenter.title')}
        rows={wcList}
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
        sort={sort}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('workCenter.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('workCenter.deleteConfirm')}
        <LV
          label={t('workCenter.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('workCenter.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>

      <DialogApprove
        open={isOpenConfirmModal}
        onClose={() => {
          setTempItem(null)
          setIsOpenConfirmModal(false)
        }}
        data={tempItem}
        onSuccess={() => {
          refreshData()
        }}
      />
    </Page>
  )
}
export default WorkCenter
