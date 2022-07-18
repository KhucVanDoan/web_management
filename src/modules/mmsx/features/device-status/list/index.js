import React, { useEffect } from 'react'

import { IconButton, Typography } from '@mui/material'
import { isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEVICE_STATUS_ENUM_OPTIONS } from '~/modules/mmsx/constants'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'serialDeviceManagement',
  },
  {
    route: ROUTE.DEVICE_STATUS.LIST.PATH,
    title: ROUTE.DEVICE_STATUS.LIST.TITLE,
  },
]
const DeviceStatus = () => {
  const {
    data: { deviceStatusList, isLoading, total, dateExport },
    actions,
  } = useDeviceStatus()

  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    serial: '',
    deviceName: '',
    status: '',
    oee: '',
    date: null,
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

  const columns = [
    {
      field: 'serial',
      headerName: t('deviceStatus.serial'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'deviceName',
      headerName: t('deviceStatus.deviceName'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'status',
      headerName: t('deviceStatus.status.title'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_STATUS_ENUM_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'oee',
      headerName: t('deviceStatus.oee'),
      width: 100,
      renderCell: (params) => {
        const { oee } = params.row
        return isNumber(oee) ? `${oee.toFixed(2)} %` : ''
      },
    },
    {
      field: 'date',
      headerName: t('deviceStatus.date'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.date)
      },
    },
    {
      field: 'active',
      headerName: t('deviceStatus.active'),
      width: 100,
      renderCell: (params) => {
        return params.row?.timeAction
      },
    },
    {
      field: 'rest',
      headerName: t('deviceStatus.rest'),
      width: 100,
      renderCell: (params) => {
        return params.row?.timeRest
      },
    },
    {
      field: 'passedDevice',
      headerName: t('deviceStatus.passedDevice'),
      width: 100,
    },
    {
      field: 'manufacturedDevice',
      headerName: t('deviceStatus.manufacturedDevice'),
      width: 100,
    },
    {
      field: 'stop',
      headerName: t('deviceStatus.stop'),
      width: 100,
      renderCell: (params) => {
        return params.row?.numOfStop
      },
    },
    {
      field: 'action',
      headerName: t('deviceStatus.action'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const id = params.row?.deviceAssignmentId

        return (
          <IconButton
            onClick={() =>
              history.push(
                ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', `${id}`),
              )
            }
          >
            <Icon name="show" />
          </IconButton>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.getListDeviceStatus(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatus')}
      onSearch={setKeyword}
      placeholder={t('deviceStatus.searchPlaceholder')}
      loading={isLoading}
    >
      <Typography variant="h5" mt={1}>
        {t('deviceStatus.exportDate') + convertUtcDateTimeToLocalTz(dateExport)}
      </Typography>
      <DataTable
        title={t('deviceStatus.title')}
        columns={columns}
        rows={deviceStatusList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}

export default DeviceStatus
