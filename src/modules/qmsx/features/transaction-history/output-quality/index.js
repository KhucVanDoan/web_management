import { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { DEFAULT_DATE_TIME_FORMAT_VN } from '~/common/constants'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Loading from '~/components/Loading'
import OutputQualityTransactionHistoryFilterForm from '~/modules/qmsx/features/transaction-history/output-quality/filter-form'
import useTransactionHistory from '~/modules/qmsx/redux/hooks/useTransactionHistory'
import { ROUTE } from '~/modules/qmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

function OutputQualityTransactionHistory() {
  const { t } = useTranslation('qmsx')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const history = useHistory()
  const {
    data: { transactionHistoryOutputList, total, isLoading },
    actions,
  } = useTransactionHistory()

  const transKey = 'transactionHistory.header'

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
      field: 'itemCode',
      headerName: t(`${transKey}.itemCode`),
      width: 150,
      sortable: true,
    },
    {
      field: 'errorReportCode',
      headerName: t(`${transKey}.errorReportCode`),
      width: 150,
      sortable: true,
    },
    {
      field: 'numberOfTimeSearch',
      headerName: t(`${transKey}.numberOfTimeSearch`),
      width: 150,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t(`${transKey}.createdAt`),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row

        return formatDateTimeUtc(createdAt, DEFAULT_DATE_TIME_FORMAT_VN)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.TRANSACTION_HISTORY.OUTPUT_QUALITY_DETAIL.PATH.replace(
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

    actions.searchOutputQualityTransactionHistory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort])

  const qcOutput = 'qcOutput'

  return (
    <>
      <Loading open={isLoading} />
      <DataTable
        title={t(`${transKey}.${qcOutput}`)}
        rows={transactionHistoryOutputList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        total={total}
        sort={sort}
        tableSettingKey={qcOutput}
        filters={{
          form: <OutputQualityTransactionHistoryFilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
    </>
  )
}

export default OutputQualityTransactionHistory