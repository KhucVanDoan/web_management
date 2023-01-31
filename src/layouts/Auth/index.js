import React from 'react'

import { Box } from '@mui/material'
import PropTypes from 'prop-types'

import LogoAvenue from '~/assets/images/auth/Logo-Avenue.png'
import { useClasses } from '~/themes'

import style from './style'

const AuthLayout = ({ children }) => {
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      <Box className={classes.leftPanel}>
        <Box className={classes.logo}>
          <img src={LogoAvenue} alt="logo" />
        </Box>
      </Box>
      <Box className={classes.rightPanel}>
        <Box className={classes.main}>
          <Box className={classes.box}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}

AuthLayout.defaultProps = {
  children: null,
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}

export default AuthLayout
