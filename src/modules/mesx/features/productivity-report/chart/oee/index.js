import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'

import useProductivityReport from '~/modules/mesx/redux/hooks/useProductivityReport'
function OEEChart() {
  const {
    data: { data },
  } = useProductivityReport()
  const { t } = useTranslation(['mesx'])
  const columnData = []
  const lineData = []
  const actualOEEData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualOEE'),
    value: Math.round(Number(i?.oeeActual) * 100) / 100,
  }))

  const planOEEData = data.map((i) => ({
    time: i?.executionDay,
    count: Math.round(Number(i?.oeePlan) * 100) / 100,
    name: t('productivityReport.planOEE'),
  }))

  const cumulativeActualOEEData = data.map((i) => ({
    time: i?.executionDay,
    count: Math.round(Number(i?.cumulativeActualOee) * 100) / 100,
    name: t('productivityReport.cumulativeActualOEE'),
  }))

  columnData.push(...actualOEEData)
  lineData.push(...planOEEData, ...cumulativeActualOEEData)

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'type',
        columnWidthRatio: 0.2,
      },
      {
        geometry: 'line',
        seriesField: 'name',
      },
    ],
  }
  return (
    <>
      <DualAxes {...config} />
    </>
  )
}

export default OEEChart
