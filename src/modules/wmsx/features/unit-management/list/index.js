import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
// import { BULK_ACTION } from '~/common/constants'
// import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useManagementUnit from '~/modules/wmsx/redux/hooks/useManagementUnit'
import {
  exportUnitApi,
  importUnitApi,
} from '~/modules/wmsx/redux/sagas/management-unit/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
    title: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
  },
]
function ManagementUnit() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const [tempItem, setTempItem] = useState()
  const [selectedRows, setSelectedRows] = useState([])
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    date: '',
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
    data: { isLoading, managementUnitList, total },
    actions,
  } = useManagementUnit()

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const columns = [
    {
      field: 'code',
      headerName: t('managementUnit.code'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('managementUnit.name'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('managementUnit.description'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('managementUnit.status'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={ACTIVE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      fixed: true,
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id, status } = row
        const isLocked = status === ACTIVE_STATUS.ACTIVE

        return (
          <>
            <Guard code={FUNCTION_CODE.USER_DETAIL_DEPARTMENT_SETTING}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.UNIT_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.UNIT_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.USER_REJECT_DEPARTMENT_SETTING
                  : FUNCTION_CODE.USER_CONFIRM_DEPARTMENT_SETTING
              }
            >
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name={isLocked ? 'locked' : 'unlock'} />
              </IconButton>
            </Guard>
            <Guard
              code={
                FUNCTION_CODE.USER_DECENTRALIZATION_PERMISSION_GROUP_DEPARTMENT_SETTING
              }
            >
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.UNIT_MANAGEMENT.ASSIGN.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="assign" />
              </IconButton>
            </Guard>
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
    actions.searchManagementUnit(params)
  }

  const onClickUpdateStatus = (tempItem) => {
    setIsActiveModal(true)
    setTempItem(tempItem)
  }
  const onSubmitUpdateStatus = () => {
    if (tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectUnitManagementById(tempItem?.id, () => {
        refreshData()
      })
    } else if (tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmUnitManagementById(tempItem?.id, () => {
        refreshData()
      })
    }
    setIsActiveModal(false)
    setTempItem(null)
  }
  const onCloseUpdateStatusModal = () => {
    setIsActiveModal(false)
    setTempItem(null)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('managementUnit.export')}
          onExport={() =>
            exportUnitApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
              // type: TYPE_ENUM_EXPORT.COMPANY,
            })
          }
          onImport={() =>
            importUnitApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
              // type: TYPE_ENUM_EXPORT.COMPANY,
            })
          }
          onRefresh={refreshData}
          disabled
        />
        <Guard code={FUNCTION_CODE.USER_CREATE_DEPARTMENT_SETTING}>
          <Button
            onClick={() => history.push(ROUTE.UNIT_MANAGEMENT.CREATE.PATH)}
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.managementUnit')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('managementUnit.searchPlaceHolder')}
      loading={isLoading}
    >
      <DataTable
        title={t('managementUnit.title')}
        rows={managementUnitList}
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
        //onSelectionChange={setSelectedRows}
        onSettingChange={setColumnsSettings}
        selected={selectedRows}
        // bulkActions={{
        //   actions: [BULK_ACTION.DELETE],
        //   apiUrl: API_URL.PAYMENT_TYPE,
        //   onSuccess: () => {
        //     if (page === 1) {
        //       refreshData()
        //     } else {
        //       setPage(1)
        //     }
        //     setSelectedRows([])
        //   },
        // }}
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
          label={t('managementUnit.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('managementUnit.name')}
          value={tempItem?.name}
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

export default ManagementUnit
