import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

function ProductivityTable(props) {
  const { data } = props
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
      rows[0][i.executionDay] = i.planExecutionTime
      rows[1][i.executionDay] = i.actualExecutionTime
      rows[2][i.executionDay] = i.planProductivity
      rows[3][i.executionDay] = i.actualProductivity
      rows[4][i.executionDay] = i.cumulativePlanProductivity
      rows[5][i.executionDay] = i.cumulativeActualProductivity
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
