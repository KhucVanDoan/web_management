import { useEffect } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ErrorReportStatusFilterForm from '~/modules/qmsx/features/dashboard/error-report/error-report-status/filter-form'
import { useDashboardErrorReportStatus } from '~/modules/qmsx/redux/hooks/useDashboard'

function ErrorReportStatus() {
  const { t } = useTranslation('qmsx')
  const transKey = 'dashboard.errorReport.errorReportStatus'

  const { actions, data } = useDashboardErrorReportStatus()

  useEffect(() => {
    actions.getErrorReportStatusDashboard()
  }, [])

  const errorReportStatus = data.map((datum) => ({
    name: t(`${transKey}.${datum.status}`),
    ...datum,
  }))

  const [nameField, ratioField, quantityField] = ['name', 'ratio', 'quantity']

  const config = {
    appendPadding: 10,
    data: errorReportStatus,
    angleField: 'ratio',
    colorField: 'name',
    radius: 0.8,
    innerRadius: 0.7,
    label: {
      type: 'outer',
      offset: '50%',
      content: '{percentage}',
    },
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          display: 'none',
        },
      },
    },
    tooltip: {
      fields: [nameField, quantityField, ratioField],
      formatter: ({name, quantity, ratio}) => ({
        name: name,
        value: `${quantity} (${ratio}%)`,
      }),
    },
  }

  return (
    <Card sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t(`${transKey}.title`)}</Typography>

        <ErrorReportStatusFilterForm />
      </Box>

      <Box sx={{ height: 400 }}>
        <Pie {...config} />
      </Box>
    </Card>
  )
}

export default ErrorReportStatus
