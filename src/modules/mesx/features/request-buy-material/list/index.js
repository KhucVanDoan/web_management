import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

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

  const DEFAULT_FILTER = {
    code: '',
    name: '',
    manufacturingOrderName: '',
    saleOrderCode: '',
    status: '',
  }

  const [id, setId] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [sort, setSort] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filters, setfilters] = useState(DEFAULT_FILTER)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  const {
    data: { isLoading, requestBuyMaterialList, total },
    actions,
  } = useRequestBuyMaterial()

  const { actions: planAction } = useDefinePlan()
  const { actions: saleOrderAction } = useSaleOrder()

  useEffect(() => {
    planAction.searchPlans({ isGetAll: 1 })
    saleOrderAction.searchSaleOrders({ isGetAll: 1 })
    return () => {
      planAction.resetPlanListState()
      saleOrderAction.resetSaleOrderListState()
    }
  }, [])

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
      field: 'planName',
      headerName: t('requestBuyMaterial.planName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.manufacturingOrder?.name
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
      type: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('requestBuyMaterial.updateAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return formatDateTimeUtc(updatedAt)
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
                  setId(id)
                  setDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}
            {isConfirmed && (
              <IconButton
                onClick={() => {
                  setId(id)
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

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchRequestBuyMaterials(params)
  }

  const onSubmitDelete = () => {
    actions.deleteRequestBuyMaterial(
      id,
      () => setDeleteModal(false),
      () => setDeleteModal(false),
    )
  }
  const onSubmitConfirm = () => {
    actions.confirmRequestBuyMaterialById(
      id,
      () => setConfirmModal(false),
      () => setConfirmModal(false),
    )
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" disabled icon="download">
          {t('requestBuyMaterial.export')}
        </Button>
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
          onChangeFilter={setfilters}
          onChangeSort={setSort}
          total={total}
          title={t('requestBuyMaterial.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            onApply: setfilters,
            validationSchema: filterSchema(t),
          }}
          sort={sort}
          checkboxSelection
        />
        <Dialog
          open={deleteModal}
          title={t('requestBuyMaterial.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('requestBuyMaterial.confirmDelete')}
        </Dialog>
        <Dialog
          open={confirmModal}
          title={t('requestBuyMaterial.confirmTitle')}
          onCancel={() => setConfirmModal(false)}
          cancelLabel={t('common.no')}
          onSubmit={onSubmitConfirm}
          submitLabel={t('common.yes')}
          noBorderBottom
        >
          {t('requestBuyMaterial.confirmBody')}
        </Dialog>
      </Page>
    </>
  )
}

export default RequestBuyMaterial
