import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import { getPriceStructureById } from '../../redux/actions/mo.action'
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
  moDate: '',
}

const PriceReport = () => {
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(null)
  const { t } = useTranslation(['mesx'])
  const [priceReport, setPriceReport] = useState([])
  const dispatch = useDispatch() //@TODO: <doan.khucvan> wait hook useMo
  const history = useHistory()
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
      width: 200,
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
      width: 200,
      align: 'center',
      fixed: true,
      sortable: true,
    },
    {
      field: 'actualQuantity',
      headerName: t('priceReport.productionQuantity'),
      width: 200,
      align: 'center',
      fixed: true,
      sortable: true,
    },
    {
      field: 'unit',
      headerName: t('priceReport.unit'),
      width: 200,
      align: 'center',
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
      width: 200,
      align: 'center',
      sortable: true,
    },
    {
      field: 'costProducingActual',
      headerName: t('priceReport.actualProductionPrice'),
      width: 200,
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { actualQuantity, costProducingActual } = params.row
        if (actualQuantity > 0) return costProducingActual
      },
    },
    {
      field: 'costMaterial',
      headerName: t('priceReport.planMaterialPrice'),
      width: 200,
      align: 'center',
      sortable: true,
    },
    {
      field: 'costMaterialActual',
      headerName: t('priceReport.actualMaterialPrice'),
      width: 200,
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { actualQuantity, costMaterialActual } = params.row
        if (actualQuantity > 0) return costMaterialActual
      },
    },
    {
      field: 'productDetailPrice',
      headerName: t('priceReport.productDetailPrice'),
      width: 200,
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
                      `${filters.moCode}`,
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
  }, [filters])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    dispatch(
      getPriceStructureById({ id: filters.moCode, search: params }, (res) => {
        setPriceReport(res)
      }),
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('priceReport.title')}
      onSearch={setKeyword}
      placeholder={t('priceReport.searchPlacehoder')}
    >
      <DataTable
        rows={priceReport}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        sort={sort}
        total={priceReport?.length}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          validationSchema: filterSchema(t),
          values: filters,
          onApply: setFilters,
        }}
      />
    </Page>
  )
}
export default PriceReport
