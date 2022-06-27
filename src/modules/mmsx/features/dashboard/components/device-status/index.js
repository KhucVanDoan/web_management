import { useState, useEffect, useMemo } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { first } from 'lodash'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import { PIE_CHART_COLORS } from '~/modules/mmsx/constants'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { useDashboardDeviceStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

const DeviceStatus = () => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions } = useDashboardDeviceStatus()
  const {
    data: { factoryList },
    actions: actionsCommon,
  } = useCommonInfo()

  const [filterBy, setFilterBy] = useState('')

  const getData = () => {
    const payload = {
      factoryId: filterBy,
    }
    if (filterBy) {
      actions.getDeviceStatus(payload)
    } else actions.getDeviceStatus()
  }

  useEffect(() => {
    getData()
    actionsCommon.getFactoryList()
  }, [])

  useEffect(() => {
    if (factoryList) {
      setFilterBy(first(factoryList)?.id)
    }
  }, [factoryList])

  useEffect(() => {
    getData()
  }, [filterBy])

  const handleChangeSelect = (id) => {
    setFilterBy(id)
  }

  const dataChart = useMemo(
    () => [
      {
        type: t('dashboard.chart.totalUnUseItem'),
        value: data?.totalUnUseItem,
      },
      {
        type: t('dashboard.chart.totalInUseItem'),
        value: data?.totalInUseItem,
      },
      {
        type: t('dashboard.chart.totalReturnItem'),
        value: data?.totalReturnItem,
      },
      {
        type: t('dashboard.chart.totalMaintiningItem'),
        value: data?.totalMaintiningItem,
      },

      {
        type: t('dashboard.chart.totalScrappingItem'),
        value: data?.totalScrappingItem,
      },
    ],
    [data],
  )

  const config = {
    appendPadding: 10,
    padding: 1,
    data: dataChart,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    height: 306,
    innerRadius: 0.6,
    color: PIE_CHART_COLORS,
    label: {
      type: 'outer',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.deviceStatus')}
        </Typography>
        <Autocomplete
          disableClearable
          options={factoryList}
          value={filterBy}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => t(opt?.name)}
          onChange={handleChangeSelect}
          sx={{ width: '50%' }}
        />
      </Box>
      <Box sx={{ height: 300 }}>
        <Pie {...config} data={dataChart} />
      </Box>
    </Card>
  )
}

export default DeviceStatus
