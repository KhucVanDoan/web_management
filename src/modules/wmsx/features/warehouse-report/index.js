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
import useWarehouseReport from '~/modules/wmsx/redux/hooks/useWarehouseReport'
import { exportWarehouseReportApi } from '~/modules/wmsx/redux/sagas/warehouse-report/import-export-warehouse-report'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_REPORT.LIST.PATH,
    title: ROUTE.WAREHOUSE_REPORT.LIST.TITLE,
  },
]
function WarehouseReport() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    reportingPeriod: '',
    createBy: '',
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
    data: { warehouseReportList, total, isLoading },
    actions,
  } = useWarehouseReport()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   fixed: true,
    //   sortable: true,
    // },
    {
      field: 'code',
      headerName: t('warehouseReport.code'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('warehouseReport.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'reportingPeriod',
      headerName: t('warehouseReport.periodReport'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const { startDate, endDate } = params?.row
        return `${convertUtcDateToLocalTz(startDate)}-${convertUtcDateToLocalTz(
          endDate,
        )}`
      },
    },
    {
      field: 'createdBy',
      headerName: t('warehouseReport.createdBy'),
      width: 150,
      renderCell: (params) => {
        const { createdBy, user } = params?.row
        return createdBy?.fullName || user?.username || ''
      },
    },
    {
      field: 'createdOn',
      headerName: t('warehouseReport.createdAt'),
      sortable: true,
      width: 150,
      renderCell: (params) => {
        const { createdOn } = params?.row
        return convertUtcDateToLocalTz(createdOn)
      },
    },
    {
      field: 'action',
      headerName: t('warehouseReport.action'),
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
                  ROUTE.WAREHOUSE_REPORT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {/* <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_REPORT.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton> */}
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

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseReports(params)
  }

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouseReport(tempItem?.id, refreshData)
    setDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {
            exportWarehouseReportApi({
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
          onClick={() => history.push(ROUTE.WAREHOUSE_REPORT.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general.create')}
        </Button>
      </>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.warehouseReport')}
        onSearch={setKeyword}
        placeholder={t('warehouseReport.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('warehouseReport.title')}
          rows={warehouseReportList}
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
          title={t('warehouseReport.deleteModalTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('warehouseReport.confirmDelete')}
          <LabelValue
            label={t('warehouseReport.code')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LabelValue
            label={t('warehouseReport.name')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default WarehouseReport
