import React, { useEffect, useMemo, useState } from 'react'

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
  PRODUCING_STEP_STATUS_TO_CONFIRM,
  PRODUCING_STEP_STATUS_TO_EDIT,
  PRODUCING_STEP_STATUS_TO_DELETE,
  PRODUCING_STEP_OPTIONS,
} from '~/modules/mesx/constants'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  exportProducingStepApi,
  getProducingStepTemplateApi,
  importProducingStepApi,
} from '../../redux/sagas/producing-steps/import-export'
import { DialogApprove } from './dialogs/approve'
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
      headerName: t('producingStep.code'),
      width: 80,
      visible: 'always',
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('producingStep.name'),
      width: 150,
      visible: 'always',
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('producingStep.description'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'createdAt',
      headerName: t('producingStep.createdAt'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('producingStep.updatedAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'status',
      headerName: t('producingStep.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={PRODUCING_STEP_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('producingStep.action'),
      width: 150,
      align: 'center',
      visible: 'always',
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
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.PRODUCING_STEP.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
            </IconButton>
          </>
        )
      },
    },
  ])

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    if (refreshKey) {
      if (list?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, list])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

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
        <ImportExport
          name={t('itemUnitDefine.import')}
          onImport={(params) => {
            importProducingStepApi(params)
          }}
          onExport={() => {
            exportProducingStepApi({
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
          onDownloadTemplate={getProducingStepTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.PRODUCING_STEP.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteProducingStep(tempItem?.id, () => refreshData())
    setDeleteModal(false)
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
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          //onSelectionChange={setSelectedRows}
          selected={selectedRows}
          total={total}
          title={t('producingStep.title')}
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
          title={t('producingStep.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('producingStep.confirmDelete')}
          <LV
            label={t('producingStep.code')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('producingStep.name')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>

        <DialogApprove
          open={confirmModal}
          onClose={() => {
            setTempItem(null)
            setConfirmModal(false)
          }}
          data={tempItem}
          onSuccess={() => {
            refreshData()
          }}
        />
      </Page>
    </>
  )
}

export default ProducingStep
