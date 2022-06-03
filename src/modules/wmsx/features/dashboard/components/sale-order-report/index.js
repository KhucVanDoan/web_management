import React, { useEffect, useState } from 'react'

import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { format, getDay, parse } from 'date-fns'
import { isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import { ORDER_TYPE_ENUM } from '~/modules/wmsx/constants'
import { useDashboardTransferReport } from '~/modules/wmsx/redux/hooks/useDashboard'

import BarChartReport from '../barchart'
import DateSelection from '../date-selection'

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

const filterOption = [
  {
    name: 'purchasedOrder',
    value: ORDER_TYPE_ENUM.PO,
  },
  {
    name: 'productionOrder',
    value: ORDER_TYPE_ENUM.PRO,
  },
  {
    name: 'saleOrder',
    value: ORDER_TYPE_ENUM.SO,
  },
  {
    name: 'importManufacturingOrder',
    value: ORDER_TYPE_ENUM.IMO,
  },
]

const SaleOrderReport = () => {
  const { t } = useTranslation(['wmsx'])
  const theme = useTheme()

  const { data, actions } = useDashboardTransferReport()

  const [filterBy, setFilterBy] = useState(ORDER_TYPE_ENUM.PO)
  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = () => {
    const payload = {
      transactionType: filterBy,
      reportType: groupBy,
      startDate,
      endDate,
    }
    actions.getTransferReport(payload)
  }

  useEffect(() => {
    getData()
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
    const newData = []
    dataList.forEach((data) => {
      newData.push({
        tag: data.tag,
        name: t('dashboard.chart.import'),
        value: data.import,
      })
      newData.push({
        tag: data.tag,
        name: t('dashboard.chart.export'),
        value: data.export,
      })
    })
    return newData
  }

  const handleChangeGroupBy = (_, id) => {
    if (!isNull(id)) {
      setGroupBy(id)
    }
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
  const color = ['#7F9EF4', '#0FA44A']

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.saleOrderReport.title')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
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
              {t(`dashboard.${group.name}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 2, width: '50%' }}>
        <Autocomplete
          options={filterOption}
          value={filterBy}
          getOptionValue={(opt) => opt?.value}
          getOptionLabel={(opt) => t(`movements.${opt.name}`)}
          onChange={handleChangeSelect}
          disableClearable
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <BarChartReport
          data={dataConvert}
          xField="tag"
          color={color}
          seriesField="name"
          yField="value"
        />
      </Box>
      <DateSelection reportType={groupBy} handleChange={handleChangeDate} />
    </Card>
  )
}

export default SaleOrderReport
