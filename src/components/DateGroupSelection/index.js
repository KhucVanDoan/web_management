import React, { useState, useEffect } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton, Typography } from '@mui/material'
import {
  getMonth,
  getISOWeek,
  getQuarter,
  getYear,
  startOfISOWeek,
  endOfISOWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  isAfter,
  format,
  setISOWeek,
  setMonth,
  setQuarter,
} from 'date-fns'
import { useTranslation } from 'react-i18next'
const reportTypeEnum = {
  WEEK: 0,
  MONTH: 1,
  QUARTER: 2,
}

const groupOptions = [
  {
    name: 'week',
    value: reportTypeEnum.WEEK,
  },
  {
    name: 'month',
    value: reportTypeEnum.MONTH,
  },
  {
    name: 'quarter',
    value: reportTypeEnum.QUARTER,
  },
]

const dateFormat = 'dd/MM/yyyy'

const directionEnum = {
  up: 'UP',
  down: 'DOWN',
}

const DateGroupSelection = (props) => {
  const { handleChange, reportType } = props
  const { t } = useTranslation('wmsx')
  const [value, setValue] = useState()
  const [unit, setUnit] = useState(groupOptions[0])
  const [startDate, setStartDate] = useState(startOfISOWeek(new Date()))
  const [endDate, setEndDate] = useState(endOfISOWeek(new Date()))
  const currentMonth = getMonth(new Date())
  const currentWeek = getISOWeek(new Date())
  const currentQuarter = getQuarter(new Date())
  const weeksInYear = (year) =>
    Math.max(
      getISOWeek(new Date(year, 11, 31)),
      getISOWeek(new Date(year, 11, 31 - 7)),
    )

  useEffect(() => {
    let currentValue = currentWeek
    let reportTypeUnit = groupOptions[0]
    switch (reportType) {
      case reportTypeEnum.MONTH:
        reportTypeUnit = groupOptions[1]
        currentValue = currentMonth + 1
        break
      case reportTypeEnum.QUARTER:
        reportTypeUnit = groupOptions[2]
        currentValue = currentQuarter
        break
      default:
        reportTypeUnit = groupOptions[0]
        currentValue = currentWeek
        break
    }
    setUnit(reportTypeUnit)
    setValue(currentValue)
    const { start, end } = getStartAndEndDateOfUnit(
      reportTypeUnit.name,
      currentValue,
    )
    setStartDate(start)
    setEndDate(end)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentQuarter, currentWeek, reportType])

  const getStartAndEndDateOfUnit = (unit, value) => {
    let maxUnit = weeksInYear(getYear(startDate))
    switch (unit) {
      case groupOptions[1].name:
        maxUnit = 12
        break
      case groupOptions[2].name:
        maxUnit = 4
        break
      default:
        break
    }
    if (value > maxUnit) {
      // eslint-disable-next-line no-param-reassign
      value = 1
    }
    let start = startOfISOWeek(setISOWeek(startDate, value))
    let end = endOfISOWeek(setISOWeek(endDate, value))
    switch (unit) {
      case groupOptions[1].name:
        start = startOfMonth(setMonth(new Date(), value - 1))
        end = endOfMonth(setMonth(new Date(), value - 1))
        break
      case groupOptions[2].name:
        start = startOfQuarter(setQuarter(new Date(), value))
        end = endOfQuarter(setQuarter(new Date(), value))
        break
      default:
        break
    }

    return { start, end, value }
  }

  const handleChangeValue = (direction) => {
    let newValue = value
    if (direction === directionEnum.up) {
      newValue = value + 1
    }
    if (direction === directionEnum.down) {
      newValue = value - 1
    }

    const { start, end } = getStartAndEndDateOfUnit(unit.name, newValue)
    if (isAfter(start, new Date())) {
      return
    }
    // eslint-disable-next-line default-case
    let valueFormat
    switch (unit.name) {
      case 'month':
        valueFormat = +format(start, 'M')
        break
      case 'quarter':
        valueFormat = +format(start, 'Q')
        break
      default:
        valueFormat = +format(start, 'I')
        break
    }
    setValue(valueFormat)
    setStartDate(start)
    setEndDate(end)
    handleChange(unit, { start, end })
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={() => handleChangeValue(directionEnum.down)}
        sx={{
          width: 20,
          height: 20,
          mr: 1,
          bgcolor: 'grayF4.main',
          borderRadius: '3px',
        }}
      >
        <ArrowBackIosNewIcon style={{ fontSize: '10px' }} />
      </IconButton>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5">{`${t(
          `dashboard.${unit.name}`,
        )} ${value}`}</Typography>
        <Typography variant="body2">{`${format(
          startDate,
          dateFormat,
        )} - ${format(endDate, dateFormat)}`}</Typography>
      </Box>
      <IconButton
        onClick={() => handleChangeValue(directionEnum.up)}
        sx={{
          width: 20,
          height: 20,
          ml: 1,
          bgcolor: 'grayF4.main',
          borderRadius: '3px',
        }}
      >
        <ArrowForwardIosIcon style={{ fontSize: '10px' }} />
      </IconButton>
    </Box>
  )
}

export default DateGroupSelection
