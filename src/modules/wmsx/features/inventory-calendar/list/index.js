import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
  INVENTORY_CALENDAR_STATUS,
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
    title: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
  },
]
function InventoryCalendar() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const {
    data: { inventoryCalendarList, total, isLoading },
    actions,
  } = useInventoryCalendar()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

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
      headerName: t('inventoryCalendar.code'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('inventoryCalendar.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'inventoryType',
      headerName: t('inventoryCalendar.inventoryType'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return `${t(INVENTORY_TYPE_MAP[params.row?.type])}`
      },
    },
    {
      field: 'warehouses',
      headerName: t('inventoryCalendar.warehouses'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const warehousesName = params.row.warehouses
          ?.map((warehouse) => warehouse?.name)
          ?.join('; ')
        return warehousesName
      },
    },
    {
      field: 'description',
      headerName: t('inventoryCalendar.description'),
      width: 150,
      sortable: false,
    },
    {
      field: 'executionDay',
      headerName: t('inventoryCalendar.planExecutionDay'),
      filterFormat: 'date',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('inventoryCalendar.status'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={INVENTORY_CALENDAR_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('inventoryCalendar.action'),
      width: 180,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const hasEditDeleteBtn =
          status === INVENTORY_CALENDAR_STATUS.PENDING ||
          status === INVENTORY_CALENDAR_STATUS.REJECTED
        const isConfirmed = status === INVENTORY_CALENDAR_STATUS.PENDING
        const hasTransaction =
          status === INVENTORY_CALENDAR_STATUS.COMPLETED ||
          status === INVENTORY_CALENDAR_STATUS.IN_PROGRESS
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.INVENTORY_CALENDAR.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {hasEditDeleteBtn && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.INVENTORY_CALENDAR.EDIT.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              </>
            )}
            {isConfirmed && (
              <IconButton onClick={() => onClickConfirmed(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {hasTransaction && (
              <Button
                variant="text"
                size="small"
                bold={false}
                onClick={() => {
                  history.push(
                    ROUTE.INVENTORY.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }}
              >
                {t('inventoryCalendar.transactionList')}
              </Button>
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
    actions.searchInventoryCalendars(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteInventoryCalendar(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmInventoryCalendarById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.INVENTORY_CALENDAR.CREATE.PATH)}
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
      title={t('menu.inventoryCalendar')}
      onSearch={setKeyword}
      placeholder={t('inventoryCalendar.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('inventoryCalendar.title')}
        rows={inventoryCalendarList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('inventoryCalendar.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventoryCalendar.deleteConfirm')}
        <LV
          label={t('inventoryCalendar.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryCalendar.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('inventoryCalendar.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryCalendar.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default InventoryCalendar
