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
import useDefineInstallationTemplate from '~/modules/mmsx/redux/hooks/useDefineInstallationTemplate'
import {
  exportInstallationTemplateApi,
  getInstallationTemplateTemplateApi,
  importInstallationTemplateApi,
} from '~/modules/mmsx/redux/sagas/define-installation-template/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.INSTALLATION_TEMPLATE.LIST.PATH,
    title: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
  },
]

const DefineInstallationTemplate = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { installList, isLoading, total },
    actions,
  } = useDefineInstallationTemplate()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    updateAt: '',
    status: '',
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
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('templateInstall.category.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('templateInstall.category.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'description',
        headerName: t('templateInstall.category.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'createdAt',
        headerName: t('templateInstall.createdAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'actions',
        headerName: t('templateInstall.actions'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id } = params?.row

          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH.replace(
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
                    ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
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
    actions.getListTemplateInstall(params)
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
    actions.deleteTemplateInstall(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('installation_template.export')}
          onImport={(params) => importInstallationTemplateApi(params)}
          onExport={() =>
            exportInstallationTemplateApi({
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
          onDownloadTemplate={getInstallationTemplateTemplateApi}
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH)}
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
      title={t('menu.templateInstall')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('templateInstall.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('templateInstall.title')}
        columns={columns}
        rows={installList}
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
        title={t('templateInstall.delete.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('templateInstall.delete.confirmDetele')}
        <LV
          label={t('templateInstall.category.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('templateInstall.category.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineInstallationTemplate
