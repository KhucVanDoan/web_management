import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import ProductionOutputQualityFilterForm from '~/modules/qmsx/features/quality-report/production-output-quality/filter-form'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { getRowNumber } from '~/modules/qmsx/utils'
import { convertFilterParams, convertSortParams } from '~/utils'
import qs from '~/utils/qs'

function ProductionOutputQuality() {
  const { t } = useTranslation('qmsx')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const {
    data: { qualityReportProductionOutputList, total },
    actions,
  } = useQualityReport()

  const location = useLocation()
  const { tab } = qs.parse(location.search)

  const transKey = 'qualityReport'
  const qcProductionOutput = 'qcProductionOutput'

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
      field: 'moName',
      headerName: t(`${transKey}.moName`),
      width: 150,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t(`${transKey}.itemName`),
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
      width: 100,
      sortable: true,
    },
    {
      field: 'actualQuantity',
      headerName: t(`${transKey}.manufacturingQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'totalUnQcQuantity',
      headerName: t(`${transKey}.qcNeedQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'totalQcQuantity',
      headerName: t(`${transKey}.qcDoneQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'errorQuantity',
      headerName: t(`${transKey}.errorQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'totalQcRejectQuantity',
      headerName: t(`${transKey}.qcRejectQuantity`),
      width: 100,
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

    actions.searchProductionOutputQualityReport(params)
  }

  useEffect(() => {
    if (tab === qcProductionOutput) refreshData()
  }, [page, pageSize, filters, sort, tab])

  return (
    <DataTable
      title={t(`${transKey}.${qcProductionOutput}`)}
      rows={qualityReportProductionOutputList}
      pageSize={pageSize}
      page={page}
      columns={columns}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onChangeFilter={setFilters}
      onChangeSort={setSort}
      total={total}
      sort={sort}
      tableSettingKey={qcProductionOutput}
      filters={{
        form: <ProductionOutputQualityFilterForm />,
        values: filters,
        onApply: setFilters,
      }}
    />
  )
}

export default ProductionOutputQuality