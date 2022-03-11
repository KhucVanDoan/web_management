import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

function OEETable(props) {
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
        plan: t('productivityReport.actualOEE'),
      },
      {
        plan: t('productivityReport.planOEE'),
      },
      {
        plan: t('productivityReport.availability'),
      },
      {
        plan: t('productivityReport.quality'),
      },
      {
        plan: t('productivityReport.performance'),
      },
      {
        plan: t('productivityReport.cumulativeActualOEE'),
      },
    ]
    data.map((i) => {
      rows[0][i.executionDay] = Math.round(Number(i.oeeActual) * 100) / 100
      rows[1][i.executionDay] = Math.round(Number(i.oeePlan) * 100) / 100
      rows[2][i.executionDay] =
        Math.round(Number(i.oeeAvailablility) * 100) / 100
      rows[3][i.executionDay] = Math.round(Number(i.oeeQuality) * 100) / 100
      rows[4][i.executionDay] = Math.round(Number(i.oeePerformance) * 100) / 100
      rows[5][i.executionDay] =
        Math.round(Number(i.cumulativeActualOee) * 100) / 100
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

export default OEETable
