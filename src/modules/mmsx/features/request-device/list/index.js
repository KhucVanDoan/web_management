import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  TYPE_REQUEST,
  TYPE_REQUEST_OPTION,
  DEVICE_REQUEST_STATUS_OPTION,
  DEVICE_REQUEST_LIST_STATUS,
  DEVICE_REQUEST_TICKET_STATUS,
  DEVICE_RETURN_TICKET_STATUS,
} from '~/modules/mmsx/constants'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
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
    route: ROUTE.REQUEST_DEVICE.LIST.PATH,
    title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
  },
]
const RequestDeviceList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const {
    data: { isLoading, total, requestDeviceList },
    actions,
  } = useRequestDevice()
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
        headerName: t('requestDevice.category.requestCode'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('requestDevice.category.requestName'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'type',
        headerName: t('requestDevice.category.requestType'),
        width: 150,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return t(
            `${
              TYPE_REQUEST_OPTION.find((item) => item.id === params?.row?.type)
                ?.text
            }`,
          )
        },
      },
      {
        field: 'deviceCode',
        headerName: t('requestDevice.category.deviceCode'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const devices = params?.row?.devices || []
          const deviceCode = devices.map((x) => x?.code)
          return deviceCode.join(', ')
        },
      },
      {
        field: 'deviceName',
        headerName: t('requestDevice.category.deviceName'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const devices = params?.row?.devices || []
          const deviceName = devices.map((x) => x?.name)
          return deviceName.join(', ')
        },
      },
      {
        field: 'user',
        headerName: t('requestDevice.category.user'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const devices = params?.row?.devices || []
          const users = devices.map((x) => x?.user)
          const usernameList = users.map((x) => x?.username)
          return usernameList.join(', ')
        },
      },
      {
        field: 'serial',
        headerName: t('requestDevice.category.numberSerial'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const devices = params?.row?.devices || []
          const serialList = devices.map((x) => x?.serial)
          return serialList.join(', ')
        },
      },
      {
        field: 'quantity',
        headerName: t('requestDevice.category.count'),
        width: 150,
        sortable: true,
        align: 'center',
      },

      {
        field: 'status',
        headerName: t('requestDevice.category.status'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={DEVICE_REQUEST_STATUS_OPTION}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('common.createdAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('common.updatedAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('deviceCategory.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status, type } = params?.row
          const isPending = status === DEVICE_REQUEST_LIST_STATUS.PENDING
          const isAwaitingITConfirmationRequest =
            status === DEVICE_REQUEST_LIST_STATUS.AWAITINGITCONFIRMATION
          const isInstalledRequest =
            status === DEVICE_REQUEST_LIST_STATUS.INSTALLED

          return type === TYPE_REQUEST.REQUEST ? (
            <>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.REQUEST_DEVICE.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {(isPending ||
                isAwaitingITConfirmationRequest ||
                isInstalledRequest) && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {(isPending || isAwaitingITConfirmationRequest) && (
                <IconButton onClick={() => onClickRejected(params.row)}>
                  <Icon name="remove" />
                </IconButton>
              )}
            </>
          ) : (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.REQUEST_DEVICE.RETURN_DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              )}
              {(isPending || isAwaitingITConfirmationRequest) && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {(isPending || isAwaitingITConfirmationRequest) && (
                <IconButton onClick={() => onClickRejected(params.row)}>
                  <Icon name="remove" />
                </IconButton>
              )}
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
    actions.searchRequestDevice(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  const onSubmitDelete = () => {
    if (tempItem?.type === TYPE_REQUEST.REQUEST) {
      actions.deleteRequestDevice(tempItem?.id, () => {
        refreshData()
      })
    } else {
      actions.deleteReturnDevice(tempItem?.id, () => {
        refreshData()
      })
    }
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }

  const submitReject = () => {
    if (tempItem?.type === TYPE_REQUEST.REQUEST) {
      const params = {
        id: tempItem.id,
        status: DEVICE_REQUEST_TICKET_STATUS.REJECTED,
      }
      actions.changeStatusRequestDevice(params, () => {
        refreshData()
      })
    } else {
      const params = {
        id: tempItem.id,
        status: DEVICE_RETURN_TICKET_STATUS.REJECTED,
      }
      actions.changeStatusReturnDevice(params, () => {
        refreshData()
      })
    }
    setTempItem(null)
    setIsOpenRejectModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    if (tempItem?.type === TYPE_REQUEST.REQUEST) {
      let params = {}
      switch (tempItem?.status) {
        case DEVICE_REQUEST_LIST_STATUS.PENDING:
          params = {
            id: tempItem.id,
            status: DEVICE_REQUEST_TICKET_STATUS.AWAITINGITCONFIRMATION,
          }
          break
        case DEVICE_REQUEST_LIST_STATUS.AWAITINGITCONFIRMATION:
          params = {
            id: tempItem.id,
            status: DEVICE_REQUEST_TICKET_STATUS.WAITTINGEXPORT,
          }
          break
        case DEVICE_REQUEST_LIST_STATUS.AWAITINGASSIGNMENT:
          params = {
            id: tempItem.id,
            status: DEVICE_REQUEST_TICKET_STATUS.ASSIGNED,
          }
          break
        case DEVICE_REQUEST_LIST_STATUS.ASSIGNED:
        case DEVICE_REQUEST_LIST_STATUS.INSTALLED:
          params = {
            id: tempItem.id,
            status: DEVICE_REQUEST_TICKET_STATUS.CONFIRMED,
          }
          break
        default:
          break
      }
      actions.changeStatusRequestDevice(params, () => {
        refreshData()
      })
    } else {
      let params = {}
      switch (tempItem?.status) {
        case DEVICE_REQUEST_LIST_STATUS.PENDING:
          params = {
            id: tempItem.id,
            status: DEVICE_RETURN_TICKET_STATUS.AWAITINGITCONFIRMATION,
          }
          break
        case DEVICE_REQUEST_LIST_STATUS.AWAITINGITCONFIRMATION:
          params = {
            id: tempItem.id,
            status: DEVICE_RETURN_TICKET_STATUS.AWAITINGRETURN,
          }
          break
        case DEVICE_REQUEST_LIST_STATUS.AWAITINGRETURN:
          params = {
            id: tempItem.id,
            status: DEVICE_RETURN_TICKET_STATUS.RETURNED,
          }
          break
        default:
          break
      }
      actions.changeStatusReturnDevice(params, () => {
        refreshData()
      })
    }

    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.REQUEST_DEVICE.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('requestDevice.form.createRequestDevice')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('requestDevice.form.createReturnDevice')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.requestDevice')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('requestDevice.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('requestDevice.title')}
        columns={columns}
        rows={requestDeviceList}
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
      <Dialog
        open={isOpenDeleteModal}
        title={t('requestDevice.delete.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('requestDevice.delete.confirmDetele')}
        <LV
          label={t('requestDevice.category.requestCode')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('requestDevice.confirm.description')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('requestDevice.confirm.description')}
        <LV
          label={t('requestDevice.category.requestCode')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>

      <Dialog
        open={isOpenRejectModal}
        title={t('requestDevice.reject.title')}
        onCancel={() => setIsOpenRejectModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('requestDevice.reject.description')}
        <LV
          label={t('requestDevice.category.requestCode')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default RequestDeviceList
