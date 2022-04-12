import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useProductivityReport from '~/modules/mesx/redux/hooks/useProductivityReport'

function ProductivityTable() {
  const {
    data: { data },
  } = useProductivityReport()
  const { t } = useTranslation(['mesx'])

  const getColumns = () => {
    const columns = [
      {
        field: 'plan',
        headerName: t('productivityReport.plan'),
      },
    ]
    const dataColumn = data.map((i) => ({
      field: i.executionDay,
      headerName: i.executionDay,
    }))
    columns.push(...dataColumn)
    return columns
  }

  const getRows = () => {
    const rows = [
      {
        plan: t('productivityReport.planItemExecutionTime'),
      },
      {
        plan: t('productivityReport.actualItemExecutionTime'),
      },
      {
        plan: t('productivityReport.planProductivity'),
      },
      {
        plan: t('productivityReport.actualProductivity'),
      },
      {
        plan: t('productivityReport.cummulativePlanProductivity'),
      },
      {
        plan: t('productivityReport.cummulativeActualProductivity'),
      },
    ]
    data.map((i) => {
      rows[0][i.executionDay] =
        Math.round(Number(i.planExecutionTime) * 100) / 100
      rows[1][i.executionDay] =
        Math.round(Number(i.actualExecutionTime) * 100) / 100
      rows[2][i.executionDay] =
        Math.round(Number(i.planProductivity) * 100) / 100
      rows[3][i.executionDay] =
        Math.round(Number(i.actualProductivity) * 100) / 100
      rows[4][i.executionDay] =
        Math.round(Number(i.cumulativePlanProductivity) * 100) / 100
      rows[5][i.executionDay] =
        Math.round(Number(i.cumulativeActualProductivity) * 100) / 100
      return rows
    })
    return rows
  }

  return (
    <>
      <DataTable
        rows={getRows()}
        columns={getColumns()}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ProductivityTable
