import React from 'react'

import { Box } from '@mui/material'

import { useClasses } from '~/themes'

import style from './style'

function DeviceItem({ device = {} }) {
  const { activeTime, serial, status } = device
  const classes = useClasses(style)

  const cssEnum = {
    1: 'activation',
    2: 'stop',
    3: 'error',
    4: 'off-shutdown',
    5: 'off-maintain',
    6: 'using',
  }
  return (
    <Box className={classes.deviceContainer} title={serial}>
      <Box className={classes.devicePanel}>
        <Box className="title">{serial}</Box>
        <Box className={`data ${cssEnum[status]}`}>{activeTime}</Box>
      </Box>
    </Box>
  )
}

export default DeviceItem
