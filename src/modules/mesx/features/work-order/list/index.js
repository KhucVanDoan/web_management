import React, { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { FieldArray, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { QR_CODE_TYPE, DATE_FORMAT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import {
  WORK_ORDER_STATUS,
  WORK_ORDER_STATUS_MAP,
} from '~/modules/mesx/constants'
import { useWorkOrder } from '~/modules/mesx/redux/hooks/useWorkOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import FilterForm from './filter-form'
import { validationSchema } from './schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.WORK_ORDER.PATH,
    title: ROUTE.WORK_ORDER.TITLE,
  },
]
const WorkOrder = () => {
  const {
    data: { isLoading, workOrderList, total },
    actions: workOrderActions,
  } = useWorkOrder()
  const {
    appStore: { itemUnits },
  } = useAppStore()
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

  const [id, setId] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenPrintQRModal, setIsOpenPrintQRModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: t('workOrder.orderIdColumn'),
      width: 80,
      fixed: true,
    },
    {
      field: 'code',
      headerName: t('workOrder.codeCV'),
      sortable: true,
      width: 200,
      fixed: true,
    },
    {
      field: 'moPlanCode',
      headerName: t('workOrder.codeKH'),
      sortable: true,
      width: 200,
      renderCell: (params) => {
        const { moPlan } = params.row
        return moPlan?.code
      },
    },
    {
      field: 'moName',
      headerName: t('workOrder.moName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.mo?.name
      },
    },
    {
      field: 'moDetailItemCode',
      headerName: t('workOrder.codeTP'),
      width: 300,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.moDetail?.itemCode
      },
    },

    {
      field: 'moDetailItemName',
      headerName: t('workOrder.nameTP'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.moDetail?.itemName
      },
    },
    {
      field: 'bomItemName',
      headerName: t('workOrder.nameBTP'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        if (row?.bom?.itemName !== row?.moDetail.itemName) {
          return row?.bom?.itemName
        }
      },
    },
    {
      field: 'bomName',
      headerName: t('defineBOM.bomName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.bom?.name
      },
    },
    {
      field: 'producingStepName',
      headerName: t('workOrder.nameCD'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.producingStep?.name
      },
    },
    {
      field: 'plan',
      headerName: t('workOrder.plan'),
      width: 200,
      sortable: true,
      type: 'date',
      renderCell: (params) => {
        return (
          formatDateTimeUtc(params.row.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(params.row.planTo, DATE_FORMAT)
        )
      },
    },
    {
      field: 'workCenter',
      headerName: t('workOrder.workshop'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const workCenterName = params.row.workCenters
          ?.map((workCenter) => workCenter?.name)
          ?.join('; ')
        return workCenterName
      },
    },
    {
      field: 'quantity',
      headerName: t('workOrder.quantityPlan'),
      width: 200,
      sortable: true,
    },
    {
      field: 'actualQuantity',
      headerName: t('workOrder.quantityPro'),
      width: 200,
      sortable: true,
    },
    {
      field: 'itemUnitId',
      headerName: t('workOrder.calunit'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return itemUnits?.find((item) => item.id === row?.moDetail?.itemUnitId)
          ?.name
      },
    },
    {
      field: 'status',
      headerName: t('workOrder.status'),
      width: 200,
      align: 'center',

      renderCell: (params) => {
        return t(WORK_ORDER_STATUS_MAP[params.row.status])
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      disableClickEventBubbling: true,
      width: 160,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isEdit =
          status === WORK_ORDER_STATUS.CREATED ||
          status === WORK_ORDER_STATUS.CONFIRMED
        const isConfirmed = status === WORK_ORDER_STATUS.CREATED
        const isDelete = status === WORK_ORDER_STATUS.CREATED
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WORK_ORDER_DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WORK_ORDER_EDIT.PATH.replace(':id', `${id}`),
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
                  setIsOpenDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}

            {isConfirmed && (
              <IconButton
                onClick={() => {
                  setId(id)
                  setIsOpenConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
    {
      field: 'detailSchedule',
      headerName: t('workOrder.detailSchedule'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const canEdit = status === WORK_ORDER_STATUS.CONFIRMED
        return canEdit ? (
          <Button
            variant="text"
            size="small"
            bold={false}
            onClick={() =>
              history.push(
                ROUTE.DETAIL_SCHEDULE.EDIT.PATH.replace(':id', `${id}`),
              )
            }
          >
            {t('workOrder.detailSchedule')}
          </Button>
        ) : null
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    workOrderActions.searchWorkOrders(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onSubmitDelete = () => {
    workOrderActions.deleteWorkOrder(id, () => {
      setIsOpenDeleteModal(false)
      refreshData()
    })
  }

  const submitConfirm = () => {
    workOrderActions.confirmWorkOrderById(id, refreshData())
    setId(null)
    setIsOpenConfirmModal(false)
  }

  const onChangeSelectedRows = (selected) => {
    setSelectedRows(selected.map((item) => ({ ...item, amount: 1 })))
  }

  const handleSubmitPrintQR = (values) => {
    const params = {
      items: values.map((item) => ({
        id: item.id,
        quantity: item.amount,
      })),
      type: QR_CODE_TYPE.ITEM,
    }
    workOrderActions.printQRWorkOrder(params, () => {
      setIsOpenPrintQRModal(false)
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          variant="outlined"
          disabled={selectedRows.length === 0}
          onClick={() => setIsOpenPrintQRModal(true)}
        >
          {t('defineItem.printQRButton')}
        </Button>
        {/* @TODO: <khanh.nguyenvan> handle import data */}
        <Button variant="outlined" icon="download" disabled sx={{ ml: 4 / 3 }}>
          {t('defineBOQ.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.WORK_ORDER_CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  const renderFooterPrintModal = () => {
    const { resetForm } = useFormikContext()
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& button + button': {
            ml: 4 / 3,
          },
        }}
      >
        <Button color="grayF4" onClick={() => setIsOpenPrintQRModal(false)}>
          {t('common.close')}
        </Button>
        <Button variant="outlined" color="subText" onClick={resetForm}>
          {t('common.cancel')}
        </Button>
        <Button type="submit">{t('common.print')}</Button>
      </Box>
    )
  }

  const printQRColumns = useMemo(() => [
    {
      field: 'id',
      headerName: t('defineItem.orderNumber'),
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('defineItem.code'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('defineItem.name'),
      width: 200,
    },
    {
      field: 'amount',
      headerName: t('defineItem.productAmount'),
      width: 200,
      renderCell: (_, index) => {
        return <Field.TextField name={`items[${index}].amount`} type="number" />
      },
    },
  ])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('workOrder.title')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('workOrder.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('general:dataTable.title')}
        rows={workOrderList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeSelectedRows={onChangeSelectedRows}
        sort={sort}
        onChangeSort={setSort}
        total={total}
        checkboxSelection
        selected={selectedRows}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('workOrder.deleteModalTitle')}
        maxWidth="sm"
        onSubmit={onSubmitDelete}
        submitProps={{
          color: 'error',
        }}
        submitLabel={t('common.yes')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('common.no')}
        noBorderBottom
      >
        {t('workOrder.deleteConfirm')}
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('common.notify')}
        maxWidth="sm"
        onSubmit={submitConfirm}
        submitLabel={t('common.yes')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('common.no')}
        noBorderBottom
      >
        {t('common.confirmMessage.confirm')}
      </Dialog>
      <Dialog
        open={isOpenPrintQRModal}
        title={t('defineItem.printQRModalTitle')}
        maxWidth="md"
        renderFooter={renderFooterPrintModal}
        onCancel={() => setIsOpenPrintQRModal(false)}
        formikProps={{
          initialValues: { items: selectedRows },
          validationSchema: validationSchema(t),
          onSubmit: handleSubmitPrintQR,
          enableReinitialize: true,
        }}
      >
        <FieldArray
          name="items"
          render={() => (
            <DataTable
              rows={selectedRows}
              columns={printQRColumns}
              striped={false}
              hideSetting
              hideFooter
            />
          )}
        />
      </Dialog>
    </Page>
  )
}

export default WorkOrder
