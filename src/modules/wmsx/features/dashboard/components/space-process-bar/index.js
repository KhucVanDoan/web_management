import React from 'react'

import { Box, Typography } from '@mui/material'

import { useClasses } from '~/themes'

import style from './style'

const SpaceProcessBar = (props) => {
  const { title, percentage } = props
  const classes = useClasses(style)

  return (
    <Box className={classes.spaceProcessBar}>
      <Box className={classes.spaceProcessBarName}>
        <Typography noWrap title={title}>
          {title}
        </Typography>
      </Box>
      <Box className={classes.spaceProcessBarPersen}>
        <Box
          className={classes.spaceProcessBarPersenPrev}
          style={{
            width: percentage + '%',
            color: percentage <= 20 ? '#222' : '#fff',
          }}
        >
          <span title={`${percentage}%`}>{percentage}%</span>
        </Box>
      </Box>
    </Box>
  )
}

export default SpaceProcessBar
