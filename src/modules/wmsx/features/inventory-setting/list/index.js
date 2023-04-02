import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import NumberFormatText from '~/components/NumberFormat'
import Page from '~/components/Page'
import useInventorySetting from '~/modules/wmsx/redux/hooks/useInventorySetting'
import {
  exportInventorySettingApi,
  getInventorySettingTemplateApi,
  importInventorySettingApi,
} from '~/modules/wmsx/redux/sagas/inventory-setting/import-export-inventory-setting'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_SETTING.LIST.PATH,
    title: ROUTE.INVENTORY_SETTING.LIST.TITLE,
  },
]

function InventorySetting() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    warehouseId: '',
    itemCode: '',
    itemName: '',
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
    data: { inventorySettingList, total, isLoading },
    actions,
  } = useInventorySetting()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })
  const { canAccess } = useApp()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'warehouseCode',
      headerName: t('inventorySetting.warehouseCode'),
      width: 120,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params.row.warehouse?.code
      },
    },
    {
      field: 'itemCode',
      headerName: t('inventorySetting.itemCode'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params.row.item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('inventorySetting.itemName'),
      width: 120,
      renderCell: (params) => {
        return params.row.item?.name
      },
    },
    {
      field: 'unit',
      headerName: t('inventorySetting.unit'),
      width: 100,
      renderCell: (params) => {
        return params.row?.item?.itemUnit?.name
      },
    },
    {
      field: 'minInventoryLimit',
      headerName: t('inventorySetting.minInventoryLimit'),
      width: 50,
      sortable: true,
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText value={row.minInventoryLimit} formatter="quantity" />
      ),
    },
    {
      field: 'inventoryLimit',
      headerName: t('inventorySetting.inventoryLimit'),
      width: 50,
      sortable: true,
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText value={row.inventoryLimit} formatter="quantity" />
      ),
    },
    {
      field: 'maxInventoryLimit',
      headerName: t('inventorySetting.maxInventoryLimit'),
      width: 50,
      sortable: true,
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText value={row.maxInventoryLimit} formatter="quantity" />
      ),
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 120,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <Guard code={FUNCTION_CODE.ITEM_DETAIL_INVENTORY_QUANTITY_NORM}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.INVENTORY_SETTING.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.ITEM_UPDATE_INVENTORY_QUANTITY_NORM}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.INVENTORY_SETTING.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.ITEM_DELETE_INVENTORY_QUANTITY_NORM}>
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            </Guard>
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
      filter: convertFilterParams(
        { ...filters, warehouseId: filters?.warehouseId?.id },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchInventorySetting(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteInventorySetting(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          {...(canAccess(FUNCTION_CODE.ITEM_EXPORT_INVENTORY_QUANTITY_NORM)
            ? {
                onExport: () =>
                  exportInventorySettingApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: `${x?.id}` })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    sort: convertSortParams(sort),
                    type: 4,
                  }),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.ITEM_IMPORT_INVENTORY_QUANTITY_NORM)
            ? {
                onImport: () =>
                  importInventorySettingApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: `${x?.id}` })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    sort: convertSortParams(sort),
                  }),
              }
            : {})}
          onDownloadTemplate={getInventorySettingTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.ITEM_CREATE_INVENTORY_QUANTITY_NORM}>
          <Button
            onClick={() => history.push(ROUTE.INVENTORY_SETTING.CREATE.PATH)}
            sx={{ ml: 4 / 3 }}
            icon="add"
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventorySetting')}
      onSearch={setKeyword}
      placeholder={t('inventorySetting.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('inventorySetting.list')}
        rows={inventorySettingList}
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
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        bulkActions={
          {
            // actions: [BULK_ACTION.DELETE],
            // apiUrl: API_URL.INVENTORY_SETTING,
            // onSuccess: () => {
            //   if (page === 1) {
            //     refreshData()
            //   } else {
            //     setPage(1)
            //   }
            //   setSelectedRows([])
            // },
          }
        }
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('inventorySetting.inventorySettingDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventorySetting.deleteConfirm')}
        <LV
          label={t('inventorySetting.warehouseCode')}
          value={modal?.tempItem?.warehouse?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventorySetting.itemCode')}
          value={modal?.tempItem?.item?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default InventorySetting
