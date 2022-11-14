import React, { useEffect, useState } from 'react'

import { Bar } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { useDashboardItemStockReport } from '~/modules/wmsx/redux/hooks/useDashboard'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'

const DEMO_DATA = [
  {
    name: 'Dầu diezen',
    sales: 38,
  },
  {
    name: 'Than cám',
    sales: 52,
  },
  {
    name: 'Đá vôi',
    sales: 61,
  },
  {
    name: 'Than cám 5b',
    sales: 145,
  },
  {
    name: 'Mặt nạ bảo vệ (FSI- Protactive mask) ...',
    sales: 48,
  },
  {
    name: 'Đai ốc HTGD339571P0001',
    sales: 38,
  },
  {
    name: 'Đai ốc lục giác M48 TGD 327809P0001',
    sales: 38,
  },
  {
    name: 'Đai ốc lục giác M16 / DIN934/NB  33...',
    sales: 38,
  },
  {
    name: 'Lược dầu HTCT422904R0001',
    sales: 38,
  },
  {
    name: 'Vít khóa HTGD464587P0001',
    sales: 38,
  },
]

const UsedMaterialsReport = () => {
  const { t } = useTranslation(['wmsx'])

  // eslint-disable-next-line no-unused-vars
  const { data, actions } = useDashboardItemStockReport()

  const parsedData = DEMO_DATA.map((item, idx) => ({ ...item, type: idx }))

  const [filterBy, setFilterBy] = useState()

  const getData = () => {
    const payload = {
      reportType: 0,
      warehouseId: filterBy,
    }
    actions.getItemStockReport(payload)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [filterBy])

  const handleChangeSelect = (value) => {
    setFilterBy(value?.id)
  }

  const color = [
    '#33CC99',
    '#56CCF2',
    '#F4D36C',
    '#FD8686',
    '#fe2712',
    '#fd5308',
    '#d0ea2b',
    '#0247fe',
    '#3d01a4',
    '#8601af',
  ]

  const config = {
    data: parsedData,
    xField: 'sales',
    yField: 'name',
    seriesField: 'name',
    colorField: 'type',
    renderer: 'svg',
    color: ({ name }) => {
      const item = parsedData.find((i) => i.name === name)
      return color[item.type]
    },
    legend: {
      marker: {
        symbol: 'circle',
      },
      itemName: {
        style: {
          fontSize: 16,
        },
      },
      itemHeight: 18,
      maxItemWidth: 150,
    },

    tooltip: {
      customContent: (title, dataTooltip) => {
        const data = dataTooltip[0] || {}
        return (
          <div
            style={{
              width: 260,
              minHeight: 65,
              border: '1px solid #666666',
              borderRadius: 5,
              padding: 20,
              boxSizing: 'border-box',
              fontSize: 16,
              marginLeft: -12,
              marginRight: -12,
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: data.color,
                  borderRadius: 40,
                  marginRight: 8,
                  marginTop: 5,
                }}
              />
              <span style={{ lineHeight: '18px', display: 'block' }}>
                {data?.value || '1.02.123123.123123'}-{data?.name || 'Đá vôi'}
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {data?.quantity || '123'}
              </span>
              &nbsp;|&nbsp;<span>{data?.price || '100.000.000 đồng'}</span>
            </div>
          </div>
        )
      },
    },
    appendPadding: [0, 50, 10, 15],
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [9, 6],
          },
        },
      },
      line: {
        visible: false,
        style: {
          stroke: '',
        },
      },
      tickLine: {
        length: 0,
      },
      tickCount: 10,
      label: {
        formatter: () => {
          return ''
        },
      },
    },
    xAxis: {
      line: {
        style: {
          opacity: 0,
        },
      },

      grid: {
        line: {
          style: {
            lineWidth: 2,
            stroke: '#ddd',
            lineDash: [9, 6],
          },
        },
      },
    },
    barWidthRatio: 0.4,
    interactions: [
      { type: 'legend-filter', enable: false },
      { type: 'element-active', enable: false },
    ],
  }

  const configLegend = {
    data: parsedData,
    width: 100,
    xField: '',
    line: null,
    yField: '',
    seriesField: 'name',
    renderer: 'svg',
    color: ({ name }) => {
      const item = parsedData.find((i) => i.name === name)
      return color[item.type]
    },
    legend: {
      position: 'left',
      marker: {
        symbol: 'circle',
        style: {
          r: 5,
        },
      },
      itemName: {
        formatter: () => '',
      },
      itemHeight: 16.5,
    },
    interactions: [
      { type: 'legend-filter', enable: false },
      { type: 'element-active', enable: false },
    ],
  }

  return (
    <Card sx={{ p: 2, height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.materialUsed.title')}
        </Typography>
        <Autocomplete
          sx={{ width: '30%' }}
          value={filterBy}
          placeholder={t('dashboard.allWarehouse')}
          asyncRequest={(s) =>
            getDashboardWarehouses({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={handleChangeSelect}
        />
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 313,
            position: 'absolute',
            top: -13,
            left: -5,
            '& svg > g:first-of-type > g': {
              display: 'none',
            },
          }}
        >
          <Bar {...configLegend} />
        </Box>
        <Box
          sx={{
            height: 313,
            '& svg > g:first-of-type >g:first-of-type #-grid-line-0:first-of-type':
              {
                display: 'none',
              },
          }}
        >
          <Bar {...config} />
        </Box>
      </Box>
    </Card>
  )
}

export default UsedMaterialsReport
