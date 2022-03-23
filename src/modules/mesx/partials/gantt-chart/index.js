import React from 'react'

import { Box } from '@mui/system'

import { useClasses } from '~/themes'

import GanttChartWrapper from './GanttChartWrapper'
import style from './style'

const GanttChart = (props) => {
  const classes = useClasses(style)
  return (
    <Box className={classes.root}>
      <GanttChartWrapper {...props} />
    </Box>
  )
}

export default GanttChart
