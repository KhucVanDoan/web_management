import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import InputQualityFilterForm from '~/modules/qmsx/features/quality-report/input-quality/filter-form'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { getRowNumber } from '~/modules/qmsx/utils'
import { convertFilterParams, convertSortParams } from '~/utils'

function InputQuality() {
  const { t } = useTranslation('qmsx')

  const {
    page,
    pageSize,
    sort,
    filters,

    setPage,
    setPageSize,
    setSort,
    setFilters,
  } = useQueryState()

  const {
    data: { qualityReportInputList, total, isLoading },
    actions,
  } = useQualityReport()

  const transKey = 'qualityReport'

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sortable: false,
    // },
    {
      field: 'rowNumber',
      headerName: '#',
      width: 50,
      sortable: false,
      fixed: true,
      renderCell: (_, index) => {
        return getRowNumber(index, page, pageSize)
      },
    },
    {
      field: 'stageName',
      headerName: t(`${transKey}.qcStage`),
      width: 150,
      sortable: true,
    },
    {
      field: 'orderName',
      headerName: t(`${transKey}.orderName`),
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
      field: 'planQuantity',
      headerName: t(`${transKey}.planQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'actualQuantity',
      headerName: t(`${transKey}.inputQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'needQCQuantity',
      headerName: t(`${transKey}.qcNeedQuantity`),
      width: 100,
      sortable: true,
    },
    {
      field: 'doneQCQuantity',
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
      field: 'errorReport',
      headerName: t(`${transKey}.errorReport`),
      width: 150,
      sortable: true,
      fixed: true,
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

    actions.searchInputQualityReport(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  return (
    <>
      <Loading open={isLoading} />
      <DataTable
        title={t(`${transKey}.qcInput`)}
        rows={qualityReportInputList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        tableSettingKey="qcInput"
        uniqKey="rowNumber"
        filters={{
          form: <InputQualityFilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </>
  )
}

export default InputQuality
