import { useEffect, useState } from 'react'

import { DualAxes } from '@ant-design/plots'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
function ProgressDetailReportChart() {
  const {
    data: { progressDetailReports },
  } = useProgressDetailReport()
  const { t } = useTranslation(['mesx'])
  const [col, setCol] = useState([])
  const [line, setLine] = useState([])
  useEffect(() => {
    if (!isEmpty(progressDetailReports)) {
      const columnData = []
      const lineData = []

      const quantitys = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        type: t('ProgessDetailReport.quantity'),
        value: Math.round(Number(i?.quantity) * 100) / 100,
      }))

      const moderationQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        type: t('ProgessDetailReport.moderationQuantity'),
        value: Math.round(Number(i?.moderationQuantity) * 100) / 100,
      }))

      const actualQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        type: t('ProgessDetailReport.actualQuantity'),
        value: Math.round(Number(i?.actualQuantity) * 100) / 100,
      }))

      const delayQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        type: t('ProgessDetailReport.delayQuantity'),
        value: Math.round(Number(i?.delayQuantity) * 100) / 100,
      }))

      const accumlateQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        name: t('ProgessDetailReport.accumlateQuantity'),
        count: Math.round(Number(i?.accumlateQuantity) * 100) / 100,
      }))
      const accumlateActualQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        name: t('ProgessDetailReport.accumlateActualQuantity'),
        count: Math.round(Number(i?.accumlateActualQuantity) * 100) / 100,
      }))
      const accumlateDelayQuantity = progressDetailReports?.map((i) => ({
        time: i?.executionDay,
        name: t('ProgessDetailReport.accumlateDelayQuantity'),
        count: Math.round(Number(i?.accumlateDelayQuantity) * 100) / 100,
      }))
      columnData.push(
        ...quantitys,
        ...moderationQuantity,
        ...actualQuantity,
        ...delayQuantity,
      )
      lineData.push(
        ...accumlateQuantity,
        ...accumlateActualQuantity,
        ...accumlateDelayQuantity,
      )
      setCol(columnData)
      setLine(lineData)
    }
  }, [progressDetailReports])

  const config = {
    data: [col, line],
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

export default ProgressDetailReportChart