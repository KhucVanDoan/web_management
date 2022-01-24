import React from 'react'

import { Box } from '@mui/material'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const Toolbar = () => {
  const classes = useClasses(style)
  return (
    <Box className={classes.root}>
      <Button icon="setting" color="grayEE" />
      <Button
        icon="notification"
        color="grayEE"
        sx={{
          width: '40px',
          minWidth: '40px',
          padding: '9px 21px',
          '.MuiButton-startIcon': {
            margin: 0,
          },
        }}
      >
        <Box className={classes.badge}>{2}</Box>
      </Button>
      <Button
        color="grayEE"
        sx={{
          width: 40,
          minWidth: 40,
          padding: 0,
          backgroundImage: `url(https://loremflickr.com/320/240), url('add default avatar here')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Box>
  )
}

export default Toolbar
