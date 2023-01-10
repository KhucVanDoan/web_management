import React, { useEffect, useState } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { format, getDay, parse } from 'date-fns'
import { first } from 'lodash'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import { useDashboardItemStockReport } from '~/modules/wmsx/redux/hooks/useDashboard'

import BarChartReport from '../barchart'

const ItemReport = () => {
  const { t } = useTranslation(['wmsx'])

  const { data, actions } = useDashboardItemStockReport()
  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  const [filterBy, setFilterBy] = useState()
  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = () => {
    const payload = {
      itemTypeId: filterBy,
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getItemStockReport(payload)
  }

  useEffect(() => {
    if (itemTypeList) {
      setFilterBy(first(itemTypeList)?.id)
    }
  }, [itemTypeList])

  useEffect(() => {
    getData()
    actionsItemType.searchItemTypes({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    getData()
  }, [filterBy, groupBy, startDate, endDate])

  const getDate = (date) => {
    return t(
      `dashboard.dayOfWeeks${getDay(parse(date, 'dd/MM/yyyy', new Date()))}`,
    )
  }

  const formatDataDate = (data) => {
    return data.map((d) => {
      switch (groupBy) {
        case 1:
          return {
            ...d,
            tag: `${t('dashboard.week')} ${d.tag}`,
          }
        case 2:
          return {
            ...d,
            tag: `${t('dashboard.month')} ${d.tag}`,
          }
        default:
          return {
            ...d,
            tag: getDate(d.rangeDate),
          }
      }
    })
  }

  const formatDataType = (dataList) => {
    return dataList.map((item) => ({
      ...item,
      type: t('dashboard.chart.thisPeriod'),
      stock: +item.stock,
    }))
  }

  const handleChangeSelect = (value) => {
    setFilterBy(value)
  }

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
    setStartDate(`${format(start, 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(end, 'yyyy-MM-dd')}T23:59:59.999Z`)
  }

  const dataConvert = formatDataType(formatDataDate(data))
  const color = ['#0761AD']

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">{t('dashboard.itemReport.title')}</Typography>
        <Box>
          <DateGroupToggle groupBy={groupBy} setGroupBy={setGroupBy} />
        </Box>
      </Box>
      <Box sx={{ mb: 2, width: '50%' }}>
        <Autocomplete
          value={filterBy}
          options={itemTypeList}
          getOptionValue={(opt) => opt?.id || ''}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          onChange={handleChangeSelect}
          disableClearable
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <BarChartReport
          data={dataConvert}
          xField="tag"
          color={color}
          yField="stock"
          seriesField="type"
        />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
    </Card>
  )
}

export default ItemReport
