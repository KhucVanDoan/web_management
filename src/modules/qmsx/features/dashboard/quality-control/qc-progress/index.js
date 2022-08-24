import { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import QcProgressFilterForm from '~/modules/qmsx/features/dashboard/quality-control/qc-progress/filter-form'
import { useDashboardQcProgress } from '~/modules/qmsx/redux/hooks/useDashboard'

function QcProgress() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: qcProgress } = useDashboardQcProgress()

  useEffect(() => {
    actions.getQcProgressDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const qcDoneQuantityData = qcProgress.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const qcPassQuantityData = qcProgress.map((i) => ({
    colName: t(`${transKey}.qcPassQuantity`),
    time: i?.date,
    colValue: i?.qcPassQuantity,
  }))
  const planQuantityData = qcProgress.map((i) => ({
    lineName: t(`${transKey}.planQuantity`),
    time: i?.date,
    lineValue: i?.planQuantity,
  }))
  const qcNeedQuantityData = qcProgress.map((i) => ({
    lineName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    lineValue: i?.qcNeedQuantity,
  }))

  columnData.push(...qcDoneQuantityData, ...qcPassQuantityData)
  lineData.push(...planQuantityData, ...qcNeedQuantityData)

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['colValue', 'lineValue'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'colName',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'lineName',
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
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      flipPage: false,
    },
    animation: false,
  }

  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t(`${transKey}.qcProgress`)}</Typography>
        <Box>
          <QcProgressFilterForm />
        </Box>
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default QcProgress
