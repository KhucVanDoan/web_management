import React, { useState } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Filter from './filter'

function FinishedProductProgressReport(props) {
  const { finishedItemProgress, inProgressMos } = props
  const { t } = useTranslation(['mesx'])
  const [tmpFinishedItemProgress, setTmpFinishedItemProgress] = useState()

  const chartData = tmpFinishedItemProgress || finishedItemProgress

  const columnData = []
  const lineData = []

  const producedQuantityData = chartData.map((i) => ({
    type: t('dashboard.producedItem'),
    time: i.date,
    value: Number(i.producedQuantity),
  }))
  const todoQuantityData = chartData.map((i) => ({
    type: t('dashboard.toDoItem'),
    time: i.date,
    value: Number(i.todoQuantity),
  }))
  const planQuantityData = chartData.map((i) => ({
    name: t('dashboard.plan'),
    time: i.date,
    count: Number(i.planQuantity),
  }))

  columnData.push(...producedQuantityData, ...todoQuantityData)
  lineData.push(...planQuantityData)

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
          {t('dashboard.finishedItemProgress')}
        </Typography>
        <Filter
          setTmpFinishedItemProgress={setTmpFinishedItemProgress}
          inProgressMos={inProgressMos}
        />
      </Box>
      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}
export default FinishedProductProgressReport
