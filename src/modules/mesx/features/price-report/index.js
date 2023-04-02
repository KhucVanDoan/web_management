import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { exportPriceReportApi } from '~/modules/mesx/redux/sagas/price-report/import-export-price-report'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams } from '~/utils'

import { useMo } from '../../redux/hooks/useMo'
import FilterForm from './form-filter'
import { filterSchema } from './form-filter/schema'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.PRICE_REPORT.LIST.PATH,
    title: ROUTE.PRICE_REPORT.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  moCode: '',
  soName: '',
  itemName: '',
}

const PriceReport = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const { t } = useTranslation(['mesx'])
  const [priceReport, setPriceReport] = useState([])
  const history = useHistory()
  const { actions } = useMo()
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    // {
    //   field: 'id',
    //   headerName: t('priceReport.id'),
    //   width: 80,
    //   sortable: false,
    //   align: 'center',
    // },
    {
      field: 'itemName',
      headerName: t('priceReport.itemName'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { item } = params?.row
        return item?.name
      },
    },
    {
      field: 'quantity',
      headerName: t('priceReport.planQuantity'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      fixed: true,
      sortable: true,
    },
    {
      field: 'actualQuantity',
      headerName: t('priceReport.productionQuantity'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      fixed: true,
      sortable: true,
    },
    {
      field: 'unit',
      headerName: t('priceReport.unit'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        const { item } = params?.row
        return item?.itemUnitName
      },
    },
    {
      field: 'costProducing',
      headerName: t('priceReport.planProductionPrice'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      sortable: true,
    },
    {
      field: 'costProducingActual',
      headerName: t('priceReport.actualProductionPrice'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      sortable: true,
      renderCell: (params) => {
        const { actualQuantity, costProducingActual } = params.row
        if (actualQuantity > 0) return costProducingActual
      },
    },
    {
      field: 'costMaterial',
      headerName: t('priceReport.planMaterialPrice'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      sortable: true,
    },
    {
      field: 'costMaterialActual',
      headerName: t('priceReport.actualMaterialPrice'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      sortable: true,
      renderCell: (params) => {
        const { actualQuantity, costMaterialActual } = params.row
        if (actualQuantity > 0) return costMaterialActual
      },
    },
    {
      field: 'productDetailPrice',
      headerName: t('priceReport.productDetailPrice'),
      width: 100,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { actualQuantity } = params.row
        if (actualQuantity > 0)
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.PRICE_REPORT.DETAIL.PATH.replace(
                      ':id',
                      `${filters.moCode?.id}`,
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </div>
          )
      },
    },
  ]

  useEffect(() => {
    refreshData()
    setSelectedRows([])
  }, [filters])

  const refreshData = () => {
    actions.getPriceStructureById(filters.moCode?.id, (res) => {
      setPriceReport(res)
    })
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('planReport.export')}
        onExport={() => {
          exportPriceReportApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
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
      title={t('menu.priceReport')}
      placeholder={t('priceReport.searchPlacehoder')}
      renderHeaderRight={renderHeaderRight}
    >
      <DataTable
        title={t('menu.priceReport')}
        rows={priceReport}
        columns={columns}
        onSettingChange={setColumnsSettings}
        //onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={priceReport?.length}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          validationSchema: filterSchema(t),
          values: filters,
          onApply: setFilters,
        }}
        hideFooter
      />
    </Page>
  )
}
export default PriceReport
