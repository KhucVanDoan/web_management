import React, { useEffect, useMemo, useState } from 'react'

import { Line } from '@ant-design/plots'
import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { format } from 'date-fns'
import { isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DateSelection from '~/components/DateSelection'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { useDashboardMttStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

const groupOptions = [
  {
    name: 'week',
    value: 0,
  },
  {
    name: 'month',
    value: 1,
  },
  {
    name: 'quarter',
    value: 2,
  },
]

const mttTitle = ['dashboard.mtt.mttr', 'dashboard.mtt.mtta']

const MttStatus = () => {
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()

  const { data, actions } = useDashboardMttStatus()
  const {
    data: { factoryList, maintenanceTeams },
    actions: actionsCommon,
  } = useCommonInfo()

  const [factoryId, setFactoryId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = () => {
    const payload = {
      ...(factoryId ? { factory: factoryId } : {}),
      ...(teamId ? { maintainTeam: teamId } : {}),
      startDate,
      endDate,
      reportType: groupBy,
    }
    actions.getMttStatus(payload)
  }

  useEffect(() => {
    getData()
    actionsCommon.getFactoryList()
    actionsCommon.getListMaintenanceTeamStart()
  }, [])

  useEffect(() => {
    getData()
  }, [factoryId, teamId, groupBy, startDate, endDate])

  const handleChangeGroupBy = (_, id) => {
    if (!isNull(id)) {
      setGroupBy(id)
    }
  }

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
    setStartDate(`${format(start, 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(end, 'yyyy-MM-dd')}T23:59:59.999Z`)
  }

  const convertData = useMemo(() => {
    let mttData = []
    data?.forEach((item) => {
      item?.countReport?.forEach((data) =>
        mttData.push({
          time: item?.rangeDate,
          value: Math.round(data?.count),
          category: t(`${mttTitle[data?.status]}`),
        }),
      )
    })
    return mttData
  }, [data])

  const config = {
    data: convertData,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    height: 215,
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
  }

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.mtt.title')}</Typography>
        <ToggleButtonGroup
          color="primary"
          variant="contained"
          size="small"
          value={groupBy}
          exclusive
          onChange={handleChangeGroupBy}
        >
          {groupOptions.map((group) => (
            <ToggleButton
              key={group.value}
              value={group.value}
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.text.main,
                width: 55,
                '&.Mui-selected': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              {t(`common.${group.name}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{ mb: 2, display: 'flex' }}
        // sx={{ mb: 2, width: '50%', display: 'flex', justifyContent: 'center' }}
      >
        <Autocomplete
          value={factoryId}
          options={[
            { name: t('general.allFactory'), id: null },
            ...factoryList,
          ]}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(val) => {
            setFactoryId(val)
          }}
          sx={{ width: '33%', mr: 1 }}
          disableClearable
        />
        <Autocomplete
          value={teamId}
          options={[
            { name: t('general.allMaintenanceTeam'), id: null },
            ...maintenanceTeams,
          ]}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(val) => {
            setTeamId(val)
          }}
          sx={{ width: '33%' }}
          disableClearable
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <Line {...config} />
      </Box>
      <DateSelection reportType={groupBy} handleChange={handleChangeDate} />
    </Card>
  )
}

export default MttStatus
