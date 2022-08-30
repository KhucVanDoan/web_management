import { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ProductionOutputQualityFilterForm from '~/modules/qmsx/features/dashboard/quality-control/production-output-quality/filter-form'
import { useDashboardProductionOutputQuality } from '~/modules/qmsx/redux/hooks/useDashboard'

function ProductionOutputQuality() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: productionOutputQuality } =
    useDashboardProductionOutputQuality()

  useEffect(() => {
    actions.getProductionOutputQualityDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const producedQuantityData = productionOutputQuality.map((i) => ({
    colName: t(`${transKey}.producedQuantity`),
    time: i?.date,
    colValue: i?.producedQuantity,
  }))
  const qcRejectQuantityData = productionOutputQuality.map((i) => ({
    colName: t(`${transKey}.qcRejectQuantity`),
    time: i?.date,
    colValue: i?.qcRejectQuantity,
  }))
  const needRepairQuantityData = productionOutputQuality.map((i) => ({
    colName: t(`${transKey}.needRepairQuantity`),
    time: i?.date,
    colValue: i?.needToBeRepair,
  }))
  const qcNeedQuantityData = productionOutputQuality.map((i) => ({
    colName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const qcDoneQuantityData = productionOutputQuality.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.totalQcQuantity,
  }))
  const planQuantityData = productionOutputQuality.map((i) => ({
    lineName: t(`${transKey}.planQuantity`),
    time: i?.date,
    lineValue: i?.planQuantity,
  }))

  columnData.push(
    ...producedQuantityData,
    ...qcRejectQuantityData,
    ...needRepairQuantityData,
    ...qcNeedQuantityData,
    ...qcDoneQuantityData,
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
        <Typography variant="h2">
          {t(`${transKey}.qcProductionOutputQuality`)}
        </Typography>
        <Box>
          <ProductionOutputQualityFilterForm />
        </Box>
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default ProductionOutputQuality
