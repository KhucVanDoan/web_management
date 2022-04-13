import { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ProductionInputQualityProductPreviousFilterForm from '~/modules/qmsx/features/dashboard/quality-control/production-input-quality-product-previous/filter-form';
import { useDashboardProductionInputQualityProductPrevious } from '~/modules/qmsx/redux/hooks/useDashboard'

function ProductionInputQualityProductPrevious() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: productionInputQualityProductPrevious } =
    useDashboardProductionInputQualityProductPrevious()

  useEffect(() => {
    actions.getProductionInputQualityProductPreviousDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const importQuantityData = productionInputQualityProductPrevious.map((i) => ({
    colName: t(`${transKey}.importQuantity`),
    time: i?.date,
    colValue: i?.importQuantity,
  }))
  const qcDoneQuantityData = productionInputQualityProductPrevious.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const qcNeedQuantityData = productionInputQualityProductPrevious.map((i) => ({
    colName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    colValue: i?.needToBeRepair,
  }))
  const qcRejectQuantityData = productionInputQualityProductPrevious.map(
    (i) => ({
      colName: t(`${transKey}.qcRejectQuantity`),
      time: i?.date,
      colValue: i?.qcRejectQuantity,
    }),
  )
  const qcPassQuantityData = productionInputQualityProductPrevious.map((i) => ({
    colName: t(`${transKey}.qcPassQuantity`),
    time: i?.date,
    colValue: i?.qcPassQuantity,
  }))
  const planQuantityData = productionInputQualityProductPrevious.map((i) => ({
    lineName: t(`${transKey}.planQuantity`),
    time: i?.date,
    lineValue: i?.planQuantity,
  }))

  columnData.push(
    ...importQuantityData,
    ...qcDoneQuantityData,
    ...qcNeedQuantityData,
    ...qcRejectQuantityData,
    ...qcPassQuantityData,
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
        <Grid
          container
          rowSpacing={1 / 3}
          columnSpacing={{ xl: 4, xs: 2 }}
          sx={{ mb: 1 }}
        >
          <Grid item xs={12}>
            <Typography variant="h2">
              {t(`${transKey}.qcProductionInputQuality`)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              ({t(`${transKey}.productPrevious`)})
            </Typography>
          </Grid>
        </Grid>

        <ProductionInputQualityProductPreviousFilterForm />
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default ProductionInputQualityProductPrevious
