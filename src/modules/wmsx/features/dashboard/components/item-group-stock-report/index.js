import { useState, useEffect } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import {
  DEFAULT_ITEM_TYPE_ENUM,
  PIE_CHART_COLORS,
} from '~/modules/wmsx/constants'
import { useDashboardItemGroupStockSummary } from '~/modules/wmsx/redux/hooks/useDashboard'

const ItemGroupStockReport = () => {
  const { t } = useTranslation(['wmsx'])

  const { data, actions } = useDashboardItemGroupStockSummary()
  const [filterBy, setFilterBy] = useState(DEFAULT_ITEM_TYPE_ENUM.MATERIAL.code)
  const options = [
    {
      ...DEFAULT_ITEM_TYPE_ENUM.MATERIAL,
      id: DEFAULT_ITEM_TYPE_ENUM.MATERIAL.code,
      name: 'dashboard.material',
    },
    {
      ...DEFAULT_ITEM_TYPE_ENUM.PRODUCT,
      id: DEFAULT_ITEM_TYPE_ENUM.PRODUCT.code,
      name: 'dashboard.product',
    },
  ]

  const getData = (id) => {
    const payload = {
      itemTypeCode: id ?? filterBy.toString(),
    }
    actions.getItemGroupStockSummary(payload)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [filterBy])

  const handleChangeSelect = (id) => {
    setFilterBy(id)
  }

  const dataChart = data.groups ?? []

  const config = {
    height: 280,
    width: 250,
    appendPadding: 10,
    data: [],
    angleField: 'value',
    colorField: 'name',
    color: PIE_CHART_COLORS,
    radius: 1,
    label: {
      type: 'outer',
      style: { fontSize: 14, textOverflow: 'unset' },
    },
    statistic: {
      content: {
        style: {
          fontSize: 22,
        },
      },
    },
    innerRadius: 0.6,
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  }
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.itemReport.title')}</Typography>
        <Autocomplete
          disableClearable
          options={options}
          value={filterBy}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => t(opt?.name)}
          onChange={handleChangeSelect}
          sx={{ width: '50%' }}
        />
      </Box>
      <Box sx={{ height: 280 }}>
        <Pie {...config} data={dataChart} />
      </Box>
    </Card>
  )
}

export default ItemGroupStockReport
