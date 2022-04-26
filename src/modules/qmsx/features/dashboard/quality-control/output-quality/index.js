import React, { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import OutputQualityFilterForm from '~/modules/qmsx/features/dashboard/quality-control/output-quality/filter-form'
import { useDashboardOutputQuality } from '~/modules/qmsx/redux/hooks/useDashboard'

function OutputQuality() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: outputQuality } = useDashboardOutputQuality()

  useEffect(() => {
    actions.getOutputQualityDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const importQuantityData = outputQuality.map((i) => ({
    colName: t(`${transKey}.exportQuantity`),
    time: i?.date,
    colValue: i?.importQuantity,
  }))
  const qcDoneQuantityData = outputQuality.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const qcNeedQuantityData = outputQuality.map((i) => ({
    colName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    colValue: i?.qcNeedQuantity,
  }))
  const qcPassQuantityData = outputQuality.map((i) => ({
    colName: t(`${transKey}.qcPassQuantity`),
    time: i?.date,
    colValue: i?.qcPassQuantity,
  }))
  const qcRejectQuantityData = outputQuality.map((i) => ({
    colName: t(`${transKey}.qcRejectQuantity`),
    time: i?.date,
    colValue: i?.qcRejectQuantity,
  }))
  const planQuantityData = outputQuality.map((i) => ({
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
        <Typography variant="h2">{t(`${transKey}.qcOutput`)}</Typography>

        <OutputQualityFilterForm />
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default OutputQuality
