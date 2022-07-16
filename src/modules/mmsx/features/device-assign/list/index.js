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
// import Status from '~/components/Status'
import { DEVICE_ASSIGN_STATUS } from '~/modules/mmsx/constants'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_ASSIGN.LIST.PATH,
    title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
  },
]
const DeviceAssign = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const {
    data: { deviceAssignList, isLoading, total },
    actions,
  } = useDeviceAssign()
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
        field: 'serial',
        headerName: t('deviceAssign.assign.serial'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'code',
        headerName: t('deviceAssign.assign.code'),
        width: 150,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return params?.row?.deviceRequest[0]?.device[0]?.code
        },
      },
      {
        field: 'deviceName',
        headerName: t('deviceAssign.assign.name'),
        width: 150,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return params?.row?.deviceRequest[0]?.device[0]?.name
        },
      },
      {
        field: 'user',
        headerName: t('deviceAssign.assign.user'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { user } = params.row
          return user?.username
        },
      },

      {
        field: 'status',
        headerName: t('deviceAssign.assign.status'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          const isPaused = params?.row?.deviceRequest[0]?.device[0]?.type === 1
          return isPaused && status === 1
            ? t(`deviceAssign.status.pending`)
            : t(DEVICE_ASSIGN_STATUS[status])
        },
      },
      {
        field: 'createdAt',
        headerName: t('common.createdAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('common.updatedAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('deviceCategory.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { _id: id, status } = params?.row
          const isPending = status === 0
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEVICE_ASSIGN.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEVICE_ASSIGN.EDIT.PATH.replace(':id', `${id}`),
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
              {status === 4 && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEVICE_ASSIGN.REASSIGN.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="clone" />
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
    actions.searchDeviceAssign(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteDeviceAssign(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.DEVICE_ASSIGN.CREATE.PATH)}
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
      title={t('menu.deviceAssign')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceAssign.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('deviceAssign.title')}
        columns={columns}
        rows={deviceAssignList}
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
        title={t('deviceAssign.deleteDeviceAssign.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('deviceAssign.deleteDeviceAssign.description')}
        <LV
          label={t('deviceAssign.assign.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('deviceAssign.assign.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DeviceAssign
