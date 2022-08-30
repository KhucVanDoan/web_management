import React, { useEffect } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Typography, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useDashboardProductProcessQc } from '~/modules/mesx/redux/hooks/useDashboard'

import Filter from './filter'

function QcProducingStepProgressReport(props) {
  const { inProgressMos } = props
  const { t } = useTranslation(['mesx'])

  const {
    data: { qcProducingStepProgress },
    actions,
  } = useDashboardProductProcessQc()

  useEffect(() => {
    actions.getDashboardQCProducingStepProgress()
  }, [])

  const columnData = []
  const lineData = []

  const producedQuantityData =
    qcProducingStepProgress?.map((i) => ({
      type: t('dashboard.producedQuantity'),
      time: i?.date,
      value: i?.producedQuantity,
    })) || []
  const needToBeRepairData =
    qcProducingStepProgress?.map((i) => ({
      type: t('dashboard.needToBeRepair'),
      time: i?.date,
      value: i?.needToBeRepair,
    })) || []
  const repairedQuantityData =
    qcProducingStepProgress?.map((i) => ({
      type: t('dashboard.qcQuantity'),
      time: i?.date,
      value: i?.repairedQuantity,
    })) || []
  const qcPassQuantityData =
    qcProducingStepProgress?.map((i) => ({
      type: t('dashboard.qcPassQuantity'),
      time: i?.date,
      value: i?.qcPassQuantity,
    })) || []
  const qcRejectQuantityData =
    qcProducingStepProgress?.map((i) => ({
      type: t('dashboard.errorQuantity'),
      time: i?.date,
      value: i?.qcRejectQuantity,
    })) || []
  const planQuantity =
    qcProducingStepProgress?.map((i) => ({
      name: t('dashboard.planQuantity'),
      time: i?.date,
      value: i?.planQuantity,
    })) || []

  columnData.push(
    ...producedQuantityData,
    ...needToBeRepairData,
    ...repairedQuantityData,
    ...qcPassQuantityData,
    ...qcRejectQuantityData,
  )
  lineData.push(...planQuantity)

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
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
          {t('dashboard.qcProducingStepProgress')}
        </Typography>
        <Box>
          <Filter inProgressMos={inProgressMos} />
        </Box>
      </Box>

      <Box sx={{ height: 400 }}>
        <DualAxes {...config} />
      </Box>
    </Card>
  )
}

export default QcProducingStepProgressReport
