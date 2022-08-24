import React, { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import InputQualityFilterForm from '~/modules/qmsx/features/dashboard/quality-control/input-quality/filter-form'
import { useDashboardInputQuality } from '~/modules/qmsx/redux/hooks/useDashboard'

function InputQuality() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: inputQuality } = useDashboardInputQuality()

  useEffect(() => {
    actions.getInputQualityDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const importQuantityData = inputQuality.map((i) => ({
    colName: t(`${transKey}.importQuantity`),
    time: i?.date,
    colValue: i?.importQuantity,
  }))
  const qcDoneQuantityData = inputQuality.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.qcDoneQuantity,
  }))
  const qcNeedQuantityData = inputQuality.map((i) => ({
    colName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    colValue: i?.qcNeedQuantity,
  }))
  const qcPassQuantityData = inputQuality.map((i) => ({
    colName: t(`${transKey}.qcPassQuantity`),
    time: i?.date,
    colValue: i?.qcPassQuantity,
  }))
  const qcRejectQuantityData = inputQuality.map((i) => ({
    colName: t(`${transKey}.qcRejectQuantity`),
    time: i?.date,
    colValue: i?.qcRejectQuantity,
  }))
  const planQuantityData = inputQuality.map((i) => ({
    lineName: t(`${transKey}.planQuantity`),
    time: i?.date,
    lineValue: i?.planQuantity,
  }))

  columnData.push(
    ...importQuantityData,
    ...qcDoneQuantityData,
    ...qcNeedQuantityData,
    ...qcPassQuantityData,
    ...qcRejectQuantityData,
  )
  lineData.push(...planQuantityData)

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
        lineStyle: () => ({
          opacity: 0.5,
        }),
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
        <Typography variant="h2">{t(`${transKey}.qcInput`)}</Typography>
        <Box>
          <InputQualityFilterForm />
        </Box>
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default InputQuality
