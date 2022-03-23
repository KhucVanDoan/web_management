import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'

import useProductivityReport from '~/modules/mesx/redux/hooks/useProductivityReport'
function ProductivityChart() {
  const {
    data: { data },
  } = useProductivityReport()
  const { t } = useTranslation(['mesx'])
  const columnData = []
  const lineData = []
  const planExecutionTimeData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.planItemExecutionTime'),
    value: Math.round(Number(i?.planExecutionTime) * 100) / 100,
  }))

  const actualExecutionTimeData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualItemExecutionTime'),
    value: Math.round(Number(i?.actualExecutionTime) * 100) / 100,
  }))

  const planProductivityData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.planProductivity'),
    value: Math.round(Number(i?.planProductivity) * 100) / 100,
  }))

  const actualProductivityData = data.map((i) => ({
    time: i?.executionDay,
    type: t('productivityReport.actualProductivity'),
    value: Math.round(Number(i?.actualProductivity) * 100) / 100,
  }))

  const cummulativePlanProductivityData = data.map((i) => ({
    time: i?.executionDay,
    name: t('productivityReport.cummulativePlanProductivity'),
    count: Math.round(Number(i?.cumulativePlanProductivity) * 100) / 100,
  }))

  const cummulativeActualProductivityData = data.map((i) => ({
    time: i?.executionDay,
    name: t('productivityReport.cummulativeActualProductivity'),
    count: Math.round(Number(i?.cumulativeActualProductivity) * 100) / 100,
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
