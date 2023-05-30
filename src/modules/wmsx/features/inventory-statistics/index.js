import { useEffect, useState } from 'react'

import { Box, IconButton, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import NumberFormatText from '~/components/NumberFormat'
import Page from '~/components/Page'
import useInventoryStatistics from '~/modules/wmsx/redux/hooks/useInventoryStatistics'
import { exportInventoryStatisticsApi } from '~/modules/wmsx/redux/sagas/inventory-statistics/import-export-inventory-statistics'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter'
import InventoryStatisticFilter from './filter-quick-form'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVENTORY_STATISTICS.PATH,
    title: ROUTE.INVENTORY_STATISTICS.TITLE,
  },
]
function InventoryStatistics() {
  const { t } = useTranslation(['wmsx'])
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateModal: false,
  })

  const DEFAULT_FILTERS = {
    itemName: '',
    warehouseName: '',
    lotNumber: '',
  }

  const DEFAULT_QUICK_FILTERS = {
    warehouseId: '',
    itemId: '',
    locationId: '',
  }

  const {
    page,
    pageSize,
    sort,
    keyword,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    quickFilters,
    setQuickFilters,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    quickFilters: DEFAULT_QUICK_FILTERS,
  })

  const {
    data: { inventoryStatisticList, total, isLoading },
    actions,
  } = useInventoryStatistics()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   visible: 'always',
    //   sortable: true,
    // },
    {
      field: 'itemCode',
      headerName: t('inventoryStatistics.code'),
      width: 200,
      visible: 'always',
    },
    {
      field: 'itemName',
      headerName: t('inventoryStatistics.name'),
      width: 255,
      visible: 'always',
    },
    {
      field: 'unit',
      headerName: t('inventoryStatistics.unit'),
      width: 100,
      sortable: false,
      renderCell: (params) => params.row?.itemUnitName,
    },
    {
      field: 'warehouseName',
      headerName: t('inventoryStatistics.warehouseName'),
      width: 255,
      renderCell: (params) => params.row?.warehouseName,
    },
    {
      field: 'location',
      headerName: t('inventoryStatistics.location'),
      width: 150,
      renderCell: (params) => params.row?.locator?.code,
    },
    {
      field: 'lotNumber',
      headerName: t('inventoryStatistics.lotNumber'),
      width: 150,
      renderCell: (params) => params.row?.lotNumber,
    },
    {
      field: 'quantity',
      headerName: t('inventoryStatistics.quantity'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => (
        <NumberFormatText value={params.row?.stock} formatter="quantity" />
      ),
    },
    {
      field: 'price',
      headerName: t('inventoryStatistics.price'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => (
        <NumberFormatText value={params.row?.amount} formatter="price" />
      ),
    },
    {
      field: 'amount',
      headerName: t('inventoryStatistics.intoMoney'),
      width: 150,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params) => (
        <NumberFormatText value={params.row?.totalAmount} formatter="price" />
      ),
    },
    {
      field: 'type',
      headerName: t('inventoryStatistics.type'),
      width: 150,
    },
    {
      field: 'purpose',
      headerName: t('inventoryStatistics.purpose'),
      width: 150,
    },
    {
      field: 'action',
      headerName: t('inventoryStatistics.action'),
      width: 150,
      align: 'center',
      visible: 'always',
      sticky: 'right',

      renderCell: (params) => {
        return (
          <IconButton onClick={() => onClickUpdate(params.row)}>
            <Icon name="edit" />
          </IconButton>
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters, keyword, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [sort, filters])

  const onClickUpdate = (tempItem) => {
    setModal({ tempItem, isOpenUpdateModal: true })
  }

  const onCloseUpdateModal = () => {
    setModal({ isOpenUpdateModal: false, tempItem: null })
  }

  const onSubmitUpdate = (values) => {
    const convertParams = {
      itemId: modal.tempItem?.itemId,
      locatorId: modal.tempItem?.locatorId,
      warehouseId: modal.tempItem?.warehouseId,
      lotNumber: modal.tempItem?.lotNumber,
      type: values?.type,
      purpose: values?.purpose,
    }
    actions.updateInventoryStatistics(convertParams, () => {
      refreshData()
      setModal({ isOpenUpdateModal: false, tempItem: null })
    })
  }

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          warehouseId: quickFilters?.warehouseId?.id,
          itemId: quickFilters?.itemId?.id,
          locatorId: quickFilters?.locatorId?.locatorId,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchInventoryStatistics(params)
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('menu.importExportData')}
        onExport={() => {
          exportInventoryStatisticsApi({
            keyword: keyword.trim(),
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
            sort: convertSortParams(sort),
          })
        }}
        onRefresh={refreshData}
        disabled
      />
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryStatistics')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <InventoryStatisticFilter
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <Box sx={{ mt: 4 }}>
        <DataTable
          title={t('inventoryStatistics.tableTitle')}
          rows={inventoryStatisticList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          //onSelectionChange={setSelectedRows}
          selected={selectedRows}
          total={total}
          filters={{
            form: <FilterForm />,
            defaultValue: DEFAULT_FILTERS,
            values: filters,
            onApply: setFilters,
          }}
          sort={sort}
        />
      </Box>
      <Dialog
        open={modal.isOpenUpdateModal}
        title={t('inventoryStatistics.update')}
        onCancel={onCloseUpdateModal}
        noBorderBottom
      >
        <Formik
          initialValues={modal?.tempItem}
          validationSchema={formSchema(t)}
          onSubmit={onSubmitUpdate}
          enableReinitialize
        >
          {() => (
            <Form>
              <Grid container rowSpacing={4 / 3}>
                <Grid item xs={12}>
                  <Field.TextField
                    name="code"
                    label={t('inventoryStatistics.code')}
                    value={modal?.tempItem?.itemCode}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field.TextField
                    name="type"
                    label={t('inventoryStatistics.type')}
                    placeholder={t('inventoryStatistics.type')}
                    inputProps={{
                      maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field.TextField
                    name="purpose"
                    label={t('inventoryStatistics.purpose')}
                    placeholder={t('inventoryStatistics.purpose')}
                    inputProps={{
                      maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                    }}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
              <ActionBar
                onCancel={onCloseUpdateModal}
                mode={MODAL_MODE.UPDATE}
                sx={{ borderTop: 0 }}
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </Page>
  )
}

export default InventoryStatistics
