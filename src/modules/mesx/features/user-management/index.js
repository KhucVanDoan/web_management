import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useUserManagement from '~/modules/mesx/redux/hooks/useUserManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'
import qs from '~/utils/qs'

import {
  exportUserApi,
  getUserTemplateApi,
  importUserApi,
} from '../../redux/sagas/user-management/import-export-user'
import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.USER_MANAGEMENT.LIST.PATH,
    title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
  },
]

function UserManagement() {
  const { t } = useTranslation('mesx')
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

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'username',
      headerName: t('userManagement.username'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'fullName',
      headerName: t('userManagement.fullName'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'email',
      headerName: t('userManagement.email'),
      width: 150,
      sortable: false,
    },
    {
      field: 'departmentName',
      headerName: t('userManagement.department'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const deparmentName = params.row?.departmentSettings
          ?.map((department) => department?.name)
          .join('; ')
        return deparmentName
      },
    },
    {
      field: 'roleName',
      headerName: t('userManagement.role'),
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const roleName = params.row?.userRoleSettings
          ?.map((role) => role?.name)
          .join('; ')
        return roleName
      },
    },
    {
      field: 'warehouseName',
      headerName: t('userManagement.warehouse'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const warehousesName = params.row.userWarehouses
          ?.map((warehouse) => warehouse?.name)
          ?.join('; ')
        return warehousesName
      },
    },
    {
      field: 'status',
      headerName: t('userManagement.status'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={USER_MANAGEMENT_STATUS_OPTIONS}
            value={status}
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
      fixed: true,
      renderCell: (params) => {
        const { id } = params?.row
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
            <IconButton onClick={() => onClickDelete(params.row)}>
              <Icon name="delete" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.USER_MANAGEMENT.CREATE.PATH}?cloneId=${id}`,
                )
              }
            >
              <Icon name="clone" />
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
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

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteUser(modal?.tempItem?.id, () => {
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
          name={t('userManagement.import')}
          onImport={(params) => {
            importUserApi(params)
          }}
          onExport={() => {
            exportUserApi({
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
          onDownloadTemplate={getUserTemplateApi}
          onRefresh={refreshData}
          disabled
        />
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userManagement')}
      onSearch={setKeyword}
      placeholder={t('userManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
      {...(factoryId
        ? { onBack: () => history.push(ROUTE.COMPANY_CHART.LIST.PATH) }
        : {})}
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
          validationSchema: filterSchema(t),
        }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.USER,
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
        open={modal.isOpenDeleteModal}
        title={t('userManagement.userManagementDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('userManagement.deleteConfirm')}
        <LV
          label={t('userManagement.username')}
          value={modal?.tempItem?.username}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('userManagement.fullName')}
          value={modal?.tempItem?.fullName}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default UserManagement
