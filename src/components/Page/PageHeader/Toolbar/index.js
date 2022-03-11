import React from 'react'

import { Box } from '@mui/material'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const Toolbar = () => {
  const classes = useClasses(style)
  return (
    <Box className={classes.root}>
      <Button className={classes.btn} icon="setting" color="grayEE" />
      <Button
        className={classes.btn}
        icon="notification"
        color="grayEE"
        sx={{
          padding: '9px 21px',
          '.MuiButton-startIcon': {
            margin: 0,
          },
        }}
      >
        <Box className={classes.badge}>{2}</Box>
      </Button>
      <Button
        className={classes.btn}
        color="grayEE"
        sx={{
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
