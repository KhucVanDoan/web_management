import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
// import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineExpenditureType from '~/modules/wmsx/redux/hooks/useDefineExpenditureType'
// import {
//   exportExpenditureTypeApi,
//   getExpenditureTypeTemplateApi,
// } from '~/modules/wmsx/redux/sagas/define-expenditure-type/import-export-expenditure-type'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.TITLE,
  },
]

function DefineExpenditureType() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createTime: [],
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
    data: { expenditureTypeList, total, isLoading },
    actions,
  } = useDefineExpenditureType()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })

  // const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  // const [loadingExport, setLoadingExport] = useState(false)
  const columns = [
    {
      field: 'code',
      headerName: t('defineExpenditureType.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineExpenditureType.name'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'description',
      headerName: t('defineExpenditureType.description'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('defineExpenditureType.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row?.status)
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
      width: 150,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      resizable: false,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <Guard code={FUNCTION_CODE.SALE_DETAIL_COST_TYPE}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.SALE_UPDATE_COST_TYPE}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_EXPENDITURE_TYPE.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.SALE_REJECT_COST_TYPE
                  : FUNCTION_CODE.SALE_CONFIRM_COST_TYPE
              }
            >
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name={isLocked ? 'locked' : 'unlock'} />
              </IconButton>
            </Guard>
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
      filter: convertFilterParams(
        { ...filters, organizationPaymentId: filters?.organizationPayment?.id },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchExpenditureType(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectExpenditureTypeById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmExpenditureTypeById(modal.tempItem?.id, () => {
        refreshData()
      })
    }
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const onCloseUpdateStatusModal = () => {
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* <ImportExport
          // onImport={(params) => importExpenditureTypeApi(params)}
          name={t('menu.defineExpenditureType')}
          loadingExport={setLoadingExport}
          onExport={() =>
            exportExpenditureTypeApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onDownloadTemplate={getExpenditureTypeTemplateApi}
          onRefresh={refreshData}
        /> */}
        <Guard code={FUNCTION_CODE.SALE_CREATE_COST_TYPE}>
          <Button
            onClick={() =>
              history.push(ROUTE.DEFINE_EXPENDITURE_TYPE.CREATE.PATH)
            }
            sx={{ ml: 4 / 3 }}
            icon="add"
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
      title={t('menu.defineExpenditureType')}
      onSearch={setKeyword}
      placeholder={t('defineExpenditureType.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineExpenditureType.list')}
        rows={expenditureTypeList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        // onSettingChange={setColumnsSettings}
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
        // bulkActions={{
        //   actions: [BULK_ACTION.DELETE],
        //   apiUrl: API_URL.EXPENDITURE_TYPE,
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
        open={modal.isOpenUpdateStatusModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === ACTIVE_STATUS.ACTIVE
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
          label={t('defineExpenditureType.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineExpenditureType.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={ACTIVE_STATUS_OPTIONS}
              value={modal?.tempItem?.status}
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineExpenditureType
