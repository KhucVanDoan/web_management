import React, { useEffect, useState } from 'react'

import { Line } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { useTranslation } from 'react-i18next'

import DatePicker from '~/components/DatePicker'
import { useDashboardMovementReport } from '~/modules/wmsx/redux/hooks/useDashboard'

const MovementReport = () => {
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
        value: data.transfer,
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

  const config = {
    data: data,
    xField: 'tag',
    yField: 'value',
    seriesField: 'type',
    color: ['#1F78B4', '#FF0909', '#B2DF8A'],
    smooth: true,
    lineStyle: { lineDash: [6 - 1] },
    xAxis: {
      nice: true,
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: function formatter(name) {
          return name
        },
      },
      line: { style: { stroke: '#aaa' } },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',')
          })
        },
      },
      line: { style: { stroke: '#aaa' } },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
      },
    },
    point: {
      size: 6,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
    },
    legend: {
      position: 'bottom',
      itemName: {
        style: { fill: '#000' },
        formatter: function formatter(name) {
          return name
        },
      },
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.movementReport.title')}
        </Typography>
        <Box sx={{ width: '25%' }}>
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

export default MovementReport
