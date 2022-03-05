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
      rows[0][i.executionDay] = i.oeeActual
      rows[1][i.executionDay] = i.oeePlan
      rows[2][i.executionDay] = i.oeeAvailablility
      rows[3][i.executionDay] = i.oeeQuality
      rows[4][i.executionDay] = i.oeePerformance
      rows[5][i.executionDay] = i.cumulativeActualOee
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
