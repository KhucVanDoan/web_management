import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
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
import {
  DEVICE_CATEGORY_STATUS_OPTION,
  DEVICE_CATEGORY_STATUS,
} from '~/modules/mmsx/constants'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'
import {
  exportDeviceCategoryApi,
  getDeviceCategoryTemplateApi,
  importDeviceCategoryApi,
} from '~/modules/mmsx/redux/sagas/device-category/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEVICE_CATEGORY.LIST.PATH,
    title: ROUTE.DEVICE_CATEGORY.LIST.TITLE,
  },
]
const DeviceCategory = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { deviceCategoryList, isLoading, total },
    actions,
  } = useDeviceCategory()
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
        headerName: t('deviceCategory.category.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('deviceCategory.category.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'description',
        headerName: t('deviceCategory.category.description'),
        width: 150,
        sortable: true,
      },

      {
        field: 'status',
        headerName: t('deviceCategory.form.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={DEVICE_CATEGORY_STATUS_OPTION}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('deviceCategory.createAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('deviceCategory.updateAt'),
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
          const { id, status } = params?.row
          const isPending = status === DEVICE_CATEGORY_STATUS.PENDING
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEVICE_CATEGORY.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEVICE_CATEGORY.EDIT.PATH.replace(':id', `${id}`),
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
              {isPending && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
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
    actions.searchDeviceCategory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteDeviceCategory(tempItem?.id, () => {
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
    actions.confirmDeviceCategory(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('device_category.export')}
          onImport={(params) => importDeviceCategoryApi(params)}
          onExport={() =>
            exportDeviceCategoryApi({
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
          onDownloadTemplate={getDeviceCategoryTemplateApi}
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEVICE_CATEGORY.CREATE.PATH)}
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
      title={t('menu.deviceCategory')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('deviceCategory.title')}
        columns={columns}
        rows={deviceCategoryList}
        pageSize={pageSize}
        page={page}
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
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('deviceCategory.delete.title')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('deviceCategory.delete.description')}
        <LV
          label={t('deviceCategory.category.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('deviceCategory.category.name')}
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
          label={t('deviceCategory.category.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('deviceCategory.category.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DeviceCategory
