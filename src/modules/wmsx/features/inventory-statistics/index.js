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
import Page from '~/components/Page'
import useInventoryStatistics from '~/modules/wmsx/redux/hooks/useInventoryStatistics'
import { exportInventoryStatisticsApi } from '~/modules/wmsx/redux/sagas/inventory-statistics/import-export-inventory-statistics'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import useMaterialManagement from '../../redux/hooks/useMaterialManagement'
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
    setKeyword,
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

  const { actions: materialActions } = useMaterialManagement()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   fixed: true,
    //   sortable: true,
    // },
    {
      field: 'itemCode',
      headerName: t('inventoryStatistics.code'),
      width: 80,
      fixed: true,
      renderCell: (params) => params?.row?.code,
    },
    {
      field: 'itemName',
      headerName: t('inventoryStatistics.name'),
      width: 150,
      fixed: true,
      renderCell: (params) => params?.row?.name,
    },
    {
      field: 'unit',
      headerName: t('inventoryStatistics.unit'),
      width: 100,
      sortable: false,
    },
    {
      field: 'warehouseName',
      headerName: t('inventoryStatistics.warehouseName'),
      width: 150,
      renderCell: (params) => params?.row?.locations?.[0]?.warehouse?.name,
    },
    {
      field: 'location',
      headerName: t('inventoryStatistics.location'),
      width: 150,
      renderCell: (params) => params?.row?.locations?.[0]?.locator?.name,
    },
    {
      field: 'lotNumber',
      headerName: t('inventoryStatistics.lotNumber'),
      width: 150,
      renderCell: (params) => params?.row?.locations?.[0]?.lots?.[0]?.lotNumber,
    },
    {
      field: 'quantity',
      headerName: t('inventoryStatistics.quantity'),
      width: 150,
      renderCell: (params) => Number(params?.row?.quantity),
    },
    {
      field: 'price',
      headerName: t('inventoryStatistics.price'),
      width: 150,
    },
    {
      field: 'intoMoney',
      headerName: t('inventoryStatistics.intoMoney'),
      width: 150,
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

  const onSubmitUpdate = () => {
    materialActions.updateMaterial(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenUpdateModal: false, tempItem: null })
  }

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      reportDate: quickFilters?.reportDate,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          warehouseId: quickFilters?.warehouseId?.id,
          itemId: quickFilters?.itemId?.id,
          locationId: quickFilters?.locationId?.id,
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
      onSearch={setKeyword}
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
          onSelectionChange={setSelectedRows}
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
                    placeholder={t('inventoryStatistics.code')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field.TextField
                    name="type"
                    label={t('inventoryStatistics.type')}
                    placeholder={t('inventoryStatistics.type')}
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
