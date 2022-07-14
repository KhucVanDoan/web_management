import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import {
  importInventoryLimitApi,
  getInventoryLimitTemplateApi,
} from '~/modules/wmsx/redux/sagas/inventory-limit/import-export-inventory-limit'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import useInventoryLimit from '../../redux/hooks/useInvetoryLimit'
import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.INVENTORY_LIMIT.LIST.PATH,
    title: ROUTE.INVENTORY_LIMIT.LIST.TITLE,
  },
]
function InventoryLimit() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
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
  } = useQueryState()

  const {
    data: { isLoading, inventoryLimitList, total },
    actions,
  } = useInventoryLimit()

  const columns = [
    {
      field: 'itemCode',
      headerName: t('inventoryLimit.itemCode'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t('inventoryLimit.itemName'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'minInventoryLimit',
      headerName: t('inventoryLimit.inventoryLimitDown'),
      width: 150,
      sortable: true,
    },
    {
      field: 'inventoryLimit',
      headerName: t('inventoryLimit.inventoryLimit'),
      width: 150,
      sortable: true,
    },
    {
      field: 'maxInventoryLimit',
      headerName: t('inventoryLimit.inventoryLimitUp'),
      width: 150,
      sortable: true,
    },
    {
      field: 'action',
      headerName: t('inventoryLimit.action'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.INVENTORY_LIMIT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.INVENTORY_LIMIT.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleDeleteOpenModal(row)}>
              <Icon name="delete" />
            </IconButton>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchInventoryLimits(params)
  }

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteInventoryLimit(tempItem?.id, refreshData)
    setDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <ImportExport
          name={t('menu.importExportData')}
          onImport={(params) => {
            importInventoryLimitApi(params)
          }}
          onDownloadTemplate={getInventoryLimitTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.INVENTORY_LIMIT.CREATE.PATH)}
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
      title={t('menu.inventoryLimit')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('inventoryLimit.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('inventoryLimit.title')}
        rows={inventoryLimitList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.INVENTORY_LIMIT,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      />
      <Dialog
        open={deleteModal}
        title={t('inventoryLimit.deleteTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventoryLimit.confirmDelete')}
        <LabelValue
          label={t('inventoryLimit.itemCode')}
          value={tempItem?.itemCode}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('inventoryLimit.itemName')}
          value={tempItem?.itemName}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}
export default InventoryLimit
