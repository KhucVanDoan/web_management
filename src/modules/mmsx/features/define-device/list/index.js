import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
import Status from '~/components/Status'
import { DEVICE_STATUS, DEVICE_STATUS_OPTION } from '~/modules/mmsx/constants'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import {
  exportDeviceApi,
  getDeviceTemplateApi,
  importDeviceApi,
} from '~/modules/mmsx/redux/sagas/define-device/import-export-device'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_LIST.LIST.PATH,
    title: ROUTE.DEVICE_LIST.LIST.TITLE,
  },
]
function DefineDevice() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const {
    data: { deviceList, total, isLoading },
    actions,
  } = useDefineDevice()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

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
      field: 'code',
      headerName: t('deviceList.device.code'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('deviceList.device.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'deviceGroup',
      headerName: t('deviceList.device.deviceCategory'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.deviceGroup?.name
      },
    },
    {
      field: 'type',
      headerName: t('deviceList.device.type'),
      width: 180,
      sortable: true,
      renderCell: (params) => {
        const { type } = params.row
        return type === 1
          ? t('deviceList.device.forProduction')
          : t('deviceList.device.notForProduction')
      },
    },
    {
      field: 'description',
      headerName: t('deviceList.device.description'),
      width: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('deviceList.device.status'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_STATUS_OPTION}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('common.createdAt'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('common.updatedAt'),
      filterFormat: 'date',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params.row
        const isPending = status === DEVICE_STATUS.PENDING
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isPending && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEVICE_LIST.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
                  <Icon name="delete" />
                </IconButton>
                <IconButton onClick={() => handleOpenConfirmModal(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              </>
            )}
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchDevice(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    const params = {
      id: modal?.tempItem?.id,
      reason: null,
    }
    actions.deleteDevice(params, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const handleOpenConfirmModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenConfirmModal: true,
    })
  }

  const onSubmitConfirmModal = () => {
    actions.confirmDevice(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseConfirmModal = () => {
    setModal({
      tempItem: null,
      isOpenConfirmModal: false,
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('device.export')}
          onImport={(params) => importDeviceApi(params)}
          onExport={() =>
            exportDeviceApi({
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
          onDownloadTemplate={getDeviceTemplateApi}
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEVICE_LIST.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceList')}
      onSearch={setKeyword}
      placeholder={t('deviceList.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('deviceList.title')}
        rows={deviceList}
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
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('deviceList.deleteDevice.title')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('deviceList.deleteDevice.description')}
        <LV
          label={t('deviceList.device.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('deviceList.device.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={modal.isOpenConfirmModal}
        title={t('deviceList.confirmDevice.title')}
        onCancel={onCloseConfirmModal}
        onSubmit={onSubmitConfirmModal}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('deviceList.confirmDevice.description')}
        <LV
          label={t('deviceList.device.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('deviceList.device.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineDevice
