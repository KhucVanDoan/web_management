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
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import {
  exportWarehouseApi,
  getWarehouseTemplateApi,
  importWarehouseApi,
} from '~/modules/wmsx/redux/sagas/define-warehouse/import-export-warehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_SETUP.TITLE,
  },
  {
    route: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
    title: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
  },
]
function DefineWarehouse() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { warehouseList, total, isLoading },
    actions,
  } = useDefineWarehouse()

  const columns = [
    {
      field: 'code',
      headerName: t('defineWarehouse.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('defineWarehouse.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'warehouseTypes',
      headerName: t('defineWarehouse.type'),
      width: 150,
      renderCell: (params) => {
        const warehouseTypeNames = params?.row?.warehouseTypes
          ?.map((item) => item.name)
          ?.filter((item) => item)
          .join('; ')

        return warehouseTypeNames
      },
    },
    {
      field: 'description',
      headerName: t('defineWarehouse.description'),
      width: 150,
    },
    {
      field: 'factoryId',
      headerName: t('defineWarehouse.factory'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.factory?.name
      },
    },
    {
      field: 'location',
      headerName: t('defineWarehouse.address'),
      width: 150,
    },
    {
      field: 'action',
      headerName: t('defineWarehouse.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_WAREHOUSE.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleDeleteOpenModal(row)}>
              <Icon name="delete" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.DEFINE_WAREHOUSE.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
            </IconButton>
          </>
        )
      },
    },
    {
      field: 'design',
      headerName: t('defineWarehouse.design'),
      width: 150,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <Button
            variant="text"
            size="small"
            bold={false}
            onClick={() => {
              history.push(ROUTE.WAREHOUSE_DESIGN.PATH + '?id=' + id)
            }}
          >
            {t('defineWarehouse.design')}
          </Button>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        { ...filters, factoryIds: filters?.factoryIds?.id },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouses(params)
  }

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouse(tempItem?.id, refreshData)
    setDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onImport={(params) => {
            importWarehouseApi(params)
          }}
          onExport={() => {
            exportWarehouseApi({
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
          onDownloadTemplate={getWarehouseTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_WAREHOUSE.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('defineWarehouse.create')}
        </Button>
      </>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.defineWarehouse')}
        onSearch={setKeyword}
        placeholder={t('defineWarehouse.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('defineWarehouse.title')}
          rows={warehouseList}
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
          filters={{
            form: <FilterForm />,
            defaultValue: DEFAULT_FILTERS,
            values: filters,
            onApply: setFilters,
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('defineWarehouse.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('defineWarehouse.confirmDelete')}
          <LabelValue
            label={t('defineWarehouse.code')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LabelValue
            label={t('defineWarehouse.name')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default DefineWarehouse
