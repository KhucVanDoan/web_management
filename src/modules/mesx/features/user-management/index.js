import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  ROLE_MAP,
} from '~/modules/wmsx/constants'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertSortParams } from '~/utils'
import qs from '~/utils/qs'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    route: ROUTE.USER_MANAGEMENT.LIST.PATH,
    title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
  },
]

function UserManagement() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const location = useLocation()
  const { factoryId } = qs.parse(location.search)

  const DEFAULT_FILTERS = {
    username: '',
    fullName: '',
    department: '',
    status: '',
    createTime: [],
    factoryId: factoryId,
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
    data: { userList, total, isLoading },
    actions,
  } = useUserManagement()

  const [selectedRows, setSelectedRows] = useState([])
  const [tempItem, setTempItem] = useState()
  const [isActiveModal, setIsActiveModal] = useState(false)
  const columns = [
    {
      field: 'code',
      headerName: t('userManagement.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'username',
      headerName: t('userManagement.username'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'fullName',
      headerName: t('userManagement.fullName'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'roleName',
      headerName: t('userManagement.role'),
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return ROLE_MAP[params?.row?.role]
      },
    },
    {
      field: 'status',
      headerName: t('userManagement.status'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { isActive } = params.row
        return (
          <Status
            options={ACTIVE_STATUS_OPTIONS}
            value={isActive}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('userManagement.action'),
      width: 150,
      sortable: false,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.USER_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickUpdateStatus(params.row)}>
              <Icon name={isLocked ? 'locked' : 'unlock'} />
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
      code: filters?.code || '',
      username: filters?.username || '',
      fullName: filters?.fullName || '',
      role: filters?.role || '',
      phoneNumber: filters?.phone || '',
      sort: convertSortParams(sort),
    }
    actions.searchUsers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])
  const onClickUpdateStatus = (tempItem) => {
    setIsActiveModal(true)
    setTempItem(tempItem)
  }
  const onCloseUpdateStatusModal = () => {
    setIsActiveModal(false)
    setTempItem(null)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.USER_MANAGEMENT.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }
  const onSubmitUpdateStatus = () => {
    if (tempItem?.isActive === ACTIVE_STATUS.ACTIVE) {
      actions.rejectUserById(tempItem?.id, () => {
        refreshData()
      })
    } else if (tempItem?.isActive === ACTIVE_STATUS.INACTIVE) {
      actions.confirmUserById(tempItem?.id, () => {
        refreshData()
      })
    }
    setIsActiveModal(false)
    setTempItem(null)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userManagement')}
      onSearch={setKeyword}
      placeholder={t('userManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('userManagement.title')}
        rows={userList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
      />
      <Dialog
        open={isActiveModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(tempItem?.status === ACTIVE_STATUS.ACTIVE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
        noBorderBottom
      >
        {t('general.confirmMessage')}
        <LV
          label={t('userManagement.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('userManagement.username')}
          value={tempItem?.username}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={ACTIVE_STATUS_OPTIONS}
              value={tempItem?.status}
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default UserManagement
