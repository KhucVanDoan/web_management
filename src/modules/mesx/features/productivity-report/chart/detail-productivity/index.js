import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
function ProductivityChart(props) {
  const { data } = props
  const { t } = useTranslation(['mesx'])
  const columnData = []
  const lineData = []
  const planExecutionTimeData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.planItemExecutionTime'),
    value: Number(i?.planExecutionTime),
  }))

  const actualExecutionTimeData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualItemExecutionTime'),
    value: Number(i?.actualExecutionTime),
  }))

  const planProductivityData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.planProductivity'),
    value: Number(i?.planProductivity),
  }))

  const actualProductivityData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualProductivity'),
    value: Number(i?.actualProductivity),
  }))

  const cummulativePlanProductivityData = data.map((i) => ({
    time: i?.executionDay,
    name: t('productivityReport.cummulativePlanProductivity'),
    count: Number(i?.cumulativePlanProductivity),
  }))

  const cummulativeActualProductivityData = data.map((i) => ({
    time: i?.executionDay,
    name: t('productivityReport.cummulativeActualProductivity'),
    count: Number(i?.cumulativeActualProductivity),
  }))

  columnData.push(
    ...planExecutionTimeData,
    ...actualExecutionTimeData,
    ...planProductivityData,
    ...actualProductivityData,
  )
  lineData.push(
    ...cummulativePlanProductivityData,
    ...cummulativeActualProductivityData,
  )

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            }
          }

          return {
            opacity: 0.5,
          }
        },
      },
    ],
  }

  return (
    <>
      <DualAxes {...config} />
    </>
  )
}

export default ProductivityChart
