import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Line } from '@ant-design/plots'
import { Box, Card, Grid, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { useDashboardMttStatus } from '~/modules/mmsx/redux/hooks/useDashboard'

const mttTitle = ['dashboard.mtt.mttr', 'dashboard.mtt.mtta']

const MttStatus = () => {
  const { t } = useTranslation(['mmsx'])

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

  const getData = useCallback(() => {
    const payload = {
      ...(factoryId ? { factory: factoryId } : {}),
      ...(teamId ? { maintainTeam: teamId } : {}),
      startDate,
      endDate,
      reportType: groupBy,
    }
    actions.getMttStatus(payload)
  }, [factoryId, teamId, groupBy, startDate, endDate])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    actionsCommon.getFactoryList()
    actionsCommon.getListMaintenanceTeamStart()
  }, [])

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

  const config = useMemo(
    () => ({
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
    }),
    [convertData],
  )

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.mtt.title')}</Typography>
        <Box>
          <DateGroupToggle
            groupBy={groupBy}
            setGroupBy={(val) => {
              setGroupBy(val)
              setStartDate(null)
              setEndDate(null)
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xl={4} md={6} xs={12}>
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
            disableClearable
          />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
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
            disableClearable
          />
        </Grid>
      </Grid>
      <Box sx={{ height: 360 }}>
        <Line {...config} />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
    </Card>
  )
}

export default MttStatus
