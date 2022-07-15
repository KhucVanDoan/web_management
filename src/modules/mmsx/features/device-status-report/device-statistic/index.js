import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Status from '~/components/Status'
import { DEVICE_ASSIGN_STATUS } from '~/modules/mmsx/constants'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatusReport'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form/fillter'
import DeviceStatisticQuickFilter from './filter-quick-form'

const DeviceStatisticTable = ({ keyword }) => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const {
    data: { deviceStatistic, metaStatistic },
    actions,
  } = useDeviceStatus()
  const DEFAULT_QUICK_FILTERS = {
    deviceGroup: '',
    factoryId: '',
    deviceCode: '',
    userId: '',
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
      field: 'serial',
      headerName: t('reportDevice.serialTable.serial'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'deviceName',
      headerName: t('reportDevice.serialTable.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },

    {
      field: 'fullName',
      headerName: t('reportDevice.serialTable.user'),
      width: 150,
      sortable: true,
    },
    {
      field: 'usedAt',
      headerName: t('reportDevice.serialTable.usageDate'),
      width: 150,
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.usedAt)
      },
    },
    {
      field: 'status',
      headerName: t('reportDevice.serialTable.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_ASSIGN_STATUS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'numOfMaintain',
      headerName: t('reportDevice.serialTable.maintainedTime'),
      width: 100,
      align: 'right',
      sortable: true,
    },
    {
      field: 'numOfError',
      headerName: t('reportDevice.serialTable.brokeTime'),
      width: 100,
      align: 'right',
      sortable: true,
    },

    {
      field: 'action',
      headerName: t('reportDevice.serialTable.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { deviceAssignId } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEVICE_ASIGN.DETAIL.PATH.replace(
                    ':id',
                    `${deviceAssignId}`,
                  ),
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
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams({ ...filters, ...quickFilters }, columns),
      sort: convertSortParams(sort),
    }
    actions.searchDeviceStatistic(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  return (
    <>
      <DeviceStatisticQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        rows={deviceStatistic}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={metaStatistic?.total}
        sort={sort}
        beforeTopbar={
          <ImportExport
            name={t('menu.importExportData')}
            onImport={() => {}}
            onExport={() => {}}
            disabled
          />
        }
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
    </>
  )
}

export default DeviceStatisticTable
