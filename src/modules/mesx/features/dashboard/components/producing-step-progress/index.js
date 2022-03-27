import { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useDashboardProducingStepProgress } from '~/modules/mesx/redux/hooks/useDashboard'

import Filter from './filter'

function ProducingStepProgressReport(props) {
  const { inProgressMos } = props
  const { t } = useTranslation(['mesx'])

  const {
    data: { producingStepProgress },
    actions,
  } = useDashboardProducingStepProgress()

  const columnData = []
  const lineData = []

  useEffect(() => {
    actions.getDashboardProducingStepProgress()
  }, [])

  const producedQuantityData = producingStepProgress.map((i) => ({
    type: t('dashboard.producedQuantity'),
    time: i?.date,
    value: i?.producedQuantity,
  }))

  const planQuantity = producingStepProgress.map((i) => ({
    name: t('dashboard.planQuantity'),
    time: i?.date,
    value: i?.planQuantity,
  }))

  const todoQuantityData = producingStepProgress.map((i) => ({
    name: t('dashboard.toDoQuantity'),
    time: i?.date,
    value: i?.todoQuantity,
  }))

  columnData.push(...producedQuantityData)
  lineData.push(...planQuantity, ...todoQuantityData)

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
    legend: {
      layout: 'vertical',
      position: 'bottom',
    },
  }

  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.producingStepProgress')}
        </Typography>
        <Filter inProgressMos={inProgressMos} />
      </Box>
      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default ProducingStepProgressReport
