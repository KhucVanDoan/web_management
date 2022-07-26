import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatusReport'
import { exportDeviceStatusReportApi } from '~/modules/mmsx/redux/sagas/device-status-report/import-export-device-status'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from '../device-status/filter-form/fillter'
import DeviceStatusQuickFilter from './filter-quick-form'

const DeviceStatusTable = ({ keyword }) => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { deviceStatus, metaStatus },
    actions,
  } = useDeviceStatus()

  const DEFAULT_QUICK_FILTERS = {
    deviceGroup: '',
    factoryId: '',
    workCenterId: '',
  }
  const {
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    quickFilters: DEFAULT_QUICK_FILTERS,
  })
  const columns = [
    {
      field: 'devideCode',
      headerName: t('reportDevice.table.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'devideName',
      headerName: t('reportDevice.table.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },

    {
      field: 'totalQuantity',
      headerName: t('reportDevice.table.totalQuantity'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'unUseQuantity',
      headerName: t('reportDevice.table.unuseQuantity'),
      width: 100,
      sortable: true,
      align: 'right',
      fixed: true,
    },
    {
      field: 'usingQuantity',
      headerName: t('reportDevice.table.beingUseQuantity'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'returnedQuantity',
      headerName: t('reportDevice.table.returnedQuantity'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'maintainQuantity',
      headerName: t('reportDevice.table.maintainQuantity'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'scrapQuantity',
      headerName: t('reportDevice.table.junkQuantity'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'action',
      headerName: t('reportDevice.table.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { deviceId } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', `${deviceId}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
          </div>
        )
      },
    },
  ]
  const refreshData = () => {
    const params = {
      deviceGroupId: quickFilters?.deviceGroupId?.id || null,
      factoryId: quickFilters?.factoryId?.id || null,
      workCenterId: quickFilters?.workCenterId?.id || null,
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchDeviceStatus(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])
  return (
    <>
      <DeviceStatusQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        rows={deviceStatus}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={metaStatus?.total}
        sort={sort}
        beforeTopbar={
          <ImportExport
            name={t('common.exportFile')}
            onExport={() => {
              exportDeviceStatusReportApi({
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
        }
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        tableSettingKey="deviceStatus"
      />
    </>
  )
}

export default DeviceStatusTable
