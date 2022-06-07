import { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Loading from '~/components/Loading'
import ProductionOutputQualityFilterForm from '~/modules/qmsx/features/transaction-history/production-output-quality/filter-form'
import useTransactionHistory from '~/modules/qmsx/redux/hooks/useTransactionHistory'
import { ROUTE } from '~/modules/qmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'
import qs from '~/utils/qs'

function ProductionOutputQuality() {
  const { t } = useTranslation('qmsx')
  const history = useHistory()
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
    data: { transactionHistoryProductionOutputList, total, isLoading },
    actions,
  } = useTransactionHistory()

  const location = useLocation()
  const { tab } = qs.parse(location.search)

  const transKey = 'transactionHistory.header'
  const qcProductionOutput = 'qcProductionOutput'

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      sortable: false,
    },
    {
      field: 'code',
      headerName: t(`${transKey}.code`),
      width: 100,
      sortable: true,
    },
    {
      field: 'woCode',
      headerName: t(`${transKey}.wo`),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { workOrder } = params?.row

        return workOrder?.code
      },
    },
    {
      field: 'moName',
      headerName: t(`${transKey}.mo`),
      width: 150,
      sortable: true,
    },
    {
      field: 'parentBomName',
      headerName: t(`${transKey}.parentBom`),
      width: 150,
      sortable: true,
    },
    {
      field: 'bomName',
      headerName: t(`${transKey}.bom`),
      width: 150,
      sortable: true,
    },
    {
      field: 'errorReportCode',
      headerName: t(`${transKey}.errorReportCode`),
      width: 100,
      sortable: true,
    },
    {
      field: 'producingStepName',
      headerName: t(`${transKey}.producingStep`),
      width: 150,
      sortable: true,
    },
    {
      field: 'numberOfTimeSearch',
      headerName: t(`${transKey}.numberOfTimeSearch`),
      width: 100,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t(`${transKey}.createdAt`),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row

        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 100,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.TRANSACTION_HISTORY.PRODUCTION_OUTPUT_QUALITY_DETAIL.PATH.replace(
                    ':id',
                    id,
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

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }

    actions.searchProductionOutputQualityTransactionHistory(params)
  }

  useEffect(() => {
    if (tab === qcProductionOutput) refreshData()
  }, [page, pageSize, filters, sort])

  return (
    <>
      <Loading open={isLoading} />
      <DataTable
        title={t(`${transKey}.${qcProductionOutput}`)}
        rows={transactionHistoryProductionOutputList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        tableSettingKey={qcProductionOutput}
        filters={{
          form: <ProductionOutputQualityFilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </>
  )
}

export default ProductionOutputQuality
