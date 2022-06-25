import React from 'react'

import { Box, Tooltip } from '@mui/material'

import { useClasses } from '~/themes'

import style from './style'

function DeviceItem(props) {
  const { type, data, title } = props
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
    <Box className={classes.stage}>
      <Box className="stage-header" />
      <Tooltip arrow placement="top" title={title}>
        <Box className={classes.devicePanel}>
          <Box className="title">{title}</Box>
          <Box className={`data ${cssEnum[type]}`}>{data}</Box>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default DeviceItem
