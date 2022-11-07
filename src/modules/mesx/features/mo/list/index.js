import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  MO_STATUS_OPTIONS,
  MO_STATUS_TO_CONFIRM,
  MO_STATUS_TO_EDIT,
  MO_STATUS_TO_DELETE,
  MO_STATUS,
} from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import {
  importMoApi,
  exportMoApi,
  getMoTemplateApi,
} from '~/modules/mesx/redux/sagas/mo/import-export-mo'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertUtcDateToLocalTz,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import { DialogApprove } from './dialogs/approve'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MO.LIST.PATH,
    title: ROUTE.MO.LIST.TITLE,
  },
]

const Mo = () => {
  const { t } = useTranslation(['mesx'])
  const [tempItem, setTempItem] = useState(null)
  const history = useHistory()

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const { refreshKey, clearRefreshKey } = useApp()

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
    data: { isLoading, moList, total },
    actions,
  } = useMo()

  const columns = [
    {
      field: 'code',
      headerName: t('Mo.moCode'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('Mo.moName'),
      width: 120,
      sortable: true,
    },
    {
      field: 'planCode',
      headerName: t('Mo.planCode'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.masterPlan?.code
      },
    },
    {
      field: 'factoryId',
      headerName: t('Mo.moFactory'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { factory } = params.row
        return factory?.name
      },
    },
    {
      field: 'saleOrderName',
      headerName: t('Mo.soName'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { saleOrder } = params.row
        return saleOrder?.name
      },
    },
    {
      field: 'plan',
      headerName: t('Mo.moPlan'),
      width: 200,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return (
          convertUtcDateToLocalTz(params.row.planFrom) +
          ' - ' +
          convertUtcDateToLocalTz(params.row.planTo)
        )
      },
    },
    {
      field: 'status',
      headerName: t('Mo.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={MO_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
    {
      field: 'workOrder',
      headerName: t('Mo.workOrder'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === MO_STATUS.CONFIRMED
        const isProcess = status === MO_STATUS.IN_PROGRESS
        return (
          <>
            {(isConfirmed || isProcess) && (
              <Button
                variant="text"
                onClick={() =>
                  history.push(`${ROUTE.MO.WORK_ORDER.PATH}?moId=${id}`)
                }
                bold={false}
                size="small"
              >
                {t('Mo.workOrder')}
              </Button>
            )}
          </>
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const canEdit = MO_STATUS_TO_EDIT.includes(status)
        const canConfirm = MO_STATUS_TO_CONFIRM.includes(status)
        const canDelete = MO_STATUS_TO_DELETE.includes(status)
        return (
          <div>
            <IconButton onClick={() => onClickViewDetails(id)}>
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton onClick={() => onClickEdit(id)}>
                <Icon name="edit" />
              </IconButton>
            )}
            {canDelete && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
                  setIsOpenConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
            <IconButton
              onClick={() =>
                history.push(`${ROUTE.MO.CREATE.PATH}?cloneId=${id}`)
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
      filter: convertFilterParams(
        {
          ...filters,
          planName: filters?.planName?.code,
          code: filters?.code?.code,
          saleOrderId: filters?.saleOrderId?.name,
          factoryId: filters?.factoryId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchMO(params)
  }

  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, sort, filters])

  useEffect(() => {
    if (refreshKey) {
      if (moList?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, moList])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  /**
   * onClickViewDetails
   * @param {int} id
   */
  const onClickViewDetails = (id) => {
    history.push(ROUTE.MO.DETAIL.PATH.replace(':id', `${id}`))
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  const onClickEdit = (id) => {
    history.push(ROUTE.MO.EDIT.PATH.replace(':id', `${id}`))
  }

  /**
   *
   * @param {int} id
   */
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  /**
   * onSubmitDelete
   */
  const onSubmitDelete = () => {
    actions.deleteMO(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenDeleteModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('moDefine.import')}
          onImport={(params) => {
            importMoApi(params)
          }}
          onExport={() => {
            exportMoApi({
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
          onDownloadTemplate={getMoTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.MO.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.moDefine')}
        onSearch={setKeyword}
        placeholder={t('Mo.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('Mo.title')}
          rows={moList}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          //onSelectionChange={setSelectedRows}
          selected={selectedRows}
          total={total}
          sort={sort}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: setFilters,
          }}
        />
        <Dialog
          open={isOpenDeleteModal}
          title={t('Mo.deleteModalTitle')}
          onCancel={() => setIsOpenDeleteModal(false)}
          onSubmit={onSubmitDelete}
          cancelLabel={t('general:common.no')}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('Mo.deleteConfirm')}
          <LV
            label={t('Mo.moCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('Mo.moName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>

        <DialogApprove
          open={isOpenConfirmModal}
          onClose={() => {
            setTempItem(null)
            setIsOpenConfirmModal(false)
          }}
          data={tempItem}
          onSuccess={() => {
            refreshData()
          }}
        />
      </Page>
    </>
  )
}

export default Mo
