import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import ProductionInputQualityProductPreviousFilterForm from '~/modules/qmsx/features/quality-report/production-input-quality-product-previous/filter-form'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { getRowNumber } from '~/modules/qmsx/utils'
import { convertFilterParams, convertSortParams } from '~/utils'

function ProductionInputQualityMaterial() {
  const { t } = useTranslation('qmsx')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const {
    data: { qualityReportMaterialList, total },
    actions,
  } = useQualityReport()

  const transKey = `qualityReport`

  const columns = [
    {
      field: 'rowNumber',
      headerName: '#',
      width: 50,
      sortable: false,
      fixed: true,
      renderCell: (params, index) => {
        return getRowNumber(index, page, pageSize)
      },
    },
    {
      field: 'woCode',
      headerName: t(`${transKey}.woCode`),
      width: 150,
      sortable: true,
    },
    {
      field: 'moName',
      headerName: t(`${transKey}.moName`),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t(`${transKey}.materialName`),
      width: 150,
      sortable: true,
    },
    {
      field: 'routingName',
      headerName: t(`${transKey}.routingName`),
      width: 150,
      sortable: true,
    },
    {
      field: 'producingStepName',
      headerName: t(`${transKey}.producingStepName`),
      width: 150,
      sortable: true,
    },
    {
      field: 'quantity',
      headerName: t(`${transKey}.planQuantity`),
      width: 150,
      sortable: true,
    },
    {
      field: 'totalUnQcQuantity',
      headerName: t(`${transKey}.qcNeedQuantity`),
      width: 150,
      sortable: true,
    },
    {
      field: 'totalQcQuantity',
      headerName: t(`${transKey}.qcDoneQuantity`),
      width: 150,
      sortable: true,
    },
    {
      field: 'errorQuantity',
      headerName: t(`${transKey}.errorQuantity`),
      width: 150,
      sortable: true,
    },
    {
      field: 'errorReport',
      headerName: t(`${transKey}.errorReport`),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { errorReportId } = params?.row

        return errorReportId.length > 0 ? (
          <Button
            variant="text"
            size="small"
            bold={false}
            component={Link}
            to={`${ROUTE.DEFINE_ERROR_REPORT.LIST.PATH}?errorReportId=${errorReportId}`}
          >
            {t(`${transKey}.errorReport`)}
          </Button>
        ) : (
          ''
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }

    actions.searchProdInputMaterialQualityReport(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  return (
    <DataTable
      title={t(`${transKey}.qcProductionInputMaterial`)}
      rows={qualityReportMaterialList}
      pageSize={pageSize}
      page={page}
      columns={columns}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onChangeFilter={setFilters}
      onChangeSort={setSort}
      total={total}
      sort={sort}
      tableSettingKey="qcProductionInputMaterial"
      indexCol="rowNumber"
      filters={{
        form: <ProductionInputQualityProductPreviousFilterForm />,
        values: filters,
        onApply: setFilters,
      }}
    />
  )
}

export default ProductionInputQualityMaterial
