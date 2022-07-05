import React, { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { FieldArray, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { QR_CODE_TYPE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'
import {
  WORK_ORDER_STATUS,
  WORK_ORDER_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import { useWorkOrder } from '~/modules/mesx/redux/hooks/useWorkOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertUtcDateToLocalTz,
  convertFilterParams,
  convertSortParams,
} from '~/utils'
import qs from '~/utils/qs'

import FilterForm from './filter-form'
import { validationSchema } from './schema'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MO.LIST.PATH,
    title: ROUTE.MO.LIST.TITLE,
  },
  {
    route: ROUTE.MO.WORK_ORDER.PATH,
    title: ROUTE.MO.WORK_ORDER.TITLE,
  },
]
const WorkOrder = () => {
  const {
    data: { isLoading, workOrderList, total },
    actions: workOrderActions,
  } = useWorkOrder()

  const {
    data: { itemUnitList },
    actions: itemUnitAction,
  } = useItemUnit()

  const location = useLocation()
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { moId } = qs.parse(location.search)

  const [isOpenPrintQRModal, setIsOpenPrintQRModal] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])
  const [
    isExecutingAutocompleteWorkOrder,
    setIsExecutingAutocompleteWorkOrder,
  ] = useState({})

  const {
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
  } = useQueryState({
    filters: { moId: moId },
  })
  const columns = useMemo(() => [
    {
      field: 'code',
      headerName: t('workOrder.lblcodeWorkOrder'),
      sortable: true,
      width: 200,
      fixed: true,
    },
    // {
    //   field: 'moPlanCode',
    //   headerName: t('workOrder.codeKH'),
    //   sortable: true,
    //   width: 200,
    //   renderCell: (params) => {
    //     const { moPlan } = params.row
    //     return moPlan?.code
    //   },
    // },
    {
      field: 'moCode',
      headerName: t('workOrder.moCode'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.mo?.code
      },
    },
    {
      field: 'moDetailItemCode',
      headerName: t('workOrder.codeTP'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return row?.moDetail?.itemCode
      },
    },
    {
      field: 'bomItemName',
      headerName: t('workOrder.codeBTP'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        if (row?.bom?.itemCode !== row?.moDetail.itemCode) {
          return row?.bom?.itemCode
        }
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
      headerName: t('workOrder.lblquantityPlan'),
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
      headerName: t('workOrder.unit'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { row } = params
        return itemUnitList?.find(
          (item) => item.id === row?.moDetail?.itemUnitId,
        )?.name
      },
    },
    {
      field: 'changeWorkOrder',
      headerName: t('Mo.changeWorkOrder'),
      renderCell: (params) => {
        return (
          params.row?.status === WORK_ORDER_STATUS.CONFIRMED && (
            <Button
              variant="text"
              size="small"
              bold={false}
              loading={isExecutingAutocompleteWorkOrder[params.row?.id]}
              onClick={() => changeProgress(params.row?.id)}
            >
              {t('Mo.triggerChangeWorkOrder')}
            </Button>
          )
        )
      },
    },
    {
      field: 'status',
      width: 100,
      align: 'right',
      headerName: t('workOrder.status'),
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={WORK_ORDER_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      disableClickEventBubbling: true,
      width: 160,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === WORK_ORDER_STATUS.CREATED
        const isDelete = status === WORK_ORDER_STATUS.CREATED
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  `${ROUTE.MO.WORK_ORDER_DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  )}?moId=${moId}`,
                )
              }
            >
              <Icon name="show" />
            </IconButton>

            {/* @TODO: <yen.nguyenhai> check onClick actions */}
            {isDelete && (
              <IconButton
                onClick={() => {
                  // setTempItem(params.row)
                  // setIsOpenDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            )}

            {isConfirmed && (
              <IconButton
                onClick={() => {
                  // setTempItem(params.row)
                  // setIsOpenConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
          </>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams({ ...filters, moId: moId }),
      sort: convertSortParams(sort),
    }
    workOrderActions.searchWorkOrders(params)
  }

  useEffect(() => {
    itemUnitAction.searchItemUnits({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  const onSelectionChange = (selected) => {
    setSelectedRows(selected.map((item) => ({ ...item, amount: 1 })))
  }

  const changeProgress = (id) => {
    setIsExecutingAutocompleteWorkOrder({
      ...isExecutingAutocompleteWorkOrder,
      [id]: true,
    })
    workOrderActions.autocompleteWorkOrder(
      { id },
      () => {
        setIsExecutingAutocompleteWorkOrder({
          ...isExecutingAutocompleteWorkOrder,
          [id]: false,
        })
        refreshData()
      },
      () => {
        setIsExecutingAutocompleteWorkOrder({
          ...isExecutingAutocompleteWorkOrder,
          [id]: false,
        })
      },
    )
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
          {t('general:common.close')}
        </Button>
        <Button variant="outlined" color="subText" onClick={resetForm}>
          {t('general:common.cancel')}
        </Button>
        <Button type="submit">{t('general:common.print')}</Button>
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
      title={t('menu.workOrder')}
      breadcrumbs={breadcrumbs}
      renderHeaderRight={renderHeaderRight}
      onBack={() => history.push(ROUTE.MO.LIST.PATH)}
      placeholder={t('workOrder.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('workOrder.title')}
        rows={workOrderList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSelectionChange={onSelectionChange}
        sort={sort}
        onSortChange={setSort}
        total={total}
        selected={selectedRows}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
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
