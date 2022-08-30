import { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ProductionInputQualityMaterialFilterForm from '~/modules/qmsx/features/dashboard/quality-control/production-input-quality-material/filter-form'
import { useDashboardProductionInputQualityMaterial } from '~/modules/qmsx/redux/hooks/useDashboard'

function ProductionInputQualityMaterial() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.qualityControl'

  const { actions, data: productionInputQualityMaterial } =
    useDashboardProductionInputQualityMaterial()

  useEffect(() => {
    actions.getProductionInputQualityMaterialDashboard()
  }, [])

  const columnData = []
  const lineData = []

  const qcRejectQuantityData = productionInputQualityMaterial.map((i) => ({
    colName: t(`${transKey}.qcDoneQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const needRepairQuantityData = productionInputQualityMaterial.map((i) => ({
    colName: t(`${transKey}.qcNeedQuantity`),
    time: i?.date,
    colValue: i?.needToBeRepair,
  }))
  const qcNeedQuantityData = productionInputQualityMaterial.map((i) => ({
    colName: t(`${transKey}.qcRejectQuantity`),
    time: i?.date,
    colValue: i?.qcQuantity,
  }))
  const qcDoneQuantityData = productionInputQualityMaterial.map((i) => ({
    colName: t(`${transKey}.qcPassQuantity`),
    time: i?.date,
    colValue: i?.totalQcQuantity,
  }))
  const planQuantityData = productionInputQualityMaterial.map((i) => ({
    lineName: t(`${transKey}.planQuantity`),
    time: i?.date,
    lineValue: i?.planQuantity,
  }))

  columnData.push(
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
              ({t(`${transKey}.material`)})
            </Typography>
          </Grid>
        </Grid>

        <Box>
          <ProductionInputQualityMaterialFilterForm />
        </Box>
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default ProductionInputQualityMaterial
