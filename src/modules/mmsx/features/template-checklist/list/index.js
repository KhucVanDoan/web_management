import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
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
import useTemplateChecklist from '~/modules/mmsx/redux/hooks/useTemplateChecklist'
import {
  exportTemplateChecklistApi,
  getTemplateChecklistTemplateApi,
  importTemplateChecklistApi,
} from '~/modules/mmsx/redux/sagas/template-checklist/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.TEMPLATE_CHECKLIST.LIST.PATH,
    title: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
  },
]
const TemplateChecklist = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { templateChecklistList, isLoading, total },
    actions,
  } = useTemplateChecklist()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    deviceCode: '',
    deviceName: '',
    createdAt: '',
    updatedAt: '',
  }

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

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('templateChecklist.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('templateChecklist.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'deviceCode',
        headerName: t('templateChecklist.deviceCode'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.device?.code
        },
      },
      {
        field: 'deviceName',
        headerName: t('templateChecklist.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.device?.name
        },
      },
      {
        field: 'createdAt',
        headerName: t('templateChecklist.createdAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('templateChecklist.updatedAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('templateChecklist.action'),
        width: 150,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id } = params?.row
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchTemplateChecklist(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteTemplateChecklist(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('common.import')}
          onImport={(params) => {
            importTemplateChecklistApi(params)
          }}
          onExport={() => {
            exportTemplateChecklistApi({
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
          onDownloadTemplate={getTemplateChecklistTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH)}
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
      title={t('menu.templateChecklist')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('templateChecklist.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('templateChecklist.title')}
        columns={columns}
        rows={templateChecklistList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('templateChecklist.deleteTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('templateChecklist.confirmDetele')}
        <LV
          label={t('templateChecklist.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('templateChecklist.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default TemplateChecklist
