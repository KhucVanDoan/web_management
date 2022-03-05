import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
function OEEChart(props) {
  const { data } = props
  const { t } = useTranslation(['mesx'])
  const columnData = []
  const lineData = []
  const actualOEEData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualOEE'),
    value: Number(i?.oeeActual),
  }))

  const planOEEData = data.map((i) => ({
    time: i?.executionDay,
    count: Number(i?.oeePlan),
    name: t('productivityReport.planOEE'),
  }))

  const cumulativeActualOEEData = data.map((i) => ({
    time: i?.executionDay,
    count: Number(i?.cumulativeActualOee),
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
