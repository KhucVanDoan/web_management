import React, { useEffect, useState } from 'react'

import { Line } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { useTranslation } from 'react-i18next'

import DatePicker from '~/components/DatePicker'
import { useDashboardMovementReport } from '~/modules/wmsx/redux/hooks/useDashboard'

const MovementQuantityReport = () => {
  const { t } = useTranslation(['wmsx'])

  const { data: movementReport, actions } = useDashboardMovementReport()

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const params = {
      startDate:
        startDate ??
        `${format(startOfMonth(new Date()), 'yyyy-MM-dd')}T00:00:00.000Z`,
      endDate:
        endDate ??
        `${format(endOfMonth(new Date()), 'yyyy-MM-dd')}T00:00:00.000Z`,
    }
    actions.getMovementReport(params)
  }, [endDate, startDate])

  const formatData = (dataList) => {
    const newData = []
    dataList.forEach((data) => {
      newData.push({
        tag: data.tag,
        type: t('dashboard.chart.import'),
        value: data.import,
      })
      newData.push({
        tag: data.tag,
        type: t('dashboard.chart.export'),
        value: data.export,
      })
      newData.push({
        tag: data.tag,
        type: t('dashboard.chart.transfer'),
        value: data.tranfer,
      })
    })
    return newData
  }

  const handleChangeSelect = (value) => {
    setSelectedDate(value)
    setStartDate(`${format(startOfMonth(value), 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(endOfMonth(value), 'yyyy-MM-dd')}T23:59:59.999Z`)
  }

  const data = formatData(movementReport)

  const COLOR_PLATE_10 = [
    '#B2DF8A',
    '#1F78B4',
    '#FF0909',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ]

  const config = {
    data,
    xField: 'tag',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    lineStyle: () => {
      return {
        lineDash: [3, 3],
        opacity: 0.6,
      }
    },
    point: {
      size: 6,
      shape: 'circle',
    },
    legend: {
      position: 'bottom',
      marker: (text, index, item) => {
        const color = item.style.stroke
        return {
          symbol: 'square',
          style: {
            fill: color,
            r: 4,
          },
        }
      },
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.movementReport.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mb: 2,
            width: '20%',
            flexDirection: 'column',
          }}
        >
          <DatePicker
            views={['year', 'month']}
            value={selectedDate}
            onChange={handleChangeSelect}
          />
        </Box>
      </Box>
      <Box sx={{ height: 360 }}>
        <Line {...config} />
      </Box>
    </Card>
  )
}

export default MovementQuantityReport
