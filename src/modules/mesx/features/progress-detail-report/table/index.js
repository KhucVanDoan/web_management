import React from 'react'

import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
import { convertUtcDateToLocalTz } from '~/utils'

const ProgressTable = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { progressDetailReaport },
  } = useProgressDetailReport()
  const columns = [
    {
      field: 'plan',
      headerName: t('ProgessDetailReport.plan'),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { executionDay } = params.row
        return convertUtcDateToLocalTz(executionDay)
      },
    },
    {
      field: 'quantity',
      headerName: t('ProgessDetailReport.quantity'),
      width: 100,
      align: 'right',
    },

    {
      field: 'actualQuantity',
      headerName: t('ProgessDetailReport.actualQuantity'),
      width: 100,
      align: 'right',
    },

    {
      field: 'moderationQuantity',
      headerName: t('ProgessDetailReport.moderationQuantity'),
      width: 100,
      align: 'right',
    },

    {
      field: 'delayQuantity',
      headerName: t('ProgessDetailReport.delayQuantity'),
      width: 100,
      align: 'right',
    },

    {
      field: 'accumlateQuantity',
      headerName: t('ProgessDetailReport.accumlateQuantity'),
      width: 100,
      align: 'right',
    },
    {
      field: 'accumlateActualQuantity',
      headerName: t('ProgessDetailReport.accumlateActualQuantity'),
      width: 100,
      align: 'right',
    },
    {
      field: 'accumlateDelayQuantity',
      headerName: t('ProgessDetailReport.accumlateDelayQuantity'),
      width: 100,
      align: 'right',
    },
  ]
  return (
    <DataTable
      rows={progressDetailReaport}
      columns={columns}
      hideSetting
      hideFooter
    ></DataTable>
  )
}

export default ProgressTable
