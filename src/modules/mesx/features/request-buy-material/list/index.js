import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ORDER_STATUS,
  ORDER_STATUS_OPTIONS,
} from '~/modules/database/constants'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import { exportRequestBuyMaterialApi } from '~/modules/mesx/redux/sagas/request-buy-material/import-export-request-buy-material'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter'
import filterSchema from './filter/schema'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH,
    title: ROUTE.REQUEST_BUY_MATERIAL.LIST.TITLE,
  },
]

function RequestBuyMaterial() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    manufacturingOrderName: '',
    saleOrderCode: '',
    status: '',
  }

  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { isLoading, requestBuyMaterialList, total },
    actions,
  } = useRequestBuyMaterial()

  const columns = [
    {
      field: 'code',
      headerName: t('requestBuyMaterial.requestCode'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('requestBuyMaterial.requestName'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      // @TODO: <linh.taquang> wait backend change data field
      field: 'moCode',
      headerName: t('requestBuyMaterial.moCode'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.manufacturingOrder?.code
      },
    },
    {
      field: 'saleOrderCode',
      headerName: t('requestBuyMaterial.soCode'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { code } = params.row?.saleOrder
        return code
      },
    },
    {
      field: 'createdAt',
      headerName: t('requestBuyMaterial.createAt'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('requestBuyMaterial.updateAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'status',
      headerName: t('requestBuyMaterial.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('requestBuyMaterial.action'),
      align: 'center',
      width: 150,
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const isEdit = status === ORDER_STATUS.PENDING
        const isConfirmed = status === ORDER_STATUS.PENDING
        const isRejected = status === ORDER_STATUS.REJECTED
        const isDelete =
          status === ORDER_STATUS.PENDING || status === ORDER_STATUS.REJECTED
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {isDelete && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
                  setDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
                  setConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}

            {isRejected && (
              <IconButton disabled>
                <Icon name="remove" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          saleOrderCode: filters?.saleOrderCode?.code,
          code: filters?.code?.code,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchRequestBuyMaterials(params)
  }

  const onSubmitDelete = () => {
    actions.deleteRequestBuyMaterial(tempItem?.id, () => refreshData())
    setDeleteModal(false)
  }
  const onSubmitConfirm = () => {
    actions.confirmRequestBuyMaterialById(tempItem?.id, () => refreshData())
    setConfirmModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('requestBuyMaterial.export')}
          onExport={() => {
            exportRequestBuyMaterialApi({
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
          onRefresh={refreshData}
          disabled
        />
      </>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.requestBuyMaterial')}
        onSearch={setKeyword}
        placeholder={t('requestBuyMaterial.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          rows={requestBuyMaterialList}
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
          title={t('requestBuyMaterial.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
            validationSchema: filterSchema(t),
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('requestBuyMaterial.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('requestBuyMaterial.confirmDelete')}
          <LV
            label={t('requestBuyMaterial.requestCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('requestBuyMaterial.requestName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('requestBuyMaterial.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitConfirm}
          submitLabel={t('general:common.yes')}
          noBorderBottom
        >
          {t('requestBuyMaterial.confirmBody')}
          <LV
            label={t('requestBuyMaterial.requestCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('requestBuyMaterial.requestName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default RequestBuyMaterial
